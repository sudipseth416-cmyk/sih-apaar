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
      card: 'bg-white border-slate-200/90 text-slate-900 hover:border-slate-300',
      accent: 'bg-slate-400',
      iconBox: 'bg-slate-100 text-slate-700',
    },
    success: {
      card: 'bg-gradient-to-br from-white to-emerald-50/40 border-emerald-200/90 text-emerald-950 hover:border-emerald-300',
      accent: 'bg-emerald-500',
      iconBox: 'bg-emerald-100 text-emerald-700',
    },
    warning: {
      card: 'bg-gradient-to-br from-white to-amber-50/40 border-amber-200/90 text-amber-950 hover:border-amber-300',
      accent: 'bg-amber-500',
      iconBox: 'bg-amber-100 text-amber-700',
    },
    danger: {
      card: 'bg-gradient-to-br from-white to-rose-50/50 border-rose-200/90 text-rose-950 hover:border-rose-300',
      accent: 'bg-rose-500',
      iconBox: 'bg-rose-100 text-rose-700',
    },
    info: {
      card: 'bg-gradient-to-br from-white to-blue-50/40 border-blue-200/90 text-blue-950 hover:border-blue-300',
      accent: 'bg-blue-600',
      iconBox: 'bg-blue-100 text-blue-700',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border p-5 transition-all shadow-subtle ${style.card} ${
        onClick ? 'cursor-pointer hover:shadow-elevated hover:-translate-y-0.5' : ''
      }`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${style.accent}`} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight font-mono text-slate-900">{value}</p>
        </div>
        <div className={`p-2.5 rounded-xl transition-transform ${style.iconBox} shadow-xs`}>
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      {(subText || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          {subText && <span className="truncate">{subText}</span>}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-semibold text-[11px] px-1.5 py-0.5 rounded-md ${
                trend.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
