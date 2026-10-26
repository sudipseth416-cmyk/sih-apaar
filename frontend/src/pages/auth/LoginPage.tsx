import React, { useState } from 'react';
import { Shield, ArrowRight, UserCheck, School, GraduationCap, Sparkles, Lock, CheckCircle2, Building, ShieldCheck, Database } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemoUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setError('');
    setLoading(true);
    try {
      await loginAsDemoUser(demoEmail, demoPass);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Platform Mission & Architectural Highlights */}
        <div className="lg:col-span-6 space-y-6 text-white p-4 sm:p-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Smart India Hackathon • AICTE Digital Public Infrastructure</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-glow-primary border border-white/20 shrink-0">
                <img
                  src="/logo.png"
                  alt="APAAR-Sentinel Emblem"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  APAAR-Sentinel
                </h1>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mt-0.5">
                  Secure Student Data • Smarter Governance • Stronger Education
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Real-time student identity validation, AI-driven cross-institution conflict resolution, predictive admission simulation, and cryptographic digital enrolment credentials.
            </p>
          </div>

          {/* Core Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">12-Digit APAAR Engine</div>
                <div className="text-[11px] text-slate-400">Demographic matching with zero phantom enrolments</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <School className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Intake Quota Compliance</div>
                <div className="text-[11px] text-slate-400">Automated alerts for excess admissions across quotas</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Dynamic Conflict Graph</div>
                <div className="text-[11px] text-slate-400">Visual cross-university enrolment link audit & resolution</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Verifiable Passports</div>
                <div className="text-[11px] text-slate-400">HMAC-SHA256 QR sealed student credentials</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex items-center gap-6 border-t border-white/10 text-xs text-slate-400">
            <div>
              <span className="font-bold text-white text-sm">12</span> Institutions
            </div>
            <div>
              <span className="font-bold text-white text-sm">1,109</span> Verified Students
            </div>
            <div>
              <span className="font-bold text-emerald-400 text-sm">100%</span> Sandbox Ready
            </div>
          </div>
        </div>

        {/* Right Column: Portal Login & One-Click Personas */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portal Access</h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                Live Demonstration
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select a pre-seeded institutional role below or log in with official credentials.
            </p>
          </div>

          {/* One-Click Demonstration Personas */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Instant One-Click Login
            </p>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin('aicte.admin@aicte-india.org', 'admin123')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 text-left transition-all group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">AICTE Regulatory Administrator</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">National Audit</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Dr. Ramesh Chandra • AI Copilot, Heatmap & Compliance</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin('admin@tit-kolkata.edu.in', 'admin123')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/60 text-left transition-all group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">College A: Tech Institute of Technology</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded">145/120 CSE Alert</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Kolkata • Smart Bulk Upload & Admission Simulator</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin('admin@apex-bengaluru.edu.in', 'admin123')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/60 text-left transition-all group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700">College B: Apex National Engineering</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded">Transfer Flow</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Bengaluru • Cross-College Transfer Dispute Handling</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin('rahul.sharma@student.apaar.gov.in', 'student123')}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/60 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-700">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 group-hover:text-amber-700">Student Rahul</p>
                    <p className="text-[10px] text-slate-500">Dual Enrolment Dispute</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin('priya.das@student.apaar.gov.in', 'student123')}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 text-left transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-100 text-blue-700">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 group-hover:text-blue-700">Student Priya</p>
                    <p className="text-[10px] text-slate-500">QR Passport & Privacy</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </button>
            </div>
          </div>

          {/* Traditional Manual Login Form Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Or Manual Sign In
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form className="space-y-3.5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Official Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@aicte-india.org or college.edu.in"
                className="mt-1 w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-2xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In with Credentials'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-[10px] text-slate-400 font-medium">
            AICTE Regulatory Public Sandbox • Cryptographic HMAC-SHA256 Seals Active
          </div>
        </div>
      </div>
    </div>
  );
};
