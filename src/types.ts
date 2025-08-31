// Core OpenSearch field types
export type OpenSearchFieldType = 
  | 'text' | 'keyword' | 'long' | 'integer' | 'short' | 'byte' 
  | 'double' | 'float' | 'date' | 'boolean' | 'object' | 'nested';

// Analysis result structure
export interface AnalysisResult {
  // Main scores
  indexSizeScore: number;      // 0-10 scale for storage requirements
  complexityScore: number;     // 0-10 scale for processing complexity
  
  // Detailed breakdown
  fieldCount: number;
  estimatedStorageMB: number;
  fieldTypes: Record<OpenSearchFieldType, number>;
  maxDepth: number;
  
  // Recommendations
  warnings: string[];
  optimizations: string[];
}

// Field analysis details
export interface FieldAnalysis {
  path: string;
  type: OpenSearchFieldType;
  isArray: boolean;
  depth: number;
  complexity: number;
}