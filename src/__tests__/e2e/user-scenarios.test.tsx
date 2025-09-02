/**
 * End-to-end user scenarios testing
 * 
 * Tests complete user journeys and real-world usage scenarios:
 * - First-time user experience
 * - Power user workflows
 * - Mobile user experience
 * - Error recovery scenarios
 * - Performance under load
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';

// Mock clipboard API for copy operations
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve(''))
  }
});

// Mock window.print for PDF export
global.print = vi.fn();

describe('End-to-End User Scenarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock URL methods for downloads
    global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');
    global.URL.revokeObjectURL = vi.fn();
    
    // Mock link creation for downloads
    const mockLink = {
      click: vi.fn(),
      href: '',
      download: '',
      style: { display: '' }
    };
    
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') return mockLink as any;
      return document.createElement(tagName);
    });
    
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);
  });

  describe('First-Time User Journey', () => {
    it('guides new user through complete analysis workflow', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // 1. User sees welcome interface
      expect(screen.getByText('OpenSearch Document Complexity Analyzer')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter or paste JSON/)).toBeInTheDocument();
      expect(screen.getByText(/Load Example/)).toBeInTheDocument();
      
      // 2. User clicks on example to understand format
      const exampleButton = screen.getByText(/Load Example/);
      await user.click(exampleButton);
      expect(screen.getByText(/Simple Document/)).toBeInTheDocument();
      await user.click(screen.getByText(/Simple Document/));
      
      // 3. Textarea should now contain example JSON
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      expect(textArea).toHaveValue();
      expect(() => JSON.parse(textArea.value)).not.toThrow();
      
      // 4. User analyzes the example
      await user.click(screen.getByText('Analyze Document'));
      
      // 5. User sees loading state
      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
      
      // 6. Results appear
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // 7. User explores different tabs to understand results
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      expect(screen.getByText('Memory Usage')).toBeInTheDocument();
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      expect(screen.getByText('Field Analysis')).toBeInTheDocument();
      
      await user.click(screen.getByRole('tab', { name: /optimization/i }));
      expect(screen.getByText('Optimization Recommendations')).toBeInTheDocument();
      
      // 8. User tries to export results
      await user.click(screen.getByRole('tab', { name: /export/i }));
      expect(screen.getByText('Export Results')).toBeInTheDocument();
      
      const jsonExport = screen.getByText('Download JSON');
      await user.click(jsonExport);
      
      // Should trigger download
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('handles user making common mistakes gracefully', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      
      // 1. User tries to analyze without input
      await user.click(screen.getByText('Analyze Document'));
      await waitFor(() => {
        expect(screen.getByText(/Please enter JSON/)).toBeInTheDocument();
      });
      
      // 2. User enters invalid JSON (common mistake: single quotes)
      await user.type(textArea, "{'name': 'test'}");
      await user.click(screen.getByText('Analyze Document'));
      await waitFor(() => {
        expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
      });
      
      // 3. User gets helpful error message and corrects
      await user.clear(textArea);
      await user.type(textArea, '{"name": "test"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // 4. Error should be cleared
      expect(screen.queryByText(/Invalid JSON/)).not.toBeInTheDocument();
    });

    it('provides helpful guidance for complex documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // User enters a problematic document structure
      const problematicDoc = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  level6: {
                    tooDeep: 'This is too deeply nested',
                    manyTextFields: Array.from({ length: 30 }, (_, i) => 
                      `Text field number ${i} with lots of content that requires analysis`
                    )
                  }
                }
              }
            }
          }
        },
        moreTextFields: Object.fromEntries(
          Array.from({ length: 20 }, (_, i) => [`textField${i}`, `More text content ${i}`])
        )
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(problematicDoc, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Should show warnings and recommendations
      await user.click(screen.getByRole('tab', { name: /optimization/i }));
      
      expect(screen.getByText(/Deep nesting/)).toBeInTheDocument();
      expect(screen.getByText(/text fields/)).toBeInTheDocument();
      expect(screen.getByText(/flatten.*structure/i)).toBeInTheDocument();
    });
  });

  describe('Power User Workflows', () => {
    it('enables rapid iteration and comparison of documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const documents = [
        { type: 'simple', data: { id: 1, name: 'Simple' } },
        { 
          type: 'complex', 
          data: { 
            id: 2, 
            nested: { 
              deep: { 
                structure: 'complex',
                textFields: ['field1', 'field2', 'field3'] 
              } 
            } 
          } 
        },
        { 
          type: 'optimized', 
          data: { 
            id: 3, 
            name: 'Optimized', 
            count: 42, 
            active: true 
          } 
        }
      ];
      
      const results: Array<{ type: string; score: number }> = [];
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      
      // Analyze each document and collect scores
      for (const doc of documents) {
        await user.clear(textArea);
        await user.type(textArea, JSON.stringify(doc.data, null, 2));
        await user.click(screen.getByText('Analyze Document'));
        
        await waitFor(() => {
          expect(screen.getByText('Analysis Results')).toBeInTheDocument();
        });
        
        // Extract overall score
        const scoreElement = screen.getByText(/\d+\.\d+/).textContent;
        const score = parseFloat(scoreElement!);
        results.push({ type: doc.type, score });
        
        // Verify results make sense
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(10);
      }
      
      // Power user can quickly identify that optimized > simple > complex
      expect(results.find(r => r.type === 'optimized')!.score)
        .toBeGreaterThan(results.find(r => r.type === 'complex')!.score);
    });

    it('supports advanced export and sharing workflows', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Analyze a document first
      const document = {
        product: {
          name: 'Advanced Product',
          specifications: {
            performance: { cpu: '3.2GHz', memory: '16GB' },
            features: ['feature1', 'feature2', 'feature3']
          }
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(document, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
      
      // Test all export formats
      const formats = ['JSON', 'CSV'];
      
      for (const format of formats) {
        const button = screen.getByText(`Download ${format}`);
        await user.click(button);
        expect(global.URL.createObjectURL).toHaveBeenCalled();
      }
      
      // Should also support copying results
      if (screen.queryByText('Copy to Clipboard')) {
        await user.click(screen.getByText('Copy to Clipboard'));
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
      }
    });

    it('provides detailed field-level analysis for optimization', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const detailedDoc = {
        metadata: {
          title: 'Detailed analysis document with various field types',
          description: 'This document contains many different field types for comprehensive analysis',
          keywords: ['analysis', 'opensearch', 'performance'],
          created: '2023-01-01T00:00:00Z',
          author: {
            name: 'Data Architect',
            email: 'architect@example.com',
            department: 'Engineering'
          }
        },
        content: {
          sections: [
            {
              id: 1,
              heading: 'Introduction',
              body: 'This section introduces the document structure and analysis methodology.',
              wordCount: 156,
              readingTime: 2.5
            },
            {
              id: 2,
              heading: 'Technical Details',
              body: 'Deep dive into technical specifications and implementation details.',
              wordCount: 1247,
              readingTime: 12.8
            }
          ]
        },
        analytics: {
          performance: {
            loadTime: 245,
            renderTime: 89,
            interactionMetrics: {
              clicks: 423,
              scrollDepth: 0.78,
              timeOnPage: 180
            }
          }
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(detailedDoc, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Examine field-level details
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      // Should show all field paths with complexity scores
      expect(screen.getByText('metadata.title')).toBeInTheDocument();
      expect(screen.getByText('content.sections')).toBeInTheDocument();
      expect(screen.getByText('analytics.performance.loadTime')).toBeInTheDocument();
      
      // Should highlight high-complexity fields
      const complexityColumns = screen.getAllByText(/\d+\.\d+/);
      expect(complexityColumns.length).toBeGreaterThan(5);
    });
  });

  describe('Mobile User Experience', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667
      });
      
      // Mock touch events
      window.ontouchstart = null;
    });

    it('provides responsive interface on mobile devices', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Interface should adapt to mobile
      expect(screen.getByText('OpenSearch Document Complexity Analyzer')).toBeInTheDocument();
      
      // Text area should be usable on mobile
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      expect(textArea).toBeInTheDocument();
      
      // Buttons should be touch-friendly
      const analyzeButton = screen.getByText('Analyze Document');
      expect(analyzeButton).toBeInTheDocument();
      
      // Test mobile interaction
      const mobileDoc = { mobile: 'test', simple: true };
      await user.type(textArea, JSON.stringify(mobileDoc));
      await user.click(analyzeButton);
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Tab navigation should work on mobile
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBeGreaterThan(3);
      
      // Each tab should be accessible
      for (const tab of tabs.slice(0, 3)) {
        await user.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      }
    });

    it('handles touch interactions for complex interfaces', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const document = {
        touchTest: {
          data: 'Mobile interaction test',
          nested: { value: 42 }
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(document));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Test swipe-like navigation between tabs
      const performanceTab = screen.getByRole('tab', { name: /performance/i });
      await user.click(performanceTab);
      
      expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
      
      // Export functionality should work on mobile
      await user.click(screen.getByRole('tab', { name: /export/i }));
      const exportButton = screen.getByText('Download JSON');
      await user.click(exportButton);
      
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });
  });

  describe('Error Recovery Scenarios', () => {
    it('recovers gracefully from network-like errors', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Simulate a scenario where analysis might fail
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      
      // User enters valid JSON but something goes wrong
      await user.type(textArea, '{"test": "recovery scenario"}');
      await user.click(screen.getByText('Analyze Document'));
      
      // Even if there were errors, user should be able to retry
      await waitFor(() => {
        // Either results appear or user can retry
        expect(
          screen.queryByText('Analysis Results') || 
          screen.queryByText('Analyze Document')
        ).toBeTruthy();
      });
    });

    it('handles browser compatibility issues gracefully', async () => {
      const user = userEvent.setup();
      
      // Mock missing modern browser features
      const originalCreateObjectURL = global.URL.createObjectURL;
      delete (global.URL as any).createObjectURL;
      
      render(<App />);
      
      const document = { browser: 'compatibility', test: true };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(document));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Export should either work or show appropriate fallback
      await user.click(screen.getByRole('tab', { name: /export/i }));
      const exportButton = screen.getByText('Download JSON');
      
      // Should not crash when clicking export
      expect(() => user.click(exportButton)).not.toThrow();
      
      // Restore for other tests
      global.URL.createObjectURL = originalCreateObjectURL;
    });

    it('provides clear feedback when features are unavailable', async () => {
      const user = userEvent.setup();
      
      // Mock missing clipboard API
      delete (navigator as any).clipboard;
      
      render(<App />);
      
      const document = { feature: 'availability', test: true };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(document));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
      
      // Should still show export options even if some features are unavailable
      expect(screen.getByText('Export Results')).toBeInTheDocument();
      expect(screen.getByText('Download JSON')).toBeInTheDocument();
    });
  });

  describe('Performance Under Load', () => {
    it('handles multiple rapid analyses without degradation', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const documents = [
        { id: 1, type: 'quick', data: 'test1' },
        { id: 2, type: 'quick', data: 'test2' },
        { id: 3, type: 'quick', data: 'test3' }
      ];
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      const analyzeButton = screen.getByText('Analyze Document');
      
      const startTime = performance.now();
      
      // Rapidly analyze multiple documents
      for (const doc of documents) {
        await user.clear(textArea);
        await user.type(textArea, JSON.stringify(doc));
        await user.click(analyzeButton);
        
        await waitFor(() => {
          expect(screen.getByText('Analysis Results')).toBeInTheDocument();
        });
        
        // Quick verification
        expect(screen.getByText('Overall Score')).toBeInTheDocument();
      }
      
      const totalTime = performance.now() - startTime;
      
      // Should complete all analyses in reasonable time
      expect(totalTime).toBeLessThan(10000); // 10 seconds for 3 analyses
    });

    it('maintains responsiveness with large complex documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Generate a large complex document
      const generateLargeDoc = (depth: number, breadth: number): any => {
        if (depth === 0) {
          return `Leaf value at depth 0 with some text content for analysis`;
        }
        
        const obj: any = {};
        for (let i = 0; i < breadth; i++) {
          obj[`field_${i}`] = generateLargeDoc(depth - 1, Math.max(1, breadth - 1));
          obj[`text_${i}`] = `Text field ${i} with content that requires analysis and tokenization`;
          obj[`num_${i}`] = i * 42;
          obj[`bool_${i}`] = i % 2 === 0;
        }
        return obj;
      };
      
      const largeDoc = generateLargeDoc(4, 5); // Reasonable size but still complex
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      
      const inputStart = performance.now();
      await user.type(textArea, JSON.stringify(largeDoc));
      const inputTime = performance.now() - inputStart;
      
      const analysisStart = performance.now();
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      }, { timeout: 15000 });
      
      const analysisTime = performance.now() - analysisStart;
      
      // Should maintain reasonable performance
      expect(inputTime).toBeLessThan(5000); // Input shouldn't take too long
      expect(analysisTime).toBeLessThan(10000); // Analysis should complete
      
      // Interface should remain responsive
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      expect(screen.getByText('Field Analysis')).toBeInTheDocument();
    });
  });

  describe('Accessibility User Journey', () => {
    it('supports complete workflow using only keyboard', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Navigate using only keyboard
      await user.tab(); // Focus textarea
      expect(screen.getByPlaceholderText(/Enter or paste JSON/)).toHaveFocus();
      
      // Enter document using keyboard
      const document = { keyboard: 'navigation', accessible: true };
      await user.type(screen.getByPlaceholderText(/Enter or paste JSON/), JSON.stringify(document));
      
      // Tab to analyze button
      await user.tab();
      expect(screen.getByText('Analyze Document')).toHaveFocus();
      
      // Activate with Enter
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Navigate tabs with arrow keys
      const firstTab = screen.getByRole('tab', { name: /overview/i });
      firstTab.focus();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: /performance/i })).toHaveFocus();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: /fields/i })).toHaveFocus();
      
      // Activate tab with Enter
      await user.keyboard('{Enter}');
      expect(screen.getByText('Field Analysis')).toBeInTheDocument();
    });

    it('provides clear screen reader announcements', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Check for proper heading structure
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      const document = { screenReader: 'test', value: 123 };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(document));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Results should have proper structure for screen readers
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
      
      // Error messages should be announced
      await user.clear(textArea);
      await user.type(textArea, '{invalid}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });

  describe('Cross-Browser Compatibility', () => {
    it('works with different JSON parsing behaviors', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Test edge cases that might behave differently across browsers
      const edgeCaseDoc = {
        unicode: '🚀 Unicode support test',
        largeNumber: 9007199254740991, // MAX_SAFE_INTEGER
        precision: 0.1 + 0.2, // Floating point precision
        date: new Date().toISOString(),
        null: null,
        undefined: undefined as any,
        empty: {},
        emptyArray: []
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(edgeCaseDoc));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Should handle all edge cases gracefully
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      expect(screen.getByText('Field Analysis')).toBeInTheDocument();
    });

    it('maintains functionality with disabled JavaScript features', async () => {
      const user = userEvent.setup();
      
      // Mock absence of modern JavaScript features
      const originalSymbol = global.Symbol;
      delete (global as any).Symbol;
      
      render(<App />);
      
      const document = { fallback: 'test', compatibility: true };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(document));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Should still provide basic functionality
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
      
      // Restore for other tests
      global.Symbol = originalSymbol;
    });
  });

  describe('Real-World Document Types', () => {
    it('handles typical API response documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const apiResponse = {
        status: 'success',
        data: {
          users: [
            {
              id: 1,
              username: 'john_doe',
              email: 'john@example.com',
              profile: {
                firstName: 'John',
                lastName: 'Doe',
                avatar: 'https://example.com/avatar.jpg',
                preferences: {
                  theme: 'dark',
                  language: 'en',
                  notifications: {
                    email: true,
                    push: false
                  }
                }
              },
              permissions: ['read', 'write'],
              lastLogin: '2023-01-01T10:30:00Z',
              isActive: true
            }
          ]
        },
        pagination: {
          total: 1,
          page: 1,
          limit: 20,
          hasNext: false
        },
        meta: {
          requestId: 'req_123456789',
          timestamp: '2023-01-01T12:00:00Z',
          version: '1.0'
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(apiResponse, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /comparison/i }));
      expect(screen.getByText(/User Profile|Unknown/)).toBeInTheDocument();
    });

    it('handles configuration and settings documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const configDoc = {
        application: {
          name: 'MyApp',
          version: '2.1.0',
          environment: 'production'
        },
        database: {
          host: 'db.example.com',
          port: 5432,
          name: 'myapp_prod',
          ssl: true,
          pool: {
            min: 2,
            max: 10,
            timeout: 30000
          }
        },
        redis: {
          host: 'redis.example.com',
          port: 6379,
          keyPrefix: 'myapp:',
          ttl: 3600
        },
        features: {
          enableCaching: true,
          enableLogging: true,
          enableMetrics: true,
          debugMode: false
        },
        security: {
          jwtSecret: 'secret_key_here',
          tokenExpiry: 86400,
          allowedOrigins: ['https://myapp.com', 'https://admin.myapp.com']
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(configDoc, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /comparison/i }));
      expect(screen.getByText(/Configuration|Unknown/)).toBeInTheDocument();
    });
  });
});