import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Filter, Building2, AlertTriangle, ShieldCheck, Download, ExternalLink, MapPin, Globe, Compass } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { api } from '../../services/api';

// Custom Map Marker Icons using Leaflet divIcon
const createCustomIcon = (riskScore: number, hasAlert: boolean) => {
  const bg = riskScore >= 70 || hasAlert ? '#DC2626' : riskScore >= 30 ? '#D97706' : '#16A34A';
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${bg};
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

// Component to dynamically pan map when state changes
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

export const GeographicHeatmap: React.FC = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([21.7679, 78.8718]);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [selectedInst, setSelectedInst] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const stateCoords: Record<string, { center: [number, number]; zoom: number }> = {
    'West Bengal': { center: [22.9868, 87.8550], zoom: 7 },
    'Karnataka': { center: [15.3173, 75.7139], zoom: 7 },
    'Maharashtra': { center: [19.7515, 75.7139], zoom: 7 },
    'Delhi': { center: [28.7041, 77.1025], zoom: 10 },
    'Tamil Nadu': { center: [11.1271, 78.6569], zoom: 7 },
    'Telangana': { center: [18.1124, 79.0193], zoom: 7 },
    'Uttar Pradesh': { center: [26.8467, 80.9462], zoom: 7 },
    'Gujarat': { center: [22.2587, 71.1924], zoom: 7 },
  };

  useEffect(() => {
    loadGeoData();
  }, [selectedState]);

  const loadGeoData = async () => {
    setLoading(true);
    try {
      const [instRes, stateRes] = await Promise.all([
        api.getGeoInstitutions(selectedState || undefined),
        api.getGeoStates(),
      ]);
      setInstitutions(instRes.institutions);
      setStates(stateRes.states);
    } catch (err) {
      console.error('Failed to load geographic data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    if (stateName && stateCoords[stateName]) {
      setMapCenter(stateCoords[stateName].center);
      setMapZoom(stateCoords[stateName].zoom);
    } else {
      setMapCenter([21.7679, 78.8718]);
      setMapZoom(5);
    }
  };

  return (
    <div className="space-y-6 font-display">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20">
              <Globe className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Geographical Compliance Risk Heatmap
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              Spatial Intelligence • 2026–2027
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Spatial monitoring across Indian states and territories to identify regional verification backlogs and intake violations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedState}
            onChange={e => handleStateChange(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3.5 py-2 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          >
            <option value="">National Map View (All States)</option>
            {Object.keys(stateCoords).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Interactive Map on Left, Regional Risk Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaflet Map Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden h-[560px] flex flex-col justify-between">
          <div className="p-4 border-b border-slate-200/80 bg-slate-50/80 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>{selectedState ? `Regional View: ${selectedState}` : 'Pan-India Institution Map'}</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Low Risk
              </span>
              <span className="flex items-center gap-1.5 font-bold text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Warning
              </span>
              <span className="flex items-center gap-1.5 font-bold text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span> Critical / Excess
              </span>
            </div>
          </div>

          <div className="flex-1 w-full relative z-10">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <MapViewController center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {institutions.map(inst => (
                <Marker
                  key={inst.id}
                  position={[inst.latitude, inst.longitude]}
                  icon={createCustomIcon(inst.risk_score, inst.active_alerts_count > 0)}
                  eventHandlers={{
                    click: () => setSelectedInst(inst),
                  }}
                >
                  <Popup>
                    <div className="p-1 text-xs font-display">
                      <p className="font-bold text-slate-900">{inst.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono">AICTE ID: {inst.aicte_id}</p>
                      <p className="mt-1 text-slate-600">District: {inst.district}, {inst.state}</p>
                      <div className="mt-2 flex items-center justify-between font-mono">
                        <span className="font-semibold text-slate-700">Risk Score:</span>
                        <strong className={inst.risk_score >= 50 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                          {inst.risk_score}/100
                        </strong>
                      </div>
                      <button
                        onClick={() => setSelectedInst(inst)}
                        className="mt-2.5 w-full py-1 text-center bg-blue-600 text-white font-bold rounded-lg text-[11px] hover:bg-blue-700 shadow-2xs"
                      >
                        Inspect College Profile
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
            <span>Live Spatial Risk Coordinates • Team Stratix</span>
            <span>Click any marker to open compliance profile</span>
          </div>
        </div>

        {/* State Ranking & Selected Institution Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-5 flex flex-col justify-between h-[560px]">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>State-Wise Risk Rankings</span>
            </h3>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {states.map(st => (
                <div
                  key={st.state}
                  onClick={() => handleStateChange(st.state)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedState === st.state
                      ? 'bg-blue-50 border-blue-300 shadow-2xs'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900">{st.state}</span>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {st.institutions_count} colleges • {st.active_enrolments} admissions
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        st.avg_risk_score >= 50
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {st.avg_risk_score} avg
                    </span>
                    {st.open_alerts_count > 0 && (
                      <p className="text-[10px] text-rose-700 font-bold mt-0.5">
                        {st.open_alerts_count} alert(s)
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Institution Focus Drawer Card */}
            {selectedInst ? (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="p-3.5 bg-gradient-to-r from-slate-50 to-blue-50/40 rounded-xl border border-slate-200 text-xs space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{selectedInst.name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">AICTE ID: {selectedInst.aicte_id}</p>
                    </div>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
                        selectedInst.risk_score >= 50
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      Risk: {selectedInst.risk_score}/100
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                    <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-slate-400 block text-[10px] uppercase font-sans">Approved Intake:</span>
                      <strong className="text-slate-900 text-sm">{selectedInst.total_approved_intake}</strong>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-slate-200/80">
                      <span className="text-slate-400 block text-[10px] uppercase font-sans">Admissions:</span>
                      <strong className="text-slate-900 text-sm">{selectedInst.total_enrolment}</strong>
                    </div>
                  </div>

                  {selectedInst.active_alerts_count > 0 && (
                    <div className="p-2 bg-rose-100/70 rounded-lg border border-rose-200 text-rose-900 text-[11px] font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Alert: Approved intake exceeded or unverified backlog detected.</span>
                    </div>
                  )}

                  <a
                    href={api.getInstitutionReportPdfUrl(selectedInst.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all active:scale-98"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Compliance Audit PDF</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-6 py-6 text-center text-xs text-slate-400 border-t border-slate-100">
                Click any state or map pin to inspect institutional compliance.
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-400 text-center pt-2 font-medium">
            AICTE Geographic Spatial Regulatory System • 2026–2027
          </div>
        </div>
      </div>
    </div>
  );
};
