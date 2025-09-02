/**
 * Component tests for JsonInput
 * 
 * Tests the JSON input component functionality including:
 * - JSON validation and parsing
 * - Error handling and display
 * - User interactions
 * - Accessibility features
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JsonInput } from '../JsonInput';

describe('JsonInput Component', () => {
  const mockOnAnalyze = vi.fn();
  const mockOnClear = vi.fn();

  const defaultProps = {
    onAnalyze: mockOnAnalyze,
    onClear: mockOnClear,
    isAnalyzing: false
  };

  beforeEach(() => {
    mockOnAnalyze.mockClear();
    mockOnClear.mockClear();
  });

  describe('Rendering', () => {
    it('renders the component with default state', () => {
      render(<JsonInput {...defaultProps} />);
      
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('Analyze Document')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('shows loading state when analyzing', () => {
      render(<JsonInput {...defaultProps} isAnalyzing={true} />);
      
      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
      expect(screen.getByText('Analyze Document')).toBeDisabled();
    });

    it('displays placeholder text correctly', () => {
      render(<JsonInput {...defaultProps} />);
      
      expect(screen.getByPlaceholderText(/Enter or paste JSON/)).toBeInTheDocument();
    });
  });

  describe('JSON Input Handling', () => {
    it('accepts valid JSON input', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      const validJson = '{"name": "test", "value": 42}';
      
      await user.type(textArea, validJson);
      
      expect(textArea).toHaveValue(validJson);
    });

    it('handles complex nested JSON correctly', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const complexJson = JSON.stringify({
        user: {
          profile: {
            name: 'John Doe',
            preferences: {
              theme: 'dark',
              notifications: true
            }
          },
          history: [
            { action: 'login', timestamp: '2023-01-01T00:00:00Z' },
            { action: 'view_page', timestamp: '2023-01-01T00:01:00Z' }
          ]
        }
      }, null, 2);
      
      const textArea = screen.getByRole('textbox');
      await user.clear(textArea);
      await user.type(textArea, complexJson);
      
      expect(textArea).toHaveValue(complexJson);
    });

    it('accepts large JSON documents', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      // Create a large JSON object
      const largeObject = Array.from({ length: 100 }, (_, i) => ({
        [`field${i}`]: `value${i}`,
        [`nested${i}`]: {
          subField: `subValue${i}`,
          number: i
        }
      })).reduce((acc, item, i) => ({ ...acc, [`item${i}`]: item }), {});
      
      const largeJson = JSON.stringify(largeObject);
      const textArea = screen.getByRole('textbox');
      
      await user.clear(textArea);
      await user.type(textArea, largeJson);
      
      expect(textArea).toHaveValue(largeJson);
    });
  });

  describe('JSON Validation', () => {
    it('shows error for invalid JSON', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      const invalidJson = '{"name": "test", "value": 42'; // Missing closing brace
      
      await user.type(textArea, invalidJson);
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
      });
      
      expect(mockOnAnalyze).not.toHaveBeenCalled();
    });

    it('shows error for empty input', async () => {
      render(<JsonInput {...defaultProps} />);
      
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText(/Please enter JSON/)).toBeInTheDocument();
      });
      
      expect(mockOnAnalyze).not.toHaveBeenCalled();
    });

    it('shows error for non-object JSON', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      
      // Test with array
      await user.type(textArea, '[1, 2, 3]');
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByText(/must be a JSON object/)).toBeInTheDocument();
      });
      
      expect(mockOnAnalyze).not.toHaveBeenCalled();
    });

    it('shows specific error messages for different JSON syntax errors', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const testCases = [
        { json: '{name: "test"}', errorPattern: /quote/ },
        { json: '{"name": test"}', errorPattern: /unexpected token/ },
        { json: '{"name": "test",}', errorPattern: /trailing comma|unexpected token/ }
      ];
      
      for (const testCase of testCases) {
        const textArea = screen.getByRole('textbox');
        await user.clear(textArea);
        await user.type(textArea, testCase.json);
        fireEvent.click(screen.getByText('Analyze Document'));
        
        await waitFor(() => {
          expect(screen.getByText(testCase.errorPattern)).toBeInTheDocument();
        });
        
        // Clear error for next test
        await user.clear(textArea);
      }
    });
  });

  describe('User Interactions', () => {
    it('calls onAnalyze with parsed JSON when analyze button is clicked', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      const validJson = '{"name": "test", "value": 42}';
      
      await user.type(textArea, validJson);
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(mockOnAnalyze).toHaveBeenCalledWith({ name: 'test', value: 42 });
      });
    });

    it('calls onClear when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{"test": "data"}');
      
      fireEvent.click(screen.getByText('Clear'));
      
      expect(mockOnClear).toHaveBeenCalled();
      expect(textArea).toHaveValue('');
    });

    it('supports keyboard shortcuts for analyze action', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      const validJson = '{"name": "test"}';
      
      await user.type(textArea, validJson);
      await user.keyboard('{Control>}{Enter}');
      
      await waitFor(() => {
        expect(mockOnAnalyze).toHaveBeenCalledWith({ name: 'test' });
      });
    });

    it('disables buttons during analysis', () => {
      render(<JsonInput {...defaultProps} isAnalyzing={true} />);
      
      expect(screen.getByText('Analyze Document')).toBeDisabled();
      expect(screen.getByText('Clear')).toBeDisabled();
    });

    it('shows progress indicator during analysis', () => {
      render(<JsonInput {...defaultProps} isAnalyzing={true} />);
      
      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /analyzing/i })).toBeInTheDocument();
    });
  });

  describe('Example Data Loading', () => {
    it('provides sample JSON examples', () => {
      render(<JsonInput {...defaultProps} />);
      
      expect(screen.getByText(/Load Example/)).toBeInTheDocument();
    });

    it('loads different example types correctly', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      // Click on examples dropdown/button
      const examplesButton = screen.getByText(/Load Example/);
      await user.click(examplesButton);
      
      // Should show example options
      expect(screen.getByText(/Simple Document/)).toBeInTheDocument();
      expect(screen.getByText(/Complex Document/)).toBeInTheDocument();
      expect(screen.getByText(/E-commerce Product/)).toBeInTheDocument();
    });

    it('loads simple example correctly', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const examplesButton = screen.getByText(/Load Example/);
      await user.click(examplesButton);
      await user.click(screen.getByText(/Simple Document/));
      
      const textArea = screen.getByRole('textbox');
      expect(textArea).toHaveValue();
      
      // Should be valid JSON
      expect(() => JSON.parse(textArea.value)).not.toThrow();
    });

    it('loads complex example correctly', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const examplesButton = screen.getByText(/Load Example/);
      await user.click(examplesButton);
      await user.click(screen.getByText(/Complex Document/));
      
      const textArea = screen.getByRole('textbox');
      expect(textArea).toHaveValue();
      
      // Should be valid complex JSON
      const parsed = JSON.parse(textArea.value);
      expect(typeof parsed).toBe('object');
      expect(Object.keys(parsed).length).toBeGreaterThan(3);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<JsonInput {...defaultProps} />);
      
      expect(screen.getByRole('textbox')).toHaveAccessibleName();
      expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    it('announces errors to screen readers', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, '{invalid json}');
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(/Invalid JSON/);
      });
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      // Tab through elements
      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Analyze Document')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Clear')).toHaveFocus();
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      const analyzeButton = screen.getByText('Analyze Document');
      
      await user.click(textArea);
      expect(textArea).toHaveFocus();
      
      await user.click(analyzeButton);
      // Focus should remain on analyze button or return to textarea
      expect(document.activeElement).toBeOneOf([textArea, analyzeButton]);
    });

    it('provides clear error descriptions', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        const error = screen.getByRole('alert');
        expect(error).toHaveTextContent(/Please enter JSON/);
      });
    });
  });

  describe('Performance', () => {
    it('handles large JSON input without performance issues', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      // Create large JSON (but not so large it times out the test)
      const largeJson = JSON.stringify(
        Array.from({ length: 1000 }, (_, i) => ({ 
          id: i, 
          name: `Item ${i}`,
          data: { value: i * 2, timestamp: Date.now() }
        }))
      );
      
      const start = performance.now();
      
      const textArea = screen.getByRole('textbox');
      await user.clear(textArea);
      await user.type(textArea, largeJson);
      
      const duration = performance.now() - start;
      
      // Should complete in reasonable time (this is generous for CI environments)
      expect(duration).toBeLessThan(5000);
      expect(textArea).toHaveValue(largeJson);
    });

    it('validates JSON efficiently', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const complexJson = JSON.stringify({
        level1: {
          level2: {
            level3: {
              level4: {
                data: Array.from({ length: 100 }, (_, i) => ({ 
                  field: `value${i}` 
                }))
              }
            }
          }
        }
      });
      
      const textArea = screen.getByRole('textbox');
      await user.type(textArea, complexJson);
      
      const start = performance.now();
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(mockOnAnalyze).toHaveBeenCalled();
      });
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100); // Validation should be very fast
    });
  });

  describe('Error Recovery', () => {
    it('clears errors when valid JSON is entered', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      
      // Enter invalid JSON
      await user.type(textArea, '{invalid}');
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      
      // Enter valid JSON
      await user.clear(textArea);
      await user.type(textArea, '{"valid": "json"}');
      
      // Error should be cleared
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('allows retry after validation error', async () => {
      const user = userEvent.setup();
      render(<JsonInput {...defaultProps} />);
      
      const textArea = screen.getByRole('textbox');
      
      // First attempt with invalid JSON
      await user.type(textArea, '{invalid}');
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      
      // Fix the JSON
      await user.clear(textArea);
      await user.type(textArea, '{"valid": "json"}');
      fireEvent.click(screen.getByText('Analyze Document'));
      
      await waitFor(() => {
        expect(mockOnAnalyze).toHaveBeenCalledWith({ valid: 'json' });
      });
    });
  });
});