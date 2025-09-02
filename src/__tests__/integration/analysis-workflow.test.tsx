/**
 * Integration tests for the complete analysis workflow
 * 
 * Tests end-to-end functionality including:
 * - JSON input and validation
 * - Document analysis processing
 * - Results display and navigation
 * - Export functionality
 * - Error handling and recovery
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';

// Mock URL.createObjectURL for export functionality
global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');
global.URL.revokeObjectURL = vi.fn();

describe('Analysis Workflow Integration', () => {
  let mockLink: any;

  beforeEach(() => {
    // Mock link element for downloads
    mockLink = {
      click: vi.fn(),
      href: '',
      download: '',
      style: { display: '' }
    };
    
    vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'a') return mockLink;
      return document.createElement(tagName);
    });
    
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink);
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Analysis Workflow', () => {
    it('completes full workflow from input to results', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // 1. Enter JSON input
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      const simpleDocument = {
        id: '12345',
        title: 'Test Document',
        content: 'This is a test document for analysis',
        metadata: {
          author: 'Test Author',
          created: '2023-01-01T00:00:00Z',
          tags: ['test', 'document', 'analysis']
        },
        stats: {
          views: 150,
          likes: 25,
          shares: 8
        }
      };
      
      await user.type(textArea, JSON.stringify(simpleDocument, null, 2));
      
      // 2. Trigger analysis
      const analyzeButton = screen.getByText('Analyze Document');
      await user.click(analyzeButton);
      
      // 3. Wait for analysis to complete
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      }, { timeout: 5000 });
      
      // 4. Verify results are displayed
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
      expect(screen.getByText(/\d+\.\d/)).toBeInTheDocument(); // Score display
      
      // 5. Verify tabs are present
      expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /performance/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /fields/i })).toBeInTheDocument();
    });

    it('handles complex nested documents correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const complexDocument = {
        user: {
          profile: {
            personal: {
              name: 'John Doe',
              email: 'john@example.com',
              preferences: {
                theme: 'dark',
                notifications: {
                  email: true,
                  push: false,
                  sms: true
                }
              }
            },
            professional: {
              title: 'Software Engineer',
              company: 'Tech Corp',
              skills: ['JavaScript', 'TypeScript', 'React']
            }
          },
          activity: {
            recent: [
              { action: 'login', timestamp: '2023-01-01T10:00:00Z' },
              { action: 'view_document', timestamp: '2023-01-01T10:05:00Z' },
              { action: 'edit_profile', timestamp: '2023-01-01T10:10:00Z' }
            ],
            statistics: {
              totalLogins: 245,
              documentsViewed: 1203,
              profileEdits: 12
            }
          }
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(complexDocument, null, 2));
      
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Check that deep nesting is detected
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      expect(screen.getByText('user.profile.personal.name')).toBeInTheDocument();
      expect(screen.getByText(/Deep nesting/)).toBeInTheDocument();
    });

    it('processes array fields and nested objects correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const documentWithArrays = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 99.99,
            categories: ['electronics', 'gadgets'],
            specifications: {
              weight: '1.2kg',
              dimensions: { width: 10, height: 20, depth: 5 },
              features: ['waterproof', 'wireless', 'rechargeable']
            }
          },
          {
            id: 2,
            name: 'Product 2',
            price: 149.99,
            categories: ['electronics', 'computers'],
            specifications: {
              weight: '2.5kg',
              dimensions: { width: 15, height: 25, depth: 8 },
              features: ['high-performance', 'portable']
            }
          }
        ],
        metadata: {
          store: 'Tech Store',
          location: 'Online',
          updated: '2023-01-01T00:00:00Z'
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(documentWithArrays, null, 2));
      
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Check field analysis shows nested arrays correctly
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      expect(screen.getByText('products')).toBeInTheDocument();
      expect(screen.getByText('nested')).toBeInTheDocument(); // Field type for nested arrays
    });
  });

  describe('Results Navigation and Display', () => {
    const setupAnalysisResults = async (user: any) => {
      render(<App />);
      
      const simpleDoc = { id: 'test', name: 'Test Document', value: 42 };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(simpleDoc));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
    };

    it('navigates through all result tabs correctly', async () => {
      const user = userEvent.setup();
      await setupAnalysisResults(user);
      
      // Overview tab (default)
      expect(screen.getByText('Document Classification')).toBeInTheDocument();
      
      // Performance tab
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
      expect(screen.getByText('Memory Usage')).toBeInTheDocument();
      
      // Fields tab
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      expect(screen.getByText('Field Analysis')).toBeInTheDocument();
      expect(screen.getByText('Field Path')).toBeInTheDocument();
      
      // Optimization tab
      await user.click(screen.getByRole('tab', { name: /optimization/i }));
      expect(screen.getByText('Optimization Recommendations')).toBeInTheDocument();
      
      // Comparison tab
      await user.click(screen.getByRole('tab', { name: /comparison/i }));
      expect(screen.getByText('Comparative Analysis')).toBeInTheDocument();
      
      // Export tab
      await user.click(screen.getByRole('tab', { name: /export/i }));
      expect(screen.getByText('Export Results')).toBeInTheDocument();
    });

    it('displays field type distribution correctly', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const mixedTypeDoc = {
        textField: 'This is a text field requiring analysis',
        keywordField: 'keyword',
        numberField: 42,
        booleanField: true,
        dateField: '2023-01-01T00:00:00Z',
        nested: {
          subField: 'nested content'
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(mixedTypeDoc, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      // Check field type distribution
      expect(screen.getByText(/Text:/)).toBeInTheDocument();
      expect(screen.getByText(/Keyword:/)).toBeInTheDocument();
      expect(screen.getByText(/Integer:/)).toBeInTheDocument();
      expect(screen.getByText(/Boolean:/)).toBeInTheDocument();
      expect(screen.getByText(/Date:/)).toBeInTheDocument();
    });

    it('shows performance metrics with realistic values', async () => {
      const user = userEvent.setup();
      await setupAnalysisResults(user);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      // Memory usage should be displayed
      expect(screen.getByText(/Heap:/)).toBeInTheDocument();
      expect(screen.getByText(/MB/)).toBeInTheDocument();
      
      // CPU utilization should be displayed
      expect(screen.getByText(/CPU Utilization/)).toBeInTheDocument();
      expect(screen.getByText(/Indexing:/)).toBeInTheDocument();
      expect(screen.getByText(/Query:/)).toBeInTheDocument();
      
      // Disk I/O should be displayed
      expect(screen.getByText(/Disk I\/O/)).toBeInTheDocument();
      expect(screen.getByText(/Read Ops:/)).toBeInTheDocument();
      expect(screen.getByText(/Write Ops:/)).toBeInTheDocument();
    });
  });

  describe('Export Functionality', () => {
    const setupForExport = async (user: any) => {
      render(<App />);
      
      const doc = { id: 'export-test', data: { value: 123 } };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(doc));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
    };

    it('exports JSON report successfully', async () => {
      const user = userEvent.setup();
      await setupForExport(user);
      
      const jsonExportButton = screen.getByText('Download JSON');
      await user.click(jsonExportButton);
      
      expect(mockLink.click).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(mockLink.download).toContain('analysis-report');
      expect(mockLink.download).toContain('.json');
    });

    it('exports CSV summary successfully', async () => {
      const user = userEvent.setup();
      await setupForExport(user);
      
      const csvExportButton = screen.getByText('Download CSV');
      await user.click(csvExportButton);
      
      expect(mockLink.click).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(mockLink.download).toContain('analysis-summary');
      expect(mockLink.download).toContain('.csv');
    });

    it('shows export format descriptions', async () => {
      const user = userEvent.setup();
      await setupForExport(user);
      
      expect(screen.getByText(/Complete analysis results in JSON format/)).toBeInTheDocument();
      expect(screen.getByText(/Summary data for spreadsheet analysis/)).toBeInTheDocument();
      expect(screen.getByText(/Professional report with charts/)).toBeInTheDocument();
    });
  });

  describe('Error Handling and Recovery', () => {
    it('handles invalid JSON gracefully', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, '{ invalid json }');
      
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
      });
      
      expect(screen.queryByText('Analysis Results')).not.toBeInTheDocument();
    });

    it('recovers from errors when valid input is provided', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      
      // First, enter invalid JSON
      await user.type(textArea, '{ invalid }');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
      });
      
      // Then, clear and enter valid JSON
      await user.clear(textArea);
      await user.type(textArea, '{ "valid": "json" }');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      expect(screen.queryByText(/Invalid JSON/)).not.toBeInTheDocument();
    });

    it('handles empty input appropriately', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const analyzeButton = screen.getByText('Analyze Document');
      await user.click(analyzeButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Please enter JSON/)).toBeInTheDocument();
      });
    });

    it('handles very large documents without crashing', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Create a large document
      const largeDoc = {
        data: Array.from({ length: 100 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          description: `This is a detailed description for item number ${i}`,
          metadata: {
            created: `2023-01-${String(i % 28 + 1).padStart(2, '0')}T00:00:00Z`,
            tags: [`tag${i}`, `category${i % 10}`, `type${i % 5}`],
            stats: {
              views: i * 10,
              likes: i * 2,
              shares: Math.floor(i / 2)
            }
          }
        }))
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(largeDoc));
      
      await user.click(screen.getByText('Analyze Document'));
      
      // Should complete without timeout or error
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      // Should show appropriate field count
      expect(screen.getByText(/\d+ fields/)).toBeInTheDocument();
    });
  });

  describe('Use Case Scenarios', () => {
    it('handles e-commerce product documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const ecommerceDoc = {
        product: {
          id: 'PROD-001',
          name: 'Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 299.99,
          currency: 'USD',
          category: 'Electronics',
          subcategory: 'Audio',
          brand: 'TechBrand',
          model: 'WH-1000XM4',
          sku: 'TB-WH-001',
          inventory: {
            inStock: true,
            quantity: 150,
            warehouse: 'US-EAST-01'
          },
          specifications: {
            wireless: true,
            batteryLife: '30 hours',
            chargingTime: '3 hours',
            weight: '254g',
            colors: ['Black', 'Silver', 'Blue']
          },
          reviews: {
            averageRating: 4.5,
            totalReviews: 1247,
            distribution: {
              5: 756,
              4: 312,
              3: 123,
              2: 45,
              1: 11
            }
          }
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(ecommerceDoc, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Check if it's classified as product document
      await user.click(screen.getByRole('tab', { name: /comparison/i }));
      expect(screen.getByText(/Product Catalog/)).toBeInTheDocument();
    });

    it('handles log entry documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const logDoc = {
        timestamp: '2023-01-01T12:00:00.123Z',
        level: 'INFO',
        message: 'User authentication successful',
        logger: 'com.example.auth.AuthenticationService',
        thread: 'http-nio-8080-exec-1',
        host: 'web-server-01',
        service: 'authentication-service',
        traceId: '1a2b3c4d5e6f7890',
        spanId: '9876543210abcdef',
        user: {
          id: 'user123',
          email: 'user@example.com'
        },
        request: {
          method: 'POST',
          path: '/api/auth/login',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ip: '192.168.1.100'
        },
        response: {
          statusCode: 200,
          duration: 245
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(logDoc, null, 2));
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      await user.click(screen.getByRole('tab', { name: /comparison/i }));
      expect(screen.getByText(/Log Entry/)).toBeInTheDocument();
    });
  });

  describe('Performance and Responsiveness', () => {
    it('provides loading feedback during analysis', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const doc = { test: 'data' };
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(doc));
      
      const analyzeButton = screen.getByText('Analyze Document');
      await user.click(analyzeButton);
      
      // Should show loading state
      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
      expect(analyzeButton).toBeDisabled();
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
    });

    it('completes analysis in reasonable time for typical documents', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const typicalDoc = {
        user: {
          id: '12345',
          profile: {
            name: 'John Doe',
            email: 'john@example.com',
            preferences: {
              theme: 'dark',
              language: 'en'
            }
          }
        },
        data: {
          items: [
            { id: 1, name: 'Item 1', value: 100 },
            { id: 2, name: 'Item 2', value: 200 }
          ]
        }
      };
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, JSON.stringify(typicalDoc, null, 2));
      
      const start = performance.now();
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(3000); // Should complete within 3 seconds
    });
  });

  describe('Accessibility Integration', () => {
    it('maintains keyboard navigation throughout workflow', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Tab to textarea
      await user.tab();
      expect(screen.getByPlaceholderText(/Enter or paste JSON/)).toHaveFocus();
      
      // Enter JSON
      await user.type(screen.getByPlaceholderText(/Enter or paste JSON/), '{"test": "data"}');
      
      // Tab to analyze button
      await user.tab();
      expect(screen.getByText('Analyze Document')).toHaveFocus();
      
      // Trigger analysis with Enter
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Should be able to navigate tabs with arrow keys
      const overviewTab = screen.getByRole('tab', { name: /overview/i });
      overviewTab.focus();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: /performance/i })).toHaveFocus();
    });

    it('provides appropriate ARIA announcements', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByPlaceholderText(/Enter or paste JSON/);
      await user.type(textArea, '{"test": "data"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Results should have proper heading structure
      expect(screen.getByRole('heading', { name: /analysis results/i })).toBeInTheDocument();
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });
  });
});