import React, { useEffect, useState } from 'react';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  UploadCloud,
  Calculator,
  UserPlus,
  Download,
  Building2,
  Clock,
  ArrowUpRight,
  Sparkles,
  FileText,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface CollegeOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const CollegeOverview: React.FC<CollegeOverviewProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const instId = user?.institutionId || 'inst-kolkata-01';

  const [stats, setStats] = useState<any | null>(null);
  const [compliance, setCompliance] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollegeData();
  }, [instId]);

  const loadCollegeData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes] = await Promise.all([
        api.getInstitutionStats(instId),
        api.getInstitutionCompliance(instId),
      ]);
      setStats(sRes);
      setCompliance(cRes);
    } catch (err) {
      console.error('Failed to load college stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="p-8 space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* College Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{stats.name}</h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
              AICTE ID: {stats.aicteId}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Institutional Student Data Administration, APAAR Batch Verification & Sanctioned Seat Compliance • Session 2024–2025.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('college-upload')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-glow-primary transition-all active:scale-98"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Smart Bulk Upload</span>
          </button>
          <button
            onClick={() => onNavigateTab('college-simulator')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-2xs transition-all active:scale-98"
          >
            <Calculator className="w-4 h-4 text-slate-500" />
            <span>Admission Simulator</span>
          </button>
        </div>
      </div>

      {/* Intake Infraction Alert for College A */}
      {stats.hasViolations && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-rose-50/70 to-amber-50/40 border border-rose-300 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-rose-950">
                  AICTE Regulatory Infraction Alert: Sanctioned Intake Exceeded
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 uppercase">
                  Critical
                </span>
              </div>
              <p className="mt-1 text-xs text-rose-900/90 leading-relaxed max-w-3xl">
                Computer Science & Engineering has reported <strong>145</strong> regular admissions against an AICTE approved ceiling of <strong>120</strong> seats (+25 excess seats, 120.8% utilization). An automated audit tag has been registered on the AICTE National Ledger.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('college-simulator')}
            className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-glow-rose shrink-0 transition-all active:scale-98"
          >
            Run Remediation Simulation
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reported Students"
          value={stats.totalEnrolled.toLocaleString()}
          subText={`${stats.utilizationPercentage}% of approved intake`}
          icon={Users}
          onClick={() => onNavigateTab('college-students')}
          variant="info"
        />
        <StatCard
          title="APAAR Verified Students"
          value={stats.verifiedStudents.toLocaleString()}
          subText={`${stats.verificationRate}% verification rate`}
          icon={ShieldCheck}
          variant="success"
          trend={{ value: 'High Confidence', isPositive: true }}
          onClick={() => onNavigateTab('college-students')}
        />
        <StatCard
          title="Verification Flags / Pending"
          value={stats.pendingVerification}
          subText="Name discrepancies or pending checks"
          icon={Clock}
          variant={stats.pendingVerification > 0 ? 'warning' : 'default'}
          onClick={() => onNavigateTab('college-students')}
        />
        <StatCard
          title="Pending Student Corrections"
          value={stats.pendingCorrectionRequests}
          subText="Transfer clearance & name updates"
          icon={AlertTriangle}
          variant={stats.pendingCorrectionRequests > 0 ? 'info' : 'default'}
          trend={{ value: 'Review Needed', isPositive: false }}
          onClick={() => onNavigateTab('college-corrections')}
        />
      </div>

      {/* Sanctioned Programmes & Admissions Status */}
      {compliance && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Sanctioned Programmes & Capacity Status</h2>
              <p className="text-xs text-slate-500 mt-0.5">Current active enrolments vs approved intake limits (Academic Session 2024–2025)</p>
            </div>
            <a
              href={api.getInstitutionReportPdfUrl(instId)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all active:scale-98"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Signed Audit PDF</span>
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200/80 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Programme</th>
                  <th className="py-3 px-4 text-center">Approved Capacity</th>
                  <th className="py-3 px-4 text-center">Regular Admissions</th>
                  <th className="py-3 px-4 text-center">NRI Seats</th>
                  <th className="py-3 px-4 text-center">Supernumerary Quota</th>
                  <th className="py-3 px-4 text-center">Utilization</th>
                  <th className="py-3 px-4 text-center">Capacity Balance</th>
                  <th className="py-3 px-4 text-right">Regulatory Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {compliance.programmes.map((p: any) => {
                  const isViolation = p.excessAdmissions > 0;
                  return (
                    <tr
                      key={p.programmeId}
                      className={isViolation ? 'bg-rose-50/50 hover:bg-rose-50 transition-colors' : 'hover:bg-slate-50/80 transition-colors'}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {p.programmeName}
                        <span className="text-slate-500 font-normal ml-1">({p.programmeCode})</span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">{p.approvedIntake}</td>
                      <td className={`py-3.5 px-4 text-center font-mono font-bold ${isViolation ? 'text-rose-700 text-sm' : 'text-slate-900'}`}>
                        {p.regularAdmissions}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{p.nriAdmissions}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{p.supernumeraryAdmissions}</td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded-full text-[10px] ${
                              isViolation
                                ? 'bg-rose-200 text-rose-900'
                                : p.utilizationPercentage >= 95
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {p.utilizationPercentage}%
                          </span>
                          <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isViolation ? 'bg-rose-600' : 'bg-blue-600'}`}
                              style={{ width: `${Math.min(100, p.utilizationPercentage)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold">
                        {isViolation ? (
                          <span className="text-rose-700">+{p.excessAdmissions} Excess</span>
                        ) : (
                          <span className="text-emerald-700">{p.remainingCapacity} Left</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <StatusBadge status={p.complianceStatus} size="sm" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
