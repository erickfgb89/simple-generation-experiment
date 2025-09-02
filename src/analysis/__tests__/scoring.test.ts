/**
 * Unit tests for the Enhanced Scoring System
 * 
 * Tests the advanced scoring engine that calculates:
 * - Query performance scores
 * - Indexing performance scores  
 * - Storage efficiency scores
 * - Maintenance cost scores
 * - Document type classification
 * - Performance metrics predictions
 */

import { describe, it, expect } from 'vitest';
import { calculateEnhancedScores, SCORING_CONFIGS } from '../scoring';
import type { FieldAnalysis } from '../../types';

describe('Enhanced Scoring System', () => {
  const createMockField = (
    path: string,
    type: any,
    depth: number = 0,
    isArray: boolean = false,
    complexity: number = 1.0
  ): FieldAnalysis => ({
    path,
    type,
    depth,
    isArray,
    complexity
  });

  describe('Query Performance Scoring', () => {
    it('gives high scores for keyword-only documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('id', 'keyword'),
        createMockField('status', 'keyword'),
        createMockField('category', 'keyword')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.queryPerformance).toBeGreaterThan(8);
      expect(result.explanations.queryPerformance.factors).toBeDefined();
      expect(result.explanations.queryPerformance.recommendations).toBeDefined();
    });

    it('gives lower scores for text-heavy documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('title', 'text'),
        createMockField('content', 'text'),
        createMockField('description', 'text'),
        createMockField('summary', 'text')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.queryPerformance).toBeLessThan(6);
      expect(result.explanations.queryPerformance.factors.some(f => 
        f.name === 'Text Fields'
      )).toBe(true);
    });

    it('penalizes nested fields heavily', () => {
      const withoutNested: FieldAnalysis[] = [
        createMockField('field1', 'keyword'),
        createMockField('field2', 'text')
      ];
      
      const withNested: FieldAnalysis[] = [
        createMockField('field1', 'keyword'),
        createMockField('nested', 'nested'),
        createMockField('nested.subfield', 'text', 1)
      ];
      
      const resultWithout = calculateEnhancedScores(withoutNested, 1.0);
      const resultWith = calculateEnhancedScores(withNested, 1.0);
      
      expect(resultWith.scores.queryPerformance).toBeLessThan(resultWithout.scores.queryPerformance);
      expect(resultWith.explanations.queryPerformance.factors.some(f => 
        f.name === 'Nested Objects'
      )).toBe(true);
    });

    it('applies depth penalties correctly', () => {
      const shallowFields: FieldAnalysis[] = [
        createMockField('field', 'keyword', 0)
      ];
      
      const deepFields: FieldAnalysis[] = [
        createMockField('deep.field', 'keyword', 5)
      ];
      
      const shallowResult = calculateEnhancedScores(shallowFields, 1.0);
      const deepResult = calculateEnhancedScores(deepFields, 1.0);
      
      expect(deepResult.scores.queryPerformance).toBeLessThan(shallowResult.scores.queryPerformance);
    });

    it('provides confidence intervals', () => {
      const fields: FieldAnalysis[] = [createMockField('field', 'text')];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.explanations.queryPerformance.confidenceInterval).toBeDefined();
      expect(result.explanations.queryPerformance.confidenceInterval.min).toBeGreaterThanOrEqual(0);
      expect(result.explanations.queryPerformance.confidenceInterval.max).toBeLessThanOrEqual(10);
      expect(result.explanations.queryPerformance.confidenceInterval.confidence).toBeGreaterThan(0);
    });
  });

  describe('Indexing Performance Scoring', () => {
    it('gives high scores for simple numeric documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('count', 'integer'),
        createMockField('price', 'double'),
        createMockField('active', 'boolean')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.indexingPerformance).toBeGreaterThan(8);
    });

    it('gives lower scores for analysis-heavy documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('title', 'text', 0, false, 3.0),
        createMockField('content', 'text', 0, false, 4.0),
        createMockField('tags', 'text', 0, true, 2.5)
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.indexingPerformance).toBeLessThan(6);
      expect(result.explanations.indexingPerformance.factors.some(f => 
        f.name === 'Text Analysis'
      )).toBe(true);
    });

    it('heavily penalizes nested documents', () => {
      const simple: FieldAnalysis[] = [
        createMockField('field', 'keyword')
      ];
      
      const nested: FieldAnalysis[] = [
        createMockField('nested', 'nested'),
        createMockField('nested.field', 'keyword', 1)
      ];
      
      const simpleResult = calculateEnhancedScores(simple, 1.0);
      const nestedResult = calculateEnhancedScores(nested, 1.0);
      
      expect(nestedResult.scores.indexingPerformance).toBeLessThan(simpleResult.scores.indexingPerformance);
      expect(nestedResult.explanations.indexingPerformance.factors.some(f => 
        f.name === 'Nested Document Creation'
      )).toBe(true);
    });

    it('considers field complexity in calculations', () => {
      const simpleField: FieldAnalysis[] = [
        createMockField('field', 'text', 0, false, 1.0)
      ];
      
      const complexField: FieldAnalysis[] = [
        createMockField('field', 'text', 0, false, 5.0)
      ];
      
      const simpleResult = calculateEnhancedScores(simpleField, 1.0);
      const complexResult = calculateEnhancedScores(complexField, 1.0);
      
      expect(complexResult.scores.indexingPerformance).toBeLessThan(simpleResult.scores.indexingPerformance);
    });
  });

  describe('Storage Efficiency Scoring', () => {
    it('gives high scores for optimized numeric fields', () => {
      const fields: FieldAnalysis[] = [
        createMockField('id', 'long'),
        createMockField('count', 'integer'),
        createMockField('flag', 'boolean'),
        createMockField('timestamp', 'date')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.storageEfficiency).toBeGreaterThan(7);
      expect(result.explanations.storageEfficiency.factors.some(f => 
        f.name === 'Numeric Optimization'
      )).toBe(true);
    });

    it('penalizes text-heavy documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('title', 'text'),
        createMockField('content', 'text'),
        createMockField('description', 'text')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.storageEfficiency).toBeLessThan(6);
      expect(result.explanations.storageEfficiency.factors.some(f => 
        f.name === 'Text Field Overhead'
      )).toBe(true);
    });

    it('heavily penalizes nested objects', () => {
      const flat: FieldAnalysis[] = [
        createMockField('field1', 'keyword'),
        createMockField('field2', 'keyword')
      ];
      
      const nested: FieldAnalysis[] = [
        createMockField('nested', 'nested'),
        createMockField('nested.field', 'keyword', 1)
      ];
      
      const flatResult = calculateEnhancedScores(flat, 1.0);
      const nestedResult = calculateEnhancedScores(nested, 1.0);
      
      expect(nestedResult.scores.storageEfficiency).toBeLessThan(flatResult.scores.storageEfficiency);
      expect(nestedResult.explanations.storageEfficiency.factors.some(f => 
        f.name === 'Nested Object Overhead'
      )).toBe(true);
    });

    it('considers storage size in recommendations', () => {
      const fields: FieldAnalysis[] = [createMockField('field', 'text')];
      
      const largeStorageResult = calculateEnhancedScores(fields, 2000); // 2GB
      
      expect(largeStorageResult.explanations.storageEfficiency.recommendations.some(r => 
        r.includes('Large storage')
      )).toBe(true);
    });
  });

  describe('Maintenance Cost Scoring', () => {
    it('gives low maintenance scores for simple documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('id', 'keyword'),
        createMockField('count', 'integer'),
        createMockField('active', 'boolean')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.maintenanceCost).toBeLessThan(3);
    });

    it('gives high maintenance scores for complex documents', () => {
      const fields: FieldAnalysis[] = [
        createMockField('searchText', 'text'),
        createMockField('content', 'text'),
        createMockField('nested', 'nested'),
        createMockField('deep.field', 'keyword', 5)
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.maintenanceCost).toBeGreaterThan(6);
      expect(result.explanations.maintenanceCost.factors.some(f => 
        f.name === 'Text Analysis Maintenance'
      )).toBe(true);
      expect(result.explanations.maintenanceCost.factors.some(f => 
        f.name === 'Nested Query Complexity'
      )).toBe(true);
    });

    it('considers field count in maintenance complexity', () => {
      const fewFields: FieldAnalysis[] = [
        createMockField('field1', 'text'),
        createMockField('field2', 'text')
      ];
      
      const manyFields: FieldAnalysis[] = Array.from({ length: 60 }, (_, i) => 
        createMockField(`field${i}`, 'text')
      );
      
      const fewResult = calculateEnhancedScores(fewFields, 1.0);
      const manyResult = calculateEnhancedScores(manyFields, 1.0);
      
      expect(manyResult.scores.maintenanceCost).toBeGreaterThan(fewResult.scores.maintenanceCost);
    });
  });

  describe('Overall Scoring and Weighting', () => {
    it('calculates weighted overall scores correctly', () => {
      const fields: FieldAnalysis[] = [
        createMockField('field', 'keyword')
      ];
      
      const generalResult = calculateEnhancedScores(fields, 1.0, SCORING_CONFIGS.general);
      const analyticsResult = calculateEnhancedScores(fields, 1.0, SCORING_CONFIGS.analytics);
      
      expect(generalResult.scores.overall).toBeDefined();
      expect(analyticsResult.scores.overall).toBeDefined();
      
      // Verify the weighting is applied
      const expectedGeneral = 
        generalResult.scores.queryPerformance * 0.3 +
        generalResult.scores.indexingPerformance * 0.25 +
        generalResult.scores.storageEfficiency * 0.25 +
        generalResult.scores.maintenanceCost * 0.2;
      
      expect(Math.abs(generalResult.scores.overall - expectedGeneral)).toBeLessThan(0.1);
    });

    it('uses different weighting for different use cases', () => {
      const fields: FieldAnalysis[] = [
        createMockField('text', 'text'),
        createMockField('nested', 'nested')
      ];
      
      const loggingConfig = SCORING_CONFIGS.logging; // Higher indexing weight
      const analyticsConfig = SCORING_CONFIGS.analytics; // Higher query weight
      
      const loggingResult = calculateEnhancedScores(fields, 1.0, loggingConfig);
      const analyticsResult = calculateEnhancedScores(fields, 1.0, analyticsConfig);
      
      expect(loggingConfig.weights.indexingPerformance).toBeGreaterThan(analyticsConfig.weights.indexingPerformance);
      expect(analyticsConfig.weights.queryPerformance).toBeGreaterThan(loggingConfig.weights.queryPerformance);
    });

    it('ensures all dimension scores are within valid range', () => {
      const fields: FieldAnalysis[] = [
        createMockField('extreme', 'nested', 10, true, 10.0)
      ];
      
      const result = calculateEnhancedScores(fields, 1000);
      
      expect(result.scores.queryPerformance).toBeGreaterThanOrEqual(0);
      expect(result.scores.queryPerformance).toBeLessThanOrEqual(10);
      expect(result.scores.indexingPerformance).toBeGreaterThanOrEqual(0);
      expect(result.scores.indexingPerformance).toBeLessThanOrEqual(10);
      expect(result.scores.storageEfficiency).toBeGreaterThanOrEqual(0);
      expect(result.scores.storageEfficiency).toBeLessThanOrEqual(10);
      expect(result.scores.maintenanceCost).toBeGreaterThanOrEqual(0);
      expect(result.scores.maintenanceCost).toBeLessThanOrEqual(10);
      expect(result.scores.overall).toBeGreaterThanOrEqual(0);
      expect(result.scores.overall).toBeLessThanOrEqual(10);
    });
  });

  describe('Document Type Classification', () => {
    it('classifies log entry patterns correctly', () => {
      const logFields: FieldAnalysis[] = [
        createMockField('timestamp', 'date'),
        createMockField('level', 'keyword'),
        createMockField('message', 'text'),
        createMockField('logger', 'keyword'),
        createMockField('thread', 'keyword'),
        createMockField('host', 'keyword')
      ];
      
      const result = calculateEnhancedScores(logFields, 1.0);
      
      expect(result.comparative.documentType).toBe('Log Entry');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.5);
    });

    it('classifies metrics patterns correctly', () => {
      const metricsFields: FieldAnalysis[] = [
        createMockField('metric', 'keyword'),
        createMockField('value', 'double'),
        createMockField('timestamp', 'date'),
        createMockField('tags.host', 'keyword', 1),
        createMockField('measurement', 'keyword'),
        createMockField('counter', 'long')
      ];
      
      const result = calculateEnhancedScores(metricsFields, 1.0);
      
      expect(result.comparative.documentType).toBe('Metrics');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.3);
    });

    it('classifies content documents correctly', () => {
      const contentFields: FieldAnalysis[] = [
        createMockField('title', 'text'),
        createMockField('content', 'text'),
        createMockField('body', 'text'),
        createMockField('description', 'text'),
        createMockField('author', 'keyword'),
        createMockField('created', 'date')
      ];
      
      const result = calculateEnhancedScores(contentFields, 1.0);
      
      expect(result.comparative.documentType).toBe('Content Document');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.4);
    });

    it('provides percentile ranks for document types', () => {
      const fields: FieldAnalysis[] = [
        createMockField('field', 'keyword')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.comparative.percentileRanks).toBeDefined();
      expect(result.comparative.percentileRanks.queryPerformance).toBeGreaterThanOrEqual(0);
      expect(result.comparative.percentileRanks.queryPerformance).toBeLessThanOrEqual(100);
    });

    it('provides typical ranges for comparison', () => {
      const fields: FieldAnalysis[] = [
        createMockField('field', 'keyword')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.comparative.typicalRanges).toBeDefined();
      expect(result.comparative.typicalRanges.queryPerformance).toBeDefined();
      expect(result.comparative.typicalRanges.queryPerformance.min).toBeLessThan(
        result.comparative.typicalRanges.queryPerformance.max
      );
    });
  });

  describe('Performance Metrics Predictions', () => {
    it('predicts memory usage based on field characteristics', () => {
      const fields: FieldAnalysis[] = [
        createMockField('text1', 'text'),
        createMockField('text2', 'text'),
        createMockField('nested', 'nested')
      ];
      
      const result = calculateEnhancedScores(fields, 100); // 100MB storage
      
      expect(result.performanceMetrics.memoryUsageMB.heap).toBeGreaterThan(0);
      expect(result.performanceMetrics.memoryUsageMB.offHeap).toBeGreaterThan(0);
      expect(result.performanceMetrics.memoryUsageMB.total).toBeGreaterThan(0);
      
      // Text fields and nested fields should increase memory usage
      expect(result.performanceMetrics.memoryUsageMB.total).toBeGreaterThan(15);
    });

    it('predicts CPU utilization correctly', () => {
      const heavyFields: FieldAnalysis[] = [
        createMockField('text1', 'text'),
        createMockField('text2', 'text'),
        createMockField('nested', 'nested')
      ];
      
      const lightFields: FieldAnalysis[] = [
        createMockField('id', 'keyword'),
        createMockField('count', 'integer')
      ];
      
      const heavyResult = calculateEnhancedScores(heavyFields, 1.0);
      const lightResult = calculateEnhancedScores(lightFields, 1.0);
      
      expect(heavyResult.performanceMetrics.cpuUtilization.indexing).toBeGreaterThan(
        lightResult.performanceMetrics.cpuUtilization.indexing
      );
      expect(heavyResult.performanceMetrics.cpuUtilization.query).toBeGreaterThan(
        lightResult.performanceMetrics.cpuUtilization.query
      );
    });

    it('predicts disk IO based on field complexity', () => {
      const fields: FieldAnalysis[] = [
        createMockField('field1', 'keyword'),
        createMockField('field2', 'text'),
        createMockField('nested', 'nested')
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.performanceMetrics.diskIO.readOps).toBeGreaterThan(100);
      expect(result.performanceMetrics.diskIO.writeOps).toBeGreaterThan(50);
      expect(result.performanceMetrics.diskIO.totalMBps).toBeGreaterThan(0);
    });

    it('predicts network bandwidth requirements', () => {
      const result = calculateEnhancedScores([createMockField('field', 'keyword')], 50);
      
      expect(result.performanceMetrics.networkBandwidth.ingestMBps).toBeGreaterThan(0);
      expect(result.performanceMetrics.networkBandwidth.queryMBps).toBeGreaterThan(0);
      expect(result.performanceMetrics.networkBandwidth.replicationMBps).toBeGreaterThan(0);
    });
  });

  describe('Scoring Configuration', () => {
    it('returns the configuration used for scoring', () => {
      const fields: FieldAnalysis[] = [createMockField('field', 'keyword')];
      const config = SCORING_CONFIGS.ecommerce;
      
      const result = calculateEnhancedScores(fields, 1.0, config);
      
      expect(result.scoringConfig).toEqual(config);
    });

    it('uses general config as default', () => {
      const fields: FieldAnalysis[] = [createMockField('field', 'keyword')];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scoringConfig).toEqual(SCORING_CONFIGS.general);
    });

    it('validates all predefined configs have correct structure', () => {
      Object.entries(SCORING_CONFIGS).forEach(([useCase, config]) => {
        expect(config.version).toBeDefined();
        expect(config.useCase).toBe(useCase);
        expect(config.weights).toBeDefined();
        expect(config.weights.queryPerformance).toBeGreaterThan(0);
        expect(config.weights.indexingPerformance).toBeGreaterThan(0);
        expect(config.weights.storageEfficiency).toBeGreaterThan(0);
        expect(config.weights.maintenanceCost).toBeGreaterThan(0);
        
        // Weights should sum to approximately 1.0
        const sum = Object.values(config.weights).reduce((acc, weight) => acc + weight, 0);
        expect(Math.abs(sum - 1.0)).toBeLessThan(0.01);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles empty field arrays gracefully', () => {
      const result = calculateEnhancedScores([], 0);
      
      expect(result.scores.overall).toBeDefined();
      expect(result.scores.queryPerformance).toBeDefined();
      expect(result.performanceMetrics).toBeDefined();
      expect(result.comparative).toBeDefined();
    });

    it('handles very large storage sizes', () => {
      const fields: FieldAnalysis[] = [createMockField('field', 'text')];
      
      const result = calculateEnhancedScores(fields, 1000000); // 1TB
      
      expect(result.performanceMetrics.memoryUsageMB.total).toBeGreaterThan(1000);
      expect(result.explanations.storageEfficiency.recommendations.some(r => 
        r.includes('Large storage')
      )).toBe(true);
    });

    it('handles extreme field complexity values', () => {
      const fields: FieldAnalysis[] = [
        createMockField('extreme', 'text', 0, false, 100.0)
      ];
      
      const result = calculateEnhancedScores(fields, 1.0);
      
      expect(result.scores.indexingPerformance).toBeGreaterThanOrEqual(0);
      expect(result.scores.indexingPerformance).toBeLessThanOrEqual(10);
    });

    it('maintains consistency across multiple runs', () => {
      const fields: FieldAnalysis[] = [
        createMockField('field1', 'text'),
        createMockField('field2', 'keyword'),
        createMockField('nested', 'nested', 2)
      ];
      
      const result1 = calculateEnhancedScores(fields, 10.0);
      const result2 = calculateEnhancedScores(fields, 10.0);
      
      expect(result1.scores.overall).toBe(result2.scores.overall);
      expect(result1.comparative.documentType).toBe(result2.comparative.documentType);
    });
  });
});