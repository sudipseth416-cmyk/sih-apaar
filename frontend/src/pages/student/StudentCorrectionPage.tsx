import React, { useEffect, useState } from 'react';
import { FileEdit, CheckCircle2, Clock, AlertTriangle, Send, FileText, Check, Layers, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const StudentCorrectionPage: React.FC = () => {
  const { user } = useAuth();
  const studentId = user?.studentId || 'student-rahul-sharma';

  const [requests, setRequests] = useState<any[]>([]);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const [selectedEnrolmentId, setSelectedEnrolmentId] = useState('');
  const [fieldName, setFieldName] = useState('enrolment_status');
  const [proposedValue, setProposedValue] = useState('TRANSFERRED');
  const [reason, setReason] = useState('Admitted to Apex National Engineering College Bengaluru via Centralized Counselling. Request previous college to mark status as TRANSFERRED.');
  const [evidenceUrl, setEvidenceUrl] = useState('Transfer_Certificate_TC8912.pdf');

  useEffect(() => {
    loadData();
  }, [studentId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqRes, profRes] = await Promise.all([
        api.getCorrections({ studentId }),
        api.getStudent(studentId),
      ]);
      setRequests(reqRes.requests);
      setProfile(profRes);
      if (profRes.enrolments?.length > 0 && !selectedEnrolmentId) {
        setSelectedEnrolmentId(profRes.enrolments[0].id);
      }
    } catch (err) {
      console.error('Failed to load correction data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnrolmentId || !proposedValue || !reason) return;

    setSubmitting(true);
    try {
      const enr = profile.enrolments.find((e: any) => e.id === selectedEnrolmentId);
      const currentVal = enr ? enr[fieldName] || enr.enrolment_status : '';

      await api.submitCorrection({
        studentId,
        enrolmentId: selectedEnrolmentId,
        fieldName,
        currentValue: String(currentVal),
        proposedValue,
        reason,
        evidenceUrl,
      });

      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
      await loadData();
    } catch (err: any) {
      alert('Error submitting correction: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-display">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <FileEdit className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Student Record Correction Portal</h1>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
            Academic Session 2026–2027
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Report inaccuracies in your registered academic records, such as outdated enrolment status or misspelled names.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submission Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-subtle space-y-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-3 flex items-center gap-1.5">
            <FileEdit className="w-4 h-4 text-blue-600" />
            <span>Submit Record Discrepancy Ticket</span>
          </h3>

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 shadow-2xs">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Correction ticket submitted to institution administrator for formal review.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Affected Enrolment Record *
              </label>
              <select
                value={selectedEnrolmentId}
                onChange={e => setSelectedEnrolmentId(e.target.value)}
                className="mt-1 w-full text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              >
                {profile?.enrolments?.map((e: any) => (
                  <option key={e.id} value={e.id}>
                    {e.institution_name} ({e.programme_code} - {e.enrolment_status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Field Requiring Correction *
              </label>
              <select
                value={fieldName}
                onChange={e => {
                  setFieldName(e.target.value);
                  if (e.target.value === 'enrolment_status') setProposedValue('TRANSFERRED');
                  else setProposedValue('');
                }}
                className="mt-1 w-full text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              >
                <option value="enrolment_status">Enrolment Status (e.g. Update to TRANSFERRED)</option>
                <option value="full_name">Candidate Legal Name</option>
                <option value="dob">Date of Birth</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Proposed Correct Value *
              </label>
              <input
                type="text"
                required
                value={proposedValue}
                onChange={e => setProposedValue(e.target.value)}
                placeholder="e.g. TRANSFERRED"
                className="mt-1 w-full text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Justification & Details *
              </label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Explain the background for this correction request..."
                className="mt-1 w-full text-xs border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Supporting Evidence Reference / Document Name
              </label>
              <input
                type="text"
                value={evidenceUrl}
                onChange={e => setEvidenceUrl(e.target.value)}
                placeholder="e.g. Transfer_Certificate_TC8912.pdf"
                className="mt-1 w-full text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono shadow-2xs"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Correction Ticket'}</span>
            </button>
          </form>
        </div>

        {/* History of Submitted Requests */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-subtle space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>My Submitted Discrepancy Tickets</span>
            </h3>

            <div className="mt-4 space-y-3">
              {requests.map(r => (
                <div key={r.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 text-xs space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{r.institution_name}</span>
                    <StatusBadge status={r.status} size="sm" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-500 font-medium">Field: {r.field_name}</span>
                    <span>•</span>
                    <span className="text-slate-400 line-through">{r.current_value}</span>
                    <span>→</span>
                    <strong className="text-emerald-700">{r.proposed_value}</strong>
                  </div>
                  <p className="text-slate-600 italic font-medium">"{r.reason}"</p>
                  {r.reviewer_comments && (
                    <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 font-medium">
                      Institution Decision: {r.reviewer_comments}
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200 font-mono font-medium">
                    Submitted: {new Date(r.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}

              {requests.length === 0 && (
                <div className="py-12 text-center text-xs text-slate-400 font-medium">
                  No discrepancy requests submitted.
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-3 border-t border-slate-100 font-medium">
            Authoritative modifications require institutional approval • Team Stratix 2026–2027
          </div>
        </div>
      </div>
    </div>
  );
};
