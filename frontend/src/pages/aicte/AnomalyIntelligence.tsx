import React, { useEffect, useState } from 'react';
import {
  BrainCircuit,
  AlertTriangle,
  ShieldAlert,
  Activity,
  CheckCircle2,
  ChevronRight,
  Info,
  X,
  FileSearch,
  Sparkles,
  Zap,
  Flame,
  Gauge,
  Sliders,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { api } from '../../services/api';

export const AnomalyIntelligence: React.FC = () => {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [selectedEval, setSelectedEval] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnomalies();
  }, []);

  const loadAnomalies = async () => {
    setLoading(true);
    try {
      const [evalRes, statRes] = await Promise.all([
        api.getAnomalies(),
        api.getAnomalyStats(),
      ]);
      setEvaluations(evalRes.evaluations);
      setStats(statRes);
    } catch (err) {
      console.error('Failed to load anomaly engine:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-display">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              AI Anomaly & Risk Intelligence
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 shadow-2xs">
              Neural Risk Evaluator • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hybrid risk detection engine combining rule-based heuristics, temporal burst metrics, and multi-factor neural scoring.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-800 border border-purple-200 shadow-2xs flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span>Multi-Factor Hybrid Engine Active</span>
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Critical Risk Institutions"
            value={stats.distribution.critical}
            subText="Score ≥ 75 (Immediate inquiry required)"
            icon={ShieldAlert}
            variant={stats.distribution.critical > 0 ? 'danger' : 'default'}
          />
          <StatCard
            title="Elevated Risk Level"
            value={stats.distribution.elevated}
            subText="Score 50-74 (Formal notice issued)"
            icon={AlertTriangle}
            variant={stats.distribution.elevated > 0 ? 'warning' : 'default'}
          />
          <StatCard
            title="Moderate Flagged"
            value={stats.distribution.moderate}
            subText="Score 25-49 (Verification backlog)"
            icon={Activity}
            variant="info"
          />
          <StatCard
            title="Nominal / Compliant"
            value={stats.distribution.low}
            subText="Score < 25 (Baseline compliance)"
            icon={CheckCircle2}
            variant="success"
          />
        </div>
      )}

      {/* Anomaly Risk Rankings Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Institutional Anomaly Risk Rankings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Transparent risk scores (0–100) computed from multi-dimensional feature vectors</p>
          </div>
          <span className="text-xs text-slate-600 font-mono font-bold bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            {evaluations.length} Institutions Evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4 text-center">Calculated Risk Score</th>
                <th className="py-3 px-4 text-center">Risk Classification</th>
                <th className="py-3 px-4">Primary Anomaly Drivers</th>
                <th className="py-3 px-4 text-right">Investigation Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {evaluations.map(e => (
                <tr key={e.institutionId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        e.riskScore >= 75 ? 'bg-rose-500 animate-pulse' : e.riskScore >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                      <span>{e.institutionName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">{e.state}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <span
                        className={`font-mono font-black px-3 py-1 rounded-xl text-xs shadow-2xs ${
                          e.riskScore >= 75
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : e.riskScore >= 50
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : e.riskScore >= 25
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {e.riskScore} <span className="text-[10px] opacity-70">/ 100</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={e.riskLevel} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {e.contributingFactors.length > 0 ? (
                        e.contributingFactors.map((f: any, idx: number) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                              f.impact === 'HIGH'
                                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            <Flame className={`w-3 h-3 ${f.impact === 'HIGH' ? 'text-rose-600' : 'text-amber-500'}`} />
                            <span>{f.factor}</span>
                            <span className="font-mono opacity-80">(+{f.scoreContribution})</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-emerald-700 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          Nominal statistical baseline
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedEval(e)}
                      className="px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-all shadow-2xs inline-flex items-center gap-1 active:scale-98"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Explain Score</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explainable Anomaly Breakdown Drawer */}
      {selectedEval && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-indigo-50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-200 text-purple-800">
                      <BrainCircuit className="w-4 h-4" />
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{selectedEval.institutionName}</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-mono mt-1">
                    {selectedEval.state} • Academic Cohort: 2026–2027
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEval(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white shadow-2xs transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Score Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-50/50 to-slate-50 border border-purple-200 flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">
                      Composite Risk Score
                    </span>
                    <div className="text-3xl font-black font-mono text-slate-900 mt-1">
                      {selectedEval.riskScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <StatusBadge status={selectedEval.riskLevel} size="md" />
                  </div>
                </div>

                {/* Contributing Factors with Score Impact */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-purple-600" />
                    <span>Contributing Anomaly Drivers</span>
                  </h4>
                  {selectedEval.contributingFactors.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEval.contributingFactors.map((f: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-slate-900">{f.factor}</span>
                            <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                              +{f.scoreContribution} pts
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No adverse risk drivers detected.</p>
                  )}
                </div>

                {/* Supporting Statistical Metrics */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-blue-600" />
                    <span>Underlying Regulatory Metrics</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Intake Utilization</span>
                      <strong className="font-mono text-base text-slate-800">{selectedEval.metrics.intakeUtilization}%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Verification Failure</span>
                      <strong className="font-mono text-base text-slate-800">{selectedEval.metrics.verificationFailureRate}%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Duplicate Ratio</span>
                      <strong className="font-mono text-base text-slate-800">{selectedEval.metrics.duplicateEnrolmentRate}%</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Burst Ingestion Score</span>
                      <strong className="font-mono text-base text-slate-800">{selectedEval.metrics.lateSubmissionBurstScore}/100</strong>
                    </div>
                  </div>
                </div>

                {/* AICTE Recommended Regulatory Action */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs mb-1.5">
                    <Info className="w-4 h-4 text-blue-700" />
                    <span>Recommended AICTE Regulatory Action</span>
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed font-medium">
                    {selectedEval.recommendedAction}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setSelectedEval(null)}
                className="w-full py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-2xs transition-colors"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
