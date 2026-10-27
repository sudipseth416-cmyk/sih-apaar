import React, { useEffect, useState } from 'react';
import { User, QrCode, FileEdit, Lock, ShieldCheck, Building2, BookOpen, AlertTriangle, Copy, Check, Sparkles, ExternalLink, GraduationCap } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

interface StudentOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const StudentOverview: React.FC<StudentOverviewProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const studentId = user?.studentId || 'student-rahul-sharma';

  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [studentId]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await api.getStudent(studentId);
      setProfile(res);
    } catch (err) {
      console.error('Failed to load student profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyApaar = () => {
    if (!profile?.student?.apaar_id_masked) return;
    navigator.clipboard.writeText(profile.student.apaar_id_masked);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !profile) {
    return (
      <div className="p-8 space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-1/4"></div>
        <div className="h-36 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  const { student, enrolments, conflicts, credentials } = profile;

  return (
    <div className="space-y-6 font-display">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <User className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">My Academic Profile</h1>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
            Student Identity Ledger • 2026–2027
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          APAAR-linked national student record, active enrolment status, and verifiable cryptographic credentials.
        </p>
      </div>

      {/* Student Identity Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-3xl shadow-md shadow-blue-500/30">
            {student.full_name?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">{student.full_name}</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                APAAR Linked
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <p className="text-xs text-slate-700 font-mono font-bold bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                APAAR ID: {student.apaar_id_masked}
              </p>
              <button
                onClick={handleCopyApaar}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 shadow-2xs active:scale-95 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-2">
              Email: {student.email} • Contact: {student.phone} • DOB: {student.dob}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('student-passport')}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-98"
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Passport</span>
          </button>
          <button
            onClick={() => onNavigateTab('student-corrections')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl shadow-2xs transition-all active:scale-98"
          >
            <FileEdit className="w-4 h-4 text-slate-500" />
            <span>Report Discrepancy</span>
          </button>
        </div>
      </div>

      {/* Dual Enrolment Alert for Rahul Sharma */}
      {conflicts.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-50/80 to-rose-500/10 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-200/70 text-amber-900 shrink-0 shadow-xs">
              <AlertTriangle className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <strong className="text-sm sm:text-base font-extrabold text-amber-950">
                Notice: Overlapping Academic Enrolment Flagged by Central Ledger
              </strong>
              <p className="text-amber-900 leading-relaxed max-w-2xl mt-1 font-medium">
                The central AICTE ledger indicates active enrolment at multiple institutions simultaneously (Tech Institute of Technology & Apex Institute of Technology). If you have transferred institutions, submit a record correction request with your transfer certificate to automatically synchronize the ledger.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('student-corrections')}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-md shadow-amber-500/20 transition-all active:scale-98"
          >
            Submit Transfer Correction
          </button>
        </div>
      )}

      {/* Academic Enrolment History Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>Institutional Enrolment History (Session 2026–2027)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolments.map((enr: any) => (
            <div key={enr.id} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{enr.institution_name}</h4>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5 font-medium">AICTE ID: {enr.aicte_id} ({enr.state})</p>
                </div>
                <StatusBadge status={enr.enrolment_status} size="sm" />
              </div>

              <div className="text-xs space-y-1.5 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p>
                  Programme: <strong className="text-slate-900">{enr.programme_name} ({enr.programme_code})</strong>
                </p>
                <p className="font-mono text-[11px] font-bold text-slate-600">Roll Number: {enr.roll_number}</p>
                <p className="text-slate-500 font-medium">Academic Session: 2026–2027 • Category: {enr.admission_category}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Identity Verification:</span>
                <StatusBadge status={enr.verification_status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
