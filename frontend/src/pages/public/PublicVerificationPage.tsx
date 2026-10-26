import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Search, ArrowRight, Shield, Sparkles, Building2, Calendar, UserCheck } from 'lucide-react';
import { api } from '../../services/api';

interface PublicVerificationPageProps {
  initialReference?: string;
}

export const PublicVerificationPage: React.FC<PublicVerificationPageProps> = ({ initialReference = '' }) => {
  const [refInput, setRefInput] = useState(initialReference);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // If URL has /verify/:ref, automatically trigger verification
    const pathParts = window.location.pathname.split('/');
    const urlRef = pathParts[pathParts.length - 1];
    if (urlRef && urlRef.startsWith('SENTINEL-PASSPORT')) {
      setRefInput(urlRef);
      verifyRef(urlRef);
    } else if (initialReference) {
      verifyRef(initialReference);
    }
  }, [initialReference]);

  const verifyRef = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.verifyPublicCredential(ref.trim());
      setResult(res);
    } catch (err: any) {
      setResult({
        isValid: false,
        status: 'ERROR',
        message: err.message || 'Verification failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Public Header */}
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="APAAR-Sentinel Logo"
            className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200 p-0.5 shadow-2xs"
          />
          <div>
            <h1 className="font-bold text-slate-900 text-sm">APAAR-Sentinel Public Verification Gateway</h1>
            <p className="text-[10px] text-slate-500 font-medium">Secure Student Data • Smarter Governance • Stronger Education</p>
          </div>
        </div>
        <a
          href="/"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Return to Portal Sign In →
        </a>
      </header>

      {/* Main Verification Container */}
      <main className="max-w-2xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cryptographic Digital Enrolment Verifier</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Verify Academic Enrolment Passport
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Scan credential QR code or enter the digital credential reference code to inspect cryptographic authenticity, AICTE digital seal, and active status.
          </p>
        </div>

        {/* Input Bar */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-subtle flex gap-2">
          <input
            type="text"
            placeholder="e.g. SENTINEL-PASSPORT-2024-XXXX"
            value={refInput}
            onChange={e => setRefInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && verifyRef(refInput)}
            className="flex-1 px-4 py-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => verifyRef(refInput)}
            disabled={loading || !refInput.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-glow-primary active:scale-98"
          >
            <span>{loading ? 'Verifying...' : 'Verify Passport'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Verification Result Card */}
        {result && (
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-elevated space-y-6 transition-all ${
              result.isValid
                ? 'bg-white border-emerald-300'
                : result.status === 'REVOKED'
                ? 'bg-rose-50/70 border-rose-300'
                : 'bg-white border-slate-300'
            }`}
          >
            {/* Status Banner */}
            <div className="flex items-start gap-4 pb-5 border-b border-slate-200">
              <div
                className={`p-3 rounded-2xl text-white shadow-sm ${
                  result.isValid
                    ? 'bg-emerald-600'
                    : result.status === 'REVOKED'
                    ? 'bg-rose-600'
                    : 'bg-slate-600'
                }`}
              >
                {result.isValid ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <ShieldAlert className="w-7 h-7" />
                )}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {result.isValid
                    ? 'Authentic AICTE Academic Credential Verified'
                    : result.status === 'REVOKED'
                    ? 'Credential Revoked by Student or Institution'
                    : 'Credential Verification Notice'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{result.message}</p>
              </div>
            </div>

            {/* Credential Details Grid */}
            {result.credentialDetails && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Student Name</span>
                    <strong className="text-slate-900 text-sm mt-0.5 block">{result.credentialDetails.studentName}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Enrolment Status</span>
                    <strong className="text-slate-900 text-sm font-mono mt-0.5 block text-emerald-600">{result.credentialDetails.enrolmentStatus}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Institution</span>
                    <p className="font-bold text-slate-900 mt-0.5">{result.credentialDetails.institutionName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">AICTE ID: {result.credentialDetails.aicteId}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Programme</span>
                    <p className="font-bold text-slate-900 mt-0.5">
                      {result.credentialDetails.programmeName} ({result.credentialDetails.programmeCode})
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">Roll: {result.credentialDetails.rollNumber}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Academic Session</span>
                    <p className="font-mono text-slate-700 font-semibold mt-0.5">{result.credentialDetails.academicSession}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Masked APAAR ID</span>
                    <p className="font-mono text-slate-700 font-semibold mt-0.5">{result.credentialDetails.apaarIdMasked}</p>
                  </div>
                </div>

                {result.credentialDetails.revocationReason && (
                  <div className="p-3.5 bg-rose-100/80 border border-rose-300 rounded-2xl text-xs text-rose-950 shadow-2xs">
                    <strong>Revocation Log:</strong> {result.credentialDetails.revocationReason} on{' '}
                    {new Date(result.credentialDetails.revokedAt).toLocaleString()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
        APAAR-Sentinel • AICTE National Student Identity & Verification Infrastructure
      </footer>
    </div>
  );
};
