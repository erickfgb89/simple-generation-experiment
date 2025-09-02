/**
 * Performance benchmarks and load testing
 * 
 * Tests performance characteristics under various conditions:
 * - Document size scaling
 * - Complexity scaling
 * - Memory usage patterns
 * - CPU utilization
 * - Concurrent analysis scenarios
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { analyzeDocument } from '../../analysis/analyzer';
import type { AnalysisResult } from '../../types';

describe('Performance Benchmarks', () => {
  let performanceEntries: PerformanceEntry[] = [];
  
  beforeEach(() => {
    // Clear performance entries
    performance.clearMarks();
    performance.clearMeasures();
    performanceEntries = [];
  });

  afterEach(() => {
    // Cleanup performance monitoring
    performance.clearMarks();
    performance.clearMeasures();
  });

  const measurePerformance = async <T>(
    name: string, 
    fn: () => T | Promise<T>
  ): Promise<{ result: T; duration: number; memory?: number }> => {
    // Start performance measurement
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;
    const measureName = `${name}-duration`;
    
    performance.mark(startMark);
    
    // Measure memory before (if available)
    const memoryBefore = (performance as any).memory?.usedJSHeapSize;
    
    const result = await fn();
    
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0] as PerformanceMeasure;
    const duration = measure.duration;
    
    // Measure memory after (if available)
    const memoryAfter = (performance as any).memory?.usedJSHeapSize;
    const memoryDelta = memoryBefore && memoryAfter ? memoryAfter - memoryBefore : undefined;
    
    return { result, duration, memory: memoryDelta };
  };

  describe('Document Size Scaling', () => {
    const generateDocument = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
      const configs = {
        small: { fields: 10, depth: 2, arraySize: 5 },
        medium: { fields: 50, depth: 3, arraySize: 20 },
        large: { fields: 200, depth: 4, arraySize: 100 },
        xlarge: { fields: 1000, depth: 5, arraySize: 500 }
      };
      
      const config = configs[size];
      
      const generateNestedObject = (depth: number, fieldCount: number): any => {
        if (depth === 0) {
          return `Value at depth ${depth}`;
        }
        
        const obj: any = {};
        for (let i = 0; i < Math.min(fieldCount, 10); i++) {
          obj[`field_${i}`] = generateNestedObject(depth - 1, Math.floor(fieldCount / 2));
          obj[`text_${i}`] = `Text content for field ${i} with analysis requirements`;
          obj[`number_${i}`] = i * 42;
          obj[`bool_${i}`] = i % 2 === 0;
          
          if (i < 3) {
            obj[`array_${i}`] = Array.from({ length: config.arraySize }, (_, j) => ({
              id: j,
              name: `Array item ${j}`,
              value: j * 10
            }));
          }
        }
        return obj;
      };
      
      return generateNestedObject(config.depth, config.fields);
    };

    it('scales linearly with document size', async () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
      const results: Array<{ size: string; duration: number; fieldCount: number }> = [];
      
      for (const size of sizes) {
        const document = generateDocument(size);
        
        const { result, duration } = await measurePerformance(`analyze-${size}`, () => 
          analyzeDocument(document)
        );
        
        results.push({
          size,
          duration,
          fieldCount: result.fieldCount
        });
        
        expect(result).toBeDefined();
        expect(result.fieldCount).toBeGreaterThan(0);
        expect(duration).toBeLessThan(5000); // Max 5 seconds
      }
      
      // Performance should scale reasonably
      const smallResult = results.find(r => r.size === 'small')!;
      const mediumResult = results.find(r => r.size === 'medium')!;
      const largeResult = results.find(r => r.size === 'large')!;
      
      // Larger documents should not be exponentially slower
      const smallRatio = smallResult.duration / smallResult.fieldCount;
      const largeRatio = largeResult.duration / largeResult.fieldCount;
      
      // Should not degrade more than 10x per field
      expect(largeRatio).toBeLessThan(smallRatio * 10);
      
      console.log('Document Size Scaling Results:');
      results.forEach(r => {
        console.log(`${r.size}: ${r.fieldCount} fields, ${r.duration.toFixed(2)}ms`);
      });
    });

    it('handles very large documents efficiently', async () => {
      const largeDoc = generateDocument('xlarge');
      
      const { result, duration, memory } = await measurePerformance('analyze-xlarge', () =>
        analyzeDocument(largeDoc)
      );
      
      expect(result).toBeDefined();
      expect(result.fieldCount).toBeGreaterThan(100);
      expect(duration).toBeLessThan(15000); // Max 15 seconds for very large docs
      
      // Memory usage should be reasonable
      if (memory !== undefined) {
        expect(memory).toBeLessThan(100 * 1024 * 1024); // Max 100MB
      }
      
      console.log(`XLarge Document: ${result.fieldCount} fields, ${duration.toFixed(2)}ms`);
      if (memory !== undefined) {
        console.log(`Memory delta: ${(memory / 1024 / 1024).toFixed(2)}MB`);
      }
    });
  });

  describe('Complexity Scaling', () => {
    const generateComplexDocument = (complexity: 'simple' | 'moderate' | 'high' | 'extreme') => {
      const configs = {
        simple: { textFields: 2, nestedLevels: 1, arraySize: 3 },
        moderate: { textFields: 10, nestedLevels: 3, arraySize: 20 },
        high: { textFields: 25, nestedLevels: 5, arraySize: 50 },
        extreme: { textFields: 50, nestedLevels: 8, arraySize: 100 }
      };
      
      const config = configs[complexity];
      
      const createNested = (level: number): any => {
        if (level === 0) {
          return {
            value: 'Deep nested value',
            timestamp: new Date().toISOString(),
            count: Math.random() * 1000
          };
        }
        
        return {
          [`level_${level}`]: createNested(level - 1),
          [`text_level_${level}`]: `Text content requiring analysis at level ${level}`,
          [`array_level_${level}`]: Array.from({ length: config.arraySize }, (_, i) => ({
            id: i,
            data: `Array item ${i} at level ${level}`,
            nested: level > 1 ? createNested(level - 2) : null
          }))
        };
      };
      
      const document: any = {};
      
      // Add text fields
      for (let i = 0; i < config.textFields; i++) {
        document[`textField_${i}`] = `This is text field number ${i} containing content that requires full tokenization, analysis, and indexing processing by OpenSearch`;
      }
      
      // Add nested structure
      document.nested = createNested(config.nestedLevels);
      
      return document;
    };

    it('handles increasing complexity gracefully', async () => {
      const complexities: Array<'simple' | 'moderate' | 'high'> = ['simple', 'moderate', 'high'];
      const results: Array<{ complexity: string; duration: number; score: number }> = [];
      
      for (const complexity of complexities) {
        const document = generateComplexDocument(complexity);
        
        const { result, duration } = await measurePerformance(`analyze-${complexity}`, () =>
          analyzeDocument(document)
        );
        
        results.push({
          complexity,
          duration,
          score: result.scores.overall
        });
        
        expect(duration).toBeLessThan(8000); // Max 8 seconds
        expect(result.scores.overall).toBeGreaterThanOrEqual(0);
        expect(result.scores.overall).toBeLessThanOrEqual(10);
      }
      
      // More complex documents should generally have lower scores
      const simpleScore = results.find(r => r.complexity === 'simple')!.score;
      const highScore = results.find(r => r.complexity === 'high')!.score;
      
      expect(simpleScore).toBeGreaterThan(highScore);
      
      console.log('Complexity Scaling Results:');
      results.forEach(r => {
        console.log(`${r.complexity}: Score ${r.score.toFixed(2)}, ${r.duration.toFixed(2)}ms`);
      });
    });

    it('maintains accuracy under extreme complexity', async () => {
      const extremeDoc = generateComplexDocument('extreme');
      
      const { result, duration } = await measurePerformance('analyze-extreme', () =>
        analyzeDocument(extremeDoc)
      );
      
      expect(result).toBeDefined();
      expect(result.fieldCount).toBeGreaterThan(50);
      expect(result.maxDepth).toBeGreaterThan(5);
      expect(duration).toBeLessThan(20000); // Max 20 seconds for extreme complexity
      
      // Should still provide accurate analysis
      expect(result.scores.overall).toBeGreaterThanOrEqual(0);
      expect(result.scores.overall).toBeLessThanOrEqual(10);
      expect(result.warnings.length).toBeGreaterThan(0); // Should warn about complexity
      expect(result.optimizations.length).toBeGreaterThan(0); // Should suggest optimizations
      
      console.log(`Extreme Complexity: ${result.fieldCount} fields, depth ${result.maxDepth}, ${duration.toFixed(2)}ms`);
    });
  });

  describe('Memory Usage Patterns', () => {
    const createMemoryTestDocument = (memoryProfile: 'low' | 'medium' | 'high') => {
      const profiles = {
        low: { stringSize: 100, objectCount: 10, arrayCount: 5 },
        medium: { stringSize: 1000, objectCount: 100, arrayCount: 50 },
        high: { stringSize: 10000, objectCount: 500, arrayCount: 200 }
      };
      
      const profile = profiles[memoryProfile];
      const document: any = {};
      
      // Add large strings
      for (let i = 0; i < 10; i++) {
        document[`largeText_${i}`] = 'A'.repeat(profile.stringSize);
      }
      
      // Add many objects
      document.objects = Array.from({ length: profile.objectCount }, (_, i) => ({
        id: i,
        name: `Object ${i}`,
        data: {
          field1: `Value ${i}`,
          field2: i * 100,
          field3: new Date(2023, 0, i + 1).toISOString()
        }
      }));
      
      // Add arrays
      document.arrays = Array.from({ length: profile.arrayCount }, (_, i) => 
        Array.from({ length: 20 }, (_, j) => `Item ${i}-${j}`)
      );
      
      return document;
    };

    it('maintains reasonable memory usage across document sizes', async () => {
      const profiles: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
      const results: Array<{ profile: string; duration: number; memory?: number }> = [];
      
      for (const profile of profiles) {
        const document = createMemoryTestDocument(profile);
        
        // Force garbage collection if available
        if ((global as any).gc) {
          (global as any).gc();
        }
        
        const { result, duration, memory } = await measurePerformance(`memory-${profile}`, () =>
          analyzeDocument(document)
        );
        
        results.push({ profile, duration, memory });
        
        expect(result).toBeDefined();
        expect(duration).toBeLessThan(10000);
        
        // Memory usage should be reasonable
        if (memory !== undefined) {
          expect(memory).toBeLessThan(200 * 1024 * 1024); // Max 200MB per analysis
        }
      }
      
      console.log('Memory Usage Results:');
      results.forEach(r => {
        const memStr = r.memory ? `${(r.memory / 1024 / 1024).toFixed(2)}MB` : 'N/A';
        console.log(`${r.profile}: ${r.duration.toFixed(2)}ms, Memory: ${memStr}`);
      });
    });

    it('releases memory after analysis completion', async () => {
      const largeDoc = createMemoryTestDocument('high');
      
      const memoryBefore = (performance as any).memory?.usedJSHeapSize;
      
      // Run multiple analyses
      for (let i = 0; i < 5; i++) {
        const result = analyzeDocument(largeDoc);
        expect(result).toBeDefined();
      }
      
      // Force garbage collection if available
      if ((global as any).gc) {
        (global as any).gc();
        
        // Wait a bit for GC to complete
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const memoryAfter = (performance as any).memory?.usedJSHeapSize;
        
        if (memoryBefore && memoryAfter) {
          const memoryGrowth = memoryAfter - memoryBefore;
          
          // Memory growth should be reasonable (less than 50MB)
          expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024);
          
          console.log(`Memory growth after 5 analyses: ${(memoryGrowth / 1024 / 1024).toFixed(2)}MB`);
        }
      }
    });
  });

  describe('CPU Utilization', () => {
    it('efficiently utilizes CPU for field detection', async () => {
      const cpuIntensiveDoc = {
        // Many different field types to test detection logic
        ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`field_${i}`, i])),
        ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`text_${i}`, `Text field ${i}`])),
        ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`date_${i}`, new Date(2023, i % 12, 1).toISOString()])),
        ...Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`bool_${i}`, i % 2 === 0]))
      };
      
      const { result, duration } = await measurePerformance('cpu-intensive', () =>
        analyzeDocument(cpuIntensiveDoc)
      );
      
      expect(result).toBeDefined();
      expect(result.fieldCount).toBe(400);
      
      // Should complete efficiently despite CPU-intensive field detection
      expect(duration).toBeLessThan(5000);
      
      // All field types should be correctly detected
      expect(result.fieldTypes.integer).toBe(100);
      expect(result.fieldTypes.text).toBe(100);
      expect(result.fieldTypes.date).toBe(100);
      expect(result.fieldTypes.boolean).toBe(100);
      
      console.log(`CPU-intensive analysis: 400 fields, ${duration.toFixed(2)}ms`);
    });

    it('optimizes scoring calculations', async () => {
      const scoringDoc = {
        // Document designed to exercise all scoring paths
        textFields: Array.from({ length: 20 }, (_, i) => 
          `Complex text field ${i} requiring comprehensive analysis and tokenization`
        ),
        nestedStructure: {
          level1: {
            level2: {
              level3: {
                level4: {
                  deepField: 'Deep nested content'
                }
              }
            }
          }
        },
        arrayFields: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          name: `Array item ${i}`,
          nestedArray: Array.from({ length: 5 }, (_, j) => ({
            subId: j,
            content: `Sub-item ${j} content`
          }))
        })),
        mixedTypes: {
          numbers: Array.from({ length: 50 }, (_, i) => i),
          strings: Array.from({ length: 50 }, (_, i) => `String ${i}`),
          booleans: Array.from({ length: 50 }, (_, i) => i % 2 === 0)
        }
      };
      
      const { result, duration } = await measurePerformance('scoring-intensive', () =>
        analyzeDocument(scoringDoc)
      );
      
      expect(result).toBeDefined();
      expect(duration).toBeLessThan(3000); // Should be optimized
      
      // All scoring dimensions should be calculated
      expect(result.scores.queryPerformance).toBeGreaterThanOrEqual(0);
      expect(result.scores.indexingPerformance).toBeGreaterThanOrEqual(0);
      expect(result.scores.storageEfficiency).toBeGreaterThanOrEqual(0);
      expect(result.scores.maintenanceCost).toBeGreaterThanOrEqual(0);
      expect(result.scores.overall).toBeGreaterThanOrEqual(0);
      
      console.log(`Scoring-intensive analysis: ${duration.toFixed(2)}ms, Overall score: ${result.scores.overall.toFixed(2)}`);
    });
  });

  describe('Concurrent Analysis', () => {
    it('handles multiple concurrent analyses', async () => {
      const documents = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `Concurrent document ${i}`,
        data: Array.from({ length: 20 }, (_, j) => ({
          field: j,
          text: `Text content ${j} for document ${i}`,
          value: i * j
        }))
      }));
      
      const startTime = performance.now();
      
      // Run all analyses concurrently
      const promises = documents.map((doc, i) => 
        measurePerformance(`concurrent-${i}`, () => analyzeDocument(doc))
      );
      
      const results = await Promise.all(promises);
      
      const totalTime = performance.now() - startTime;
      const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
      
      // All should complete successfully
      results.forEach((r, i) => {
        expect(r.result).toBeDefined();
        expect(r.result.fieldCount).toBeGreaterThan(0);
        expect(r.duration).toBeLessThan(5000);
      });
      
      // Concurrent execution should not be much slower than sequential
      expect(totalTime).toBeLessThan(avgDuration * documents.length * 2);
      
      console.log(`Concurrent Analysis: ${documents.length} documents`);
      console.log(`Total time: ${totalTime.toFixed(2)}ms, Avg per doc: ${avgDuration.toFixed(2)}ms`);
    });

    it('maintains memory efficiency under concurrent load', async () => {
      const createConcurrentDoc = (id: number) => ({
        id,
        largeArray: Array.from({ length: 100 }, (_, i) => ({
          id: i,
          text: `Large text content ${i} for document ${id}`,
          nested: { value: i * id, timestamp: new Date().toISOString() }
        }))
      });
      
      const memoryBefore = (performance as any).memory?.usedJSHeapSize;
      
      // Create multiple concurrent analyses
      const concurrentPromises = Array.from({ length: 5 }, (_, i) => 
        analyzeDocument(createConcurrentDoc(i))
      );
      
      const results = await Promise.all(concurrentPromises);
      
      // Force garbage collection
      if ((global as any).gc) {
        (global as any).gc();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const memoryAfter = (performance as any).memory?.usedJSHeapSize;
      
      results.forEach((result, i) => {
        expect(result).toBeDefined();
        expect(result.fieldCount).toBeGreaterThan(100);
      });
      
      if (memoryBefore && memoryAfter) {
        const memoryGrowth = memoryAfter - memoryBefore;
        
        // Memory growth should be reasonable even with concurrent load
        expect(memoryGrowth).toBeLessThan(100 * 1024 * 1024); // Max 100MB
        
        console.log(`Concurrent memory usage: ${(memoryGrowth / 1024 / 1024).toFixed(2)}MB`);
      }
    });
  });

  describe('Real-World Performance Scenarios', () => {
    it('benchmarks typical e-commerce product document', async () => {
      const productDoc = {
        product: {
          id: 'PROD-12345',
          name: 'Professional Wireless Headphones with Active Noise Cancellation',
          description: 'Experience premium audio quality with our professional-grade wireless headphones featuring advanced active noise cancellation technology, premium materials, and long-lasting battery life.',
          brand: 'AudioTech Pro',
          model: 'AT-WH-2000X',
          sku: 'ATP-WH-2000X-BK',
          categories: ['Electronics', 'Audio', 'Headphones', 'Wireless'],
          price: {
            currency: 'USD',
            amount: 299.99,
            originalAmount: 399.99,
            discountPercentage: 25
          },
          inventory: {
            inStock: true,
            quantity: 150,
            reservedQuantity: 23,
            warehouse: 'US-WEST-01',
            lastUpdated: '2023-01-15T10:30:00Z'
          },
          specifications: {
            technical: {
              driverSize: '40mm',
              frequency: '20Hz - 40kHz',
              impedance: '32 ohms',
              sensitivity: '100dB',
              batteryLife: '30 hours',
              chargingTime: '3 hours',
              connectivity: ['Bluetooth 5.0', 'USB-C', '3.5mm jack']
            },
            physical: {
              weight: '254g',
              dimensions: {
                length: 190,
                width: 160,
                height: 70,
                unit: 'mm'
              },
              colors: ['Black', 'Silver', 'Navy Blue']
            }
          },
          reviews: {
            summary: {
              averageRating: 4.7,
              totalReviews: 2847,
              recommendationPercentage: 94
            },
            distribution: {
              5: 1987,
              4: 623,
              3: 184,
              2: 41,
              1: 12
            },
            recentReviews: Array.from({ length: 10 }, (_, i) => ({
              id: `review_${i}`,
              rating: 4 + Math.random(),
              title: `Great headphones - Review ${i}`,
              content: `Excellent build quality and sound. Very satisfied with the purchase. The noise cancellation works perfectly and battery life is outstanding.`,
              author: `Customer${i}`,
              verifiedPurchase: true,
              date: new Date(2023, 0, i + 1).toISOString()
            }))
          }
        },
        metadata: {
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-15T10:30:00Z',
          version: 2,
          status: 'published',
          tags: ['featured', 'bestseller', 'premium'],
          seo: {
            title: 'Professional Wireless Headphones - AudioTech Pro AT-WH-2000X',
            description: 'Buy the best wireless headphones with active noise cancellation. Free shipping, 2-year warranty, 30-day return policy.',
            keywords: ['wireless headphones', 'noise cancellation', 'premium audio', 'bluetooth headphones']
          }
        }
      };
      
      const { result, duration, memory } = await measurePerformance('ecommerce-product', () =>
        analyzeDocument(productDoc)
      );
      
      expect(result).toBeDefined();
      expect(duration).toBeLessThan(2000); // Should be fast for typical products
      
      // Should classify as product document
      expect(result.comparative.documentType).toBe('Product Catalog');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.5);
      
      console.log(`E-commerce Product Analysis:`);
      console.log(`  Fields: ${result.fieldCount}`);
      console.log(`  Duration: ${duration.toFixed(2)}ms`);
      console.log(`  Overall Score: ${result.scores.overall.toFixed(2)}`);
      if (memory) console.log(`  Memory: ${(memory / 1024 / 1024).toFixed(2)}MB`);
    });

    it('benchmarks typical log entry document', async () => {
      const logDoc = {
        timestamp: '2023-01-15T14:30:25.123Z',
        level: 'INFO',
        message: 'User authentication successful for premium account upgrade',
        logger: 'com.example.auth.AuthenticationService',
        thread: 'http-nio-8080-exec-7',
        host: 'web-server-03.us-east-1.compute.internal',
        service: 'authentication-service',
        version: '2.1.4',
        environment: 'production',
        traceId: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
        spanId: '9876543210abcdef',
        parentSpanId: 'fedcba0987654321',
        requestId: 'req_1642259425123_98765',
        sessionId: 'sess_abc123def456ghi789',
        user: {
          id: 'usr_12345',
          email: 'premium.user@example.com',
          accountType: 'premium',
          subscriptionTier: 'pro'
        },
        request: {
          method: 'POST',
          path: '/api/auth/login',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
          ip: '192.168.1.105',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization': 'Bearer jwt_token_here'
          },
          body: {
            email: 'premium.user@example.com',
            loginMethod: 'password',
            rememberMe: true
          }
        },
        response: {
          statusCode: 200,
          statusMessage: 'OK',
          duration: 186,
          size: 1247
        },
        security: {
          riskScore: 0.15,
          geoLocation: {
            country: 'US',
            region: 'California',
            city: 'San Francisco',
            latitude: 37.7749,
            longitude: -122.4194
          },
          deviceFingerprint: 'fp_a1b2c3d4e5f6',
          ipReputation: 'clean'
        },
        performance: {
          dbQueryCount: 3,
          dbQueryDuration: 45,
          cacheHits: 7,
          cacheMisses: 2,
          memoryUsage: 156789123
        }
      };
      
      const { result, duration } = await measurePerformance('log-entry', () =>
        analyzeDocument(logDoc)
      );
      
      expect(result).toBeDefined();
      expect(duration).toBeLessThan(1000); // Logs should analyze very quickly
      
      // Should classify as log entry
      expect(result.comparative.documentType).toBe('Log Entry');
      expect(result.comparative.typeConfidence).toBeGreaterThan(0.7);
      
      // Should have good performance characteristics for logs
      expect(result.scores.queryPerformance).toBeGreaterThan(6);
      expect(result.scores.indexingPerformance).toBeGreaterThan(7);
      
      console.log(`Log Entry Analysis:`);
      console.log(`  Fields: ${result.fieldCount}`);
      console.log(`  Duration: ${duration.toFixed(2)}ms`);
      console.log(`  Query Performance: ${result.scores.queryPerformance.toFixed(2)}`);
      console.log(`  Indexing Performance: ${result.scores.indexingPerformance.toFixed(2)}`);
    });

    it('benchmarks configuration document with mixed complexity', async () => {
      const configDoc = {
        application: {
          name: 'Enterprise Data Platform',
          version: '3.2.1',
          buildNumber: '2023.01.15.142',
          environment: 'production',
          region: 'us-east-1',
          deployment: {
            strategy: 'blue-green',
            replicas: 3,
            resources: {
              cpu: {
                request: '500m',
                limit: '2000m'
              },
              memory: {
                request: '1Gi',
                limit: '4Gi'
              }
            }
          }
        },
        database: {
          primary: {
            host: 'prod-db-cluster.us-east-1.rds.amazonaws.com',
            port: 5432,
            name: 'enterprise_platform',
            ssl: true,
            connectionPool: {
              min: 5,
              max: 20,
              timeout: 30000,
              idleTimeout: 600000
            }
          },
          replicas: Array.from({ length: 3 }, (_, i) => ({
            id: `replica-${i + 1}`,
            host: `prod-db-replica-${i + 1}.us-east-1.rds.amazonaws.com`,
            port: 5432,
            readOnly: true,
            lag: {
              threshold: 1000,
              current: 150 + i * 50
            }
          }))
        },
        cache: {
          redis: {
            primary: {
              host: 'prod-redis-cluster.abc123.cache.amazonaws.com',
              port: 6379,
              password: 'encrypted_password_here',
              ssl: true
            },
            clusters: Array.from({ length: 5 }, (_, i) => ({
              name: `cache-cluster-${i + 1}`,
              nodes: 3,
              memory: '2gb',
              evictionPolicy: 'allkeys-lru'
            }))
          }
        },
        monitoring: {
          metrics: {
            enabled: true,
            endpoint: 'https://metrics.enterprise-platform.com/api/v1',
            interval: 30,
            retention: '30d',
            labels: {
              service: 'enterprise-platform',
              environment: 'production',
              team: 'platform-engineering'
            }
          },
          logging: {
            level: 'INFO',
            format: 'json',
            outputs: ['stdout', 'file', 'elasticsearch'],
            elasticsearch: {
              host: 'prod-logs.es.amazonaws.com',
              index: 'platform-logs-2023.01',
              retention: '90d'
            }
          },
          alerts: Array.from({ length: 10 }, (_, i) => ({
            name: `alert-${i + 1}`,
            condition: `metric > ${(i + 1) * 100}`,
            severity: ['low', 'medium', 'high', 'critical'][i % 4],
            channels: ['slack', 'email', 'pagerduty']
          }))
        }
      };
      
      const { result, duration } = await measurePerformance('config-document', () =>
        analyzeDocument(configDoc)
      );
      
      expect(result).toBeDefined();
      expect(duration).toBeLessThan(1500);
      
      // Should classify as configuration
      expect(result.comparative.documentType).toBe('Configuration');
      
      console.log(`Configuration Document Analysis:`);
      console.log(`  Fields: ${result.fieldCount}`);
      console.log(`  Max Depth: ${result.maxDepth}`);
      console.log(`  Duration: ${duration.toFixed(2)}ms`);
      console.log(`  Storage Efficiency: ${result.scores.storageEfficiency.toFixed(2)}`);
    });
  });
});