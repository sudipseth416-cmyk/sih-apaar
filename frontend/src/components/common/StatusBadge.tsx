import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const norm = status?.toUpperCase().trim() || 'UNKNOWN';
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  if (['VERIFIED', 'COMPLIANT', 'APPROVED', 'ACTIVE', 'RESOLVED'].includes(norm)) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/90 shadow-2xs ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {norm}
      </span>
    );
  }

  if (['PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'UNDER_INVESTIGATION', 'TRANSFER_PENDING'].includes(norm)) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200/90 shadow-2xs ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        {norm.replace('_', ' ')}
      </span>
    );
  }

  if (['FLAGGED_MISMATCH', 'VIOLATION', 'CRITICAL', 'OVERLAPPING_ENROLMENT', 'SUSPENDED', 'HIGH'].includes(norm)) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200/90 shadow-2xs ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
        {norm.replace('_', ' ')}
      </span>
    );
  }

  if (['UNAVAILABLE', 'REJECTED', 'REVOKED', 'EXPIRED', 'WITHDRAWN'].includes(norm)) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-300/80 shadow-2xs ${sizeClasses}`}>
        <XCircle className="w-3.5 h-3.5 text-slate-500" />
        {norm}
      </span>
    );
  }

  if (norm === 'TRANSFERRED') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200/90 shadow-2xs ${sizeClasses}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
        TRANSFERRED
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs ${sizeClasses}`}>
      <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />
      {norm}
    </span>
  );
};
