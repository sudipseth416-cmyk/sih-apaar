import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  UserCheck,
  Building,
  GraduationCap,
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Layers,
  Fingerprint,
  Zap,
  Building2,
  X,
  ChevronRight,
  RefreshCw,
  FileText,
  School,
  BookOpen,
  Check,
  Award,
  Quote,
  Code2,
  Laptop,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DemoPersona {
  id: string;
  email: string;
  pass: string;
  name: string;
  designation: string;
  organization: string;
  roleType: 'AICTE' | 'COLLEGE' | 'STUDENT';
  roleBadge: string;
  badgeColor: string;
  avatarBg: string;
  avatarText: string;
  borderColor: string;
  btnColor: string;
  summary: string;
  scenarioHighlight: string;
}

const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: 'aicte-director',
    email: 'aicte.admin@aicte-india.org',
    pass: 'admin123',
    name: 'Dr. Ramesh Chandra',
    designation: 'Director General & Central Regulatory Apex',
    organization: 'Central Regulatory Oversight Node',
    roleType: 'AICTE',
    roleBadge: 'National Regulator',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    avatarBg: 'bg-blue-600',
    avatarText: 'text-white',
    borderColor: 'border-blue-200 hover:border-blue-500 bg-blue-50/20',
    btnColor: 'bg-blue-700 hover:bg-blue-800 text-white',
    summary: 'National Compliance Ledger, State Anomaly Heatmap & AI Copilot',
    scenarioHighlight: 'National Overview',
  },
  {
    id: 'tit-kolkata',
    email: 'admin@tit-kolkata.edu.in',
    pass: 'admin123',
    name: 'Prof. Subhasis Banerjee',
    designation: 'Registrar & Admissions Dean',
    organization: 'Tech Institute of Technology, Kolkata',
    roleType: 'COLLEGE',
    roleBadge: 'CSE Quota Alert (145/120)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse',
    avatarBg: 'bg-rose-600',
    avatarText: 'text-white',
    borderColor: 'border-rose-200 hover:border-rose-500 bg-rose-50/20',
    btnColor: 'bg-rose-700 hover:bg-rose-800 text-white',
    summary: 'Remediate 145/120 CSE excess intake, CSV upload & seat simulator',
    scenarioHighlight: 'Quota Cap Breach',
  },
  {
    id: 'apex-bengaluru',
    email: 'admin@apex-bengaluru.edu.in',
    pass: 'admin123',
    name: 'Dr. Radhakrishnan Nair',
    designation: 'Dean of Academic Affairs',
    organization: 'Apex National Engineering, Bengaluru',
    roleType: 'COLLEGE',
    roleBadge: 'Transfer Arbitration',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    avatarBg: 'bg-purple-600',
    avatarText: 'text-white',
    borderColor: 'border-purple-200 hover:border-purple-500 bg-purple-50/20',
    btnColor: 'bg-purple-700 hover:bg-purple-800 text-white',
    summary: 'Inter-college migration dispute, student transfer & NOC approval',
    scenarioHighlight: 'Transfer Dispute',
  },
  {
    id: 'student-rahul',
    email: 'rahul.sharma@student.apaar.gov.in',
    pass: 'student123',
    name: 'Rahul Sharma',
    designation: 'Undergraduate Candidate (B.Tech CSE)',
    organization: 'APAAR ID: 9821-4432-8812',
    roleType: 'STUDENT',
    roleBadge: 'Dual Enrolment Dispute',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    avatarBg: 'bg-amber-600',
    avatarText: 'text-white',
    borderColor: 'border-amber-200 hover:border-amber-500 bg-amber-50/20',
    btnColor: 'bg-amber-700 hover:bg-amber-800 text-white',
    summary: 'View conflicting registration flag, dispute timeline & correction request',
    scenarioHighlight: 'Student Grievance',
  },
  {
    id: 'student-priya',
    email: 'priya.das@student.apaar.gov.in',
    pass: 'student123',
    name: 'Priya Das',
    designation: 'Undergraduate Scholar (B.Tech ECE)',
    organization: 'APAAR ID: 9821-7744-1029',
    roleType: 'STUDENT',
    roleBadge: 'Verifiable QR Passport',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    avatarBg: 'bg-emerald-600',
    avatarText: 'text-white',
    borderColor: 'border-emerald-200 hover:border-emerald-500 bg-emerald-50/20',
    btnColor: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    summary: 'HMAC-SHA256 sealed digital passport, QR scanner & consent manager',
    scenarioHighlight: 'Digital Credentials',
  },
];

interface QuoteItem {
  quote: string;
  author: string;
  title: string;
}

const INSPIRATIONAL_QUOTES: QuoteItem[] = [
  {
    quote: 'Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great.',
    author: 'Dr. A. P. J. Abdul Kalam',
    title: 'Former President of India, Aerospace Scientist & Bharat Ratna',
  },
  {
    quote: 'Education is the manifestation of the perfection already in man. Truth, purity, and unselfishness — wherever these are present, there is no power below or above the sun to crush them.',
    author: 'Swami Vivekananda',
    title: 'Philosopher, Reformer & Youth Icon of India',
  },
  {
    quote: 'The true teachers are those who help us think for ourselves, build character, and uphold institutional integrity.',
    author: 'Dr. Sarvepalli Radhakrishnan',
    title: 'Philosopher, Statesman & 2nd President of India',
  },
];

export const LoginPage: React.FC = () => {
  const { login, loginAsDemoUser } = useAuth();
  
  // UI Display Mode: 'dual' (Default: Easy side-by-side view), 'personas' (Instant Personas), or 'form' (Manual Credentials)
  const [displayMode, setDisplayMode] = useState<'dual' | 'personas' | 'form'>('dual');
  const [selectedRolePreset, setSelectedRolePreset] = useState<'AICTE' | 'COLLEGE_A' | 'COLLEGE_B' | 'STUDENT'>('AICTE');

  // Quotes Switcher
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  // Form State
  const [email, setEmail] = useState('aicte.admin@aicte-india.org');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticatingId, setAuthenticatingId] = useState<string | null>(null);

  // Font size accessibility (A- | A | A+)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');

  // SIH Guide Modal
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Fast autofill helper
  const applyPreset = (preset: 'AICTE' | 'COLLEGE_A' | 'COLLEGE_B' | 'STUDENT') => {
    setSelectedRolePreset(preset);
    setError('');
    if (preset === 'AICTE') {
      setEmail('aicte.admin@aicte-india.org');
      setPassword('admin123');
    } else if (preset === 'COLLEGE_A') {
      setEmail('admin@tit-kolkata.edu.in');
      setPassword('admin123');
    } else if (preset === 'COLLEGE_B') {
      setEmail('admin@apex-bengaluru.edu.in');
      setPassword('admin123');
    } else {
      setEmail('rahul.sharma@student.apaar.gov.in');
      setPassword('student123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify prototype credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonaLogin = async (persona: DemoPersona) => {
    setError('');
    setLoading(true);
    setAuthenticatingId(persona.id);
    try {
      await loginAsDemoUser(persona.email, persona.pass);
    } catch (err: any) {
      setError(err.message || `Failed to sign in as ${persona.name}`);
    } finally {
      setLoading(false);
      setAuthenticatingId(null);
    }
  };

  const handlePopulateForm = (persona: DemoPersona) => {
    setEmail(persona.email);
    setPassword(persona.pass);
    setError('');
    window.scrollTo({ top: 580, behavior: 'smooth' });
  };

  const currentQuote = INSPIRATIONAL_QUOTES[activeQuoteIndex];

  return (
    <div
      className={`min-h-screen bg-[#F4F6F9] text-slate-800 font-sans flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900 ${
        fontSize === 'large' ? 'text-base' : fontSize === 'larger' ? 'text-lg' : 'text-sm'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. TOP STRATIX PROTOTYPE UTILITY BAR                                      */}
      {/* ========================================================================= */}
      <div className="w-full bg-white border-b border-slate-200 text-xs text-slate-600 px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Code2 className="w-3 h-3 text-blue-600" />
              <span>Team Stratix</span>
            </span>
            <span className="text-[11px] font-bold text-slate-900 tracking-tight">
              Smart India Hackathon Prototype • AICTE Higher Education DPI Project
            </span>
          </div>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-[11px] text-slate-500 font-medium">
            Cohort Session: 2026–2027
          </span>
        </div>

        {/* Accessibility, Public QR Verifier & Font Size Controls */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-[11px]">
          <button
            type="button"
            onClick={() => {
              applyPreset('AICTE');
              window.scrollTo({ top: 580, behavior: 'smooth' });
            }}
            className="hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Administrator Node</span>
          </button>
          <span className="text-slate-300">|</span>
          <a
            href="/verify"
            className="hover:text-emerald-700 font-semibold flex items-center gap-1 text-emerald-700 cursor-pointer transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-600" />
            <span>Public QR Verifier</span>
          </a>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-500 hidden sm:inline">Accessibility</span>
          
          {/* Font Size Adjuster A- | A | A+ */}
          <div className="flex items-center border border-slate-300 rounded bg-slate-50 text-[10px] font-bold overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 border-r border-slate-300 hover:bg-slate-200 transition-colors ${
                fontSize === 'normal' ? 'bg-[#003350] text-white font-black' : 'text-slate-700'
              }`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 border-r border-slate-300 hover:bg-slate-200 transition-colors ${
                fontSize === 'large' ? 'bg-[#003350] text-white font-black' : 'text-slate-700'
              }`}
              title="Large Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('larger')}
              className={`px-1.5 py-0.5 hover:bg-slate-200 transition-colors ${
                fontSize === 'larger' ? 'bg-[#003350] text-white font-black' : 'text-slate-700'
              }`}
              title="Extra Large Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROTOTYPE HEADER & APAAR-SENTINEL IDENTITY                             */}
      {/* ========================================================================= */}
      <div className="w-full bg-white px-4 sm:px-8 py-4 border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Emblem & Portal Identity */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 bg-white border border-slate-200 rounded-2xl shadow-xs shrink-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="APAAR-Sentinel Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-black text-[#003350] tracking-tight font-display">
                  APAAR-Sentinel
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  Prototype V2.6 (2026–2027)
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wide mt-0.5 font-display">
                Unified Student Identity & Technical Intake Governance Prototype
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Conceived & Architected by <span className="font-bold text-slate-700">Team Stratix</span> • Smart India Hackathon
              </p>
            </div>
          </div>

          {/* Right Team Stratix Prototype Status Pill */}
          <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs">
              <Laptop className="w-3.5 h-3.5 text-blue-600" />
              <span>Team Stratix Innovation Hub</span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-semibold text-slate-600">contact@stratix.dev</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">Sandbox Regulatory Mesh:</span>
              <span className="text-emerald-700 font-bold">12 Central Nodes Simulated (2026–2027)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PRIMARY DEEP NAVY PORTAL NAVIGATION BAR (SVMCM Style)                  */}
      {/* ========================================================================= */}
      <nav className="w-full bg-[#003350] text-white shadow-md sticky top-0 z-30 font-display">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between flex-wrap">
          
          {/* Main Nav Links */}
          <div className="flex items-center overflow-x-auto py-0">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#001D30] font-bold text-xs uppercase tracking-wider px-4 py-3.5 border-b-2 border-emerald-400 text-white flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Home</span>
            </button>
            <a
              href="#about"
              className="hover:bg-[#002740] text-xs font-semibold px-3.5 py-3.5 text-slate-200 hover:text-white transition-colors whitespace-nowrap"
            >
              About Prototype
            </a>
            <a
              href="#framework"
              className="hover:bg-[#002740] text-xs font-semibold px-3.5 py-3.5 text-slate-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Proposed APH 2026–2027 Norms
            </a>
            <a
              href="#institutions"
              className="hover:bg-[#002740] text-xs font-semibold px-3.5 py-3.5 text-slate-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Institutions (12)
            </a>
            <a
              href="#quota"
              className="hover:bg-[#002740] text-xs font-semibold px-3.5 py-3.5 text-slate-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Intake Quota Gatekeeper
            </a>
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="hover:bg-[#002740] text-xs font-semibold px-3.5 py-3.5 text-slate-200 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Scenario Notes
            </button>
          </div>

          {/* Right Action Skewed / Angled Quick Action Buttons */}
          <div className="flex items-center gap-2 py-1.5 sm:py-0">
            <button
              type="button"
              onClick={() => {
                setDisplayMode('dual');
                window.scrollTo({ top: 580, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 transform -skew-x-6 active:scale-95 cursor-pointer"
            >
              <span className="transform skew-x-6 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Quick Sign-In Hub</span>
              </span>
            </button>

            <a
              href="/verify"
              className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 transform -skew-x-6 active:scale-95 cursor-pointer"
            >
              <span className="transform skew-x-6 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" />
                <span>Verify QR Passport</span>
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. TOTAL APPLICANTS & VERIFIED STATS RIBBON (2026–2027 Cohort)            */}
      {/* ========================================================================= */}
      <section className="w-full bg-white py-4 border-b border-slate-200 shadow-2xs font-display">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
          
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Simulated Student Enrolments & Validated APAAR Identifiers (2026–2027 Cohort)
            </h2>
          </div>

          {/* 5 Distinct Colorful Stat Blocks (SVMCM Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-stretch">
            
            {/* Tile 1: Warm Brown / Amber (PMSSS / Supernumerary Quota) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#B45309] text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-black text-slate-900 leading-none">18,700</div>
                <div className="text-xs font-bold text-slate-600 mt-1 truncate">PMSSS & Supernumerary</div>
              </div>
            </div>

            {/* Tile 2: Forest Green (Simulated Central Admissions) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <School className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-black text-slate-900 leading-none">84,418</div>
                <div className="text-xs font-bold text-slate-600 mt-1 truncate">Central Admissions (26–27)</div>
              </div>
            </div>

            {/* Tile 3: Vibrant Crimson Red (Over-Intake Breach Alert) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-rose-200 shadow-xs hover:shadow-md transition-shadow bg-rose-50/20">
              <div className="w-12 h-12 rounded-lg bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-black text-rose-700 leading-none">145 / 120</div>
                <div className="text-xs font-bold text-rose-800 mt-1 truncate">CSE Intake Cap Alert</div>
              </div>
            </div>

            {/* Tile 4: Deep Teal (Approved Intake Capacity) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-[#0F766E] text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-black text-slate-900 leading-none">104,307</div>
                <div className="text-xs font-bold text-slate-600 mt-1 truncate">Approved Seat Quotas</div>
              </div>
            </div>

            {/* Tile 5: Royal Blue (Verified APAAR Passports) */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-200 shadow-xs hover:shadow-md transition-shadow bg-blue-50/20">
              <div className="w-12 h-12 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Shield className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-black text-blue-900 leading-none">1,109</div>
                <div className="text-xs font-bold text-blue-800 mt-1 truncate">Verified APAAR Passports</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HERO BANNER WITH INSPIRATIONAL QUOTES & INSTITUTIONAL FLOWCHART        */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#003352] via-[#004B73] to-[#0A6094] text-white shadow-xl p-6 sm:p-10 border border-slate-700/30">
          
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-400/15 to-transparent pointer-events-none rounded-l-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-6">
              
              {/* Team Stratix Prototype Pill & Quote Switcher */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-900 font-bold text-xs shadow-md font-display">
                  <Award className="w-3.5 h-3.5 text-slate-900" />
                  <span>Team Stratix Prototype Showcase</span>
                  <span className="text-slate-600">•</span>
                  <span>Session 2026–2027</span>
                </div>

                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/20 text-[10px]">
                  {INSPIRATIONAL_QUOTES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveQuoteIndex(idx)}
                      className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                        activeQuoteIndex === idx ? 'bg-amber-400 text-slate-900 font-bold' : 'text-slate-200 hover:text-white'
                      }`}
                    >
                      Quote {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Quote with Merriweather Serif Typography */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Quote className="w-8 h-8 text-amber-300 shrink-0 opacity-80 mt-1" />
                  <blockquote className="text-lg sm:text-2xl font-normal italic tracking-normal text-white leading-relaxed font-quote">
                    &ldquo;{currentQuote.quote}&rdquo;
                  </blockquote>
                </div>
                
                <div className="pl-11">
                  <p className="text-xs sm:text-sm text-amber-300 font-bold uppercase tracking-wider font-display">
                    — {currentQuote.author}
                  </p>
                  <p className="text-[11px] text-slate-300 font-medium">
                    {currentQuote.title}
                  </p>
                  <p className="text-xs text-slate-200 max-w-xl font-normal leading-relaxed pt-2">
                    APAAR-Sentinel is engineered by <strong>Team Stratix</strong> to demonstrate automated quota enforcement, cross-institution dual-enrolment arbitration, and cryptographic digital student passports.
                  </p>
                </div>
              </div>

              {/* Institutional Node Pathway */}
              <div className="pt-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300 pb-3 font-display">
                  Interconnected Technical Education Infrastructure Nodes (Prototype):
                </p>
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 font-display">
                  
                  <div className="flex flex-col items-center text-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center border-2 border-white shadow-md">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5 max-w-[80px]">
                      AICTE Central Node
                    </span>
                  </div>

                  <div className="h-0.5 w-6 sm:w-10 bg-white/40 shrink-0 mb-4" />

                  <div className="flex flex-col items-center text-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center border-2 border-white shadow-md">
                      <School className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5 max-w-[80px]">
                      Technical Universities
                    </span>
                  </div>

                  <div className="h-0.5 w-6 sm:w-10 bg-white/40 shrink-0 mb-4" />

                  <div className="flex flex-col items-center text-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-rose-500 text-white flex items-center justify-center border-2 border-white shadow-md">
                      <Building className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5 max-w-[80px]">
                      Autonomous Colleges
                    </span>
                  </div>

                  <div className="h-0.5 w-6 sm:w-10 bg-white/40 shrink-0 mb-4" />

                  <div className="flex flex-col items-center text-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-md">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5 max-w-[80px]">
                      Polytechnic Institutes
                    </span>
                  </div>

                  <div className="h-0.5 w-6 sm:w-10 bg-white/40 shrink-0 mb-4" />

                  <div className="flex flex-col items-center text-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-purple-500 text-white flex items-center justify-center border-2 border-white shadow-md">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-1.5 max-w-[80px]">
                      Student APAAR Vault
                    </span>
                  </div>

                </div>
              </div>

            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-2 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white p-3 flex flex-col items-center justify-center text-slate-800 shadow-inner">
                    <img
                      src="/logo.png"
                      alt="AICTE Insignia"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                    />
                    <div className="text-[11px] font-black text-[#003350] mt-1 uppercase tracking-wide font-display">
                      APAAR-Sentinel
                    </div>
                    <div className="text-[9px] font-bold text-emerald-700 font-display">
                      Team Stratix Innovation
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-amber-200 font-semibold mt-3 font-display">
                &ldquo;Yogah Karmasu Kaushalam&rdquo; • Excellence in Governance
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. LATEST PROTOTYPE NOTICES / ANNOUNCEMENT TICKER                         */}
      {/* ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 font-display">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="px-3 py-1 rounded-md bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Prototype Alerts (2026–2027)</span>
          </div>
          <div className="overflow-hidden text-xs text-slate-700 font-medium whitespace-nowrap">
            <span className="inline-block animate-pulse text-rose-700 font-bold mr-4">
              [ALERT] TIT Kolkata CSE Intake Quota Exceeded (145 enrolled vs 120 approved intake) — Automated remediation triggered.
            </span>
            <span className="text-slate-600 mr-4">
              • Simulated 12-Digit APAAR ID generation active across 12 participating technical institutions for 2026–2027.
            </span>
            <span className="text-blue-700 font-semibold">
              • HMAC-SHA256 Cryptographic Offline QR verification enabled for digital student credentials.
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. REVOLUTIONIZED EASY-TO-USE PORTAL ACCESS & SIGN-IN SECTION             */}
      {/* ========================================================================= */}
      <section id="login-section" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 font-display">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Bar: Section Title & View Switcher */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50/40 border-b border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 uppercase tracking-wide">
                  Frictionless Access
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600 font-semibold">Pre-Configured Session 2026–2027</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Portal Access & Institutional Sign-In
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose an instant 1-click persona below or sign in directly with credentials.
              </p>
            </div>

            {/* View Switcher Pills */}
            <div className="p-1 rounded-2xl bg-white border border-slate-300 shadow-2xs flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDisplayMode('dual')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === 'dual'
                    ? 'bg-[#003350] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>All-in-One View</span>
              </button>

              <button
                type="button"
                onClick={() => setDisplayMode('personas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === 'personas'
                    ? 'bg-[#003350] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Personas</span>
              </button>

              <button
                type="button"
                onClick={() => setDisplayMode('form')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === 'form'
                    ? 'bg-[#003350] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span>Manual Form</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="m-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => setError('')}
                className="text-rose-600 hover:text-rose-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ===================================================================== */}
          {/* MAIN ACCESS WORKSPACE: SIDE-BY-SIDE / DUAL LAYOUT                     */}
          {/* ===================================================================== */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ----------------------------------------------------------------- */}
              {/* LEFT COLUMN: INSTANT 1-CLICK PERSONAS (No password needed!)       */}
              {/* ----------------------------------------------------------------- */}
              {(displayMode === 'dual' || displayMode === 'personas') && (
                <div className={`${displayMode === 'personas' ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4`}>
                  
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                        ⚡
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Instant One-Click Login (Evaluator Fast-Track)
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      No Password Required
                    </span>
                  </div>

                  {/* Clean, Fast Persona Cards */}
                  <div className="space-y-2.5">
                    {DEMO_PERSONAS.map((persona) => {
                      const isAuthenticating = loading && authenticatingId === persona.id;

                      return (
                        <div
                          key={persona.id}
                          className={`p-3.5 rounded-2xl border ${persona.borderColor} transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:shadow-xs group`}
                        >
                          {/* Role Icon + Details */}
                          <div className="flex items-start gap-3 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-xl ${persona.avatarBg} ${persona.avatarText} flex items-center justify-center shrink-0 shadow-xs font-bold text-sm mt-0.5`}
                            >
                              {persona.roleType === 'AICTE' ? (
                                <UserCheck className="w-5 h-5" />
                              ) : persona.roleType === 'COLLEGE' ? (
                                <Building className="w-5 h-5" />
                              ) : (
                                <GraduationCap className="w-5 h-5" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                                  {persona.name}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${persona.badgeColor}`}
                                >
                                  {persona.roleBadge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium truncate">
                                {persona.designation} • {persona.organization}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                <strong className="text-slate-700">Focus:</strong> {persona.summary}
                              </p>
                            </div>
                          </div>

                          {/* Quick Actions: Instant 1-Click Login + Populate */}
                          <div className="flex items-center gap-2 shrink-0 sm:self-center">
                            <button
                              type="button"
                              onClick={() => handlePopulateForm(persona)}
                              className="text-[11px] text-slate-500 hover:text-blue-700 font-semibold underline underline-offset-2 px-1.5 py-1 cursor-pointer"
                              title="Load credentials into manual form"
                            >
                              Load
                            </button>

                            <button
                              type="button"
                              disabled={loading}
                              onClick={() => handlePersonaLogin(persona)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer ${persona.btnColor}`}
                            >
                              {isAuthenticating ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  <span>Entering...</span>
                                </>
                              ) : (
                                <>
                                  <span>Enter Role</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span className="text-[11px]">
                      💡 Tip for Evaluators: Tapping <strong>&ldquo;Enter Role&rdquo;</strong> instantly loads that persona&apos;s real live dashboard.
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowGuideModal(true)}
                      className="text-[11px] font-bold text-blue-700 hover:underline shrink-0 cursor-pointer ml-2"
                    >
                      Evaluation Notes
                    </button>
                  </div>

                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* RIGHT COLUMN: DIRECT CREDENTIALS SIGN-IN (Zero Friction!)        */}
              {/* ----------------------------------------------------------------- */}
              {(displayMode === 'dual' || displayMode === 'form') && (
                <div className={`${displayMode === 'form' ? 'lg:col-span-8 lg:col-start-3' : 'lg:col-span-5'} space-y-4`}>
                  
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          <Lock className="w-3.5 h-3.5 text-blue-700" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Direct Credentials Sign-In
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        2026–2027 Sandbox
                      </span>
                    </div>

                    {/* 1-Click Role Quick Autofill Tabs */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Quick Autofill Role Preset:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => applyPreset('AICTE')}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer ${
                            selectedRolePreset === 'AICTE'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <UserCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">AICTE Director</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => applyPreset('COLLEGE_A')}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer ${
                            selectedRolePreset === 'COLLEGE_A'
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <Building className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">College A (Alert)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => applyPreset('COLLEGE_B')}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer ${
                            selectedRolePreset === 'COLLEGE_B'
                              ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">College B (Apex)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => applyPreset('STUDENT')}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer ${
                            selectedRolePreset === 'STUDENT'
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Student Rahul</span>
                        </button>
                      </div>
                    </div>

                    {/* The Clean Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                      
                      {/* Email */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Institutional Email / ID
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                            placeholder="name@aicte-india.org"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-slate-700">
                            Password
                          </label>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Default: admin123 / student123
                          </span>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Instant Session Verification Pill (Zero Friction Captcha replacement!) */}
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-[11px]">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                          />
                          <span>Keep session active</span>
                        </label>

                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Pre-Verified</span>
                        </span>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#00A86B] hover:bg-[#008f5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Authenticating...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Sign In to Dashboard</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                    </form>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOUR KEY PUBLIC UTILITY CARDS                                          */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 font-display">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Public QR Credential Verifier
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Scan or enter student passport reference to verify HMAC-SHA256 digital seals without logging in.
              </p>
            </div>
            <a
              href="/verify"
              className="mt-3 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>Launch Verifier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Proposed APH 2026–2027 Norms
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Simulated guidelines on sanctioned seat intake, NRI quotas, Supernumerary PMSSS and TFW norms.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="mt-3 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 text-left cursor-pointer"
            >
              <span>View Guidelines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                12-Digit APAAR Identity Vault
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Demographic fuzzy matching algorithms, simulated Aadhaar hashing, and student consent mechanisms.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="mt-3 text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 text-left cursor-pointer"
            >
              <span>Read Documentation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                Transfer & Conflict Resolution
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Resolve dual enrolment alerts, simulated migration approvals, and multi-college arbitration.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                applyPreset('STUDENT');
                window.scrollTo({ top: 580, behavior: 'smooth' });
              }}
              className="mt-3 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 text-left cursor-pointer"
            >
              <span>Student Grievance</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TEAM STRATIX OFFICIAL FOOTER (2026–2027)                                */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#001D30] text-slate-300 mt-10 border-t-4 border-[#00A86B] pt-8 pb-6 font-display">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            
            {/* Col 1: Stratix Brand */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white p-1">
                  <img src="/logo.png" alt="APAAR-Sentinel Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-black text-white text-sm">APAAR-Sentinel</span>
                  <span className="block text-[9px] text-amber-400 font-bold tracking-wider uppercase">Team Stratix</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Unified Student Identity & Technical Intake Governance Prototype for Smart India Hackathon.
              </p>
              <p className="text-[10px] text-slate-500">
                Academic Evaluation Session: <strong>2026–2027</strong>
              </p>
            </div>

            {/* Col 2: Prototype Architecture */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Stratix Architecture
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li><button type="button" onClick={() => setShowGuideModal(true)} className="hover:text-white transition-colors cursor-pointer">12-Digit Demographic Engine</button></li>
                <li><button type="button" onClick={() => setShowGuideModal(true)} className="hover:text-white transition-colors cursor-pointer">AI Quota Cap Gatekeeper</button></li>
                <li><button type="button" onClick={() => setShowGuideModal(true)} className="hover:text-white transition-colors cursor-pointer">Conflict Graph Arbitration</button></li>
                <li><button type="button" onClick={() => setShowGuideModal(true)} className="hover:text-white transition-colors cursor-pointer">W3C HMAC-SHA256 Passports</button></li>
              </ul>
            </div>

            {/* Col 3: Team Stratix Support */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Team Stratix Support
              </h4>
              <p className="text-[11px] text-slate-400">
                Project Lead: <strong className="text-white">Team Stratix Core</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Direct Contact: <strong className="text-white">contact@stratix.dev</strong>
              </p>
              <p className="text-[10px] text-slate-500">
                SIH Innovation Track • Higher Education DPI
              </p>
            </div>

            {/* Col 4: Prototype Disclaimer & Security */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Prototype Notice
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                This software is a competition prototype engineered by <strong>Team Stratix</strong>. Not an official government portal.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 text-[10px] text-emerald-400 font-mono font-bold">
                <Check className="w-3 h-3" />
                <span>HMAC-SHA256 Verification Active (2026–2027)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              Copyright &copy; 2026–2027 <strong>Team Stratix</strong>. All Rights Reserved. Smart India Hackathon Prototype.
            </div>
            <div className="flex items-center gap-3">
              <span>Prototype Release V2.6</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Team Stratix • Smart India Hackathon 2026–2027</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 10. SCENARIO EVALUATION MODAL (Team Stratix SIH Judges Guide)             */}
      {/* ========================================================================= */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-display">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Team Stratix • Demonstration Scenarios (2026–2027)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Smart India Hackathon Evaluation Guide & Pre-Seeded Prototype Data
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>1. AICTE National Regulator Node (Dr. Ramesh Chandra)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Sign in with <code className="bg-white px-1 py-0.5 rounded border text-blue-700">aicte.admin@aicte-india.org</code> / <code className="bg-white px-1 py-0.5 rounded border text-blue-700">admin123</code>.
                  Access 12-institution national ledger, live geographic heatmap, and AI Regulatory Copilot for 2026–2027.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <div className="font-bold text-rose-900 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-rose-600" />
                  <span>2. College A: CSE Quota Breach Node (TIT Kolkata)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Sign in with <code className="bg-white px-1 py-0.5 rounded border text-rose-700">admin@tit-kolkata.edu.in</code> / <code className="bg-white px-1 py-0.5 rounded border text-rose-700">admin123</code>.
                  Demonstrates 145/120 CSE excess intake alert, admission quota simulator, and smart CSV upload.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>3. College B: Transfer Dispute Node (Apex Bengaluru)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Sign in with <code className="bg-white px-1 py-0.5 rounded border text-purple-700">admin@apex-bengaluru.edu.in</code> / <code className="bg-white px-1 py-0.5 rounded border text-purple-700">admin123</code>.
                  Demonstrates student migration and arbitration workflow.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span>4. Student Rahul Sharma (Dual Admission Case)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Sign in with <code className="bg-white px-1 py-0.5 rounded border text-amber-700">rahul.sharma@student.apaar.gov.in</code> / <code className="bg-white px-1 py-0.5 rounded border text-amber-700">student123</code>.
                  Shows student view with conflicting registration alert across colleges and correction submission.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>5. Student Priya Das (Verifiable Passport)</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Sign in with <code className="bg-white px-1 py-0.5 rounded border text-emerald-700">priya.das@student.apaar.gov.in</code> / <code className="bg-white px-1 py-0.5 rounded border text-emerald-700">student123</code>.
                  Shows HMAC-SHA256 cryptographic QR digital passport with selective disclosure consent.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-500 font-bold">
                Team Stratix Prototype • Session 2026–2027
              </span>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 bg-[#003350] hover:bg-[#002740] text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
