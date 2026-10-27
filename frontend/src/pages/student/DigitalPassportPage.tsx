import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  ShieldCheck,
  ShieldAlert,
  Download,
  Copy,
  ExternalLink,
  Check,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Lock,
  Cpu,
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const DigitalPassportPage: React.FC = () => {
  const { user } = useAuth();
  const studentId = user?.studentId || 'student-priya-das';

  const [credentials, setCredentials] = useState<any[]>([]);
  const [activeCred, setActiveCred] = useState<any | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sigCopied, setSigCopied] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, [studentId]);

  const loadCredentials = async () => {
    setLoading(true);
    try {
      const res = await api.getStudentCredentials(studentId);
      setCredentials(res.credentials);
      if (res.credentials.length > 0) {
        const top = res.credentials[0];
        setActiveCred(top);
        generateQr(top.credential_reference);
      }
    } catch (err) {
      console.error('Failed to load credentials:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateQr = async (ref: string) => {
    try {
      const verifyUrl = `${window.location.origin}/verify/${ref}`;
      const url = await QRCode.toDataURL(verifyUrl, {
        width: 220,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error('QR generation error:', err);
    }
  };

  const handleIssueNew = async () => {
    setIssuing(true);
    try {
      const profile = await api.getStudent(studentId);
      const enr = profile.enrolments?.[0];
      if (!enr) {
        alert('No active enrolment found to generate passport');
        return;
      }

      await api.issueCredential({
        studentId,
        enrolmentId: enr.id,
        validityDays: 90,
      });

      await loadCredentials();
    } catch (err: any) {
      alert('Failed to issue credential: ' + err.message);
    } finally {
      setIssuing(false);
    }
  };

  const handleRevoke = async () => {
    if (!activeCred) return;
    if (!window.confirm('Are you sure you want to revoke this digital enrolment passport? Third parties will immediately see the credential as REVOKED.')) {
      return;
    }

    setRevoking(true);
    try {
      await api.revokeCredential(activeCred.credential_reference, 'Revoked by student via Privacy Portal');
      await loadCredentials();
    } catch (err: any) {
      alert('Revocation error: ' + err.message);
    } finally {
      setRevoking(false);
    }
  };

  const handleCopyLink = () => {
    if (!activeCred) return;
    const verifyUrl = `${window.location.origin}/verify/${activeCred.credential_reference}`;
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopySig = () => {
    if (!activeCred) return;
    navigator.clipboard.writeText(activeCred.digital_signature);
    setSigCopied(true);
    setTimeout(() => setSigCopied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-display">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <QrCode className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Smart Digital Enrolment Passport
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
              Cryptographic Proof • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Digitally sealed verifiable academic credentials backed by HMAC-SHA256 signatures for employer and institutional verification.
          </p>
        </div>
        <button
          onClick={handleIssueNew}
          disabled={issuing}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>{issuing ? 'Generating Signature...' : 'Re-issue Passport'}</span>
        </button>
      </div>

      {/* Verifiable Credential Showcase Card */}
      {activeCred ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated overflow-hidden">
          {/* Card Banner Header - Smart Holographic look */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">
                    AICTE REGULATORY FRAMEWORK
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">Session 2026–2027 • Team Stratix</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1 text-white">
                  National Digital Enrolment Passport
                </h2>
                <p className="text-xs text-blue-200 font-mono mt-1 font-bold">
                  Credential ID: {activeCred.credential_reference}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 shadow-sm ${
                    activeCred.status === 'ACTIVE'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-400/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeCred.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
                  {activeCred.status === 'ACTIVE' ? 'AUTHENTIC PASSPORT' : 'PASSPORT REVOKED'}
                </span>
              </div>
            </div>
          </div>

          {/* Credential Body */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Student & Institution Metadata */}
            <div className="md:col-span-8 space-y-5">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Student Name</span>
                  <p className="text-base font-bold text-slate-900 mt-0.5">{user?.name || 'Student User'}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Enrolment Status</span>
                  <p className="text-base font-bold font-mono text-emerald-600 mt-0.5">{activeCred.enrolment_status || 'ACTIVE'}</p>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Institution</span>
                  <p className="font-bold text-slate-900 mt-0.5">{activeCred.institution_name}</p>
                  <p className="text-[11px] text-slate-500 font-mono">AICTE ID: {activeCred.aicte_id}</p>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Programme</span>
                  <p className="font-bold text-slate-900 mt-0.5">{activeCred.programme_name} ({activeCred.programme_code})</p>
                  <p className="text-[11px] text-slate-500 font-mono font-bold">Roll: {activeCred.roll_number}</p>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Issue Timestamp</span>
                  <p className="font-mono text-slate-700 font-bold mt-0.5">{new Date(activeCred.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Validity Expiration</span>
                  <p className="font-mono text-slate-700 font-bold mt-0.5">{new Date(activeCred.expires_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Cryptographic Digital Signature Strip */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-slate-700 font-bold mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographic HMAC-SHA256 Digital Seal</span>
                  </div>
                  <button
                    onClick={handleCopySig}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    {sigCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{sigCopied ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <p className="font-mono text-[10px] text-slate-600 break-all bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                  {activeCred.digital_signature}
                </p>
              </div>
            </div>

            {/* QR Code Column */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 text-center">
              <div className="relative p-2.5 bg-white rounded-2xl shadow-subtle border border-slate-200">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Enrolment Passport QR Code"
                    className="w-44 h-44 rounded-xl"
                  />
                ) : (
                  <div className="w-44 h-44 bg-slate-200 rounded-xl animate-pulse"></div>
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-3 font-mono">
                Scan with Camera to Verify
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 font-medium">
                Public Gateway • AICTE Sentinel
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-700 font-bold transition-all shadow-2xs active:scale-98"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Copy Verification URL'}</span>
              </button>
              <a
                href={`/verify/${activeCred.credential_reference}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-700 font-bold transition-all shadow-2xs active:scale-98"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Verification Portal</span>
              </a>
            </div>

            {activeCred.status === 'ACTIVE' && (
              <button
                onClick={handleRevoke}
                disabled={revoking}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-xl font-bold transition-all active:scale-98 shadow-2xs"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{revoking ? 'Revoking...' : 'Revoke Credential'}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-16 text-center rounded-3xl border border-slate-200 shadow-subtle">
          <QrCode className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No Digital Passport Issued Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed font-medium">
            Generate a digitally signed, cryptographic proof of enrolment to share with employers and external institutions.
          </p>
          <button
            onClick={handleIssueNew}
            disabled={issuing}
            className="mt-5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 active:scale-98 transition-all"
          >
            Issue Passport Now
          </button>
        </div>
      )}
    </div>
  );
};
