import React, { useEffect, useState } from 'react';
import { Search, Filter, Building2, ExternalLink, Download, AlertTriangle, ShieldCheck, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { api } from '../../services/api';

export const InstitutionRegistry: React.FC = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    loadInstitutions();
  }, [search, selectedState]);

  const loadInstitutions = async () => {
    setLoading(true);
    try {
      const res = await api.getInstitutions({
        search: search || undefined,
        state: selectedState || undefined,
      });
      setInstitutions(res.institutions);
    } catch (err) {
      console.error('Failed to load institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (inst: any) => {
    setSelectedInstitution(inst);
    setModalLoading(true);
    try {
      const detail = await api.getInstitution(inst.id);
      setSelectedInstitution(detail);
    } catch (err) {
      console.error('Failed to load institution details:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const states = ['West Bengal', 'Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Gujarat'];

  return (
    <div className="space-y-6 font-display">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Institutional Registry</h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
              AICTE Directory • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Master directory of approved technical institutions, capacity utilization, and automated regulatory risk scoring.
          </p>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
          Showing <span className="font-extrabold text-blue-600 font-mono text-sm">{institutions.length}</span> Approved Institutions
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by college name, AICTE ID, district..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50 hover:bg-white focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          >
            <option value="">All States ({states.length})</option>
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {selectedState && (
            <button
              onClick={() => setSelectedState('')}
              className="text-xs text-blue-600 font-bold px-2 py-1 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Institutions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">AICTE Institution</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Sanctioned Intake</th>
                <th className="py-3 px-4 text-right">Admitted</th>
                <th className="py-3 px-4 text-center">Utilization</th>
                <th className="py-3 px-4 text-center">Risk Score</th>
                <th className="py-3 px-4 text-center">Regulatory Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {institutions.map(inst => {
                const util = inst.total_approved_intake > 0 
                  ? Math.round((inst.total_active_enrolment / inst.total_approved_intake) * 100)
                  : 0;

                return (
                  <tr key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {inst.name}
                      <div className="text-[11px] font-mono text-slate-500 font-medium">
                        AICTE ID: {inst.aicte_id}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {inst.district}, {inst.state}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                        {inst.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-700">
                      {inst.total_approved_intake}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-mono font-bold ${util > 100 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {inst.total_active_enrolment}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                          util > 100
                            ? 'bg-rose-200 text-rose-950 font-black'
                            : util >= 90
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {util}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold px-2.5 py-0.5 rounded-md text-[11px] ${
                          inst.risk_score >= 70
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : inst.risk_score >= 30
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {inst.risk_score}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={inst.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(inst)}
                        className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all shadow-2xs active:scale-98"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institution Detail Modal */}
      {selectedInstitution && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-3xl">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedInstitution.institution?.name || selectedInstitution.name}
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-1 font-medium">
                  AICTE ID: {selectedInstitution.institution?.aicte_id || selectedInstitution.aicte_id} • {selectedInstitution.institution?.state || selectedInstitution.state}
                </p>
              </div>
              <button
                onClick={() => setSelectedInstitution(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white shadow-2xs transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Program Wise Capacity Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Programmes & Sanctioned Capacity (Academic Session 2026–2027)
                </h4>
                {selectedInstitution.programmes ? (
                  <div className="space-y-2.5">
                    {selectedInstitution.programmes.map((p: any) => {
                      const isOver = p.current_admissions > p.approved_intake;
                      return (
                        <div
                          key={p.id}
                          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between shadow-2xs ${
                            isOver ? 'bg-rose-50/80 border-rose-300' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-slate-900">{p.name}</span>
                            <span className="text-slate-500 ml-1 font-medium">({p.code})</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono">
                            <span className="text-slate-600">
                              Approved: <strong className="text-slate-900">{p.approved_intake}</strong>
                            </span>
                            <span className="text-slate-600">
                              Admitted: <strong className={isOver ? 'text-rose-700' : 'text-slate-900'}>{p.current_admissions}</strong>
                            </span>
                            {isOver && (
                              <span className="px-2 py-0.5 rounded-md bg-rose-200 text-rose-950 font-black text-[10px]">
                                +{p.current_admissions - p.approved_intake} EXCESS
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">Loading programmes...</div>
                )}
              </div>

              {/* Download Report Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">Official Regulatory Audit Report • Team Stratix</span>
                <div className="flex gap-2">
                  <a
                    href={api.getInstitutionReportPdfUrl(selectedInstitution.institution?.id || selectedInstitution.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-98"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Signed PDF</span>
                  </a>
                  <a
                    href={api.getInstitutionReportCsvUrl(selectedInstitution.institution?.id || selectedInstitution.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <span>CSV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
