import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subText?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subText,
  icon: Icon,
  trend,
  variant = 'default',
  onClick,
}) => {
  const variantStyles = {
    default: {
      card: 'bg-gradient-to-br from-white via-slate-50/60 to-slate-100/40 border-slate-200/90 text-slate-900 hover:border-slate-400 shadow-xs',
      accent: 'bg-gradient-to-r from-slate-500 to-slate-700',
      iconBox: 'bg-gradient-to-tr from-slate-700 to-slate-900 text-white shadow-md shadow-slate-900/15',
      valueColor: 'text-slate-900',
    },
    success: {
      card: 'bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 border-emerald-200 hover:border-emerald-400 text-emerald-950 shadow-xs',
      accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      iconBox: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20',
      valueColor: 'text-emerald-950',
    },
    warning: {
      card: 'bg-gradient-to-br from-white via-amber-50/50 to-amber-100/30 border-amber-200 hover:border-amber-400 text-amber-950 shadow-xs',
      accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
      iconBox: 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20',
      valueColor: 'text-amber-950',
    },
    danger: {
      card: 'bg-gradient-to-br from-white via-rose-50/60 to-rose-100/40 border-rose-200 hover:border-rose-400 text-rose-950 shadow-xs',
      accent: 'bg-gradient-to-r from-rose-500 to-red-600',
      iconBox: 'bg-gradient-to-tr from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/25',
      valueColor: 'text-rose-900',
    },
    info: {
      card: 'bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/30 border-blue-200 hover:border-blue-400 text-blue-950 shadow-xs',
      accent: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      iconBox: 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20',
      valueColor: 'text-blue-950',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 font-display ${style.card} ${
        onClick ? 'cursor-pointer hover:shadow-elevated hover:-translate-y-0.5 active:scale-[0.99]' : ''
      }`}
    >
      {/* Top Accent Gradient Line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${style.accent}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">{title}</p>
          <p className={`mt-2 text-2.5xl font-black tracking-tight font-display ${style.valueColor}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl shrink-0 transition-transform ${style.iconBox}`}>
          <Icon className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {(subText || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600 gap-2">
          {subText && <span className="truncate font-medium text-[11px]">{subText}</span>}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-full shrink-0 border ${
                trend.isPositive
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-rose-100 text-rose-800 border-rose-200'
              }`}
            >
              {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trend.value}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
