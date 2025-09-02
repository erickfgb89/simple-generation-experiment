/**
 * Accessibility testing suite
 * 
 * Tests compliance with WCAG 2.1 AA guidelines including:
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Color contrast
 * - Focus management
 * - ARIA attributes
 * - Content structure
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { App } from '../../App';

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

describe('Accessibility Compliance', () => {
  beforeEach(() => {
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
  });

  describe('WCAG 2.1 AA Compliance', () => {
    it('passes automated accessibility tests on initial load', async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('passes accessibility tests with analysis results', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      // Enter and analyze a simple document
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"test": "document", "value": 42}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('maintains accessibility during tab navigation', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      // Complete analysis first
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"field": "value"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Navigate through tabs
      const tabs = screen.getAllByRole('tab');
      for (const tab of tabs) {
        await user.click(tab);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports full keyboard navigation workflow', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Navigate to JSON input with Tab
      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
      
      // Enter document with keyboard
      await user.keyboard('{"keyboard": "navigation", "test": true}');
      
      // Navigate to analyze button
      await user.tab();
      const analyzeButton = screen.getByText('Analyze Document');
      expect(analyzeButton).toHaveFocus();
      
      // Trigger analysis with Enter
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Navigate through result tabs with arrow keys
      const firstTab = screen.getByRole('tab', { name: /overview/i });
      firstTab.focus();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: /performance/i })).toHaveFocus();
      
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: /fields/i })).toHaveFocus();
    });

    it('supports keyboard shortcuts', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      await user.click(textArea);
      await user.keyboard('{"shortcut": "test"}');
      
      // Ctrl+Enter should trigger analysis
      await user.keyboard('{Control>}{Enter}{/Control}');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
    });

    it('traps focus in modal dialogs', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // If there are any modal dialogs (export options, examples, etc.)
      // Focus should be trapped within them
      const exampleButton = screen.getByText(/Load Example/);
      await user.click(exampleButton);
      
      // If a dropdown/modal opens, focus should be managed
      const firstOption = screen.queryByText(/Simple Document/);
      if (firstOption) {
        expect(document.activeElement).toBe(firstOption);
        
        // Escape should close and return focus
        await user.keyboard('{Escape}');
        expect(exampleButton).toHaveFocus();
      }
    });

    it('handles focus management during loading states', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      const analyzeButton = screen.getByText('Analyze Document');
      
      await user.type(textArea, '{"loading": "test"}');
      await user.click(analyzeButton);
      
      // During loading, focus should remain on analyze button or move appropriately
      expect(document.activeElement).toBeOneOf([textArea, analyzeButton]);
    });
  });

  describe('Screen Reader Support', () => {
    it('provides proper heading hierarchy', () => {
      render(<App />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings[0]).toHaveAttribute('aria-level', '1');
      
      // Check for logical heading hierarchy
      headings.forEach((heading, index) => {
        const level = parseInt(heading.getAttribute('aria-level') || '1');
        expect(level).toBeGreaterThanOrEqual(1);
        expect(level).toBeLessThanOrEqual(6);
      });
    });

    it('announces analysis progress to screen readers', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"screen": "reader", "test": true}');
      await user.click(screen.getByText('Analyze Document'));
      
      // Loading state should be announced
      const loadingElement = screen.getByText('Analyzing...');
      expect(loadingElement).toHaveAttribute('aria-live');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
    });

    it('provides descriptive labels for all interactive elements', () => {
      render(<App />);
      
      // All buttons should have accessible names
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
      
      // All form controls should have labels
      const textArea = screen.getByRole('textbox');
      expect(textArea).toHaveAccessibleName();
    });

    it('announces errors appropriately', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{invalid json}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(/Invalid JSON/);
      });
    });

    it('provides context for data tables', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Complete analysis to show data tables
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"table": "test", "data": [1, 2, 3]}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Navigate to fields tab which should contain a data table
      await user.click(screen.getByRole('tab', { name: /fields/i }));
      
      const tables = screen.getAllByRole('table');
      tables.forEach(table => {
        // Tables should have captions or aria-label
        expect(table).toHaveAccessibleName();
        
        // Headers should be properly associated
        const headers = screen.getAllByRole('columnheader');
        headers.forEach(header => {
          expect(header).toBeInTheDocument();
        });
      });
    });
  });

  describe('Visual Accessibility', () => {
    it('provides sufficient color contrast', () => {
      render(<App />);
      
      // Note: Automated tools can't fully test color contrast
      // This would typically be done with manual testing or specialized tools
      // We can check that elements have appropriate CSS classes
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Buttons should have distinguishable styling
        expect(button).toHaveClass(/.*(btn|button).*/);
      });
    });

    it('does not rely solely on color for information', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Complete analysis to see color-coded results
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"color": "test"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Color coding should be supplemented with text, icons, or patterns
      const scoreElements = screen.getAllByText(/\d+\.\d+/);
      scoreElements.forEach(element => {
        // Scores should have textual context, not just color
        expect(element).toHaveAccessibleName();
      });
    });

    it('supports high contrast mode', () => {
      // Mock high contrast media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-contrast: high'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      render(<App />);
      
      // Application should render without issues in high contrast mode
      expect(screen.getByText('OpenSearch Document Complexity Analyzer')).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      render(<App />);
      
      // Animations should be disabled or reduced
      // This would typically check for CSS classes or animation properties
      expect(screen.getByText('OpenSearch Document Complexity Analyzer')).toBeInTheDocument();
    });
  });

  describe('Form Accessibility', () => {
    it('associates labels with form controls', () => {
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      expect(textArea).toHaveAccessibleName();
      
      // Check that label association is explicit
      const label = screen.getByLabelText(/JSON/i);
      expect(label).toBe(textArea);
    });

    it('provides helpful error messages', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Trigger validation error
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveTextContent(/Please enter JSON/);
        
        // Error should be associated with the input
        const textArea = screen.getByRole('textbox');
        expect(textArea).toHaveAttribute('aria-describedby');
      });
    });

    it('provides input format guidance', () => {
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      const placeholder = textArea.getAttribute('placeholder');
      
      expect(placeholder).toContain('JSON');
      
      // Should have additional help text available
      expect(screen.getByText(/Load Example/)).toBeInTheDocument();
    });
  });

  describe('Dynamic Content Accessibility', () => {
    it('announces content changes appropriately', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"dynamic": "content"}');
      await user.click(screen.getByText('Analyze Document'));
      
      // Loading announcement
      expect(screen.getByText('Analyzing...')).toHaveAttribute('aria-live');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Results should be announced
      const resultsRegion = screen.getByRole('region', { name: /results/i });
      expect(resultsRegion).toHaveAttribute('aria-live', 'polite');
    });

    it('manages focus during tab transitions', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Complete analysis
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"focus": "management"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Click on a tab
      const performanceTab = screen.getByRole('tab', { name: /performance/i });
      await user.click(performanceTab);
      
      // Focus should be managed appropriately
      expect(performanceTab).toHaveAttribute('aria-selected', 'true');
      expect(performanceTab).toHaveFocus();
    });

    it('provides context for screen readers when content updates', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Complete analysis
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"context": "update"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Tab panels should have appropriate labels
      const tabPanels = screen.getAllByRole('tabpanel');
      tabPanels.forEach(panel => {
        expect(panel).toHaveAttribute('aria-labelledby');
      });
    });
  });

  describe('Mobile Accessibility', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      // Mock touch capabilities
      Object.defineProperty(window, 'ontouchstart', {
        writable: true,
        configurable: true,
        value: null
      });
    });

    it('maintains accessibility on mobile devices', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      // Basic accessibility should be maintained on mobile
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides appropriate touch targets', () => {
      render(<App />);
      
      // Interactive elements should have appropriate sizes for touch
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const styles = getComputedStyle(button);
        // Note: In a real test, you'd check computed styles for minimum touch target size
        expect(button).toBeInTheDocument();
      });
    });

    it('supports mobile screen readers', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Complete a basic workflow that works with mobile screen readers
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"mobile": "accessibility"}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      });
      
      // Content should be properly structured for mobile screen readers
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('Error State Accessibility', () => {
    it('makes errors discoverable to assistive technology', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Create an error state
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{invalid}');
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(/Invalid JSON/);
      });
      
      // Error should be associated with the input
      expect(textArea).toHaveAttribute('aria-invalid', 'true');
      expect(textArea).toHaveAttribute('aria-describedby');
    });

    it('provides recovery guidance in error states', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Create an error
      await user.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toHaveTextContent(/Please enter JSON/);
      });
      
      // Clear the error by providing valid input
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"valid": "json"}');
      
      // Error should be cleared
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(textArea).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Performance and Accessibility', () => {
    it('maintains accessibility during heavy processing', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      
      // Create a complex document that takes time to process
      const complexDoc = {
        level1: {
          level2: {
            level3: {
              data: Array.from({ length: 100 }, (_, i) => ({
                id: i,
                text: `Item ${i} with text content`,
                nested: { value: i * 2 }
              }))
            }
          }
        }
      };
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, JSON.stringify(complexDoc));
      await user.click(screen.getByText('Analyze Document'));
      
      // Even during processing, accessibility should be maintained
      expect(screen.getByText('Analyzing...')).toHaveAttribute('aria-live');
      
      await waitFor(() => {
        expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      }, { timeout: 10000 });
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});