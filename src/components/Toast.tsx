import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-grace-gold-dark shrink-0" />
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-[90vw] w-max animate-slide-up">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-grace-espresso text-white shadow-grace-floating text-xs font-medium tracking-wide">
        {iconMap[toast.type]}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
