import React, { useEffect, useState } from 'react';
import {
  Building2,
  Users,
  ShieldCheck,
  ShieldAlert,
  Network,
  TrendingUp,
  AlertOctagon,
  ArrowUpRight,
  Sparkles,
  Bot,
  MapPin,
  FileCheck2,
  RefreshCw,
  Search,
  Activity,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { api } from '../../services/api';

interface AicteOverviewProps {
  onNavigateTab: (tab: string) => void;
}

// Custom Rich Chart Tooltip
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-slate-700/80 text-xs space-y-1.5 font-display min-w-[180px]">
        <p className="font-bold text-slate-200 border-b border-slate-700/60 pb-1 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] text-blue-400 font-semibold">State Ledger</span>
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span>{entry.name}:</span>
            </span>
            <span className="font-black font-mono text-white">
              {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AicteOverview: React.FC<AicteOverviewProps> = ({ onNavigateTab }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOverview();
  }, []);

  const loadOverview = async () => {
    try {
      const res = await api.getComplianceOverview();
      setData(res);
    } catch (err) {
      console.error('Failed to load AICTE overview:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadOverview();
  };

  if (loading || !data) {
    return (
      <div className="p-8 space-y-6 animate-pulse font-display">
        <div className="h-28 bg-slate-200 rounded-3xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-slate-200 rounded-3xl"></div>
          <div className="h-80 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  const { kpis, stateSummary, topViolations } = data;

  // Verification Distribution
  const verifiedCount = Math.round(kpis.totalActiveEnrolment * 0.954);
  const flaggedCount = kpis.totalActiveEnrolment - verifiedCount;
  const verificationPieData = [
    { name: 'APAAR Verified', value: verifiedCount, color: '#10B981' },
    { name: 'Pending Review / Mismatch', value: flaggedCount, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6 font-display">
      
      {/* ========================================================================= */}
      {/* 1. TOP NATIONAL REGULATORY BANNER (Team Stratix 2026–2027)                */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002D4C] via-[#0B3C5D] to-[#1E3A8A] p-6 sm:p-8 text-white shadow-xl border border-slate-700/40">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-lg shrink-0 items-center justify-center">
              <img
                src="/logo.png"
                alt="APAAR-Sentinel Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold mb-2 border border-blue-400/30 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Team Stratix National Regulatory Mesh • Cohort 2026–2027</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                National Regulatory Intelligence Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1.5 max-w-2xl leading-relaxed font-normal">
                Auditing 12 sanctioned technical universities and autonomous colleges across 8 states with real-time student identity validation, intake quota excess monitoring, and cross-college conflict detection.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Sync Ledger</span>
            </button>
            
            <button
              onClick={() => onNavigateTab('aicte-copilot')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Ask AI Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VIBRANT KPI METRIC CARDS                                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sanctioned Institutions"
          value={kpis.totalInstitutions}
          subText="Across 8 Indian States (Central & State Nodes)"
          icon={Building2}
          onClick={() => onNavigateTab('aicte-institutions')}
          variant="info"
        />
        <StatCard
          title="Indexed Student Enrolments"
          value={kpis.totalActiveEnrolment.toLocaleString()}
          subText={`${kpis.nationalUtilization}% National Capacity Utilized`}
          icon={Users}
          trend={{ value: '1,109 Verified', isPositive: true }}
          onClick={() => onNavigateTab('aicte-students')}
          variant="success"
        />
        <StatCard
          title="Active Intake Violations"
          value={kpis.violationsCount}
          subText="Institutions exceeding approved ceiling"
          icon={AlertOctagon}
          variant={kpis.violationsCount > 0 ? 'danger' : 'default'}
          trend={{ value: '+25 CSE Excess', isPositive: false }}
          onClick={() => onNavigateTab('aicte-compliance')}
        />
        <StatCard
          title="Active Conflict Cases"
          value="1"
          subText="Overlapping dual-college degree enrolments"
          icon={Network}
          variant="warning"
          trend={{ value: 'Action Required', isPositive: false }}
          onClick={() => onNavigateTab('aicte-conflicts')}
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. QUICK REGULATORY WORKFLOWS TOOLBAR (Rich Colorful Jewel Cards)         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* Workflow 1: Intake Violations */}
        <button
          onClick={() => onNavigateTab('aicte-compliance')}
          className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/80 via-white to-rose-100/40 border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
          </div>
          <div className="mt-3 text-xs font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
            Intake Violations
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Audit unapproved seats</div>
        </button>

        {/* Workflow 2: Conflict Network */}
        <button
          onClick={() => onNavigateTab('aicte-conflicts')}
          className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Network className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
          </div>
          <div className="mt-3 text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            Conflict Network Graph
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Visual Rahul Sharma case</div>
        </button>

        {/* Workflow 3: Geographic Heatmap */}
        <button
          onClick={() => onNavigateTab('aicte-geography')}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-teal-100/40 border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <div className="mt-3 text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            Geographic Heatmap
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">State risk distribution</div>
        </button>

        {/* Workflow 4: Regulatory Copilot */}
        <button
          onClick={() => onNavigateTab('aicte-copilot')}
          className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-100/40 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-4 h-4 text-amber-300" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="mt-3 text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            Regulatory Copilot
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Natural language audit</div>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* 4. RECHARTS: HIGH-IMPACT VIBRANT CHARTS SECTION                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Chart: State Enrolment & Capacity Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                    <Activity className="w-4 h-4" />
                  </span>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Enrolment vs Sanctioned Capacity by State
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison of approved intake ceilings against reported enrolments (Cohort 2026–2027)
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('aicte-geography')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Map</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateSummary} margin={{ top: 15, right: 10, left: -20, bottom: 25 }}>
                {/* SVG Gradients for Colorful Bars */}
                <defs>
                  <linearGradient id="barSanctionedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                  <linearGradient id="barAdmissionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="state"
                  tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                  angle={-25}
                  textAnchor="end"
                  stroke="#94A3B8"
                />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} stroke="#94A3B8" />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingBottom: '12px' }}
                />
                <Bar
                  dataKey="sanctioned_seats"
                  name="Sanctioned Intake"
                  fill="url(#barSanctionedGrad)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="active_admissions"
                  name="Actual Admissions"
                  fill="url(#barAdmissionsGrad)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>West Bengal: Highest active admissions (324)</span>
            </span>
            <span className="font-semibold text-slate-700">Audit Status: Synchronized</span>
          </div>
        </div>

        {/* Right Chart: Verification Status Distribution (Donut Chart) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                APAAR Identity Verification
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Demographic match confidence rate</p>
          </div>

          <div className="h-56 my-auto relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    border: 'none',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Stat in Donut Hole */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-5">
              <span className="text-2xl font-black text-slate-900 leading-none">95.4%</span>
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider mt-0.5">
                Verified
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">12-Digit APAAR Vault</span>
            <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              1,058 / 1,109 Verified
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. CRITICAL INTAKE CAPACITY INFRACTIONS TABLE                             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-rose-50/40 via-white to-transparent">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-600 text-white shadow-md shadow-rose-500/20">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Critical Intake Capacity Infractions
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Institutions reporting admissions exceeding AICTE approved ceilings (Session 2026–2027)
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('aicte-compliance')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors cursor-pointer"
          >
            <span>Full Compliance Records</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Institution Name</th>
                <th className="py-3.5 px-4">State</th>
                <th className="py-3.5 px-4">Programme</th>
                <th className="py-3.5 px-4">Infraction Details</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {topViolations.map((v: any) => (
                <tr key={v.id} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                      <span>{v.institution_name}</span>
                    </div>
                    <div className="text-[11px] font-normal text-slate-500 mt-0.5 ml-4">
                      AICTE ID: <span className="font-mono">{v.aicte_id}</span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 font-semibold text-slate-700">
                    {v.state}
                  </td>
                  
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {v.programme_code || 'CSE'}
                    </span>
                    <span className="text-[11px] ml-1.5 text-slate-600 font-medium">{v.programme_name || 'B.Tech CSE'}</span>
                  </td>

                  <td className="py-4 px-4 text-rose-700 font-bold max-w-sm">
                    <span className="bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg inline-block">
                      {v.description}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <StatusBadge status={v.severity} size="sm" />
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => onNavigateTab('aicte-compliance')}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
