import React, { useEffect, useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, RotateCw, Download, FileText, ChevronRight, Award, Layers, BarChart3, Building2 } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { api } from '../../services/api';

export const AdmissionCompliance: React.FC = () => {
  const [violations, setViolations] = useState<any[]>([]);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [selectedInstId, setSelectedInstId] = useState<string>('inst-kolkata-01');
  const [complianceSummary, setComplianceSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedInstId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [vRes, iRes, cRes] = await Promise.all([
        api.getViolations(),
        api.getInstitutions(),
        selectedInstId ? api.getInstitutionCompliance(selectedInstId) : Promise.resolve(null),
      ]);
      setViolations(vRes.alerts);
      setInstitutions(iRes.institutions);
      setComplianceSummary(cRes);
    } catch (err) {
      console.error('Failed to load compliance data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      await api.recalculateCompliance();
      await loadData();
    } catch (err) {
      console.error('Recalculation error:', err);
    } finally {
      setRecalculating(false);
    }
  };

  return (
    <div className="space-y-6 font-display">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Admission & Intake Compliance Portal
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
              Academic Session 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time regulatory audit comparing institutional admissions against approved regular, category, and supernumerary quotas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRecalculate}
            disabled={recalculating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 shadow-2xs transition-all active:scale-98"
          >
            <RotateCw className={`w-3.5 h-3.5 text-blue-600 ${recalculating ? 'animate-spin' : ''}`} />
            <span>{recalculating ? 'Auditing Central Ledger...' : 'Recalculate Compliance Engine'}</span>
          </button>
        </div>
      </div>

      {/* Active Compliance Infractions Banner */}
      <div className="bg-gradient-to-r from-rose-500/10 via-rose-50/80 to-amber-500/10 border border-rose-300 rounded-2xl p-5 shadow-subtle relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-700 text-white shadow-md shadow-rose-500/30 shrink-0">
            <ShieldAlert className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-rose-950 flex items-center gap-2">
                <span>Active Regulatory Infraction: Unsanctioned Intake Excess Detected</span>
              </h3>
              <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                CRITICAL REGULATORY ALERT
              </span>
            </div>
            <p className="mt-1.5 text-xs text-rose-900 leading-relaxed font-medium">
              <strong>Tech Institute of Technology, Kolkata</strong> has reported <span className="font-mono font-bold text-rose-950 bg-rose-200/60 px-1.5 py-0.5 rounded">145</span> regular admissions in B.Tech Computer Science and Engineering against an approved ceiling of <span className="font-mono font-bold text-rose-950 bg-rose-200/60 px-1.5 py-0.5 rounded">120</span> seats. Confirmed excess: <strong className="text-rose-700">+25 unapproved admissions (120.8% capacity utilization)</strong>.
            </p>
            <div className="mt-3.5 flex items-center gap-3">
              <button
                onClick={() => setSelectedInstId('inst-kolkata-01')}
                className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5 active:scale-98"
              >
                <span>Audit College A Records</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-rose-800 font-medium">
                Automatic audit tag registered on AICTE National Ledger
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Institution Selector & Compliance Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
          <div>
            <h2 className="text-base font-bold text-slate-900">Institutional Intake Audit Ledger</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select an institution to inspect sanctioned intake vs active enrolments</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Institution:
            </label>
            <select
              value={selectedInstId}
              onChange={e => setSelectedInstId(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3.5 py-2 bg-slate-50 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              {institutions.map(inst => (
                <option key={inst.id} value={inst.id}>
                  {inst.name} ({inst.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Institution Summary Strip */}
        {complianceSummary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 border border-slate-200">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sanctioned Seats</p>
              <p className="text-2xl font-black font-mono text-slate-900 mt-1">
                {complianceSummary.totalApprovedIntake}
              </p>
              <span className="text-[10px] text-blue-600 font-medium">Approved by AICTE</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Admissions</p>
              <p className="text-2xl font-black font-mono text-indigo-900 mt-1">
                {complianceSummary.totalActiveEnrolment}
              </p>
              <span className="text-[10px] text-indigo-600 font-medium">Enrolled in Cohort</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Intake Utilization</p>
              <p
                className={`text-2xl font-black font-mono mt-1 ${
                  complianceSummary.overallUtilization > 100
                    ? 'text-rose-600'
                    : complianceSummary.overallUtilization >= 95
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {complianceSummary.overallUtilization}%
              </p>
              <span className={`text-[10px] font-bold ${complianceSummary.overallUtilization > 100 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {complianceSummary.overallUtilization > 100 ? 'Over Sanctioned Limit' : 'Within Approved Capacity'}
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Regulatory Integrity</p>
              <div className="mt-2">
                <StatusBadge
                  status={complianceSummary.hasViolations ? 'VIOLATION' : 'COMPLIANT'}
                  size="md"
                />
              </div>
            </div>
          </div>
        )}

        {/* Programme Level Audit Table */}
        {complianceSummary && (
          <div className="overflow-x-auto rounded-xl border border-slate-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Programme & Degree</th>
                  <th className="py-3 px-4 text-center">Approved Regular</th>
                  <th className="py-3 px-4 text-center">Reported Regular</th>
                  <th className="py-3 px-4 text-center">NRI Quota</th>
                  <th className="py-3 px-4 text-center">Supernumerary</th>
                  <th className="py-3 px-4 text-center min-w-[140px]">Utilization</th>
                  <th className="py-3 px-4 text-center">Remaining / Excess</th>
                  <th className="py-3 px-4 text-right">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {complianceSummary.programmes.map((p: any) => {
                  const isViolation = p.excessAdmissions > 0;
                  return (
                    <tr
                      key={p.programmeId}
                      className={isViolation ? 'bg-rose-50/60 hover:bg-rose-50 transition-colors' : 'hover:bg-slate-50/80 transition-colors'}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isViolation ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          <span>{p.programmeName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium pl-4">
                          Code: <span className="font-mono text-slate-700">{p.programmeCode}</span> • Degree: {p.degree}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">{p.approvedIntake}</td>
                      <td className={`py-3.5 px-4 text-center font-mono font-black ${isViolation ? 'text-rose-700 text-sm' : 'text-slate-900'}`}>
                        {p.regularAdmissions}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{p.nriAdmissions}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{p.supernumeraryAdmissions}</td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={`font-mono font-black px-2.5 py-0.5 rounded-full text-[10px] ${
                              isViolation
                                ? 'bg-rose-200 text-rose-950'
                                : p.utilizationPercentage >= 95
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {p.utilizationPercentage}%
                          </span>
                          <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isViolation
                                  ? 'bg-gradient-to-r from-rose-500 to-rose-700'
                                  : p.utilizationPercentage >= 95
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-600'
                                  : 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                              }`}
                              style={{ width: `${Math.min(100, p.utilizationPercentage)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-bold">
                        {isViolation ? (
                          <span className="text-rose-700 font-extrabold bg-rose-100 px-2 py-0.5 rounded">+{p.excessAdmissions} Excess</span>
                        ) : (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{p.remainingCapacity} Available</span>
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
        )}

        {/* Download Compliance Certificate / Report */}
        {selectedInstId && (
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Official Signed Compliance Ledger • Reference Cycle 2026–2027
            </span>
            <a
              href={api.getInstitutionReportPdfUrl(selectedInstId)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Generate Signed AICTE Audit PDF</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
