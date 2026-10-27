import React, { useEffect, useState } from 'react';
import { History, Search, Shield, Clock, FileCheck, Layers, Terminal } from 'lucide-react';
import { api } from '../../services/api';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await api.getAuditLogs(100);
      setLogs(res.logs);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('RESOLVED') || action.includes('VERIFIED')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (action.includes('CONFLICT') || action.includes('VIOLATION') || action.includes('MISMATCH')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (action.includes('SIMULAT') || action.includes('RECALCULAT')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className="space-y-6 font-display">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 text-white shadow-md shadow-slate-700/20">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Regulatory Audit Trail Ledger</h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
              Tamper-Evident • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-evident, immutable system events recording student registrations, verifications, credentials, and resolutions.
          </p>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
          Showing Last <span className="font-extrabold text-blue-600 font-mono text-sm">{logs.length}</span> Application Events
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Actor ID / Email</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Event Details Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {logs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap font-medium">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-mono font-bold px-2.5 py-1 rounded-lg border text-[11px] shadow-2xs ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {log.user_email || log.user_id || 'SYSTEM_DAEMON'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px]">
                      {log.entity_type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 max-w-md truncate">
                    {log.details}
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
