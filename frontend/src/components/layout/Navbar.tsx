import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  RotateCcw,
  LogOut,
  Check,
  Menu,
  X,
  Sparkles,
  Building,
  GraduationCap,
  UserCheck,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface NavbarProps {
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mobileMenuOpen = false, onToggleMobileMenu }) => {
  const { user, logout, loginAsDemoUser, refreshUser } = useAuth();
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const demoAccounts = [
    {
      label: 'AICTE Admin',
      sub: 'Dr. Ramesh Chandra (National Ledger)',
      email: 'aicte.admin@aicte-india.org',
      role: 'AICTE_ADMIN',
      icon: UserCheck,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'College A (Kolkata)',
      sub: 'Prof. S. Banerjee (CSE Intake Alert)',
      email: 'admin@tit-kolkata.edu.in',
      role: 'INSTITUTION_ADMIN',
      icon: Building,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      label: 'College B (Apex)',
      sub: 'Dr. R. Nair (Transfer Management)',
      email: 'admin@apex-bengaluru.edu.in',
      role: 'INSTITUTION_ADMIN',
      icon: Building2,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      label: 'Student Rahul Sharma',
      sub: 'Dual-College Enrolment Conflict',
      email: 'rahul.sharma@student.apaar.gov.in',
      role: 'STUDENT',
      icon: GraduationCap,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      label: 'Student Priya Das',
      sub: 'Digital QR Passport & Consent',
      email: 'priya.das@student.apaar.gov.in',
      role: 'STUDENT',
      icon: GraduationCap,
      color: 'bg-rose-100 text-rose-700',
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetDemo = async () => {
    if (!window.confirm('Reset demo database to original SIH baseline? All 12 institutions, 1109 students, and test scenarios will be refreshed.')) {
      return;
    }
    setResetting(true);
    try {
      await api.resetDemoDatabase();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 4000);
      await refreshUser();
      window.location.reload();
    } catch (err: any) {
      alert('Failed to reset demo: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  const currentPersona = demoAccounts.find(acc => acc.email === user?.email) || {
    label: user?.role === 'AICTE_ADMIN' ? 'AICTE Admin' : user?.role === 'INSTITUTION_ADMIN' ? 'College Admin' : 'Student',
    icon: UserCheck,
    color: 'bg-blue-100 text-blue-700',
  };
  const PersonaIcon = currentPersona.icon;

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-40 flex items-center justify-between px-3 sm:px-6 shadow-subtle select-none">
      {/* Left: Mobile Toggle & Brand (strictly shrink-0, never wraps) */}
      <div className="flex items-center gap-3 shrink-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative shrink-0">
            <img
              src="/logo.png"
              alt="APAAR-Sentinel Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white border border-slate-200/90 p-0.5 shadow-2xs"
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-xs"
              title="National Ledger Online"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-950 tracking-tight text-base sm:text-lg whitespace-nowrap leading-tight">
                APAAR-Sentinel
              </span>
              <span className="hidden sm:inline-flex text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs whitespace-nowrap">
                AICTE Suite
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 font-medium whitespace-nowrap truncate max-w-[280px]">
              Secure Student Data • Smarter Governance
            </p>
          </div>
        </div>
      </div>

      {/* Center: Sleek Compact Role Switcher Dropdown */}
      <div className="relative shrink-0 mx-2" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(prev => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold shadow-2xs active:scale-98 ${
            dropdownOpen
              ? 'bg-blue-50/80 border-blue-300 text-blue-800 ring-2 ring-blue-500/10'
              : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200/90 text-slate-700'
          }`}
          title="Switch Demonstration Persona"
        >
          <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${currentPersona.color}`}>
            <PersonaIcon className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 hidden lg:inline">Persona:</span>
            <span className="font-bold text-slate-900 truncate max-w-[130px] sm:max-w-[170px]">
              {currentPersona.label}
            </span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
        </button>

        {/* Dropdown Popover */}
        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-elevated border border-slate-200/90 p-2 z-50 animate-slide-up space-y-1">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Switch Demonstration Role
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                1-Click Switch
              </span>
            </div>

            <div className="space-y-1 pt-1">
              {demoAccounts.map(acc => {
                const isActive = user?.email === acc.email;
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.email}
                    onClick={() => {
                      setDropdownOpen(false);
                      loginAsDemoUser(acc.email, 'admin123');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/80 shadow-2xs'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${acc.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className={`text-xs truncate ${isActive ? 'font-bold text-blue-900' : 'font-semibold text-slate-900'}`}>
                          {acc.label}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {acc.sub}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Right: Reset Baseline & User Profile (strictly shrink-0, perfectly aligned) */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Reset Database Button */}
        <button
          onClick={handleResetDemo}
          disabled={resetting}
          title="Restore Seeded Demonstration Baseline (12 Institutions, 1109 Students)"
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all ${
            resetSuccess
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-200/90 shadow-2xs hover:border-slate-300 active:scale-98'
          }`}
        >
          {resetSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Restored</span>
            </>
          ) : (
            <>
              <RotateCcw className={`w-3.5 h-3.5 text-slate-500 shrink-0 ${resetting ? 'animate-spin text-blue-600' : ''}`} />
              <span className="hidden sm:inline">Reset Baseline</span>
            </>
          )}
        </button>

        {/* User Card */}
        {user && (
          <div className="flex items-center gap-2 pl-2 sm:pl-3 sm:border-l sm:border-slate-200 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-slate-100 to-blue-50 border border-slate-200/90 flex items-center justify-center text-slate-700 font-bold text-xs shadow-2xs shrink-0">
              {user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="hidden lg:block text-left max-w-[150px]">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate">{user.name}</p>
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="truncate">
                  {user.role === 'AICTE_ADMIN'
                    ? 'AICTE Regulatory Officer'
                    : user.role === 'INSTITUTION_ADMIN'
                    ? 'College Admin'
                    : 'Student User'}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
