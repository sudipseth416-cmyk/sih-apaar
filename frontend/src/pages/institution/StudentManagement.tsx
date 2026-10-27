import React, { useEffect, useState } from 'react';
import { Search, Filter, UserPlus, ChevronLeft, ChevronRight, X, ShieldCheck, CheckCircle2, Users, GraduationCap } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export const StudentManagement: React.FC = () => {
  const { user } = useAuth();
  const instId = user?.institutionId || 'inst-kolkata-01';

  const [students, setStudents] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [programmeId, setProgrammeId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [programmes, setProgrammes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [addSuccess, setAddSuccess] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    apaarId: '',
    dob: '2005-05-15',
    gender: 'MALE',
    email: '',
    phone: '',
    programmeId: '',
    rollNumber: '',
    admissionCategory: 'GENERAL',
  });

  useEffect(() => {
    loadInstitutionProgrammes();
  }, [instId]);

  useEffect(() => {
    loadStudents(1);
  }, [instId, search, programmeId, verificationStatus]);

  const loadInstitutionProgrammes = async () => {
    try {
      const res = await api.getInstitution(instId);
      setProgrammes(res.programmes || []);
      if (res.programmes?.length > 0 && !formData.programmeId) {
        setFormData(prev => ({ ...prev, programmeId: res.programmes[0].id }));
      }
    } catch (err) {
      console.error('Failed to load programmes:', err);
    }
  };

  const loadStudents = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.getStudents({
        institutionId: instId,
        page,
        limit: 20,
        search: search || undefined,
        programmeId: programmeId || undefined,
        verificationStatus: verificationStatus || undefined,
      });
      setStudents(res.students);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAddSuccess(null);
    try {
      const res = await api.createStudent({
        ...formData,
        institutionId: instId,
      });
      setAddSuccess(res);
      setFormData({
        fullName: '',
        apaarId: '',
        dob: '2005-05-15',
        gender: 'MALE',
        email: '',
        phone: '',
        programmeId: programmes[0]?.id || '',
        rollNumber: '',
        admissionCategory: 'GENERAL',
      });
      await loadStudents(1);
    } catch (err: any) {
      alert('Failed to register student: ' + err.message);
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
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Institutional Student Roster</h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
              Academic Session 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enrol students, manage institutional roll records, and verify credentials against the APAAR central ledger.
          </p>
        </div>
        <button
          onClick={() => {
            setAddSuccess(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-98"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Student Record</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by student name, roll number, APAAR ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50 hover:bg-white focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={programmeId}
            onChange={e => setProgrammeId(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          >
            <option value="">All Programmes</option>
            {programmes.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
            ))}
          </select>

          <select
            value={verificationStatus}
            onChange={e => setVerificationStatus(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          >
            <option value="">All Verification Statuses</option>
            <option value="VERIFIED">Verified</option>
            <option value="FLAGGED_MISMATCH">Flagged Mismatch</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">APAAR Identifier</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Enrolment Status</th>
                <th className="py-3 px-4 text-center">APAAR Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {students.map(s => (
                <tr key={s.id + (s.enrolment_id || '')} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {s.full_name?.charAt(0)}
                      </div>
                      <div>
                        <div>{s.full_name}</div>
                        <div className="text-[10px] font-normal text-slate-500 font-medium">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {s.apaar_id_masked}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900">{s.programme_name}</span>
                    <span className="text-slate-400 ml-1 font-mono text-[10px]">({s.programme_code})</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 font-bold">
                    {s.roll_number}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                      {s.admission_category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={s.enrolment_status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={s.verification_status || 'PENDING'} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing Page <span className="font-bold text-slate-900">{pagination.page}</span> of{' '}
            <span className="font-bold text-slate-900">{pagination.totalPages}</span> ({pagination.total} students)
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => loadStudents(pagination.page - 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => loadStudents(pagination.page + 1)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h3 className="text-base font-black text-slate-900">Add Individual Student Record</h3>
                <p className="text-xs text-slate-500 font-medium">Includes real-time simulated APAAR verification check</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white shadow-2xs transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              {addSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm">Student Created & Verified!</strong>
                    <p className="text-[11px] mt-0.5 font-medium">
                      Verification Result: {addSuccess.verification?.status} ({addSuccess.verification?.provider})
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Candidate Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourav Mukherjee"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-slate-50 hover:bg-white focus:bg-white transition-all shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    12-Digit APAAR ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="9824-0000-1122"
                    value={formData.apaarId}
                    onChange={e => setFormData({ ...formData, apaarId: e.target.value })}
                    className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50 hover:bg-white focus:bg-white transition-all shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    Institutional Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TIT-2026-CSE-901"
                    value={formData.rollNumber}
                    onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold bg-slate-50 hover:bg-white focus:bg-white transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    Programme *
                  </label>
                  <select
                    value={formData.programmeId}
                    onChange={e => setFormData({ ...formData, programmeId: e.target.value })}
                    className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold shadow-2xs"
                  >
                    {programmes.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    Admission Category *
                  </label>
                  <select
                    value={formData.admissionCategory}
                    onChange={e => setFormData({ ...formData, admissionCategory: e.target.value })}
                    className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold shadow-2xs"
                  >
                    <option value="GENERAL">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                    <option value="NRI">NRI Quota</option>
                    <option value="SUPERNUMERARY_PMSSS">Supernumerary PMSSS</option>
                    <option value="SUPERNUMERARY_TFW">Supernumerary TFW</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="mt-1 w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold shadow-2xs"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-2xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-98"
                >
                  {submitting ? 'Verifying & Saving...' : 'Save & Verify APAAR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
