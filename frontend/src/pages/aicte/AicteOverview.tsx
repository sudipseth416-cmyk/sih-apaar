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
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 bg-slate-200 rounded-2xl"></div>
          <div className="h-72 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const { kpis, stateSummary, topViolations } = data;

  // Chart data for Verification Distribution
  const verifiedCount = Math.round(kpis.totalActiveEnrolment * 0.95);
  const flaggedCount = kpis.totalActiveEnrolment - verifiedCount;
  const verificationPieData = [
    { name: 'APAAR Verified', value: verifiedCount, color: '#16A34A' },
    { name: 'Pending Review / Mismatch', value: flaggedCount, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 text-white shadow-elevated border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="hidden sm:block w-16 h-16 rounded-2xl bg-white p-1.5 shadow-glow-primary border border-white/20 shrink-0">
              <img
                src="/logo.png"
                alt="APAAR-Sentinel Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/20 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>National Regulatory Ledger Active • AY 2024–25</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                National Regulatory Intelligence Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Monitoring 12 sanctioned technical institutions across 8 states with real-time student identity validation, intake quota excess monitoring, and cross-college conflict detection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all active:scale-98"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Sync Ledger</span>
            </button>
            <button
              onClick={() => onNavigateTab('aicte-copilot')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-glow-primary transition-all active:scale-98"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sanctioned Institutions"
          value={kpis.totalInstitutions}
          subText="Across 8 Indian States"
          icon={Building2}
          onClick={() => onNavigateTab('aicte-institutions')}
          variant="info"
        />
        <StatCard
          title="Indexed Student Enrolments"
          value={kpis.totalActiveEnrolment.toLocaleString()}
          subText={`${kpis.nationalUtilization}% National Capacity Utilized`}
          icon={Users}
          trend={{ value: '1,109 Records', isPositive: true }}
          onClick={() => onNavigateTab('aicte-students')}
          variant="success"
        />
        <StatCard
          title="Active Intake Violations"
          value={kpis.violationsCount}
          subText="Institutions exceeding quota"
          icon={AlertOctagon}
          variant={kpis.violationsCount > 0 ? 'danger' : 'default'}
          trend={{ value: '+27 CSE Excess', isPositive: false }}
          onClick={() => onNavigateTab('aicte-compliance')}
        />
        <StatCard
          title="Active Conflict Cases"
          value="1"
          subText="Overlapping dual-college enrolments"
          icon={Network}
          variant="warning"
          trend={{ value: 'Action Required', isPositive: false }}
          onClick={() => onNavigateTab('aicte-conflicts')}
        />
      </div>

      {/* Quick Regulatory Workflows Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateTab('aicte-compliance')}
          className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-subtle transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-900">Intake Violations</div>
          <div className="text-[11px] text-slate-500">Audit excess seat claims</div>
        </button>

        <button
          onClick={() => onNavigateTab('aicte-conflicts')}
          className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-subtle transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Network className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-900">Conflict Network</div>
          <div className="text-[11px] text-slate-500">Visual Rahul Sharma case</div>
        </button>

        <button
          onClick={() => onNavigateTab('aicte-geography')}
          className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-subtle transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-900">Geographic Heatmap</div>
          <div className="text-[11px] text-slate-500">State risk distribution</div>
        </button>

        <button
          onClick={() => onNavigateTab('aicte-copilot')}
          className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-subtle transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Bot className="w-4 h-4" />
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-900">Regulatory Copilot</div>
          <div className="text-[11px] text-slate-500">Query DB in natural language</div>
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State Admissions Chart */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Enrolment & Capacity by State</h2>
              <p className="text-xs text-slate-500">Sanctioned intake capacity vs. reported admissions per state</p>
            </div>
            <button
              onClick={() => onNavigateTab('aicte-geography')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              <span>Explore Map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateSummary} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="state" tick={{ fontSize: 11 }} angle={-25} textAnchor="end" stroke="#64748B" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748B" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="sanctioned_seats" name="Sanctioned Intake" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="active_admissions" name="Actual Admissions" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Status Distribution */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">APAAR Verification Health</h2>
            <p className="text-xs text-slate-500">Identity verification rate across national ledger</p>
          </div>
          <div className="h-52 my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Verification Confidence</span>
            <span className="font-extrabold text-emerald-600 font-mono text-sm">95.4%</span>
          </div>
        </div>
      </div>

      {/* Critical Intake Capacity Infractions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">Critical Intake Capacity Infractions</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">Institutions reporting admissions exceeding AICTE approved ceilings</p>
          </div>
          <button
            onClick={() => onNavigateTab('aicte-compliance')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Full Compliance Records</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200/80 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Infraction Details</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {topViolations.map((v: any) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {v.institution_name}
                    <div className="text-[11px] font-normal text-slate-500">AICTE ID: {v.aicte_id}</div>
                  </td>
                  <td className="py-3.5 px-4">{v.state}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900">{v.programme_name || 'B.Tech CSE'}</span>
                    <span className="text-[10px] ml-1 text-slate-500">({v.programme_code || 'CSE'})</span>
                  </td>
                  <td className="py-3.5 px-4 text-rose-700 font-semibold max-w-sm">
                    {v.description}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={v.severity} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onNavigateTab('aicte-compliance')}
                      className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all active:scale-98"
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
