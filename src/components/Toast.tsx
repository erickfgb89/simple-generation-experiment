import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(onRemove, 300); // Wait for exit animation
  };

  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon,
  };

  const styles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  };

  const iconStyles = {
    success: 'text-green-500 dark:text-green-400',
    error: 'text-red-500 dark:text-red-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    info: 'text-blue-500 dark:text-blue-400',
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={`
        ${styles[toast.type]} 
        border rounded-lg shadow-lg p-4 max-w-sm transition-all duration-300 ease-out
        ${isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-0 translate-x-8 scale-95'
        }
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconStyles[toast.type]}`} />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm">{toast.title}</h3>
          {toast.message && (
            <p className="text-xs mt-1 opacity-90">{toast.message}</p>
          )}
          {toast.action && (
            <div className="mt-2">
              <button
                onClick={() => {
                  toast.action!.onClick();
                  handleRemove();
                }}
                className="text-xs font-medium underline hover:no-underline opacity-80 hover:opacity-100"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleRemove}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Helper functions for common toast types
export const toast = {
  success: (title: string, message?: string, options?: Partial<Toast>): Omit<Toast, 'id'> => ({
    type: 'success' as const,
    title,
    ...(message && { message }),
    ...options,
  }),
  error: (title: string, message?: string, options?: Partial<Toast>): Omit<Toast, 'id'> => ({
    type: 'error' as const,
    title,
    ...(message && { message }),
    ...options,
  }),
  warning: (title: string, message?: string, options?: Partial<Toast>): Omit<Toast, 'id'> => ({
    type: 'warning' as const,
    title,
    ...(message && { message }),
    ...options,
  }),
  info: (title: string, message?: string, options?: Partial<Toast>): Omit<Toast, 'id'> => ({
    type: 'info' as const,
    title,
    ...(message && { message }),
    ...options,
  }),
};