import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldAlert,
  BrainCircuit,
  Network,
  MapPin,
  Bot,
  FileCheck2,
  UploadCloud,
  Calculator,
  QrCode,
  FileEdit,
  Lock,
  History,
  Activity,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  mobileMenuOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavSection {
  title?: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileMenuOpen = false,
  onCloseMobile,
}) => {
  const { user } = useAuth();
  if (!user) return null;

  let sections: NavSection[] = [];

  if (user.role === 'AICTE_ADMIN') {
    sections = [
      {
        title: 'National Governance',
        items: [
          { id: 'aicte-overview', label: 'National Overview', icon: LayoutDashboard },
          { id: 'aicte-institutions', label: 'Institutional Registry', icon: Building2 },
          { id: 'aicte-students', label: 'Student Master Registry', icon: Users },
        ],
      },
      {
        title: 'Regulatory Integrity',
        items: [
          { id: 'aicte-compliance', label: 'Intake Compliance', icon: ShieldAlert, badge: 'Alerts', badgeColor: 'bg-rose-100 text-rose-700' },
          { id: 'aicte-anomalies', label: 'Anomaly Intelligence', icon: BrainCircuit },
          { id: 'aicte-conflicts', label: 'Conflict Network', icon: Network, badge: '1 Case', badgeColor: 'bg-amber-100 text-amber-700' },
          { id: 'aicte-geography', label: 'Geographic Heatmap', icon: MapPin },
        ],
      },
      {
        title: 'Analytics & Tools',
        items: [
          { id: 'aicte-copilot', label: 'AI Regulatory Copilot', icon: Bot, badge: 'AI', badgeColor: 'bg-blue-100 text-blue-700' },
          { id: 'aicte-audit', label: 'Audit Trail Logs', icon: History },
        ],
      },
    ];
  } else if (user.role === 'INSTITUTION_ADMIN') {
    sections = [
      {
        title: 'Institutional Administration',
        items: [
          { id: 'college-overview', label: 'College Overview', icon: LayoutDashboard },
          { id: 'college-students', label: 'Student Management', icon: Users },
        ],
      },
      {
        title: 'Admissions & Compliance',
        items: [
          { id: 'college-upload', label: 'Smart Bulk Upload', icon: UploadCloud, badge: 'AI Mapping', badgeColor: 'bg-indigo-100 text-indigo-700' },
          { id: 'college-simulator', label: 'Admission Simulator', icon: Calculator },
          { id: 'college-corrections', label: 'Correction Requests', icon: FileEdit, badge: 'Review', badgeColor: 'bg-amber-100 text-amber-700' },
          { id: 'college-reports', label: 'Compliance Reports', icon: FileCheck2 },
        ],
      },
    ];
  } else {
    // Student
    sections = [
      {
        title: 'Academic Identity',
        items: [
          { id: 'student-overview', label: 'My Academic Profile', icon: LayoutDashboard },
          { id: 'student-passport', label: 'Digital Enrolment Passport', icon: QrCode, badge: 'Signed', badgeColor: 'bg-emerald-100 text-emerald-700' },
        ],
      },
      {
        title: 'Self-Service & Governance',
        items: [
          { id: 'student-corrections', label: 'Record Corrections', icon: FileEdit },
          { id: 'student-privacy', label: 'Data Privacy & Consent', icon: Lock },
        ],
      },
    ];
  }

  const handleItemClick = (id: string) => {
    onSelectTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full py-4 select-none">
      {/* Top Header & Navigation Links */}
      <div className="space-y-6 px-3 overflow-y-auto">
        {/* Mobile close button header */}
        <div className="flex items-center justify-between lg:hidden px-3 pb-2 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Navigation Menu</span>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {sections.map((sec, secIdx) => (
          <div key={secIdx} className="space-y-1">
            {sec.title && (
              <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {sec.title}
              </div>
            )}
            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`group relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/90'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white border border-white/30'
                          : item.badgeColor || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Network & Environment Card */}
      <div className="px-4 pt-3 mt-4 border-t border-slate-200/80">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 border border-slate-200 shadow-2xs font-display">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Prototype Node</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Synchronized
            </span>
          </div>
          <div className="text-xs font-bold text-slate-800">
            {user.role === 'AICTE_ADMIN' ? 'AICTE Central Node' : user.institution?.name?.slice(0, 24) || 'Student Registry'}
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>Session:</span>
            <span className="font-bold text-blue-700">2026–2027</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/90 h-[calc(100vh-4rem)] sticky top-16 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-10 flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
