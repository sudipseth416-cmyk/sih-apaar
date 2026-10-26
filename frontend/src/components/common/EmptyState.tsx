import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-2xl border border-dashed border-slate-300 shadow-subtle">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-100 to-blue-50 border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
          <Icon className="w-8 h-8 stroke-[1.8]" />
        </div>
      </div>
      <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>
      <p className="mt-1.5 text-xs text-slate-500 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-lg shadow-sm transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
