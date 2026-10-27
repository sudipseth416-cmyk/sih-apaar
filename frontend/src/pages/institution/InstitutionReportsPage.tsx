import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, FileSpreadsheet, Layers, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const InstitutionReportsPage: React.FC = () => {
  const { user } = useAuth();
  const instId = user?.institutionId || 'inst-kolkata-01';

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-display">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <FileText className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Regulatory Compliance & Enrolment Reports</h1>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
            Cycle 2026–2027
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Export verified institutional admission data, APAAR verification audit manifests, and AICTE compliance certificates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF Compliance Report Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between space-y-6 hover:shadow-elevated transition-all">
          <div>
            <div className="p-3 bg-gradient-to-tr from-rose-500 to-rose-600 text-white rounded-2xl w-fit mb-4 shadow-sm">
              <FileText className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Official AICTE Compliance Audit Report (PDF)</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
              Standardized regulatory audit report containing approved intake ceilings, category allocations, utilization percentages, and registered regulatory infractions.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Digitally signed regulatory document</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sanctioned vs reported category breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified against AICTE Academic Session 2026–2027</span>
              </div>
            </div>
          </div>

          <a
            href={api.getInstitutionReportPdfUrl(instId)}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Download Signed Audit PDF</span>
          </a>
        </div>

        {/* CSV Raw Data Export */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col justify-between space-y-6 hover:shadow-elevated transition-all">
          <div>
            <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl w-fit mb-4 shadow-sm">
              <FileSpreadsheet className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Intake & Category Dataset (CSV)</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
              Machine-readable tabular export of institutional seat allocation, remaining capacity balances, and active enrolment counts.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full programme-wise breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Compatible with Excel & central MIS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Raw tabular export for statistical audits</span>
              </div>
            </div>
          </div>

          <a
            href={api.getInstitutionReportCsvUrl(instId)}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-200 shadow-2xs active:scale-98"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export Raw CSV Dataset</span>
          </a>
        </div>
      </div>
    </div>
  );
};
