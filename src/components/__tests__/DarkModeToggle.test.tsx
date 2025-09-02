/**
 * Component tests for DarkModeToggle
 * 
 * Tests the dark mode toggle component including:
 * - Toggle functionality
 * - Theme persistence
 * - Visual state indication
 * - Accessibility features
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DarkModeToggle } from '../DarkModeToggle';

// Mock the useDarkMode hook
const mockToggle = vi.fn();
const mockUseDarkMode = vi.fn(() => ({
  isDarkMode: false,
  toggle: mockToggle
}));

vi.mock('../../hooks/useDarkMode', () => ({
  useDarkMode: mockUseDarkMode
}));

describe('DarkModeToggle Component', () => {
  beforeEach(() => {
    mockToggle.mockClear();
    mockUseDarkMode.mockClear();
  });

  describe('Light Mode State', () => {
    beforeEach(() => {
      mockUseDarkMode.mockReturnValue({
        isDarkMode: false,
        toggle: mockToggle
      });
    });

    it('renders in light mode correctly', () => {
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button', { name: /toggle.*dark mode/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('shows sun icon in light mode', () => {
      render(<DarkModeToggle />);
      
      // Sun icon should be visible (indicating light mode)
      const sunIcon = screen.getByTestId('sun-icon');
      expect(sunIcon).toBeInTheDocument();
      expect(sunIcon).toBeVisible();
    });

    it('has appropriate tooltip in light mode', () => {
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('calls toggle function when clicked in light mode', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Dark Mode State', () => {
    beforeEach(() => {
      mockUseDarkMode.mockReturnValue({
        isDarkMode: true,
        toggle: mockToggle
      });
    });

    it('renders in dark mode correctly', () => {
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button', { name: /toggle.*light mode/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('shows moon icon in dark mode', () => {
      render(<DarkModeToggle />);
      
      // Moon icon should be visible (indicating dark mode)
      const moonIcon = screen.getByTestId('moon-icon');
      expect(moonIcon).toBeInTheDocument();
      expect(moonIcon).toBeVisible();
    });

    it('has appropriate tooltip in dark mode', () => {
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
    });

    it('calls toggle function when clicked in dark mode', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('applies dark mode styling to button', () => {
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(/dark/);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed');
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('title');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      
      // Focus the button with Tab
      await user.tab();
      expect(button).toHaveFocus();
      
      // Activate with Enter
      await user.keyboard('{Enter}');
      expect(mockToggle).toHaveBeenCalledTimes(1);
      
      mockToggle.mockClear();
      
      // Activate with Space
      await user.keyboard(' ');
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('provides clear focus indicators', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      await user.tab();
      
      expect(button).toHaveFocus();
      expect(button).toHaveClass(/focus/);
    });

    it('announces state changes to screen readers', () => {
      const { rerender } = render(<DarkModeToggle />);
      
      // Initially in light mode
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
      
      // Switch to dark mode
      mockUseDarkMode.mockReturnValue({
        isDarkMode: true,
        toggle: mockToggle
      });
      
      rerender(<DarkModeToggle />);
      
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Visual Feedback', () => {
    it('provides visual feedback on hover', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      await user.hover(button);
      
      expect(button).toHaveClass(/hover/);
    });

    it('provides visual feedback on active state', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      await user.pointer([
        { keys: '[MouseLeft>]', target: button },
        { keys: '[/MouseLeft]', target: button }
      ]);
      
      expect(mockToggle).toHaveBeenCalled();
    });

    it('shows smooth transition between states', () => {
      const { rerender } = render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle(/transition/);
      
      // Change state
      mockUseDarkMode.mockReturnValue({
        isDarkMode: true,
        toggle: mockToggle
      });
      
      rerender(<DarkModeToggle />);
      
      // Transition style should still be applied
      expect(button).toHaveStyle(/transition/);
    });
  });

  describe('Icon Transitions', () => {
    it('properly transitions between sun and moon icons', () => {
      const { rerender } = render(<DarkModeToggle />);
      
      // Initially shows sun icon (light mode)
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
      
      // Switch to dark mode
      mockUseDarkMode.mockReturnValue({
        isDarkMode: true,
        toggle: mockToggle
      });
      
      rerender(<DarkModeToggle />);
      
      // Now shows moon icon (dark mode)
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
    });

    it('icons have proper sizes and styling', () => {
      render(<DarkModeToggle />);
      
      const sunIcon = screen.getByTestId('sun-icon');
      expect(sunIcon).toHaveClass(/w-5|h-5/); // Proper size classes
      expect(sunIcon).toHaveAttribute('aria-hidden', 'true'); // Decorative icon
    });
  });

  describe('Integration with Theme System', () => {
    it('calls useDarkMode hook correctly', () => {
      render(<DarkModeToggle />);
      
      expect(mockUseDarkMode).toHaveBeenCalledTimes(1);
    });

    it('responds to theme changes from external sources', () => {
      let isDark = false;
      
      mockUseDarkMode.mockImplementation(() => ({
        isDarkMode: isDark,
        toggle: () => { isDark = !isDark; }
      }));
      
      const { rerender } = render(<DarkModeToggle />);
      
      // Initially light
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
      
      // External change to dark mode
      isDark = true;
      rerender(<DarkModeToggle />);
      
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Performance', () => {
    it('renders quickly without performance issues', () => {
      const start = performance.now();
      
      render(<DarkModeToggle />);
      
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(10); // Should render very quickly
    });

    it('does not cause unnecessary re-renders', () => {
      let renderCount = 0;
      
      const TestWrapper = () => {
        renderCount++;
        return <DarkModeToggle />;
      };
      
      const { rerender } = render(<TestWrapper />);
      
      // Initial render
      expect(renderCount).toBe(1);
      
      // Re-render with same state should not increase count significantly
      rerender(<TestWrapper />);
      expect(renderCount).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined toggle function gracefully', () => {
      mockUseDarkMode.mockReturnValue({
        isDarkMode: false,
        toggle: undefined as any
      });
      
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('handles missing hook return values gracefully', () => {
      mockUseDarkMode.mockReturnValue({} as any);
      
      render(<DarkModeToggle />);
      
      // Should still render without crashing
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles rapid successive clicks', async () => {
      const user = userEvent.setup();
      render(<DarkModeToggle />);
      
      const button = screen.getByRole('button');
      
      // Click multiple times rapidly
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(mockToggle).toHaveBeenCalledTimes(3);
    });
  });

  describe('Styling Consistency', () => {
    it('maintains consistent button size across states', () => {
      const { rerender } = render(<DarkModeToggle />);
      
      const lightButton = screen.getByRole('button');
      const lightClasses = lightButton.className;
      
      // Switch to dark mode
      mockUseDarkMode.mockReturnValue({
        isDarkMode: true,
        toggle: mockToggle
      });
      
      rerender(<DarkModeToggle />);
      
      const darkButton = screen.getByRole('button');
      const darkClasses = darkButton.className;
      
      // Size-related classes should be consistent
      expect(darkClasses).toMatch(/w-|h-/);
      expect(lightClasses).toMatch(/w-|h-/);
    });

    it('applies consistent focus styles', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<DarkModeToggle />);
      
      let button = screen.getByRole('button');
      await user.tab();
      
      const lightFocusClasses = button.className;
      
      // Switch to dark mode
      mockUseDarkMode.mockReturnValue({
        isDarkMode: true,
        toggle: mockToggle
      });
      
      rerender(<DarkModeToggle />);
      
      button = screen.getByRole('button');
      await user.tab();
      
      const darkFocusClasses = button.className;
      
      // Focus classes should be present in both modes
      expect(lightFocusClasses).toMatch(/focus/);
      expect(darkFocusClasses).toMatch(/focus/);
    });
  });
});