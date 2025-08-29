export interface FieldAnalysis {
  path: string;
  type: OpenSearchFieldType;
  value: any;
  complexity: number;
  storageImpact: number;
  characteristics: FieldCharacteristics;
}

export interface FieldCharacteristics {
  isAnalyzed: boolean;
  isStored: boolean;
  hasDocValues: boolean;
  cardinality: 'low' | 'medium' | 'high';
  size: number;
}

export interface DocumentAnalysis {
  totalFields: number;
  fieldsByType: Record<OpenSearchFieldType, number>;
  complexityBreakdown: ComplexityBreakdown;
  fieldAnalyses: FieldAnalysis[];
  indexSizeScore: number;
  complexityScore: number;
  recommendations: string[];
}

export interface ComplexityBreakdown {
  textAnalysis: number;
  nestedComplexity: number;
  fieldCardinality: number;
  storageOverhead: number;
  indexingCost: number;
}

export enum OpenSearchFieldType {
  TEXT = 'text',
  KEYWORD = 'keyword',
  LONG = 'long',
  INTEGER = 'integer',
  DOUBLE = 'double',
  FLOAT = 'float',
  DATE = 'date',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  NESTED = 'nested',
  GEO_POINT = 'geo_point',
  IP = 'ip',
  BINARY = 'binary'
}

export interface VisualizationData {
  fieldTypeDistribution: { type: string; count: number; color: string }[];
  complexityBreakdown: { category: string; value: number; color: string }[];
}