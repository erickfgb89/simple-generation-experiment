// Core OpenSearch field types
export type OpenSearchFieldType = 
  | 'text' | 'keyword' | 'long' | 'integer' | 'short' | 'byte' 
  | 'double' | 'float' | 'date' | 'boolean' | 'object' | 'nested';

// Document classification categories
export type DocumentType = 
  | 'Log Entry' | 'User Profile' | 'Product Catalog' | 'Event Data' 
  | 'Configuration' | 'Metrics' | 'Content Document' | 'Sensor Data' | 'Unknown';

// Score explanation breakdown
export interface ScoreBreakdown {
  factors: { name: string; impact: number; explanation: string; }[];
  fieldImpacts: { path: string; contribution: number; reason: string; }[];
  recommendations: string[];
  confidenceInterval: { min: number; max: number; confidence: number; };
}

// Advanced performance metrics
export interface PerformanceMetrics {
  memoryUsageMB: { heap: number; offHeap: number; total: number; };
  cpuUtilization: { indexing: number; query: number; maintenance: number; };
  diskIO: { readOps: number; writeOps: number; totalMBps: number; };
  networkBandwidth: { ingestMBps: number; queryMBps: number; replicationMBps: number; };
}

// Comparative analysis data
export interface ComparativeAnalysis {
  documentType: DocumentType;
  typeConfidence: number;
  percentileRanks: {
    queryPerformance: number;
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

// Enhanced scoring system configuration
export interface ScoringConfig {
  version: string;
  weights: {
    queryPerformance: number;
    indexingPerformance: number;
    storageEfficiency: number;
    maintenanceCost: number;
  };
  useCase: 'general' | 'analytics' | 'logging' | 'ecommerce' | 'monitoring';
}

// Enhanced analysis result structure
export interface AnalysisResult {
  // Legacy scores (maintained for backward compatibility)
  indexSizeScore: number;      // 0-10 scale for storage requirements
  complexityScore: number;     // 0-10 scale for processing complexity
  
  // Enhanced scoring dimensions
  scores: {
    queryPerformance: number;      // 0-10 scale (higher = better query speed)
    indexingPerformance: number;   // 0-10 scale (higher = faster indexing)
    storageEfficiency: number;     // 0-10 scale (higher = better storage utilization)
    maintenanceCost: number;       // 0-10 scale (higher = more maintenance overhead)
    overall: number;               // 0-10 weighted composite score
  };
  
  // Score explanations
  explanations: {
    queryPerformance: ScoreBreakdown;
    indexingPerformance: ScoreBreakdown;
    storageEfficiency: ScoreBreakdown;
    maintenanceCost: ScoreBreakdown;
  };
  
  // Advanced metrics
  performanceMetrics: PerformanceMetrics;
  
  // Comparative analysis
  comparative: ComparativeAnalysis;
  
  // Detailed breakdown (existing)
  fieldCount: number;
  estimatedStorageMB: number;
  fieldTypes: Record<OpenSearchFieldType, number>;
  maxDepth: number;
  
  // Field-level analysis
  fields: FieldAnalysis[];
  
  // Configuration used for scoring
  scoringConfig: ScoringConfig;
  
  // Recommendations (existing)
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