// Core type definitions for the OpenSearch Document Complexity Analyzer
// This file will be expanded in future milestones

export interface AnalysisResult {
  indexSizeScore: number;
  complexityScore: number;
  fieldCount: number;
  estimatedSize: number;
}

export interface DocumentField {
  path: string;
  type: string;
  value: unknown;
}

export interface AnalysisError {
  message: string;
  field?: string;
  line?: number;
}
