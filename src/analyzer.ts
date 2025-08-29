import { 
  DocumentAnalysis, 
  FieldAnalysis, 
  OpenSearchFieldType, 
  ComplexityBreakdown,
  FieldCharacteristics 
} from './types.js';

export class OpenSearchAnalyzer {
  private static readonly FIELD_TYPE_WEIGHTS = {
    [OpenSearchFieldType.TEXT]: { storage: 3, complexity: 4 },
    [OpenSearchFieldType.KEYWORD]: { storage: 1, complexity: 1 },
    [OpenSearchFieldType.LONG]: { storage: 1, complexity: 1 },
    [OpenSearchFieldType.INTEGER]: { storage: 1, complexity: 1 },
    [OpenSearchFieldType.DOUBLE]: { storage: 1, complexity: 1 },
    [OpenSearchFieldType.FLOAT]: { storage: 1, complexity: 1 },
    [OpenSearchFieldType.DATE]: { storage: 1, complexity: 2 },
    [OpenSearchFieldType.BOOLEAN]: { storage: 1, complexity: 1 },
    [OpenSearchFieldType.OBJECT]: { storage: 2, complexity: 3 },
    [OpenSearchFieldType.NESTED]: { storage: 4, complexity: 5 },
    [OpenSearchFieldType.GEO_POINT]: { storage: 2, complexity: 3 },
    [OpenSearchFieldType.IP]: { storage: 1, complexity: 2 },
    [OpenSearchFieldType.BINARY]: { storage: 5, complexity: 2 }
  };

  private static readonly MAX_FIELD_LIMIT = 1000;
  private static readonly MAX_DEPTH_LIMIT = 20;
  private static readonly MAX_NESTED_LIMIT = 50;

  public analyzeDocument(jsonDoc: any): DocumentAnalysis {
    try {
      const fieldAnalyses = this.extractFields(jsonDoc);
      const fieldsByType = this.categorizeFieldsByType(fieldAnalyses);
      const complexityBreakdown = this.calculateComplexityBreakdown(fieldAnalyses);
      
      return {
        totalFields: fieldAnalyses.length,
        fieldsByType,
        complexityBreakdown,
        fieldAnalyses,
        indexSizeScore: this.calculateIndexSizeScore(fieldAnalyses),
        complexityScore: this.calculateComplexityScore(complexityBreakdown, fieldAnalyses.length),
        recommendations: this.generateRecommendations(fieldAnalyses)
      };
    } catch (error) {
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private extractFields(obj: any, path: string = '', depth: number = 0): FieldAnalysis[] {
    const fields: FieldAnalysis[] = [];
    
    if (depth > OpenSearchAnalyzer.MAX_DEPTH_LIMIT) {
      return fields;
    }

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      const fieldType = this.inferFieldType(value);
      const characteristics = this.analyzeFieldCharacteristics(value, fieldType);
      
      fields.push({
        path: currentPath,
        type: fieldType,
        value,
        complexity: this.calculateFieldComplexity(value, fieldType, depth),
        storageImpact: this.calculateStorageImpact(value, fieldType),
        characteristics
      });

      if (fieldType === OpenSearchFieldType.OBJECT && value !== null) {
        fields.push(...this.extractFields(value, currentPath, depth + 1));
      } else if (fieldType === OpenSearchFieldType.NESTED && Array.isArray(value)) {
        for (let i = 0; i < Math.min(value.length, 10); i++) {
          if (typeof value[i] === 'object' && value[i] !== null) {
            fields.push(...this.extractFields(value[i], `${currentPath}[${i}]`, depth + 1));
          }
        }
      }
    }

    return fields;
  }

  private inferFieldType(value: any): OpenSearchFieldType {
    if (value === null || value === undefined) {
      return OpenSearchFieldType.KEYWORD;
    }

    if (typeof value === 'string') {
      if (this.isDate(value)) return OpenSearchFieldType.DATE;
      if (this.isIP(value)) return OpenSearchFieldType.IP;
      if (this.isGeoPoint(value)) return OpenSearchFieldType.GEO_POINT;
      if (value.length > 50 || this.hasTextCharacteristics(value)) {
        return OpenSearchFieldType.TEXT;
      }
      return OpenSearchFieldType.KEYWORD;
    }

    if (typeof value === 'number') {
      return Number.isInteger(value) ? OpenSearchFieldType.LONG : OpenSearchFieldType.DOUBLE;
    }

    if (typeof value === 'boolean') {
      return OpenSearchFieldType.BOOLEAN;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return OpenSearchFieldType.KEYWORD;
      
      const firstElement = value[0];
      if (typeof firstElement === 'object' && firstElement !== null) {
        return OpenSearchFieldType.NESTED;
      }
      
      return this.inferFieldType(firstElement);
    }

    if (typeof value === 'object') {
      return OpenSearchFieldType.OBJECT;
    }

    return OpenSearchFieldType.KEYWORD;
  }

  private isDate(value: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
    return dateRegex.test(value) && !isNaN(Date.parse(value));
  }

  private isIP(value: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(value) || ipv6Regex.test(value);
  }

  private isGeoPoint(value: string): boolean {
    const geoRegex = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
    return geoRegex.test(value);
  }

  private hasTextCharacteristics(value: string): boolean {
    const hasMultipleWords = value.split(/\s+/).length > 1;
    const hasComplexPunctuation = /[.!?;:,]/.test(value);
    const hasLongSentences = value.length > 100;
    
    return hasMultipleWords || hasComplexPunctuation || hasLongSentences;
  }

  private analyzeFieldCharacteristics(value: any, type: OpenSearchFieldType): FieldCharacteristics {
    const isAnalyzed = type === OpenSearchFieldType.TEXT;
    const isStored = true; // OpenSearch stores all fields by default
    const hasDocValues = ![OpenSearchFieldType.TEXT, OpenSearchFieldType.BINARY].includes(type);
    
    let cardinality: 'low' | 'medium' | 'high' = 'low';
    let size = 0;

    if (typeof value === 'string') {
      size = value.length;
      if (size > 1000) cardinality = 'high';
      else if (size > 100) cardinality = 'medium';
    } else if (Array.isArray(value)) {
      size = value.length;
      if (size > 100) cardinality = 'high';
      else if (size > 10) cardinality = 'medium';
    } else if (typeof value === 'object' && value !== null) {
      size = Object.keys(value).length;
      if (size > 50) cardinality = 'high';
      else if (size > 10) cardinality = 'medium';
    }

    return { isAnalyzed, isStored, hasDocValues, cardinality, size };
  }

  private calculateFieldComplexity(value: any, type: OpenSearchFieldType, depth: number): number {
    const baseWeight = OpenSearchAnalyzer.FIELD_TYPE_WEIGHTS[type].complexity;
    let complexity = baseWeight;

    // Add depth penalty for nested fields
    complexity += depth * 0.5;

    // Add size-based complexity
    if (typeof value === 'string') {
      complexity += Math.min(value.length / 100, 3);
    } else if (Array.isArray(value)) {
      complexity += Math.min(value.length / 10, 5);
    } else if (typeof value === 'object' && value !== null) {
      complexity += Math.min(Object.keys(value).length / 5, 3);
    }

    return Math.round(complexity * 10) / 10;
  }

  private calculateStorageImpact(value: any, type: OpenSearchFieldType): number {
    const baseWeight = OpenSearchAnalyzer.FIELD_TYPE_WEIGHTS[type].storage;
    let impact = baseWeight;

    if (typeof value === 'string') {
      impact += Math.min(value.length / 50, 10);
    } else if (Array.isArray(value)) {
      impact += Math.min(value.length / 5, 15);
    } else if (typeof value === 'object' && value !== null) {
      impact += Math.min(Object.keys(value).length / 3, 8);
    }

    return Math.round(impact * 10) / 10;
  }

  private categorizeFieldsByType(fields: FieldAnalysis[]): Record<OpenSearchFieldType, number> {
    const result: Record<OpenSearchFieldType, number> = {} as Record<OpenSearchFieldType, number>;
    
    // Initialize all types to 0
    Object.values(OpenSearchFieldType).forEach(type => {
      result[type] = 0;
    });

    // Count fields by type
    fields.forEach(field => {
      result[field.type]++;
    });

    return result;
  }

  private calculateComplexityBreakdown(fields: FieldAnalysis[]): ComplexityBreakdown {
    let textAnalysis = 0;
    let nestedComplexity = 0;
    let fieldCardinality = 0;
    let storageOverhead = 0;
    let indexingCost = 0;

    fields.forEach(field => {
      if (field.type === OpenSearchFieldType.TEXT) {
        textAnalysis += field.complexity;
      }
      
      if (field.type === OpenSearchFieldType.NESTED || field.type === OpenSearchFieldType.OBJECT) {
        nestedComplexity += field.complexity;
      }

      if (field.characteristics.cardinality === 'high') {
        fieldCardinality += 2;
      } else if (field.characteristics.cardinality === 'medium') {
        fieldCardinality += 1;
      }

      storageOverhead += field.storageImpact;
      indexingCost += field.complexity * 0.8;
    });

    return {
      textAnalysis: Math.round(textAnalysis * 10) / 10,
      nestedComplexity: Math.round(nestedComplexity * 10) / 10,
      fieldCardinality: Math.round(fieldCardinality * 10) / 10,
      storageOverhead: Math.round(storageOverhead * 10) / 10,
      indexingCost: Math.round(indexingCost * 10) / 10
    };
  }

  private calculateIndexSizeScore(fields: FieldAnalysis[]): number {
    const totalStorageImpact = fields.reduce((sum, field) => sum + field.storageImpact, 0);
    const fieldCount = fields.length;
    
    // Normalize to a 0-100 scale
    const sizeScore = Math.min((totalStorageImpact / fieldCount) * 10, 100);
    return Math.round(sizeScore);
  }

  private calculateComplexityScore(breakdown: ComplexityBreakdown, fieldCount: number): number {
    const totalComplexity = 
      breakdown.textAnalysis +
      breakdown.nestedComplexity +
      breakdown.fieldCardinality +
      breakdown.indexingCost;
    
    // Factor in field limit warnings
    let penalty = 0;
    if (fieldCount > OpenSearchAnalyzer.MAX_FIELD_LIMIT * 0.8) penalty += 10;
    if (fieldCount > OpenSearchAnalyzer.MAX_FIELD_LIMIT * 0.9) penalty += 20;
    
    const complexityScore = Math.min((totalComplexity / fieldCount) * 8 + penalty, 100);
    return Math.round(complexityScore);
  }

  private generateRecommendations(fields: FieldAnalysis[]): string[] {
    const recommendations: string[] = [];
    
    if (fields.length > OpenSearchAnalyzer.MAX_FIELD_LIMIT * 0.8) {
      recommendations.push(`Document has ${fields.length} fields. Consider reducing to under ${OpenSearchAnalyzer.MAX_FIELD_LIMIT} to avoid mapping explosion.`);
    }

    const textFields = fields.filter(f => f.type === OpenSearchFieldType.TEXT);
    if (textFields.length > 20) {
      recommendations.push(`${textFields.length} text fields detected. Consider using keyword type for non-analyzed fields to improve performance.`);
    }

    const nestedFields = fields.filter(f => f.type === OpenSearchFieldType.NESTED);
    if (nestedFields.length > OpenSearchAnalyzer.MAX_NESTED_LIMIT * 0.5) {
      recommendations.push(`${nestedFields.length} nested fields detected. Consider flattening structure to reduce complexity.`);
    }

    const highCardinalityFields = fields.filter(f => f.characteristics.cardinality === 'high');
    if (highCardinalityFields.length > 0) {
      recommendations.push(`${highCardinalityFields.length} high-cardinality fields detected. These may consume significant memory.`);
    }

    if (recommendations.length === 0) {
      recommendations.push("Document structure looks well-optimized for OpenSearch indexing.");
    }

    return recommendations;
  }
}