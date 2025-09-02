# API Documentation - OpenSearch Document Complexity Analyzer

Complete reference for the analysis engine API, type definitions, configuration options, and integration examples.

## Table of Contents

- [Core API](#core-api)
- [Type Definitions](#type-definitions)
- [Analysis Functions](#analysis-functions)
- [Scoring System](#scoring-system)
- [Configuration](#configuration)
- [Integration Examples](#integration-examples)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)

## Core API

### `analyzeDocument(document, useCase?)`

The main analysis function that processes JSON documents and returns comprehensive analysis results.

```typescript
function analyzeDocument(
  document: any, 
  useCase?: 'general' | 'analytics' | 'logging' | 'ecommerce' | 'monitoring'
): AnalysisResult
```

#### Parameters

- **`document`** (`any`): JSON object to analyze. Must be a valid JavaScript object (not array or primitive).
- **`useCase`** (`string`, optional): Optimization profile for scoring weights. Defaults to `'general'`.

#### Returns

`AnalysisResult` - Comprehensive analysis results including scores, explanations, and recommendations.

#### Example

```typescript
import { analyzeDocument } from './src/analysis/analyzer';

const document = {
  user: {
    id: 'user123',
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      preferences: {
        theme: 'dark',
        notifications: true
      }
    }
  },
  activity: {
    lastLogin: '2023-01-01T10:00:00Z',
    loginCount: 42,
    isActive: true
  }
};

// Basic analysis
const result = analyzeDocument(document);

// Analysis optimized for analytics workload
const analyticsResult = analyzeDocument(document, 'analytics');

console.log('Overall Score:', result.scores.overall);
console.log('Field Count:', result.fieldCount);
console.log('Storage Estimate:', result.estimatedStorageMB, 'MB');
```

### `calculateEnhancedScores(fields, estimatedStorageMB, config?)`

Advanced scoring function for custom configurations and detailed analysis.

```typescript
function calculateEnhancedScores(
  fields: FieldAnalysis[], 
  estimatedStorageMB: number,
  config?: ScoringConfig
): EnhancedScoringResult
```

#### Parameters

- **`fields`** (`FieldAnalysis[]`): Array of analyzed fields with complexity metrics
- **`estimatedStorageMB`** (`number`): Storage size estimate in megabytes
- **`config`** (`ScoringConfig`, optional): Custom scoring configuration

#### Returns

`EnhancedScoringResult` - Detailed scoring results with explanations and performance metrics.

## Type Definitions

### Core Types

#### `AnalysisResult`

Complete analysis result structure returned by `analyzeDocument()`.

```typescript
interface AnalysisResult {
  // Multi-dimensional scores (0-10 scale)
  scores: {
    queryPerformance: number;      // How fast queries will execute
    indexingPerformance: number;   // How fast documents will be indexed
    storageEfficiency: number;     // How efficiently storage is used
    maintenanceCost: number;       // Operational overhead score
    overall: number;               // Weighted composite score
  };
  
  // Score explanations and breakdowns
  explanations: {
    queryPerformance: ScoreBreakdown;
    indexingPerformance: ScoreBreakdown;
    storageEfficiency: ScoreBreakdown;
    maintenanceCost: ScoreBreakdown;
  };
  
  // Performance predictions
  performanceMetrics: PerformanceMetrics;
  
  // Document classification and comparison
  comparative: ComparativeAnalysis;
  
  // Field-level analysis
  fields: FieldAnalysis[];
  fieldTypes: Record<OpenSearchFieldType, number>;
  fieldCount: number;
  maxDepth: number;
  
  // Storage and size information
  estimatedStorageMB: number;
  indexSizeScore: number;        // Legacy compatibility (0-10)
  complexityScore: number;       // Legacy compatibility (0-10)
  
  // Optimization guidance
  warnings: string[];
  optimizations: string[];
  
  // Configuration used for this analysis
  scoringConfig: ScoringConfig;
}
```

#### `ScoreBreakdown`

Detailed explanation of how individual scores were calculated.

```typescript
interface ScoreBreakdown {
  factors: Array<{
    name: string;         // Factor name (e.g., "Text Fields")
    impact: number;       // Numeric impact value
    explanation: string;  // Human-readable explanation
  }>;
  
  fieldImpacts: Array<{
    path: string;         // Field path (e.g., "user.profile.name")
    contribution: number; // Field's contribution to score
    reason: string;       // Why this field has this impact
  }>;
  
  recommendations: string[];  // Specific optimization recommendations
  
  confidenceInterval: {
    min: number;          // Lower bound of score confidence
    max: number;          // Upper bound of score confidence
    confidence: number;   // Confidence level (0-1)
  };
}
```

#### `FieldAnalysis`

Analysis of individual document fields.

```typescript
interface FieldAnalysis {
  path: string;                    // Field path in dot notation
  type: OpenSearchFieldType;       // Detected OpenSearch field type
  isArray: boolean;               // Whether field is an array
  depth: number;                  // Nesting depth (0 = root level)
  complexity: number;             // Field complexity score
}
```

#### `OpenSearchFieldType`

Supported OpenSearch field types.

```typescript
type OpenSearchFieldType = 
  | 'text'        // Full-text search fields
  | 'keyword'     // Exact-match fields
  | 'long'        // 64-bit integers
  | 'integer'     // 32-bit integers
  | 'short'       // 16-bit integers
  | 'byte'        // 8-bit integers
  | 'double'      // 64-bit floating point
  | 'float'       // 32-bit floating point
  | 'date'        // Date/timestamp fields
  | 'boolean'     // Boolean fields
  | 'object'      // Flattened objects
  | 'nested';     // Nested objects
```

### Performance Types

#### `PerformanceMetrics`

Predicted resource usage metrics.

```typescript
interface PerformanceMetrics {
  memoryUsageMB: {
    heap: number;      // JVM heap memory usage (MB)
    offHeap: number;   // Off-heap memory usage (MB)
    total: number;     // Total memory usage (MB)
  };
  
  cpuUtilization: {
    indexing: number;     // CPU % during indexing
    query: number;        // CPU % during queries
    maintenance: number;  // CPU % for maintenance
  };
  
  diskIO: {
    readOps: number;      // Read operations per second
    writeOps: number;     // Write operations per second
    totalMBps: number;    // Total disk throughput MB/s
  };
  
  networkBandwidth: {
    ingestMBps: number;      // Ingestion bandwidth MB/s
    queryMBps: number;       // Query response bandwidth MB/s
    replicationMBps: number; // Replication bandwidth MB/s
  };
}
```

#### `ComparativeAnalysis`

Document classification and benchmarking results.

```typescript
interface ComparativeAnalysis {
  documentType: DocumentType;     // Classified document type
  typeConfidence: number;         // Classification confidence (0-1)
  
  percentileRanks: {
    queryPerformance: number;     // Percentile rank (0-100)
    indexingPerformance: number;
    storageEfficiency: number;
    maintenanceCost: number;
  };
  
  typicalRanges: {
    queryPerformance: { min: number; max: number; median: number; };
    indexingPerformance: { min: number; max: number; median: number; };
    storageEfficiency: { min: number; max: number; median: number; };
    maintenanceCost: { min: number; max: number; median: number; };
  };
}
```

#### `DocumentType`

Supported document classification types.

```typescript
type DocumentType = 
  | 'Log Entry'         // Application/system logs
  | 'User Profile'      // User data and preferences
  | 'Product Catalog'   // E-commerce product information
  | 'Event Data'        // Analytics and tracking events
  | 'Configuration'     // Application configuration
  | 'Metrics'           // Numerical measurements
  | 'Content Document'  // Text-heavy content
  | 'Sensor Data'       // IoT and monitoring data
  | 'Unknown';          // Unclassifiable documents
```

### Configuration Types

#### `ScoringConfig`

Configuration for analysis scoring and weighting.

```typescript
interface ScoringConfig {
  version: string;        // Configuration version
  useCase: string;        // Use case identifier
  
  weights: {
    queryPerformance: number;     // Weight for query performance (0-1)
    indexingPerformance: number;  // Weight for indexing performance (0-1)
    storageEfficiency: number;    // Weight for storage efficiency (0-1)
    maintenanceCost: number;      // Weight for maintenance cost (0-1)
  };
}
```

## Analysis Functions

### Field Detection Functions

#### `detectOpenSearchFieldType(value: any): OpenSearchFieldType`

Detects OpenSearch field type based on value characteristics using OpenSearch dynamic mapping rules.

```typescript
// Internal function - used by analyzeDocument
function detectOpenSearchFieldType(value: any): OpenSearchFieldType {
  // Implementation based on OpenSearch dynamic mapping
  // Returns appropriate field type for the given value
}
```

**Detection Rules**:
- **String values**:
  - Date patterns → `'date'`
  - Length > 256 or contains spaces → `'text'`
  - Otherwise → `'keyword'`
- **Numeric values**:
  - Range -128 to 127 → `'byte'`
  - Range -32768 to 32767 → `'short'`
  - Range -2³¹ to 2³¹-1 → `'integer'`
  - Larger integers → `'long'`
  - Floating point → `'double'`
- **Other types**:
  - Boolean → `'boolean'`
  - Arrays → `'object'` or `'nested'`
  - Objects → `'object'`

### Storage Calculation

#### `calculateStorageRequirements(fields, sourceDataSize)`

Calculates storage requirements using OpenSearch's storage formula.

```typescript
// Internal function
function calculateStorageRequirements(
  fields: FieldAnalysis[], 
  sourceDataSize: number
): StorageResult
```

**OpenSearch Storage Formula**:
```
Final Storage = Source Data × (1 + Replicas) × 1.1 / 0.95 / 0.9
Where:
- Replicas: Number of replica shards (default: 1)
- 1.1: Indexing overhead (10%)
- 0.95: Reserved space ratio (5% reserved)
- 0.9: System overhead (10% system usage)
```

## Scoring System

### Scoring Configurations

Pre-defined scoring configurations for different use cases:

```typescript
export const SCORING_CONFIGS: Record<string, ScoringConfig> = {
  general: {
    version: '1.0.0',
    weights: { 
      queryPerformance: 0.3, 
      indexingPerformance: 0.25, 
      storageEfficiency: 0.25, 
      maintenanceCost: 0.2 
    },
    useCase: 'general'
  },
  
  analytics: {
    version: '1.0.0',
    weights: { 
      queryPerformance: 0.4,      // Emphasize query speed
      indexingPerformance: 0.2, 
      storageEfficiency: 0.3, 
      maintenanceCost: 0.1 
    },
    useCase: 'analytics'
  },
  
  logging: {
    version: '1.0.0',
    weights: { 
      queryPerformance: 0.2, 
      indexingPerformance: 0.4,   // Emphasize indexing speed
      storageEfficiency: 0.3, 
      maintenanceCost: 0.1 
    },
    useCase: 'logging'
  },
  
  ecommerce: {
    version: '1.0.0',
    weights: { 
      queryPerformance: 0.35,     // Balance query and storage
      indexingPerformance: 0.25, 
      storageEfficiency: 0.2, 
      maintenanceCost: 0.2 
    },
    useCase: 'ecommerce'
  },
  
  monitoring: {
    version: '1.0.0',
    weights: { 
      queryPerformance: 0.25, 
      indexingPerformance: 0.35,  // High-volume ingestion
      storageEfficiency: 0.25, 
      maintenanceCost: 0.15 
    },
    useCase: 'monitoring'
  }
};
```

### Score Calculation Methods

Each dimension uses specific algorithms based on field characteristics:

#### Query Performance Scoring
- **Text fields**: High impact (4.0x multiplier)
- **Nested fields**: Very high impact (8.0x multiplier)  
- **Deep nesting**: Exponential depth penalty
- **Array fields**: 1.3x penalty multiplier

#### Indexing Performance Scoring
- **Text analysis**: 5.0x processing cost
- **Nested documents**: 7.0x processing cost
- **Complexity factor**: Based on field depth and array size

#### Storage Efficiency Scoring
- **Text overhead**: 2.2x storage multiplier
- **Nested objects**: 4.0x storage multiplier
- **Numeric optimization**: Negative impact (efficient)

#### Maintenance Cost Scoring
- **Text analyzers**: 3.5x maintenance complexity
- **Nested queries**: 5.0x optimization complexity
- **Field count**: Linear complexity increase

## Configuration

### Custom Scoring Configuration

Create custom scoring configurations for specialized use cases:

```typescript
import { calculateEnhancedScores } from './src/analysis/scoring';

// Custom configuration for search-heavy application
const searchConfig: ScoringConfig = {
  version: '1.0.0',
  useCase: 'custom-search',
  weights: {
    queryPerformance: 0.5,      // Heavily emphasize query speed
    indexingPerformance: 0.15,  // De-emphasize indexing
    storageEfficiency: 0.25,    // Moderate storage concern
    maintenanceCost: 0.1        // Minimize maintenance focus
  }
};

// Use custom configuration
const fields = [/* analyzed fields */];
const storageSize = 100; // MB

const customResult = calculateEnhancedScores(fields, storageSize, searchConfig);
```

### Environment Configuration

Configure the analyzer for different environments:

```typescript
// Development configuration
const devConfig = {
  enablePerformanceMonitoring: true,
  detailedLogging: true,
  skipLargeDocumentWarnings: true
};

// Production configuration
const prodConfig = {
  enablePerformanceMonitoring: false,
  detailedLogging: false,
  skipLargeDocumentWarnings: false
};
```

## Integration Examples

### Basic Integration

```typescript
import { analyzeDocument } from './src/analysis/analyzer';

class DocumentAnalyzer {
  async analyzeUserDocument(document: any, useCase = 'general') {
    try {
      const result = analyzeDocument(document, useCase);
      
      return {
        success: true,
        analysis: result,
        recommendations: this.formatRecommendations(result)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        analysis: null
      };
    }
  }
  
  private formatRecommendations(result: AnalysisResult): string[] {
    const recommendations = [];
    
    if (result.scores.queryPerformance < 5) {
      recommendations.push('Consider optimizing field types for better query performance');
    }
    
    if (result.scores.storageEfficiency < 5) {
      recommendations.push('Document structure may benefit from storage optimization');
    }
    
    return [...recommendations, ...result.optimizations];
  }
}
```

### Batch Analysis

```typescript
import { analyzeDocument } from './src/analysis/analyzer';

interface BatchAnalysisResult {
  documentId: string;
  analysis: AnalysisResult;
  processingTime: number;
}

class BatchAnalyzer {
  async analyzeBatch(documents: Array<{id: string, data: any}>): Promise<BatchAnalysisResult[]> {
    const results: BatchAnalysisResult[] = [];
    
    for (const doc of documents) {
      const startTime = performance.now();
      
      try {
        const analysis = analyzeDocument(doc.data);
        const processingTime = performance.now() - startTime;
        
        results.push({
          documentId: doc.id,
          analysis,
          processingTime
        });
      } catch (error) {
        console.error(`Analysis failed for document ${doc.id}:`, error);
      }
    }
    
    return results;
  }
  
  generateBatchReport(results: BatchAnalysisResult[]): {
    summary: any;
    recommendations: string[];
    performance: any;
  } {
    const avgScores = this.calculateAverageScores(results);
    const commonIssues = this.identifyCommonIssues(results);
    const performanceStats = this.calculatePerformanceStats(results);
    
    return {
      summary: {
        totalDocuments: results.length,
        averageScores: avgScores,
        commonIssues
      },
      recommendations: this.generateBatchRecommendations(results),
      performance: performanceStats
    };
  }
  
  private calculateAverageScores(results: BatchAnalysisResult[]) {
    const totals = {
      queryPerformance: 0,
      indexingPerformance: 0,
      storageEfficiency: 0,
      maintenanceCost: 0,
      overall: 0
    };
    
    results.forEach(r => {
      totals.queryPerformance += r.analysis.scores.queryPerformance;
      totals.indexingPerformance += r.analysis.scores.indexingPerformance;
      totals.storageEfficiency += r.analysis.scores.storageEfficiency;
      totals.maintenanceCost += r.analysis.scores.maintenanceCost;
      totals.overall += r.analysis.scores.overall;
    });
    
    const count = results.length;
    return {
      queryPerformance: totals.queryPerformance / count,
      indexingPerformance: totals.indexingPerformance / count,
      storageEfficiency: totals.storageEfficiency / count,
      maintenanceCost: totals.maintenanceCost / count,
      overall: totals.overall / count
    };
  }
}
```

### React Integration

```typescript
import React, { useState, useCallback } from 'react';
import { analyzeDocument } from './src/analysis/analyzer';
import type { AnalysisResult } from './src/types';

interface AnalyzerHookResult {
  analyze: (document: any, useCase?: string) => Promise<void>;
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export const useDocumentAnalyzer = (): AnalyzerHookResult => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const analyze = useCallback(async (document: any, useCase = 'general') => {
    setLoading(true);
    setError(null);
    
    try {
      // Add artificial delay for better UX in fast analyses
      const analysisPromise = new Promise<AnalysisResult>((resolve) => {
        setTimeout(() => resolve(analyzeDocument(document, useCase)), 100);
      });
      
      const analysisResult = await analysisPromise;
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { analyze, result, loading, error };
};

// Component using the hook
export const AnalyzerComponent: React.FC = () => {
  const { analyze, result, loading, error } = useDocumentAnalyzer();
  
  const handleAnalysis = async () => {
    const document = {
      user: { id: '123', name: 'Test User' },
      data: { value: 42, active: true }
    };
    
    await analyze(document, 'analytics');
  };
  
  return (
    <div>
      <button onClick={handleAnalysis} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Document'}
      </button>
      
      {error && <div className="error">{error}</div>}
      
      {result && (
        <div className="results">
          <h3>Analysis Results</h3>
          <p>Overall Score: {result.scores.overall}</p>
          <p>Field Count: {result.fieldCount}</p>
          <p>Storage: {result.estimatedStorageMB} MB</p>
        </div>
      )}
    </div>
  );
};
```

## Error Handling

### Common Error Types

```typescript
// Document validation errors
interface DocumentValidationError extends Error {
  code: 'INVALID_DOCUMENT';
  details: string;
}

// Analysis processing errors
interface AnalysisError extends Error {
  code: 'ANALYSIS_FAILED';
  fieldPath?: string;
  details: string;
}

// Performance errors for very large documents
interface PerformanceError extends Error {
  code: 'PERFORMANCE_LIMIT';
  documentSize: number;
  details: string;
}
```

### Error Handling Examples

```typescript
import { analyzeDocument } from './src/analysis/analyzer';

function safeAnalyzeDocument(document: any, useCase = 'general') {
  try {
    // Validate input
    if (!document || typeof document !== 'object' || Array.isArray(document)) {
      throw new Error('Document must be a valid JSON object');
    }
    
    // Check document size (rough estimate)
    const documentSize = JSON.stringify(document).length;
    if (documentSize > 10 * 1024 * 1024) { // 10MB limit
      console.warn('Large document detected, analysis may be slow');
    }
    
    const result = analyzeDocument(document, useCase);
    
    return {
      success: true,
      result,
      warnings: result.warnings
    };
    
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        result: null
      };
    }
    
    return {
      success: false,
      error: 'Unknown analysis error',
      result: null
    };
  }
}

// Usage with error handling
const analysisResult = safeAnalyzeDocument(myDocument, 'analytics');

if (analysisResult.success) {
  console.log('Analysis completed:', analysisResult.result);
  if (analysisResult.warnings.length > 0) {
    console.warn('Warnings:', analysisResult.warnings);
  }
} else {
  console.error('Analysis failed:', analysisResult.error);
}
```

## Performance Considerations

### Optimization Guidelines

1. **Document Size**:
   - Optimal: < 1MB JSON documents
   - Good: 1-10MB documents
   - Slow: > 10MB documents

2. **Field Count**:
   - Optimal: < 100 fields
   - Good: 100-500 fields
   - Slow: > 1000 fields

3. **Nesting Depth**:
   - Optimal: < 3 levels
   - Good: 3-5 levels
   - Slow: > 8 levels

### Performance Monitoring

```typescript
import { analyzeDocument } from './src/analysis/analyzer';

function monitoredAnalysis(document: any, useCase = 'general') {
  const startTime = performance.now();
  const startMemory = (performance as any).memory?.usedJSHeapSize;
  
  try {
    const result = analyzeDocument(document, useCase);
    
    const endTime = performance.now();
    const endMemory = (performance as any).memory?.usedJSHeapSize;
    
    const metrics = {
      duration: endTime - startTime,
      memoryDelta: endMemory && startMemory ? endMemory - startMemory : 0,
      fieldCount: result.fieldCount,
      documentSize: JSON.stringify(document).length
    };
    
    // Log performance metrics
    console.log('Analysis Performance:', metrics);
    
    // Warn about slow analysis
    if (metrics.duration > 5000) {
      console.warn('Slow analysis detected:', {
        duration: `${metrics.duration.toFixed(2)}ms`,
        fieldCount: metrics.fieldCount,
        documentSize: `${(metrics.documentSize / 1024).toFixed(1)}KB`
      });
    }
    
    return { result, metrics };
    
  } catch (error) {
    const endTime = performance.now();
    console.error('Analysis failed:', {
      duration: `${(endTime - startTime).toFixed(2)}ms`,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}
```

### Memory Management

```typescript
// For large batch processing
function efficientBatchAnalysis(documents: any[], batchSize = 10) {
  const results = [];
  
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    
    // Process batch
    const batchResults = batch.map(doc => analyzeDocument(doc));
    results.push(...batchResults);
    
    // Force garbage collection if available (Node.js)
    if (global.gc && i % (batchSize * 5) === 0) {
      global.gc();
    }
  }
  
  return results;
}
```

---

## Version History

### v1.0.0
- Initial release with core analysis functionality
- Multi-dimensional scoring system
- Document type classification
- Performance prediction metrics

### Future Versions
- Custom analyzer configuration
- Real-time analysis optimization
- Advanced field mapping suggestions
- Integration with OpenSearch clusters

---

For more examples and advanced usage patterns, see the [User Guide](USER_GUIDE.md) and [Technical Architecture](TECHNICAL_ARCHITECTURE.md) documentation.