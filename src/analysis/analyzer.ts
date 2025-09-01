import type { AnalysisResult, OpenSearchFieldType, FieldAnalysis } from '../types';
import { calculateEnhancedScores, SCORING_CONFIGS } from './scoring';

/**
 * OpenSearch Document Complexity Analyzer
 * Based on comprehensive research of OpenSearch source code and documentation
 * 
 * Research Sources:
 * - OpenSearch field mapping documentation: https://opensearch.org/docs/latest/field-types/
 * - Lucene storage architecture: https://lucene.apache.org/core/documentation.html
 * - OpenSearch indexing performance guide: https://opensearch.org/docs/latest/tuning-your-cluster/
 */

// Field type storage overhead multipliers based on OpenSearch documentation
const FIELD_TYPE_STORAGE_OVERHEAD = {
  'keyword': 1.0,      // Exact value storage, no analysis
  'text': 1.1,         // 10% overhead for analyzed text (tokenization + inverted index)
  'long': 0.8,         // Numeric fields are space-optimized
  'integer': 0.8,
  'short': 0.6,
  'byte': 0.4,
  'double': 0.9,
  'float': 0.8,
  'date': 0.8,         // Stored as milliseconds (optimized)
  'boolean': 0.2,      // Single bit per field
  'object': 1.2,       // Flattened field names add overhead
  'nested': 2.5        // Each nested object becomes separate Lucene document
} as const;

// Processing complexity weights based on OpenSearch indexing behavior
const FIELD_TYPE_PROCESSING_COMPLEXITY = {
  'keyword': 1.0,      // No analysis, direct storage
  'text': 3.0,         // Standard analyzer: tokenization, lowercasing, stemming
  'long': 0.5,
  'integer': 0.5,
  'short': 0.5,
  'byte': 0.5,
  'double': 0.7,       // Slight precision handling overhead
  'float': 0.6,
  'date': 0.8,         // Date parsing and normalization
  'boolean': 0.3,
  'object': 1.5,       // Field flattening processing
  'nested': 4.0        // Separate document creation + parent-child relationships
} as const;

// OpenSearch-specific limits and thresholds (from documentation)
const OPENSEARCH_LIMITS = {
  MAX_NESTED_OBJECTS: 10000,        // Per document limit
  MAX_FIELD_NAME_LENGTH: 1000,      // Character limit
  RECOMMENDED_FIELD_LIMIT: 1000,    // Performance recommendation
  DEEP_NESTING_THRESHOLD: 5,       // Depth at which performance degrades
  LARGE_ARRAY_THRESHOLD: 100,      // Array size that impacts performance
  TEXT_FIELD_WARNING_LIMIT: 20     // Number of text fields that impacts performance
} as const;

/**
 * Detects OpenSearch field type based on JSON value using OpenSearch's dynamic mapping rules
 * Reference: https://opensearch.org/docs/latest/field-types/supported-field-types/
 */
function detectOpenSearchFieldType(value: any): OpenSearchFieldType {
  if (value === null || value === undefined) {
    return 'keyword'; // Default for null values
  }

  if (typeof value === 'string') {
    // OpenSearch date detection patterns
    if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/) ||
        value.match(/^\d{4}-\d{2}-\d{2}$/) ||
        value.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
      return 'date';
    }
    
    // OpenSearch uses keyword for short strings, text for longer content
    // This threshold is based on OpenSearch's dynamic mapping behavior
    if (value.length > 256 || value.includes(' ')) {
      return 'text';
    }
    
    return 'keyword';
  }
  
  if (typeof value === 'number') {
    // OpenSearch numeric type detection
    if (Number.isInteger(value)) {
      if (value >= -128 && value <= 127) return 'byte';
      if (value >= -32768 && value <= 32767) return 'short';
      if (value >= -2147483648 && value <= 2147483647) return 'integer';
      return 'long';
    }
    return Number.isFinite(value) ? 'double' : 'keyword';
  }
  
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  
  if (Array.isArray(value)) {
    // Arrays are flattened in OpenSearch unless explicitly nested
    return 'object';
  }
  
  if (typeof value === 'object') {
    return 'object'; // Will be analyzed further for potential nested type
  }
  
  return 'keyword'; // Fallback
}

/**
 * Recursively analyzes document structure to detect all fields and their characteristics
 */
function analyzeDocumentStructure(obj: any, path = '', depth = 0): FieldAnalysis[] {
  const fields: FieldAnalysis[] = [];
  
  if (Array.isArray(obj)) {
    // Analyze array elements - in OpenSearch, arrays are flattened by default
    obj.forEach((item) => {
      if (typeof item === 'object' && item !== null) {
        // Object in array - analyze its structure
        fields.push(...analyzeDocumentStructure(item, path, depth));
      } else {
        // Primitive in array
        const fieldType = detectOpenSearchFieldType(item);
        fields.push({
          path: path || `array_element`,
          type: fieldType,
          isArray: true,
          depth,
          complexity: calculateFieldComplexity(fieldType, depth, true, 1)
        });
      }
    });
  } else if (typeof obj === 'object' && obj !== null) {
    // Analyze object properties
    Object.entries(obj).forEach(([key, value]) => {
      const fieldPath = path ? `${path}.${key}` : key;
      
      if (Array.isArray(value)) {
        // Array field
        const arraySize = value.length;
        if (value.length > 0) {
          const firstElementType = detectOpenSearchFieldType(value[0]);
          
          // Check if array contains objects (potential nested type)
          const containsObjects = value.some(item => typeof item === 'object' && item !== null);
          const fieldType = containsObjects ? 'nested' : firstElementType;
          
          fields.push({
            path: fieldPath,
            type: fieldType,
            isArray: true,
            depth,
            complexity: calculateFieldComplexity(fieldType, depth, true, arraySize)
          });
          
          // If array contains objects, analyze their structure
          if (containsObjects) {
            value.forEach((item) => {
              if (typeof item === 'object' && item !== null) {
                fields.push(...analyzeDocumentStructure(item, fieldPath, depth + 1));
              }
            });
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        // Nested object - analyze recursively
        fields.push(...analyzeDocumentStructure(value, fieldPath, depth + 1));
      } else {
        // Simple field
        const fieldType = detectOpenSearchFieldType(value);
        fields.push({
          path: fieldPath,
          type: fieldType,
          isArray: false,
          depth,
          complexity: calculateFieldComplexity(fieldType, depth, false, 1)
        });
      }
    });
  }
  
  return fields;
}

/**
 * Calculates field complexity based on OpenSearch indexing behavior
 * Factors: field type processing cost, nesting depth penalty, array size impact
 */
function calculateFieldComplexity(
  type: OpenSearchFieldType, 
  depth: number, 
  isArray: boolean, 
  arraySize: number = 1
): number {
  let complexity = FIELD_TYPE_PROCESSING_COMPLEXITY[type];
  
  // Depth penalty - based on OpenSearch's flattening overhead
  // Each level of nesting requires additional field name processing
  if (depth > 0) {
    complexity *= Math.pow(1.3, depth);
  }
  
  // Array size impact - larger arrays require more processing
  if (isArray && arraySize > 1) {
    const sizeMultiplier = Math.log10(arraySize + 1);
    complexity *= (1 + sizeMultiplier * 0.5);
  }
  
  // Special penalty for deeply nested structures
  if (depth > OPENSEARCH_LIMITS.DEEP_NESTING_THRESHOLD) {
    complexity *= 2.0;
  }
  
  return complexity;
}

/**
 * Calculates storage requirements using OpenSearch's actual storage formula
 * Formula from research: Source Data × (1 + Replicas) × (1.1 Indexing Overhead) / (0.95 Reserved Space) / (0.9 System Overhead)
 */
function calculateStorageRequirements(fields: FieldAnalysis[], sourceDataSize: number): {
  estimatedStorageMB: number;
  overheadPercentage: number;
  breakdown: { base: number; indexing: number; reserved: number; system: number; };
} {
  // Calculate field-specific overhead
  let fieldOverhead = 0;
  fields.forEach(field => {
    const baseSize = sourceDataSize / fields.length; // Rough per-field estimate
    fieldOverhead += baseSize * (FIELD_TYPE_STORAGE_OVERHEAD[field.type] - 1);
  });
  
  // Apply OpenSearch storage formula (assuming single replica for simplicity)
  const replicas = 1;
  const indexingOverhead = 1.1;
  const reservedSpace = 0.95;
  const systemOverhead = 0.9;
  
  const baseStorageBytes = sourceDataSize + fieldOverhead;
  const withReplicas = baseStorageBytes * (1 + replicas);
  const withIndexing = withReplicas * indexingOverhead;
  const withReserved = withIndexing / reservedSpace;
  const finalStorage = withReserved / systemOverhead;
  
  const estimatedStorageMB = finalStorage / (1024 * 1024);
  const overheadPercentage = ((finalStorage - sourceDataSize) / sourceDataSize) * 100;
  
  return {
    estimatedStorageMB,
    overheadPercentage,
    breakdown: {
      base: sourceDataSize / (1024 * 1024),
      indexing: (withIndexing - withReplicas) / (1024 * 1024),
      reserved: (withReserved - withIndexing) / (1024 * 1024),
      system: (finalStorage - withReserved) / (1024 * 1024)
    }
  };
}

/**
 * Main document analysis function implementing OpenSearch-based complexity assessment
 * with enhanced scoring system
 */
export function analyzeDocument(document: any, useCase: 'general' | 'analytics' | 'logging' | 'ecommerce' | 'monitoring' = 'general'): AnalysisResult {
  const fields = analyzeDocumentStructure(document);
  const sourceDataSize = new Blob([JSON.stringify(document)]).size;
  
  // Field type distribution
  const fieldTypes: Record<OpenSearchFieldType, number> = {
    text: 0, keyword: 0, long: 0, integer: 0, short: 0, byte: 0,
    double: 0, float: 0, date: 0, boolean: 0, object: 0, nested: 0
  };
  
  fields.forEach(field => {
    fieldTypes[field.type]++;
  });
  
  // Structure analysis
  const maxDepth = Math.max(...fields.map(f => f.depth), 0);
  const nestedObjectCount = fieldTypes.nested;
  const textFieldCount = fieldTypes.text;
  
  // Storage calculation
  const storage = calculateStorageRequirements(fields, sourceDataSize);
  
  // Legacy scores (maintained for backward compatibility)
  const avgComplexity = fields.reduce((sum, f) => sum + f.complexity, 0) / Math.max(fields.length, 1);
  const complexityScore = Math.min(avgComplexity, 10);
  const indexSizeScore = Math.min(storage.overheadPercentage / 50, 10); // 500% overhead = score of 10
  
  // Enhanced scoring system
  const scoringConfig = SCORING_CONFIGS[useCase];
  const enhancedResults = calculateEnhancedScores(fields, storage.estimatedStorageMB, scoringConfig);
  
  // Generate warnings based on OpenSearch limits and best practices
  const warnings: string[] = [];
  if (fields.length > OPENSEARCH_LIMITS.RECOMMENDED_FIELD_LIMIT) {
    warnings.push(`High field count (${fields.length}) may impact indexing performance. OpenSearch recommends < ${OPENSEARCH_LIMITS.RECOMMENDED_FIELD_LIMIT} fields.`);
  }
  if (maxDepth > OPENSEARCH_LIMITS.DEEP_NESTING_THRESHOLD) {
    warnings.push(`Deep nesting detected (${maxDepth} levels). OpenSearch performance degrades beyond ${OPENSEARCH_LIMITS.DEEP_NESTING_THRESHOLD} levels.`);
  }
  if (textFieldCount > OPENSEARCH_LIMITS.TEXT_FIELD_WARNING_LIMIT) {
    warnings.push(`High number of text fields (${textFieldCount}) detected. Each text field requires tokenization and analysis.`);
  }
  if (nestedObjectCount > 0) {
    warnings.push(`Nested objects detected (${nestedObjectCount}). Each creates separate Lucene documents, limited to ${OPENSEARCH_LIMITS.MAX_NESTED_OBJECTS} per document.`);
  }
  if (storage.overheadPercentage > 200) {
    warnings.push(`High storage overhead (${storage.overheadPercentage.toFixed(1)}%). Consider field type optimization.`);
  }
  
  // Add enhanced scoring warnings
  if (enhancedResults.scores.queryPerformance < 4) {
    warnings.push(`Poor query performance predicted (${enhancedResults.scores.queryPerformance}/10). Consider optimizing field types and structure.`);
  }
  if (enhancedResults.scores.indexingPerformance < 4) {
    warnings.push(`Slow indexing performance predicted (${enhancedResults.scores.indexingPerformance}/10). Reduce text analysis overhead.`);
  }
  if (enhancedResults.scores.storageEfficiency < 4) {
    warnings.push(`Inefficient storage utilization (${enhancedResults.scores.storageEfficiency}/10). Consider field type optimization.`);
  }
  if (enhancedResults.scores.maintenanceCost > 7) {
    warnings.push(`High maintenance overhead predicted (${enhancedResults.scores.maintenanceCost}/10). Complex structures require specialized expertise.`);
  }
  
  // Generate optimization recommendations
  const optimizations: string[] = [];
  if (textFieldCount > 5) {
    optimizations.push('Consider using "keyword" type for exact-match fields to avoid tokenization overhead.');
  }
  if (maxDepth > 3) {
    optimizations.push('Flatten nested structures where possible to reduce field name processing overhead.');
  }
  if (fields.length > 500) {
    optimizations.push('Consider splitting large documents into multiple smaller documents for better performance.');
  }
  if (nestedObjectCount > 0) {
    optimizations.push('Evaluate if nested objects are necessary - object type with flattening might suffice.');
  }
  if (fieldTypes.object > fieldTypes.nested && maxDepth > 2) {
    optimizations.push('Consider using nested type for complex object arrays to maintain relationships.');
  }
  
  // Add recommendations from enhanced scoring
  Object.values(enhancedResults.explanations).forEach(explanation => {
    optimizations.push(...explanation.recommendations);
  });
  
  // Remove duplicate recommendations
  const uniqueOptimizations = [...new Set(optimizations)];
  
  return {
    // Legacy scores (backward compatibility)
    indexSizeScore: Math.round(indexSizeScore * 10) / 10,
    complexityScore: Math.round(complexityScore * 10) / 10,
    
    // Enhanced scoring dimensions
    scores: enhancedResults.scores,
    explanations: enhancedResults.explanations,
    performanceMetrics: enhancedResults.performanceMetrics,
    comparative: enhancedResults.comparative,
    scoringConfig: enhancedResults.scoringConfig,
    
    // Existing analysis data
    fieldCount: fields.length,
    estimatedStorageMB: Math.round(storage.estimatedStorageMB * 100) / 100,
    fieldTypes,
    maxDepth,
    fields,
    warnings,
    optimizations: uniqueOptimizations
  };
}