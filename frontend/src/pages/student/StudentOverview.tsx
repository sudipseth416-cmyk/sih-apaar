import React, { useEffect, useState } from 'react';
import { User, QrCode, FileEdit, Lock, ShieldCheck, Building2, BookOpen, AlertTriangle, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
            <User className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Academic Profile</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          APAAR-linked national student record, active enrolment status, and verifiable credentials.
        </p>
      </div>

      {/* Student Identity Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-glow-primary">
            {student.full_name?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{student.full_name}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                APAAR Linked
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-slate-600 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                APAAR ID: {student.apaar_id_masked}
              </p>
              <button
                onClick={handleCopyApaar}
                className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-1.5">
              Email: {student.email} • Contact: {student.phone} • DOB: {student.dob}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('student-passport')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-glow-primary transition-all active:scale-98"
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Passport</span>
          </button>
          <button
            onClick={() => onNavigateTab('student-corrections')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-2xs transition-all active:scale-98"
          >
            <FileEdit className="w-4 h-4 text-slate-500" />
            <span>Report Discrepancy</span>
          </button>
        </div>
      </div>

      {/* Dual Enrolment Alert for Rahul Sharma */}
      {conflicts.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-900 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <strong className="text-sm font-bold text-amber-950">Notice: Overlapping Academic Enrolment Flag</strong>
              <p className="text-amber-900/90 mt-1 leading-relaxed max-w-2xl">
                The central AICTE ledger indicates active enrolment at multiple institutions simultaneously. If you have transferred institutions, submit a record correction request to officially sync your status.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('student-corrections')}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm transition-all active:scale-98"
          >
            Submit Transfer Correction
          </button>
        </div>
      )}

      {/* Academic Enrolment History Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Institutional Enrolment History
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolments.map((enr: any) => (
            <div key={enr.id} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{enr.institution_name}</h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">AICTE ID: {enr.aicte_id} ({enr.state})</p>
                </div>
                <StatusBadge status={enr.enrolment_status} size="sm" />
              </div>

              <div className="text-xs space-y-1.5 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                <p>
                  Programme: <strong className="text-slate-900">{enr.programme_name} ({enr.programme_code})</strong>
                </p>
                <p className="font-mono text-[11px]">Roll Number: {enr.roll_number}</p>
                <p>Academic Session: {enr.academic_session} • Category: {enr.admission_category}</p>
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
