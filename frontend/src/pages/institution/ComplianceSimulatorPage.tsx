import React, { useEffect, useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, RotateCcw, Info, Sliders, Layers } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const ComplianceSimulatorPage: React.FC = () => {
  const { user } = useAuth();
  const instId = user?.institutionId || 'inst-kolkata-01';

  const [programmes, setProgrammes] = useState<any[]>([]);
  const [selectedProgId, setSelectedProgId] = useState<string>('');
  const [scenarioName, setScenarioName] = useState('Fall 2026 Proposed Counselling Intake');

  // Proposed batch counts by category
  const [proposedCategories, setProposedCategories] = useState({
    GENERAL: 10,
    OBC: 5,
    SC: 3,
    ST: 1,
    EWS: 2,
    NRI: 0,
    SUPERNUMERARY_PMSSS: 1,
    SUPERNUMERARY_TFW: 1,
  });

  const [simulationResult, setSimulationResult] = useState<any | null>(null);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    loadProgrammes();
  }, [instId]);

  const loadProgrammes = async () => {
    try {
      const res = await api.getInstitution(instId);
      setProgrammes(res.programmes || []);
      if (res.programmes?.length > 0) {
        setSelectedProgId(res.programmes[0].id);
        // Automatically run initial simulation
        runSim(res.programmes[0].id);
      }
    } catch (err) {
      console.error('Failed to load programmes:', err);
    }
  };

  const runSim = async (progIdToRun?: string) => {
    const pid = progIdToRun || selectedProgId;
    if (!pid) return;

    setSimulating(true);
    try {
      const batches = Object.entries(proposedCategories).map(([category, count]) => ({
        category,
        count: Number(count) || 0,
      }));

      const res = await api.runSimulation({
        institutionId: instId,
        programmeId: pid,
        proposedBatches: batches,
        scenarioName,
      });
      setSimulationResult(res);
    } catch (err: any) {
      alert('Simulation error: ' + err.message);
    } finally {
      setSimulating(false);
    }
  };

  const handleCategoryChange = (cat: string, val: number) => {
    setProposedCategories(prev => ({
      ...prev,
      [cat]: Math.max(0, val),
    }));
  };

  return (
    <div className="space-y-6 font-display">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Calculator className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Predictive Admission Compliance Simulator
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
              Sandbox Engine • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate hypothetical admission quotas before formal regulatory submission to prevent AICTE capacity violations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sandbox Isolated: Committed Records Remain Unaltered</span>
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulation Inputs */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Simulation Parameters</span>
            </h3>
            <span className="text-xs text-slate-600 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">Session 2026–2027</span>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Programme to Test
            </label>
            <select
              value={selectedProgId}
              onChange={e => {
                setSelectedProgId(e.target.value);
                runSim(e.target.value);
              }}
              className="w-full text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              {programmes.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.code}) — Sanctioned: {p.approved_intake} seats
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Scenario Description
            </label>
            <input
              type="text"
              value={scenarioName}
              onChange={e => setScenarioName(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Proposed Additional Admissions by Category
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {Object.entries(proposedCategories).map(([cat, count]) => (
                <div
                  key={cat}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{cat.replace(/_/g, ' ')}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={count}
                      onChange={e => handleCategoryChange(cat, parseInt(e.target.value, 10) || 0)}
                      className="w-20 px-2 py-1 text-xs border border-slate-200 rounded-lg text-center font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-2xs"
                    />
                    <span className="text-[11px] text-slate-500 font-medium">seats</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => runSim()}
            disabled={simulating}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 active:scale-98"
          >
            <Calculator className="w-4 h-4" />
            <span>{simulating ? 'Calculating Projections...' : 'Recalculate Projections'}</span>
          </button>
        </div>

        {/* Right Column: Projected Compliance Results */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-6 flex flex-col justify-between">
          {simulationResult ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Projected Regulatory Compliance</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {simulationResult.programmeName} ({simulationResult.programmeCode})
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`font-mono font-black text-xs px-3 py-1 rounded-xl shadow-2xs ${
                      simulationResult.isCompliant
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {simulationResult.isCompliant ? 'COMPLIANT SCENARIO' : 'REGULATORY VIOLATION'}
                  </span>
                </div>
              </div>

              {/* Warnings Banner if Violation */}
              {!simulationResult.isCompliant && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1 shadow-2xs">
                  <div className="font-bold flex items-center gap-1.5 text-rose-900">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>Intake Capacity Exceeded: Action Required</span>
                  </div>
                  {simulationResult.warnings.map((w: string, idx: number) => (
                    <p key={idx} className="text-rose-800 leading-relaxed font-medium">
                      {w}
                    </p>
                  ))}
                </div>
              )}

              {/* Utilization Comparison Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 border border-slate-200 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Sanctioned Intake</span>
                  <p className="text-xl font-black font-mono text-slate-900 mt-1">
                    {simulationResult.approvedIntake}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Enrolment</span>
                  <p className="text-xl font-black font-mono text-slate-900 mt-1">
                    {simulationResult.currentEnrolment}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Proposed Intake</span>
                  <p className="text-xl font-black font-mono text-blue-700 mt-1">
                    +{simulationResult.proposedAdmissions}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Projected Utilization</span>
                  <p
                    className={`text-xl font-black font-mono mt-1 ${
                      simulationResult.projectedUtilization > 100 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {simulationResult.projectedUtilization}%
                  </p>
                </div>
              </div>

              {/* Category-Wise Breakdown Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Category Breakdown & Quota Compliance
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-[10px] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3 text-center">Current</th>
                        <th className="py-2.5 px-3 text-center">Proposed</th>
                        <th className="py-2.5 px-3 text-center">Projected Total</th>
                        <th className="py-2.5 px-3 text-right">Quota Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {simulationResult.categoryBreakdown.map((c: any) => (
                        <tr key={c.category} className={c.isExceeded ? 'bg-rose-50/60' : 'hover:bg-slate-50'}>
                          <td className="py-2.5 px-3 font-bold text-slate-800">{c.category}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-slate-600">{c.current}</td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-600">+{c.proposed}</td>
                          <td className="py-2.5 px-3 text-center font-mono font-black text-slate-900">{c.projected}</td>
                          <td className="py-2.5 px-3 text-right font-medium">
                            {c.isExceeded ? (
                              <span className="text-rose-700 font-black bg-rose-100 px-2 py-0.5 rounded text-[10px]">Exceeds Cap</span>
                            ) : (
                              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Permitted</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations Box */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs shadow-2xs">
                <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
                  <Info className="w-4 h-4 text-blue-700" />
                  <span>Compliance Engine Recommendations</span>
                </div>
                {simulationResult.recommendations.map((rec: string, idx: number) => (
                  <p key={idx} className="text-blue-900 leading-relaxed font-medium">
                    {rec}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-slate-400">
              Loading simulation parameters...
            </div>
          )}

          <div className="text-[11px] text-slate-400 text-center pt-2 font-medium">
            AICTE Predictive Admission Capacity Simulator • Team Stratix 2026–2027
          </div>
        </div>
      </div>
    </div>
  );
};
