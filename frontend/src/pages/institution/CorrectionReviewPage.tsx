import React, { useEffect, useState } from 'react';
import { FileEdit, CheckCircle2, XCircle, Clock, FileText, Check, ShieldCheck, UserCheck } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const CorrectionReviewPage: React.FC = () => {
  const { user } = useAuth();
  const instId = user?.institutionId || 'inst-kolkata-01';

  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRequests();
  }, [instId]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await api.getCorrections({ institutionId: instId });
      setRequests(res.requests);
      if (res.requests.length > 0 && !selectedRequest) {
        setSelectedRequest(res.requests[0]);
      }
    } catch (err) {
      console.error('Failed to load correction requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAction = async (decision: 'APPROVED' | 'REJECTED') => {
    if (!selectedRequest) return;
    setSubmitting(true);
    try {
      await api.reviewCorrection(selectedRequest.id, {
        decision,
        comments: comments || `Administrative action by ${user?.name || 'College Registrar'}.`,
      });
      alert(`Correction request marked as ${decision}. Underlying student records and conflict network synchronized.`);
      setComments('');
      await loadRequests();
    } catch (err: any) {
      alert('Error updating request: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-display">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            Review discrepancies reported by students regarding inaccurate names, programmes, or outdated enrolment statuses.
          </p>
        </div>
        <div className="text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>{requests.filter(r => r.status === 'SUBMITTED').length} Pending Action</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Requests List Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Submitted Discrepancy Tickets
            </h3>
            <span className="text-xs text-slate-500 font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">{requests.length} Total</span>
          </div>

          <div className="divide-y divide-slate-100">
            {requests.map(req => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`p-4 sm:p-5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-sm text-slate-900">{req.student_name}</span>
                      <span className="text-slate-500 font-mono text-[11px] ml-2 font-medium">
                        {req.apaar_id_masked}
                      </span>
                      <p className="text-xs text-slate-600 mt-1 font-medium">
                        Field to Correct: <span className="text-blue-700 font-mono font-bold">{req.field_name}</span>
                      </p>
                    </div>
                    <StatusBadge status={req.status} size="sm" />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">Current:</span>
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 line-through">
                      {req.current_value}
                    </span>
                    <span className="text-slate-400 font-medium">→ Proposed:</span>
                    <span className="font-mono bg-emerald-50 px-2 py-0.5 rounded text-emerald-800 font-bold border border-emerald-200">
                      {req.proposed_value}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-1 italic font-medium">
                    Reason: "{req.reason}"
                  </p>
                </div>
              );
            })}

            {requests.length === 0 && (
              <div className="p-12 text-center text-xs text-slate-400">
                No correction requests found for this institution.
              </div>
            )}
          </div>
        </div>

        {/* Action Panel for Selected Request */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          {selectedRequest ? (
            <div className="space-y-5">
              <div className="border-b border-slate-200 pb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Correction Request Dossier</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Ticket ID: {selectedRequest.id}</p>
                </div>
                <StatusBadge status={selectedRequest.status} size="sm" />
              </div>

              {/* Student Demographics & Roll */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Student:</span>
                  <span className="font-bold text-slate-900">{selectedRequest.student_name}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-500 font-medium">APAAR:</span>
                  <span className="text-slate-800 font-bold">{selectedRequest.apaar_id_masked}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-500 font-medium">Roll Number:</span>
                  <span className="text-slate-800 font-bold">{selectedRequest.roll_number}</span>
                </div>
              </div>

              {/* Proposed Transformation Card */}
              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs space-y-2.5">
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                  Target Field: {selectedRequest.field_name}
                </span>
                <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-sans">Existing Value</span>
                    <strong className="text-rose-700 text-sm">{selectedRequest.current_value}</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 block uppercase font-sans font-bold">Proposed Value</span>
                    <strong className="text-emerald-700 text-sm">{selectedRequest.proposed_value}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-200/80">
                  <span className="text-slate-500 block text-[11px] font-bold">Student Justification:</span>
                  <p className="text-slate-800 italic mt-0.5 font-medium">{selectedRequest.reason}</p>
                </div>

                {selectedRequest.evidence_url && (
                  <div className="pt-2 text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Evidence Attached: <strong>{selectedRequest.evidence_url}</strong></span>
                  </div>
                )}
              </div>

              {/* Review Actions if Submitted */}
              {selectedRequest.status === 'SUBMITTED' ? (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Reviewer Comments & Audit Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter approval or rejection comments..."
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleReviewAction('REJECTED')}
                      disabled={submitting}
                      className="py-2.5 bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-98 shadow-2xs"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Request</span>
                    </button>
                    <button
                      onClick={() => handleReviewAction('APPROVED')}
                      disabled={submitting}
                      className="py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 active:scale-98"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Sync</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 font-medium">
                  This request was formally resolved. Decision: <strong>{selectedRequest.status}</strong>.
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center text-xs text-slate-400">
              Select a ticket to review evidence.
            </div>
          )}

          <div className="text-[11px] text-slate-400 text-center pt-3 border-t border-slate-100 font-medium">
            AICTE Record Correction & Verification Protocol • Team Stratix 2026–2027
          </div>
        </div>
      </div>
    </div>
  );
};
