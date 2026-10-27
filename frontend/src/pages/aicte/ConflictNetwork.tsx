import React, { useEffect, useState } from 'react';
import {
  Network,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlertTriangle,
  CheckCircle2,
  Building2,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  X,
  Sparkles,
  Info,
  Calendar,
  Layers,
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { api } from '../../services/api';

export const ConflictNetwork: React.FC = () => {
  const [graphData, setGraphData] = useState<{ nodes: any[]; edges: any[]; totalConflicts: number }>({
    nodes: [],
    edges: [],
    totalConflicts: 0,
  });
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [resolving, setResolving] = useState(false);
  const [resolutionText, setResolutionText] = useState('');

  useEffect(() => {
    loadConflictGraph();
  }, []);

  const loadConflictGraph = async () => {
    setLoading(true);
    try {
      const data = await api.getConflictGraph();
      setGraphData(data);
      if (data.nodes.length > 0 && !selectedNode) {
        // Automatically select the student conflict node (Rahul Sharma)
        const studentNode = data.nodes.find((n: any) => n.type === 'student');
        if (studentNode) {
          setSelectedNode(studentNode);
          if (studentNode.data?.caseId) {
            loadCaseDetails(studentNode.data.caseId);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load conflict graph:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCaseDetails = async (caseId: string) => {
    try {
      const res = await api.getConflict(caseId);
      setSelectedCase(res);
    } catch (err) {
      console.error('Failed to load case:', err);
    }
  };

  const handleResolve = async () => {
    if (!selectedCase || !resolutionText) return;
    setResolving(true);
    try {
      await api.resolveConflict(selectedCase.conflictCase.id, {
        resolutionDetails: resolutionText,
        secondaryEnrolmentAction: 'TRANSFERRED',
      });
      alert('Conflict Case successfully marked as RESOLVED. Transfer logged in official audit trail.');
      setResolutionText('');
      await loadConflictGraph();
    } catch (err: any) {
      alert('Failed to resolve case: ' + err.message);
    } finally {
      setResolving(false);
    }
  };

  // Node position layout calculation for SVG canvas
  const studentNodes = graphData.nodes.filter(n => n.type === 'student');
  const institutionNodes = graphData.nodes.filter(n => n.type === 'institution');
  const programmeNodes = graphData.nodes.filter(n => n.type === 'programme');

  const getNodeCoords = (node: any) => {
    if (node.type === 'student') return { x: 380, y: 150 };
    if (node.type === 'institution') {
      const idx = institutionNodes.findIndex(i => i.id === node.id);
      return { x: idx === 0 ? 130 : 630, y: 310 };
    }
    // programme
    const idx = programmeNodes.findIndex(p => p.id === node.id);
    return { x: idx === 0 ? 250 : 510, y: 230 };
  };

  return (
    <div className="space-y-6 font-display">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/20">
              <Network className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              National Student Enrolment Conflict Graph
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
              Topology Engine • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Visualizing cross-institutional academic linkages to identify overlapping active enrolments versus legitimate transfers with 1-click ledger reconciliation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 text-rose-800 border border-rose-200 shadow-2xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            <span>{graphData.totalConflicts} Active Overlapping Conflict(s)</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Network Canvas on Left, Investigation Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Canvas */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 shadow-elevated overflow-hidden flex flex-col justify-between h-[560px] relative">
          {/* Subtle network glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Canvas Controls Toolbar */}
          <div className="relative z-10 p-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Topology Nodes:</span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> Student Node
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Institution
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-rose-300 bg-rose-950/70 px-2.5 py-1 rounded-lg border border-rose-800">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Dual Active Link
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="Reset View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Graph Viewport */}
          <div className="relative flex-1 overflow-hidden flex items-center justify-center">
            <svg
              className="w-full h-full transition-transform duration-300 select-none"
              style={{ transform: `scale(${zoomLevel})` }}
              viewBox="0 0 760 440"
            >
              <defs>
                {/* Gradient for links */}
                <linearGradient id="conflictGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>
                <linearGradient id="normalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
                <radialGradient id="studentConflictRadial">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </radialGradient>
                <radialGradient id="studentNominalRadial">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </radialGradient>
                <radialGradient id="instRadial">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064E3B" />
                </radialGradient>
                <radialGradient id="progRadial">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#312E81" />
                </radialGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Render Curved Edges */}
              {graphData.edges.map(edge => {
                const sourceNode = graphData.nodes.find(n => n.id === edge.source);
                const targetNode = graphData.nodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const sc = getNodeCoords(sourceNode);
                const tc = getNodeCoords(targetNode);
                const isConflict = edge.type === 'potential_conflict';

                // Curved cubic path
                const midX = (sc.x + tc.x) / 2;
                const midY = (sc.y + tc.y) / 2 - 15;
                const pathData = `M ${sc.x} ${sc.y} Q ${midX} ${midY} ${tc.x} ${tc.y}`;

                return (
                  <g key={edge.id}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isConflict ? 'url(#conflictGrad)' : '#475569'}
                      strokeWidth={isConflict ? 3.5 : 2}
                      strokeDasharray={isConflict ? '6 4' : undefined}
                      filter={isConflict ? 'url(#glow)' : undefined}
                    />

                    {/* Edge Midpoint Label Pill */}
                    <rect
                      x={midX - 50}
                      y={midY - 12}
                      width={100}
                      height={24}
                      rx={8}
                      fill={isConflict ? '#450A0A' : '#1E293B'}
                      stroke={isConflict ? '#DC2626' : '#334155'}
                      strokeWidth={1}
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="bold"
                      fill={isConflict ? '#FCA5A5' : '#94A3B8'}
                    >
                      {edge.label?.slice(0, 18)}
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {graphData.nodes.map(node => {
                const coords = getNodeCoords(node);
                const isSelected = selectedNode?.id === node.id;

                let nodeFill = 'url(#progRadial)';
                let nodeStroke = '#64748B';
                let haloStroke = 'transparent';

                if (node.type === 'student') {
                  nodeFill = node.hasConflict ? 'url(#studentConflictRadial)' : 'url(#studentNominalRadial)';
                  nodeStroke = node.hasConflict ? '#EF4444' : '#3B82F6';
                  haloStroke = node.hasConflict ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.3)';
                } else if (node.type === 'institution') {
                  nodeFill = 'url(#instRadial)';
                  nodeStroke = '#10B981';
                  haloStroke = 'rgba(16, 185, 129, 0.3)';
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${coords.x}, ${coords.y})`}
                    onClick={() => {
                      setSelectedNode(node);
                      if (node.data?.caseId) {
                        loadCaseDetails(node.data.caseId);
                      }
                    }}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    {/* Glowing pulse halo */}
                    {isSelected && (
                      <circle
                        r={node.type === 'student' ? 44 : 38}
                        fill="none"
                        stroke={haloStroke}
                        strokeWidth={4}
                        className="animate-pulse"
                      />
                    )}

                    <circle
                      r={node.type === 'student' ? 34 : 28}
                      fill={nodeFill}
                      stroke={nodeStroke}
                      strokeWidth={isSelected ? 3.5 : 2}
                      filter="url(#glow)"
                    />

                    {/* Node text */}
                    <text
                      y={node.type === 'student' ? 46 : 42}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#FFFFFF"
                      className="select-none"
                    >
                      {node.label.length > 22 ? node.label.slice(0, 20) + '...' : node.label}
                    </text>
                    <text
                      y={node.type === 'student' ? 58 : 54}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#94A3B8"
                      className="select-none font-medium"
                    >
                      {node.subLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="p-3.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Select any node on canvas to inspect evidence details and regulatory history.</span>
            </span>
            <span className="font-bold text-slate-300">Live Regulatory Graph Topology</span>
          </div>
        </div>

        {/* Case Investigation & Resolution Side Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Case Investigation
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {selectedCase ? selectedCase.conflictCase.student_name : 'Select a Conflict Node'}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {selectedCase ? selectedCase.conflictCase.apaar_id_masked : ''}
                </p>
              </div>
              {selectedCase && (
                <StatusBadge status={selectedCase.conflictCase.status} size="sm" />
              )}
            </div>

            {selectedCase ? (
              <div className="mt-4 space-y-4">
                {/* Conflict Classification Card */}
                <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200 text-xs text-rose-900 shadow-2xs">
                  <div className="font-bold mb-1 flex items-center gap-1.5 text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Overlapping Enrolment Violation</span>
                  </div>
                  <p className="text-[11px] text-rose-800/90 leading-relaxed font-medium">
                    {selectedCase.conflictCase.case_notes}
                  </p>
                </div>

                {/* Conflicting Institutions Comparison */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Conflicting Enrolment Records</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCase.linkedEnrolments.map((enr: any, idx: number) => (
                      <div key={enr.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">College {idx === 0 ? 'A' : 'B'}: {enr.institution_name}</span>
                          <StatusBadge status={enr.enrolment_status} size="sm" />
                        </div>
                        <p className="text-slate-700 mt-1 font-semibold">{enr.programme_name} ({enr.programme_code})</p>
                        <div className="flex justify-between text-slate-500 text-[11px] mt-2 font-mono pt-1.5 border-t border-slate-200">
                          <span>Admitted: {enr.admission_date}</span>
                          <span>Roll: {enr.roll_number}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Formal Case Resolution Form */}
                {selectedCase.conflictCase.status !== 'RESOLVED' && (
                  <div className="pt-3 border-t border-slate-200 space-y-2.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Record Regulatory Resolution Action
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Verified student transfer clearance from College A to College B via counselling TC."
                      value={resolutionText}
                      onChange={e => setResolutionText(e.target.value)}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xs"
                    />
                    <button
                      onClick={handleResolve}
                      disabled={resolving || !resolutionText}
                      className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 active:scale-98"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{resolving ? 'Recording Resolution...' : 'Resolve Conflict & Update Ledger'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-slate-400">
                Click a student node in the graph to inspect evidence and execute resolution.
              </div>
            )}
          </div>

          <div className="pt-3 text-[10px] text-slate-400 text-center font-medium">
            AICTE Cross-Institution Conflict Network Engine • Team Stratix 2026–2027
          </div>
        </div>
      </div>
    </div>
  );
};
