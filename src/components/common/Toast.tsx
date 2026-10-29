import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-gold-300/60 shadow-luxury rounded-lg p-3.5 flex items-start gap-3 transition-all duration-300 animate-dialog-content"
          role="status"
          aria-live="polite"
        >
          <div className="mt-0.5 text-burgundy-600 flex-shrink-0">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-burgundy-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-espresso-900">{toast.title}</p>
            {toast.message && (
              <p className="text-xs text-espresso-700/80 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-espresso-700/50 hover:text-espresso-900 p-0.5 rounded transition"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

