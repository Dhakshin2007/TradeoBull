
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-white dark:bg-slate-900 border-[#00d09c]',
    error: 'bg-white dark:bg-slate-900 border-red-500',
    info: 'bg-white dark:bg-slate-900 border-blue-500'
  };

  const icons = {
    success: <CheckCircle2 className="text-[#00d09c]" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <AlertCircle className="text-blue-500" size={20} />
  };

  return (
    <div className={`fixed top-24 right-4 z-[100] animate-in slide-in-from-right fade-in duration-300`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 shadow-xl ${bgColors[type]} border-y border-r border-r-gray-100 dark:border-r-slate-800 border-y-gray-100 dark:border-y-slate-800`}>
        {icons[type]}
        <p className="text-sm font-bold text-gray-800 dark:text-white pr-2">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
