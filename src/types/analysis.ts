/**
 * TypeScript definitions for the OpenSearch Document Complexity Analyzer
 * 
 * This file contains all type definitions for the analysis engine that replicates
 * OpenSearch's field detection and complexity scoring algorithms.
 */

/**
 * OpenSearch field types based on dynamic mapping behavior
 */
export enum FieldType {
  TEXT = 'text',
  KEYWORD = 'keyword', 
  LONG = 'long',
  INTEGER = 'integer',
  SHORT = 'short',
  BYTE = 'byte',
  DOUBLE = 'double',
  FLOAT = 'float',
  HALF_FLOAT = 'half_float',
  SCALED_FLOAT = 'scaled_float',
  DATE = 'date',
  DATE_NANOS = 'date_nanos',
  BOOLEAN = 'boolean',
  BINARY = 'binary',
  INTEGER_RANGE = 'integer_range',
  FLOAT_RANGE = 'float_range',
  LONG_RANGE = 'long_range',
  DOUBLE_RANGE = 'double_range',
  DATE_RANGE = 'date_range',
  IP = 'ip',
  VERSION = 'version',
  MURMUR3 = 'murmur3',
  TOKEN_COUNT = 'token_count',
  PERCOLATOR = 'percolator',
  JOIN = 'join',
  RANK_FEATURE = 'rank_feature',
  RANK_FEATURES = 'rank_features',
  GEO_POINT = 'geo_point',
  GEO_SHAPE = 'geo_shape',
  COMPLETION = 'completion',
  NESTED = 'nested',
  OBJECT = 'object',
  FLATTENED = 'flattened'
}

/**
 * Field type weights for complexity calculation based on OpenSearch behavior
 */
export const FIELD_TYPE_WEIGHTS: Record<FieldType, number> = {
  [FieldType.TEXT]: 1.0,           // Highest complexity due to tokenization
  [FieldType.KEYWORD]: 0.1,        // Minimal complexity, exact matching
  [FieldType.NESTED]: 2.0,         // Very high due to separate document creation
  [FieldType.OBJECT]: 0.3,         // Moderate flattening complexity
  [FieldType.LONG]: 0.1,           // Low complexity, optimized storage
  [FieldType.INTEGER]: 0.1,        // Low complexity, optimized storage
  [FieldType.SHORT]: 0.05,         // Very low complexity
  [FieldType.BYTE]: 0.05,          // Very low complexity
  [FieldType.DOUBLE]: 0.1,         // Low complexity
  [FieldType.FLOAT]: 0.1,          // Low complexity
  [FieldType.HALF_FLOAT]: 0.05,    // Very low complexity
  [FieldType.SCALED_FLOAT]: 0.1,   // Low complexity
  [FieldType.DATE]: 0.15,          // Low complexity with parsing overhead
  [FieldType.DATE_NANOS]: 0.2,     // Slightly higher than regular date
  [FieldType.BOOLEAN]: 0.05,       // Minimal complexity
  [FieldType.BINARY]: 0.3,         // Moderate complexity
  [FieldType.INTEGER_RANGE]: 0.2,  // Range fields have moderate complexity
  [FieldType.FLOAT_RANGE]: 0.2,
  [FieldType.LONG_RANGE]: 0.2,
  [FieldType.DOUBLE_RANGE]: 0.2,
  [FieldType.DATE_RANGE]: 0.25,
  [FieldType.IP]: 0.1,             // Low complexity
  [FieldType.VERSION]: 0.1,        // Low complexity
  [FieldType.MURMUR3]: 0.1,        // Low complexity hash
  [FieldType.TOKEN_COUNT]: 0.2,    // Moderate complexity
  [FieldType.PERCOLATOR]: 0.8,     // High complexity query storage
  [FieldType.JOIN]: 0.6,           // High complexity relationship
  [FieldType.RANK_FEATURE]: 0.2,   // Moderate complexity
  [FieldType.RANK_FEATURES]: 0.3,  // Moderate complexity
  [FieldType.GEO_POINT]: 0.3,      // Moderate complexity spatial data
  [FieldType.GEO_SHAPE]: 0.5,      // Higher complexity spatial data
  [FieldType.COMPLETION]: 0.4,     // Moderate complexity suggest
  [FieldType.FLATTENED]: 0.2       // Moderate complexity flattened object
};

/**
 * Configuration for nesting complexity penalties
 */
export interface NestingConfig {
  /** Multiplier applied per nesting level */
  depthMultiplier: number;
  /** Maximum allowed nesting depth before warning */
  maxDepth: number;
  /** Penalty applied for exceeding recommended depth */
  excessDepthPenalty: number;
}

/**
 * Default nesting configuration based on OpenSearch limits
 */
export const DEFAULT_NESTING_CONFIG: NestingConfig = {
  depthMultiplier: 1.5,
  maxDepth: 10,
  excessDepthPenalty: 2.0
};

/**
 * Array complexity configuration
 */
export interface ArrayConfig {
  /** Base multiplier for array fields */
  baseMultiplier: number;
  /** Size threshold for large array penalty */
  sizeThreshold: number;
  /** Penalty for large arrays */
  largeSizePenalty: number;
}

/**
 * Default array configuration
 */
export const DEFAULT_ARRAY_CONFIG: ArrayConfig = {
  baseMultiplier: 0.5,
  sizeThreshold: 1000,
  largeSizePenalty: 1.8
};

/**
 * Detected field information
 */
export interface DetectedField {
  /** Field path in dot notation (e.g., "user.address.street") */
  path: string;
  /** Detected OpenSearch field type */
  type: FieldType;
  /** Original JSON value */
  value: unknown;
  /** Nesting depth (0 for root level) */
  depth: number;
  /** Whether field is part of an array */
  isArray: boolean;
  /** Array size if applicable */
  arraySize?: number | undefined;
  /** Multi-field mapping if applicable (e.g., text with keyword sub-field) */
  multiFields?: FieldType[] | undefined;
  /** Complexity score for this field */
  complexityScore: number;
  /** Storage overhead multiplier */
  storageMultiplier: number;
}

/**
 * Document structure analysis result
 */
export interface DocumentStructure {
  /** Total number of fields detected */
  fieldCount: number;
  /** Maximum nesting depth found */
  maxDepth: number;
  /** Number of nested objects */
  nestedObjectCount: number;
  /** Number of array fields */
  arrayFieldCount: number;
  /** Number of text fields (high complexity) */
  textFieldCount: number;
  /** Total document size in bytes */
  documentSize: number;
  /** All detected fields */
  fields: DetectedField[];
}

/**
 * Complexity calculation breakdown
 */
export interface ComplexityBreakdown {
  /** Base complexity score */
  baseScore: number;
  /** Penalty from nesting depth */
  nestingPenalty: number;
  /** Penalty from array complexity */
  arrayPenalty: number;
  /** Penalty from text field analysis */
  textAnalysisPenalty: number;
  /** Final total complexity score */
  totalScore: number;
  /** Complexity category classification */
  category: ComplexityCategory;
  /** Human-readable explanation */
  explanation: string[];
}

/**
 * Complexity categories for user understanding
 */
export enum ComplexityCategory {
  LOW = 'low',
  MODERATE = 'moderate', 
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  EXTREME = 'extreme'
}

/**
 * Storage estimation breakdown
 */
export interface StorageEstimation {
  /** Original document size in bytes */
  sourceSize: number;
  /** Estimated index size without replicas */
  indexSize: number;
  /** Total storage with replicas and overhead */
  totalStorage: number;
  /** Storage overhead percentage */
  overheadPercentage: number;
  /** Breakdown by field type */
  fieldTypeBreakdown: Record<FieldType, number>;
  /** OpenSearch storage formula components */
  formula: StorageFormulaComponents;
}

/**
 * OpenSearch storage formula components
 */
export interface StorageFormulaComponents {
  /** Number of replica shards */
  replicas: number;
  /** Indexing overhead multiplier (default: 1.1) */
  indexingOverhead: number;
  /** Reserved space ratio (default: 0.05) */
  reservedSpace: number;
  /** System overhead ratio (default: 0.1) */
  systemOverhead: number;
}

/**
 * Complete document analysis result
 */
export interface AnalysisResult {
  /** Document structure analysis */
  structure: DocumentStructure;
  /** Complexity calculation and breakdown */
  complexity: ComplexityBreakdown;
  /** Storage size estimation */
  storage: StorageEstimation;
  /** Analysis timestamp */
  timestamp: Date;
  /** Any warnings or recommendations */
  warnings: AnalysisWarning[];
  /** Performance metrics for the analysis */
  performance: AnalysisPerformance;
}

/**
 * Analysis warnings and recommendations
 */
export interface AnalysisWarning {
  /** Warning severity level */
  level: 'info' | 'warning' | 'error';
  /** Warning message */
  message: string;
  /** Field path if applicable */
  fieldPath?: string;
  /** Recommended action */
  recommendation?: string;
}

/**
 * Performance metrics for analysis operation
 */
export interface AnalysisPerformance {
  /** Analysis duration in milliseconds */
  duration: number;
  /** Number of fields processed */
  fieldsProcessed: number;
  /** Document size processed */
  documentSize: number;
  /** Memory usage during analysis */
  memoryUsage?: number | undefined;
}

/**
 * Configuration for field detection rules
 */
export interface FieldDetectionConfig {
  /** Custom date patterns to recognize */
  datePatterns: RegExp[];
  /** Whether to enable numeric coercion */
  numericCoercion: boolean;
  /** Whether to detect IP addresses */
  detectIpAddresses: boolean;
  /** Whether to detect version strings */
  detectVersions: boolean;
  /** Custom field type mappings */
  customMappings: Record<string, FieldType>;
  /** Maximum field count before warning */
  maxFieldCount: number;
}

/**
 * Default field detection configuration
 */
export const DEFAULT_FIELD_DETECTION_CONFIG: FieldDetectionConfig = {
  datePatterns: [
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO 8601
    /^\d{4}-\d{2}-\d{2}/, // Date only
    /^\d{2}\/\d{2}\/\d{4}/, // US format
    /^\d{10}$/, // Unix timestamp (seconds)
    /^\d{13}$/, // Unix timestamp (milliseconds)
  ],
  numericCoercion: true,
  detectIpAddresses: true,
  detectVersions: true,
  customMappings: {},
  maxFieldCount: 1000
};

/**
 * Analysis engine configuration
 */
export interface AnalysisConfig {
  /** Field detection configuration */
  fieldDetection: FieldDetectionConfig;
  /** Nesting complexity configuration */
  nesting: NestingConfig;
  /** Array complexity configuration */
  arrays: ArrayConfig;
  /** Storage formula configuration */
  storageFormula: StorageFormulaComponents;
  /** Enable performance monitoring */
  enablePerformanceMonitoring: boolean;
}

/**
 * Default analysis configuration
 */
export const DEFAULT_ANALYSIS_CONFIG: AnalysisConfig = {
  fieldDetection: DEFAULT_FIELD_DETECTION_CONFIG,
  nesting: DEFAULT_NESTING_CONFIG,
  arrays: DEFAULT_ARRAY_CONFIG,
  storageFormula: {
    replicas: 1,
    indexingOverhead: 1.1,
    reservedSpace: 0.05,
    systemOverhead: 0.1
  },
  enablePerformanceMonitoring: true
};

/**
 * Error types for analysis operations
 */
export class AnalysisError extends Error {
  public override name = 'AnalysisError';
  public override readonly cause?: Error | undefined;
  public readonly code: string;
  public readonly fieldPath?: string | undefined;

  constructor(
    message: string,
    code: string,
    fieldPath?: string | undefined,
    cause?: Error | undefined
  ) {
    super(message);
    this.code = code;
    this.fieldPath = fieldPath ?? undefined;
    this.cause = cause ?? undefined;
  }
}

/**
 * Validation error for invalid JSON documents
 */
export class DocumentValidationError extends AnalysisError {
  public override name = 'DocumentValidationError';
  
  constructor(message: string, fieldPath?: string, cause?: Error) {
    super(message, 'DOCUMENT_VALIDATION_ERROR', fieldPath, cause);
  }
}

/**
 * Performance error when analysis takes too long or uses too much memory
 */
export class PerformanceError extends AnalysisError {
  public override name = 'PerformanceError';
  
  constructor(message: string, cause?: Error) {
    super(message, 'PERFORMANCE_ERROR', undefined, cause);
  }
}