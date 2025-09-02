/**
 * Component tests for AnalysisResults
 * 
 * Tests the analysis results display component including:
 * - Results rendering and formatting
 * - Tab navigation and content switching
 * - Data export functionality
 * - Accessibility features
 * - Performance with large datasets
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnalysisResults } from '../results/AnalysisResults';
import type { AnalysisResult } from '../../types';

describe('AnalysisResults Component', () => {
  const createMockResult = (overrides: Partial<AnalysisResult> = {}): AnalysisResult => ({
    // Legacy scores
    indexSizeScore: 6.5,
    complexityScore: 7.2,
    
    // Enhanced scoring dimensions
    scores: {
      queryPerformance: 8.1,
      indexingPerformance: 7.8,
      storageEfficiency: 6.9,
      maintenanceCost: 4.2,
      overall: 7.3
    },
    
    explanations: {
      queryPerformance: {
        factors: [
          { name: 'Text Fields', impact: 12.0, explanation: '3 text fields require analysis' }
        ],
        fieldImpacts: [
          { path: 'title', contribution: 4.0, reason: 'text field analysis' }
        ],
        recommendations: ['Consider keyword fields for exact matching'],
        confidenceInterval: { min: 7.5, max: 8.7, confidence: 0.85 }
      },
      indexingPerformance: {
        factors: [
          { name: 'Text Analysis', impact: 15.0, explanation: '3 text fields require tokenization' }
        ],
        fieldImpacts: [],
        recommendations: ['Disable analysis for exact-match fields'],
        confidenceInterval: { min: 7.1, max: 8.5, confidence: 0.9 }
      },
      storageEfficiency: {
        factors: [
          { name: 'Text Overhead', impact: 6.6, explanation: 'Text fields store analyzed tokens' }
        ],
        fieldImpacts: [],
        recommendations: ['Balance text and numeric fields'],
        confidenceInterval: { min: 6.3, max: 7.5, confidence: 0.8 }
      },
      maintenanceCost: {
        factors: [
          { name: 'Analysis Maintenance', impact: 10.5, explanation: 'Text analyzers require tuning' }
        ],
        fieldImpacts: [],
        recommendations: ['Consider field consolidation'],
        confidenceInterval: { min: 3.2, max: 5.2, confidence: 0.75 }
      }
    },
    
    performanceMetrics: {
      memoryUsageMB: { heap: 125, offHeap: 38, total: 163 },
      cpuUtilization: { indexing: 45, query: 32, maintenance: 18 },
      diskIO: { readOps: 250, writeOps: 180, totalMBps: 2.8 },
      networkBandwidth: { ingestMBps: 1.2, queryMBps: 0.8, replicationMBps: 0.9 }
    },
    
    comparative: {
      documentType: 'Content Document',
      typeConfidence: 0.78,
      percentileRanks: {
        queryPerformance: 82,
        indexingPerformance: 76,
        storageEfficiency: 65,
        maintenanceCost: 34
      },
      typicalRanges: {
        queryPerformance: { min: 3.0, max: 5.8, median: 4.4 },
        indexingPerformance: { min: 3.5, max: 6.2, median: 4.8 },
        storageEfficiency: { min: 3.8, max: 5.5, median: 4.6 },
        maintenanceCost: { min: 5.5, max: 8.5, median: 7.0 }
      }
    },
    
    fieldCount: 12,
    estimatedStorageMB: 45.6,
    fieldTypes: {
      text: 3,
      keyword: 5,
      long: 2,
      integer: 1,
      short: 0,
      byte: 0,
      double: 1,
      float: 0,
      date: 2,
      boolean: 1,
      object: 0,
      nested: 1
    },
    maxDepth: 3,
    
    fields: [
      { path: 'title', type: 'text', isArray: false, depth: 0, complexity: 3.5 },
      { path: 'content', type: 'text', isArray: false, depth: 0, complexity: 4.2 },
      { path: 'author.name', type: 'keyword', isArray: false, depth: 1, complexity: 1.2 },
      { path: 'metadata.tags', type: 'keyword', isArray: true, depth: 1, complexity: 1.8 }
    ],
    
    scoringConfig: {
      version: '1.0.0',
      weights: { queryPerformance: 0.3, indexingPerformance: 0.25, storageEfficiency: 0.25, maintenanceCost: 0.2 },
      useCase: 'general'
    },
    
    warnings: [
      'High number of text fields (3) detected. Each text field requires tokenization.',
      'Deep nesting detected (3 levels). Performance degrades beyond 3 levels.'
    ],
    
    optimizations: [
      'Consider using keyword type for exact-match fields',
      'Flatten nested structures where possible',
      'Evaluate if nested objects are necessary'
    ],
    
    ...overrides
  });

  describe('Rendering', () => {
    it('renders the component with analysis results', () => {
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
      expect(screen.getByText('7.3')).toBeInTheDocument();
    });

    it('displays all main tabs correctly', () => {
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /performance/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /fields/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /optimization/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /comparison/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /export/i })).toBeInTheDocument();
    });

    it('shows overview tab content by default', () => {
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      expect(screen.getByText('Document Classification')).toBeInTheDocument();
      expect(screen.getByText('Content Document')).toBeInTheDocument();
      expect(screen.getByText('Performance Dimensions')).toBeInTheDocument();
    });

    it('displays scoring dimensions with correct values', () => {
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      expect(screen.getByText('Query Performance')).toBeInTheDocument();
      expect(screen.getByText('8.1')).toBeInTheDocument();
      expect(screen.getByText('Indexing Performance')).toBeInTheDocument();
      expect(screen.getByText('7.8')).toBeInTheDocument();
      expect(screen.getByText('Storage Efficiency')).toBeInTheDocument();
      expect(screen.getByText('6.9')).toBeInTheDocument();
      expect(screen.getByText('Maintenance Cost')).toBeInTheDocument();
      expect(screen.getByText('4.2')).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('switches to performance tab when clicked', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
      expect(screen.getByText('Memory Usage')).toBeInTheDocument();
      expect(screen.getByText('163 MB')).toBeInTheDocument(); // Total memory
    });

    it('switches to fields tab when clicked', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      expect(screen.getByText('Field Analysis')).toBeInTheDocument();
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
      expect(screen.getByText('author.name')).toBeInTheDocument();
    });

    it('switches to optimization tab when clicked', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /optimization/i }));
      
      expect(screen.getByText('Optimization Recommendations')).toBeInTheDocument();
      expect(screen.getByText('Warnings')).toBeInTheDocument();
      expect(screen.getByText(/High number of text fields/)).toBeInTheDocument();
      expect(screen.getByText(/Deep nesting detected/)).toBeInTheDocument();
    });

    it('switches to comparison tab when clicked', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /comparison/i }));
      
      expect(screen.getByText('Comparative Analysis')).toBeInTheDocument();
      expect(screen.getByText('Document Type: Content Document')).toBeInTheDocument();
      expect(screen.getByText('82nd percentile')).toBeInTheDocument(); // Query performance percentile
    });

    it('switches to export tab when clicked', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
      
      expect(screen.getByText('Export Results')).toBeInTheDocument();
      expect(screen.getByText('JSON Report')).toBeInTheDocument();
      expect(screen.getByText('CSV Summary')).toBeInTheDocument();
      expect(screen.getByText('PDF Report')).toBeInTheDocument();
    });

    it('maintains proper tab state and aria attributes', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      const performanceTab = screen.getByRole('tab', { name: /performance/i });
      const overviewTab = screen.getByRole('tab', { name: /overview/i });
      
      // Initially, overview should be selected
      expect(overviewTab).toHaveAttribute('aria-selected', 'true');
      expect(performanceTab).toHaveAttribute('aria-selected', 'false');
      
      await user.click(performanceTab);
      
      // After clicking, performance should be selected
      expect(performanceTab).toHaveAttribute('aria-selected', 'true');
      expect(overviewTab).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Performance Metrics Display', () => {
    it('displays memory usage correctly', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      expect(screen.getByText('Heap: 125 MB')).toBeInTheDocument();
      expect(screen.getByText('Off-Heap: 38 MB')).toBeInTheDocument();
      expect(screen.getByText('Total: 163 MB')).toBeInTheDocument();
    });

    it('displays CPU utilization correctly', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      expect(screen.getByText('Indexing: 45%')).toBeInTheDocument();
      expect(screen.getByText('Query: 32%')).toBeInTheDocument();
      expect(screen.getByText('Maintenance: 18%')).toBeInTheDocument();
    });

    it('displays disk I/O metrics correctly', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      expect(screen.getByText('Read Ops: 250/sec')).toBeInTheDocument();
      expect(screen.getByText('Write Ops: 180/sec')).toBeInTheDocument();
      expect(screen.getByText('Total: 2.8 MB/s')).toBeInTheDocument();
    });

    it('displays network bandwidth correctly', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      expect(screen.getByText('Ingest: 1.2 MB/s')).toBeInTheDocument();
      expect(screen.getByText('Query: 0.8 MB/s')).toBeInTheDocument();
      expect(screen.getByText('Replication: 0.9 MB/s')).toBeInTheDocument();
    });
  });

  describe('Field Analysis Display', () => {
    it('displays field information in a table format', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      // Check table headers
      expect(screen.getByText('Field Path')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Depth')).toBeInTheDocument();
      expect(screen.getByText('Complexity')).toBeInTheDocument();
      
      // Check field data
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('text')).toBeInTheDocument();
      expect(screen.getByText('3.5')).toBeInTheDocument();
    });

    it('shows field type distribution', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      expect(screen.getByText('Field Type Distribution')).toBeInTheDocument();
      expect(screen.getByText('Text: 3')).toBeInTheDocument();
      expect(screen.getByText('Keyword: 5')).toBeInTheDocument();
      expect(screen.getByText('Long: 2')).toBeInTheDocument();
    });

    it('highlights complex fields appropriately', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      // Fields with high complexity should be highlighted
      const contentRow = screen.getByText('content').closest('tr');
      expect(contentRow).toHaveClass(/high-complexity|warning|alert/);
    });
  });

  describe('Export Functionality', () => {
    const mockDownload = vi.fn();
    
    beforeEach(() => {
      // Mock URL.createObjectURL and download functionality
      global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');
      global.URL.revokeObjectURL = vi.fn();
      
      // Mock link click for download
      const mockLink = {
        click: mockDownload,
        href: '',
        download: '',
        style: { display: '' }
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('exports JSON report correctly', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
      await user.click(screen.getByText('Download JSON'));
      
      expect(mockDownload).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('exports CSV summary correctly', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
      await user.click(screen.getByText('Download CSV'));
      
      expect(mockDownload).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('shows export options with descriptions', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /export/i }));
      
      expect(screen.getByText(/Complete analysis results in JSON format/)).toBeInTheDocument();
      expect(screen.getByText(/Summary data for spreadsheet analysis/)).toBeInTheDocument();
      expect(screen.getByText(/Professional report with charts/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper tab navigation with keyboard', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
      
      // Tab navigation should work
      await user.tab();
      expect(screen.getByRole('tab', { name: /overview/i })).toHaveFocus();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: /performance/i })).toHaveFocus();
    });

    it('has proper ARIA labels and roles', () => {
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('aria-selected');
        expect(tab).toHaveAttribute('aria-controls');
      });
    });

    it('announces dynamic content changes', async () => {
      const user = userEvent.setup();
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      await user.click(screen.getByRole('tab', { name: /performance/i }));
      
      // Tab panel should have proper labeling
      const tabPanel = screen.getByRole('tabpanel');
      expect(tabPanel).toHaveAttribute('aria-labelledby');
    });

    it('provides alternative text for visual elements', () => {
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      // Score indicators should have accessible text
      const scoreElements = screen.getAllByText(/\d+\.\d/);
      scoreElements.forEach(element => {
        expect(element).toHaveAccessibleName();
      });
    });
  });

  describe('Responsive Design', () => {
    it('adapts to smaller screen sizes', () => {
      // Mock smaller viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      // Component should still render properly
      expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles tab overflow on mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const mockResult = createMockResult();
      render(<AnalysisResults result={mockResult} />);
      
      const tabList = screen.getByRole('tablist');
      expect(tabList).toHaveClass(/scrollable|overflow/);
    });
  });

  describe('Performance with Large Data', () => {
    it('handles large number of fields efficiently', async () => {
      const largeResult = createMockResult({
        fields: Array.from({ length: 1000 }, (_, i) => ({
          path: `field${i}`,
          type: 'keyword' as const,
          isArray: false,
          depth: 0,
          complexity: 1.0
        })),
        fieldCount: 1000
      });
      
      const start = performance.now();
      render(<AnalysisResults result={largeResult} />);
      const renderDuration = performance.now() - start;
      
      expect(renderDuration).toBeLessThan(500); // Should render in under 500ms
      expect(screen.getByText('1000')).toBeInTheDocument(); // Field count display
    });

    it('virtualizes large field lists when necessary', async () => {
      const user = userEvent.setup();
      const largeResult = createMockResult({
        fields: Array.from({ length: 500 }, (_, i) => ({
          path: `field${i}`,
          type: 'keyword' as const,
          isArray: false,
          depth: Math.floor(i / 100),
          complexity: 1.0 + (i % 10) * 0.1
        }))
      });
      
      render(<AnalysisResults result={largeResult} />);
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      // Should show some fields but not necessarily all at once
      expect(screen.getByText('field0')).toBeInTheDocument();
      // May not show the last fields initially due to virtualization
      expect(screen.queryByText('field499')).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('handles missing or malformed data gracefully', () => {
      const incompleteResult = createMockResult({
        performanceMetrics: undefined as any
      });
      
      render(<AnalysisResults result={incompleteResult} />);
      
      // Should still render basic information
      expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      expect(screen.getByText('Overall Score')).toBeInTheDocument();
    });

    it('displays fallback content for missing sections', async () => {
      const user = userEvent.setup();
      const incompleteResult = createMockResult({
        fields: [],
        fieldCount: 0
      });
      
      render(<AnalysisResults result={incompleteResult} />);
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      expect(screen.getByText(/No fields detected/)).toBeInTheDocument();
    });

    it('handles very high or unusual score values', () => {
      const extremeResult = createMockResult({
        scores: {
          queryPerformance: 15.7, // Above normal range
          indexingPerformance: -2.3, // Below normal range
          storageEfficiency: 0,
          maintenanceCost: 10,
          overall: 5.8
        }
      });
      
      render(<AnalysisResults result={extremeResult} />);
      
      // Should clamp or handle extreme values gracefully
      expect(screen.getByText('15.7')).toBeInTheDocument(); // Should display as is
      expect(screen.getByText('-2.3')).toBeInTheDocument(); // Should display as is
    });
  });
});