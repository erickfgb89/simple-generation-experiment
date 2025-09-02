/**
 * Unit tests for the OpenSearch Document Complexity Analyzer
 * 
 * Tests the core analysis engine functionality including:
 * - Field type detection accuracy
 * - Complexity scoring calculations
 * - Storage requirement estimations
 * - Warning and recommendation generation
 */

import { describe, it, expect } from 'vitest';
import { analyzeDocument } from '../analyzer';
import type { OpenSearchFieldType } from '../../types';

describe('OpenSearch Document Analyzer', () => {
  describe('Field Type Detection', () => {
    it('detects text fields correctly', () => {
      const document = {
        title: 'This is a long text field with multiple words',
        description: 'Another text field with detailed content'
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fieldTypes.text).toBe(2);
      expect(result.fields).toHaveLength(2);
      expect(result.fields[0].type).toBe('text');
      expect(result.fields[1].type).toBe('text');
    });

    it('detects keyword fields correctly', () => {
      const document = {
        id: 'user123',
        status: 'active',
        category: 'electronics'
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fieldTypes.keyword).toBe(3);
      expect(result.fields.every(field => field.type === 'keyword')).toBe(true);
    });

    it('detects numeric fields with correct types', () => {
      const document = {
        byteField: 127,
        shortField: 32000,
        intField: 2000000,
        longField: 9223372036854775807,
        floatField: 3.14,
        doubleField: 3.141592653589793
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fieldTypes.byte).toBe(1);
      expect(result.fieldTypes.short).toBe(1);
      expect(result.fieldTypes.integer).toBe(1);
      expect(result.fieldTypes.long).toBe(1);
      expect(result.fieldTypes.double).toBe(2); // Both floats become doubles
    });

    it('detects date fields with various formats', () => {
      const document = {
        iso8601: '2023-12-25T10:30:00.000Z',
        dateOnly: '2023-12-25',
        usFormat: '12/25/2023'
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fieldTypes.date).toBe(3);
      expect(result.fields.every(field => field.type === 'date')).toBe(true);
    });

    it('detects boolean fields correctly', () => {
      const document = {
        isActive: true,
        isVerified: false,
        hasPermissions: true
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fieldTypes.boolean).toBe(3);
      expect(result.fields.every(field => field.type === 'boolean')).toBe(true);
    });

    it('detects nested objects and calculates depth', () => {
      const document = {
        user: {
          profile: {
            personal: {
              name: 'John Doe',
              age: 30
            }
          }
        }
      };
      
      const result = analyzeDocument(document);
      
      expect(result.maxDepth).toBe(3);
      expect(result.fields).toHaveLength(2);
      expect(result.fields.some(field => field.depth === 3)).toBe(true);
    });

    it('detects array fields and nested arrays', () => {
      const document = {
        tags: ['tag1', 'tag2', 'tag3'],
        users: [
          { name: 'John', age: 30 },
          { name: 'Jane', age: 25 }
        ]
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fieldTypes.object).toBe(1); // tags array
      expect(result.fieldTypes.nested).toBe(1); // users array with objects
      expect(result.fields.some(field => field.isArray)).toBe(true);
    });
  });

  describe('Complexity Scoring', () => {
    it('calculates low complexity for simple documents', () => {
      const document = {
        id: '123',
        name: 'Test',
        count: 42,
        active: true
      };
      
      const result = analyzeDocument(document);
      
      expect(result.complexityScore).toBeLessThan(3);
      expect(result.scores.overall).toBeGreaterThan(7);
    });

    it('calculates high complexity for complex documents', () => {
      const document = {
        title: 'Complex document with lots of text analysis required',
        content: 'This is a very long text field that will require full tokenization and analysis',
        nested: {
          deep: {
            deeper: {
              deepest: {
                value: 'deeply nested content'
              }
            }
          }
        },
        arrayOfObjects: [
          { field1: 'value1', field2: 'value2' },
          { field1: 'value3', field2: 'value4' }
        ]
      };
      
      const result = analyzeDocument(document);
      
      expect(result.complexityScore).toBeGreaterThan(5);
      expect(result.scores.overall).toBeLessThan(6);
    });

    it('applies depth penalties correctly', () => {
      const shallowDoc = { a: { b: 'value' } };
      const deepDoc = { a: { b: { c: { d: { e: 'value' } } } } };
      
      const shallowResult = analyzeDocument(shallowDoc);
      const deepResult = analyzeDocument(deepDoc);
      
      expect(deepResult.complexityScore).toBeGreaterThan(shallowResult.complexityScore);
      expect(deepResult.scores.queryPerformance).toBeLessThan(shallowResult.scores.queryPerformance);
    });

    it('applies array size penalties correctly', () => {
      const smallArrayDoc = { tags: ['a', 'b', 'c'] };
      const largeArrayDoc = { tags: Array.from({ length: 1000 }, (_, i) => `tag${i}`) };
      
      const smallResult = analyzeDocument(smallArrayDoc);
      const largeResult = analyzeDocument(largeArrayDoc);
      
      expect(largeResult.complexityScore).toBeGreaterThan(smallResult.complexityScore);
    });
  });

  describe('Storage Estimation', () => {
    it('calculates storage overhead correctly', () => {
      const document = {
        textField: 'This is a text field that requires analysis',
        keywordField: 'keyword',
        numericField: 42,
        booleanField: true
      };
      
      const result = analyzeDocument(document);
      
      expect(result.estimatedStorageMB).toBeGreaterThan(0);
      expect(result.indexSizeScore).toBeDefined();
      expect(result.indexSizeScore).toBeGreaterThanOrEqual(0);
      expect(result.indexSizeScore).toBeLessThanOrEqual(10);
    });

    it('accounts for different field type storage multipliers', () => {
      const textDoc = { field: 'This is a long text field requiring analysis' };
      const keywordDoc = { field: 'keyword' };
      
      const textResult = analyzeDocument(textDoc);
      const keywordResult = analyzeDocument(keywordDoc);
      
      // Text fields should have higher storage overhead
      expect(textResult.estimatedStorageMB).toBeGreaterThan(keywordResult.estimatedStorageMB);
    });

    it('handles nested objects storage overhead', () => {
      const flatDoc = { a: 1, b: 2, c: 3 };
      const nestedDoc = { nested: [{ a: 1, b: 2 }, { a: 3, b: 4 }] };
      
      const flatResult = analyzeDocument(flatDoc);
      const nestedResult = analyzeDocument(nestedDoc);
      
      // Nested documents should have significantly higher storage overhead
      expect(nestedResult.estimatedStorageMB).toBeGreaterThan(flatResult.estimatedStorageMB);
    });
  });

  describe('Enhanced Scoring System', () => {
    it('provides query performance scores based on field types', () => {
      const fastQueryDoc = { id: '123', count: 42, active: true };
      const slowQueryDoc = { 
        content: 'Full text search content requiring tokenization',
        nested: [{ field: 'nested query complexity' }]
      };
      
      const fastResult = analyzeDocument(fastQueryDoc);
      const slowResult = analyzeDocument(slowQueryDoc);
      
      expect(fastResult.scores.queryPerformance).toBeGreaterThan(slowResult.scores.queryPerformance);
      expect(fastResult.explanations.queryPerformance.factors).toBeDefined();
    });

    it('provides indexing performance scores', () => {
      const fastIndexDoc = { id: '123', count: 42 };
      const slowIndexDoc = { 
        title: 'Text requiring analysis',
        content: 'More text requiring analysis',
        nested: [{ analyzed: 'nested text analysis' }]
      };
      
      const fastResult = analyzeDocument(fastIndexDoc);
      const slowResult = analyzeDocument(slowIndexDoc);
      
      expect(fastResult.scores.indexingPerformance).toBeGreaterThan(slowResult.scores.indexingPerformance);
      expect(fastResult.explanations.indexingPerformance.factors).toBeDefined();
    });

    it('provides storage efficiency scores', () => {
      const efficientDoc = { id: '123', count: 42, price: 99.99 };
      const inefficientDoc = {
        text1: 'Large text field requiring storage',
        text2: 'Another large text field',
        nested: [{ more: 'nested storage overhead' }]
      };
      
      const efficientResult = analyzeDocument(efficientDoc);
      const inefficientResult = analyzeDocument(inefficientDoc);
      
      expect(efficientResult.scores.storageEfficiency).toBeGreaterThan(inefficientResult.scores.storageEfficiency);
    });

    it('provides maintenance cost scores', () => {
      const simpleDoc = { id: '123', count: 42 };
      const complexDoc = {
        searchText: 'Requires analyzer maintenance',
        nestedData: [{ complex: 'query tuning required' }],
        deepNesting: { level1: { level2: { level3: 'maintenance complexity' } } }
      };
      
      const simpleResult = analyzeDocument(simpleDoc);
      const complexResult = analyzeDocument(complexDoc);
      
      expect(simpleResult.scores.maintenanceCost).toBeLessThan(complexResult.scores.maintenanceCost);
    });

    it('calculates weighted overall scores correctly', () => {
      const document = { id: '123', name: 'test' };
      
      const generalResult = analyzeDocument(document, 'general');
      const analyticsResult = analyzeDocument(document, 'analytics');
      const loggingResult = analyzeDocument(document, 'logging');
      
      expect(generalResult.scores.overall).toBeDefined();
      expect(analyticsResult.scores.overall).toBeDefined();
      expect(loggingResult.scores.overall).toBeDefined();
      
      // Different use cases should potentially have different overall scores
      // due to different weighting
      expect(generalResult.scoringConfig.useCase).toBe('general');
      expect(analyticsResult.scoringConfig.useCase).toBe('analytics');
      expect(loggingResult.scoringConfig.useCase).toBe('logging');
    });
  });

  describe('Performance Metrics', () => {
    it('provides memory usage predictions', () => {
      const document = {
        title: 'Test document',
        content: 'Some content for analysis',
        metadata: { created: '2023-01-01', author: 'test' }
      };
      
      const result = analyzeDocument(document);
      
      expect(result.performanceMetrics.memoryUsageMB.heap).toBeGreaterThan(0);
      expect(result.performanceMetrics.memoryUsageMB.offHeap).toBeGreaterThan(0);
      expect(result.performanceMetrics.memoryUsageMB.total).toBeGreaterThan(0);
    });

    it('provides CPU utilization predictions', () => {
      const document = {
        analyzedField: 'Text requiring CPU for analysis',
        nestedData: [{ field: 'more processing' }]
      };
      
      const result = analyzeDocument(document);
      
      expect(result.performanceMetrics.cpuUtilization.indexing).toBeGreaterThan(0);
      expect(result.performanceMetrics.cpuUtilization.query).toBeGreaterThan(0);
      expect(result.performanceMetrics.cpuUtilization.maintenance).toBeGreaterThan(0);
    });

    it('provides disk IO predictions', () => {
      const document = { field: 'test' };
      
      const result = analyzeDocument(document);
      
      expect(result.performanceMetrics.diskIO.readOps).toBeGreaterThan(0);
      expect(result.performanceMetrics.diskIO.writeOps).toBeGreaterThan(0);
      expect(result.performanceMetrics.diskIO.totalMBps).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Document Classification', () => {
    it('classifies log entries correctly', () => {
      const logDocument = {
        timestamp: '2023-01-01T12:00:00Z',
        level: 'INFO',
        message: 'This is a log message',
        logger: 'com.example.service',
        thread: 'main',
        host: 'server-01'
      };
      
      const result = analyzeDocument(logDocument);
      
      expect(result.comparative.documentType).toBe('Log Entry');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.5);
    });

    it('classifies user profiles correctly', () => {
      const userDocument = {
        user: 'john.doe',
        profile: {
          name: 'John Doe',
          email: 'john@example.com',
          created: '2023-01-01T00:00:00Z',
          updated: '2023-12-01T00:00:00Z'
        }
      };
      
      const result = analyzeDocument(userDocument);
      
      expect(result.comparative.documentType).toBe('User Profile');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.3);
    });

    it('classifies metrics correctly', () => {
      const metricsDocument = {
        metric: 'cpu.utilization',
        value: 75.5,
        timestamp: '2023-01-01T12:00:00Z',
        tags: { host: 'server-01', env: 'prod' },
        measurement: 'gauge'
      };
      
      const result = analyzeDocument(metricsDocument);
      
      expect(result.comparative.documentType).toBe('Metrics');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.3);
    });
  });

  describe('Warnings and Recommendations', () => {
    it('generates warnings for high field counts', () => {
      const document = Object.fromEntries(
        Array.from({ length: 1200 }, (_, i) => [`field${i}`, `value${i}`])
      );
      
      const result = analyzeDocument(document);
      
      expect(result.warnings.some(warning => 
        warning.includes('field count') && warning.includes('1200')
      )).toBe(true);
    });

    it('generates warnings for deep nesting', () => {
      const document = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  level6: {
                    deepValue: 'too deep'
                  }
                }
              }
            }
          }
        }
      };
      
      const result = analyzeDocument(document);
      
      expect(result.warnings.some(warning => warning.includes('Deep nesting'))).toBe(true);
    });

    it('generates warnings for many text fields', () => {
      const document = Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`textField${i}`, `This is text field number ${i} with analysis required`])
      );
      
      const result = analyzeDocument(document);
      
      expect(result.warnings.some(warning => warning.includes('text fields'))).toBe(true);
    });

    it('generates optimization recommendations', () => {
      const document = {
        text1: 'Some analyzed text',
        text2: 'More analyzed text',
        text3: 'Even more analyzed text',
        nested: [{ field: 'nested complexity' }]
      };
      
      const result = analyzeDocument(document);
      
      expect(result.optimizations.length).toBeGreaterThan(0);
      expect(result.optimizations.some(opt => 
        opt.includes('keyword') || opt.includes('flatten') || opt.includes('nested')
      )).toBe(true);
    });

    it('provides enhanced scoring recommendations', () => {
      const complexDocument = {
        searchableText: 'Text requiring analysis and tokenization',
        nestedObjects: [
          { field1: 'value1', field2: 'value2' },
          { field1: 'value3', field2: 'value4' }
        ],
        deepStructure: {
          level1: { level2: { level3: { value: 'deep' } } }
        }
      };
      
      const result = analyzeDocument(complexDocument);
      
      // Check that enhanced scoring provides specific recommendations
      const allRecommendations = [
        ...result.explanations.queryPerformance.recommendations,
        ...result.explanations.indexingPerformance.recommendations,
        ...result.explanations.storageEfficiency.recommendations,
        ...result.explanations.maintenanceCost.recommendations
      ];
      
      expect(allRecommendations.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty documents', () => {
      const result = analyzeDocument({});
      
      expect(result.fieldCount).toBe(0);
      expect(result.scores.overall).toBeDefined();
      expect(result.warnings).toBeDefined();
    });

    it('handles null and undefined values', () => {
      const document = {
        nullField: null,
        undefinedField: undefined,
        validField: 'value'
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fields.length).toBeGreaterThan(0);
      // Null and undefined should be treated as keyword fields
      expect(result.fieldTypes.keyword).toBeGreaterThanOrEqual(2);
    });

    it('handles very large numbers', () => {
      const document = {
        smallInt: 1,
        largeInt: Number.MAX_SAFE_INTEGER,
        largeFloat: 1.7976931348623157e+308
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fields).toHaveLength(3);
      expect(result.fieldTypes.long).toBeGreaterThanOrEqual(1);
      expect(result.fieldTypes.double).toBeGreaterThanOrEqual(1);
    });

    it('handles arrays with mixed types', () => {
      const document = {
        mixedArray: [1, 'string', true, { nested: 'object' }]
      };
      
      const result = analyzeDocument(document);
      
      expect(result.fields.length).toBeGreaterThan(0);
      // Mixed arrays are challenging - should be detected as object or nested
      expect(result.fieldTypes.object + result.fieldTypes.nested).toBeGreaterThanOrEqual(1);
    });

    it('handles circular references gracefully', () => {
      const document: any = { name: 'test' };
      document.self = document;
      
      // This should not throw an error or cause infinite recursion
      expect(() => analyzeDocument(document)).not.toThrow();
    });
  });

  describe('Performance Characteristics', () => {
    it('completes analysis in reasonable time for small documents', () => {
      const document = { field1: 'value1', field2: 42, field3: true };
      const start = performance.now();
      
      const result = analyzeDocument(document);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(50); // Should complete in under 50ms
      expect(result).toBeDefined();
    });

    it('handles moderately complex documents efficiently', () => {
      const complexDoc = {
        metadata: {
          created: '2023-01-01T00:00:00Z',
          author: { name: 'John Doe', id: 123 },
          tags: ['tag1', 'tag2', 'tag3']
        },
        content: {
          title: 'Complex Document Analysis',
          body: 'This is a longer text field that will require analysis',
          sections: [
            { heading: 'Section 1', content: 'Content for section 1' },
            { heading: 'Section 2', content: 'Content for section 2' }
          ]
        },
        analytics: {
          views: 1500,
          likes: 42,
          shares: 8,
          comments: [
            { author: 'user1', text: 'Great article!' },
            { author: 'user2', text: 'Very informative.' }
          ]
        }
      };
      
      const start = performance.now();
      const result = analyzeDocument(complexDoc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(100); // Should complete in under 100ms
      expect(result.fieldCount).toBeGreaterThan(10);
      expect(result.scores.overall).toBeDefined();
    });
  });
});