import React, { useState, useEffect, useRef } from 'react';

// Central reference coordinates (New Delhi Command Zone)
const CENTER_LAT = 28.6139;
const CENTER_LNG = 77.2090;

// Coordinate to SVG mapping parameters (scale ~ 10km grid)
const MAP_WIDTH = 900;
const MAP_HEIGHT = 520;
const LAT_SPAN = 0.08; // ~8.8 km
const LNG_SPAN = 0.12; // ~12 km

function coordToSvg(lat, lng) {
  const x = ((lng - (CENTER_LNG - LNG_SPAN / 2)) / LNG_SPAN) * MAP_WIDTH;
  const y = (((CENTER_LAT + LAT_SPAN / 2) - lat) / LAT_SPAN) * MAP_HEIGHT;
  return { x: Math.max(20, Math.min(MAP_WIDTH - 20, x)), y: Math.max(20, Math.min(MAP_HEIGHT - 20, y)) };
}

function svgToCoord(x, y) {
  const lng = (x / MAP_WIDTH) * LNG_SPAN + (CENTER_LNG - LNG_SPAN / 2);
  const lat = (CENTER_LAT + LAT_SPAN / 2) - (y / MAP_HEIGHT) * LAT_SPAN;
  return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
}

// Great-circle Haversine formula for exact ground distance in kilometers
function calculateHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export default function TacticalPatrolMap({ onDispatchAlert, officerSession }) {
  // ── Patrol Units State ──
  const [patrolUnits, setPatrolUnits] = useState([
    {
      id: 'PCR_VAN_04',
      name: 'PCR Van #04',
      callsign: 'VIKRAM-04',
      type: 'VAN',
      officer: 'Insp. R. Sharma (Badge #4412)',
      lat: 28.6180,
      lng: 77.2020,
      speed: 48,
      heading: 42,
      status: 'PATROLLING',
      fuel: '84%',
      targetLocation: null
    },
    {
      id: 'QRT_DELTA_02',
      name: 'QRT Delta 02',
      callsign: 'DELTA-STRIKE',
      type: 'QRT',
      officer: 'Sub-Insp. K. Varma (Tactical)',
      lat: 28.6310,
      lng: 77.2210,
      speed: 62,
      heading: 175,
      status: 'PATROLLING',
      fuel: '91%',
      targetLocation: null
    },
    {
      id: 'HIGHWAY_ECHO_08',
      name: 'Interceptor Echo 08',
      callsign: 'SPEED-INTERCEPT',
      type: 'INTERCEPTOR',
      officer: 'ASI M. Rawat (Traffic/PCR)',
      lat: 28.5950,
      lng: 77.2340,
      speed: 78,
      heading: 310,
      status: 'PATROLLING',
      fuel: '76%',
      targetLocation: null
    },
    {
      id: 'BIKE_UNIT_11',
      name: 'Dial 112 Bike Cheetah',
      callsign: 'CHEETAH-11',
      type: 'BIKE',
      officer: 'HC D. Singh (Rapid First-Responder)',
      lat: 28.6420,
      lng: 77.1890,
      speed: 36,
      heading: 85,
      status: 'PATROLLING',
      fuel: '95%',
      targetLocation: null
    },
    {
      id: 'AERIAL_DRONE_01',
      name: 'Drone Recon Alpha',
      callsign: 'SKY-GUARDIAN',
      type: 'DRONE',
      officer: 'Cyber Command Tech Op S. Nair',
      lat: 28.6110,
      lng: 77.2280,
      speed: 24,
      heading: 120,
      status: 'AERIAL_SURVEILLANCE',
      fuel: 'Battery 72%',
      targetLocation: null
    }
  ]);

  // ── Incidents State ──
  const [incidents, setIncidents] = useState([
    {
      id: 'INC_001',
      category: 'WOMEN SAFETY SOS (CRITICAL)',
      locationName: 'Sector 4 Market / Metro Gate 2',
      lat: 28.6139,
      lng: 77.2090,
      callerPhone: '+91-9988776655',
      severity: 'CRITICAL',
      assignedUnitId: 'PCR_VAN_04'
    },
    {
      id: 'INC_002',
      category: 'ARMED ROBBERY INTERCEPT',
      locationName: 'Outer Ring Junction (Checkpost 7)',
      lat: 28.6250,
      lng: 77.2180,
      callerPhone: '+91-9811223344',
      severity: 'HIGH',
      assignedUnitId: null
    }
  ]);

  // Selected Target Point (User touch / click on map)
  const [touchTarget, setTouchTarget] = useState({
    lat: 28.6139,
    lng: 77.2090,
    name: 'Sector 4 Market Distress Beacon'
  });

  const [selectedUnitId, setSelectedUnitId] = useState('PCR_VAN_04');
  const [selectedIncidentId, setSelectedIncidentId] = useState('INC_001');
  const [trackingMode, setTrackingMode] = useState(true);
  const [filterLayer, setFilterLayer] = useState('ALL'); // ALL, PATROLS, INCIDENTS

  const svgRef = useRef(null);

  // ── Real-Time GPS Movement Simulation Loop ──
  useEffect(() => {
    if (!trackingMode) return;

    const interval = setInterval(() => {
      setPatrolUnits(prevUnits =>
        prevUnits.map(unit => {
          let newLat = unit.lat;
          let newLng = unit.lng;

          // If unit has an assigned destination target, travel towards it
          if (unit.targetLocation) {
            const dLat = unit.targetLocation.lat - unit.lat;
            const dLng = unit.targetLocation.lng - unit.lng;
            const dist = Math.sqrt(dLat * dLat + dLng * dLng);
            if (dist > 0.001) {
              const step = 0.0006;
              newLat += (dLat / dist) * step;
              newLng += (dLng / dist) * step;
            }
          } else {
            // General patrol drift
            const angle = (unit.heading * Math.PI) / 180;
            const jitterLat = Math.cos(angle) * 0.00015 + (Math.random() - 0.5) * 0.00005;
            const jitterLng = Math.sin(angle) * 0.0002 + (Math.random() - 0.5) * 0.00005;
            newLat += jitterLat;
            newLng += jitterLng;

            // Turn around if near boundary
            if (newLat > CENTER_LAT + LAT_SPAN / 2 - 0.005 || newLat < CENTER_LAT - LAT_SPAN / 2 + 0.005) {
              unit.heading = (unit.heading + 180) % 360;
            }
            if (newLng > CENTER_LNG + LNG_SPAN / 2 - 0.005 || newLng < CENTER_LNG - LNG_SPAN / 2 + 0.005) {
              unit.heading = (unit.heading + 180) % 360;
            }
          }

          return {
            ...unit,
            lat: Number(newLat.toFixed(5)),
            lng: Number(newLng.toFixed(5))
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [trackingMode]);

  // ── Touch / Click Handler on Map ──
  const handleMapTouch = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const svgX = ((clientX - rect.left) / rect.width) * MAP_WIDTH;
    const svgY = ((clientY - rect.top) / rect.height) * MAP_HEIGHT;

    const coords = svgToCoord(svgX, svgY);
    setTouchTarget({
      lat: coords.lat,
      lng: coords.lng,
      name: `Touch Waypoint (${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E)`
    });
    setSelectedIncidentId(null);
  };

  // ── Distance & ETA Calculations for Touch Target ──
  const unitDistances = patrolUnits.map(unit => {
    const distKm = calculateHaversine(unit.lat, unit.lng, touchTarget.lat, touchTarget.lng);
    const speed = Math.max(30, unit.speed);
    const etaSecs = Math.round((distKm / speed) * 3600);
    return {
      ...unit,
      distanceKm: distKm,
      distanceMeters: Math.round(distKm * 1000),
      etaSeconds: etaSecs,
      etaFormatted: etaSecs < 60 ? `${etaSecs}s` : `${Math.floor(etaSecs / 60)}m ${etaSecs % 60}s`
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);

  const nearestUnit = unitDistances[0];
  const activeSelectedUnit = patrolUnits.find(u => u.id === selectedUnitId) || nearestUnit;

  // ── Dispatch Patrol Unit to Selected Touch Location ──
  const handleDispatchNearest = (unitId) => {
    const targetUnitId = unitId || nearestUnit.id;
    setPatrolUnits(prev =>
      prev.map(u => {
        if (u.id === targetUnitId) {
          return {
            ...u,
            status: 'EN_ROUTE_DISPATCH',
            targetLocation: { lat: touchTarget.lat, lng: touchTarget.lng }
          };
        }
        return u;
      })
    );

    if (onDispatchAlert) {
      onDispatchAlert({
        target: touchTarget,
        unit: nearestUnit,
        distanceKm: nearestUnit.distanceKm,
        eta: nearestUnit.etaFormatted
      });
    }
  };

  // Convert points to SVG for rendering
  const touchSvg = coordToSvg(touchTarget.lat, touchTarget.lng);
  const nearestSvg = coordToSvg(nearestUnit.lat, nearestUnit.lng);

  return (
    <div className="space-y-4 font-mono select-none">

      {/* ── TOP GIS STATUS & CONTROLS STRIP ── */}
      <div className="bg-[#050c15] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div>
            <h3 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2">
              REAL-TIME POLICE GIS PATROL MESH &amp; TOUCH TRACKING
            </h3>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Touch or tap any coordinate on the map to query live GPS location, lock nearest patrol unit, and compute real-time geodesic ground distance and ETA.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="bg-[#020810] border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Active Patrols: <strong className="text-cyan-300">{patrolUnits.length}</strong></span>
          </div>

          <button
            onClick={() => setTrackingMode(!trackingMode)}
            className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
              trackingMode
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                : 'bg-slate-900 text-slate-500 border-slate-700'
            }`}
          >
            {trackingMode ? 'LIVE GPS: STREAMING' : 'GPS PAUSED'}
          </button>

          <div className="flex bg-[#020810] p-1 rounded-xl border border-slate-800 text-[10px]">
            {['ALL', 'PATROLS', 'INCIDENTS'].map(layer => (
              <button
                key={layer}
                onClick={() => setFilterLayer(layer)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterLayer === layer
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN MAP VIEWPORT CONTAINER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ── LEFT: INTERACTIVE TACTICAL GIS MAP (8 Cols) ── */}
        <div className="lg:col-span-8 bg-[#020810] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">

          {/* Map Header Overlay */}
          <div className="absolute top-3 left-3 z-10 bg-[#050c15]/90 border border-slate-800 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center gap-3 text-xs">
            <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">
              ZONE: METRO CENTRAL COMMAND (HQ NORTH BLOCK)
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-[10px] text-slate-400">
              GRID: {CENTER_LAT}°N, {CENTER_LNG}°E
            </span>
          </div>

          {/* Touch Waypoint Info Floating Badge */}
          <div className="absolute top-3 right-3 z-10 bg-[#050c15]/90 border border-cyan-800/80 rounded-xl px-3 py-1.5 backdrop-blur-md text-right text-xs">
            <div className="text-[9px] text-slate-400 uppercase">TAPPED LOCATION</div>
            <div className="text-cyan-300 font-bold text-[11px] truncate max-w-[220px]">
              {touchTarget.name}
            </div>
          </div>

          {/* SVG Tactical Vector Map */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            onClick={handleMapTouch}
            className="w-full h-auto cursor-crosshair block select-none bg-[#020712]"
            style={{ minHeight: '440px' }}
          >
            {/* Background Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30, 58, 95, 0.25)" strokeWidth="0.8" />
              </pattern>
              <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </radialGradient>
            </defs>

            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#030914" />
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#grid)" />

            {/* Concentric Sector Rings around Command HQ */}
            {[100, 200, 320, 440].map((r, i) => (
              <circle
                key={i}
                cx={MAP_WIDTH / 2}
                cy={MAP_HEIGHT / 2}
                r={r}
                fill="none"
                stroke="rgba(14, 116, 144, 0.18)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            ))}

            {/* City Arterial Roads */}
            <path
              d="M 50 180 Q 300 240 450 260 T 850 320"
              fill="none"
              stroke="#0f2238"
              strokeWidth="12"
            />
            <path
              d="M 50 180 Q 300 240 450 260 T 850 320"
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
            {/* North-South Ring Expressway */}
            <path
              d="M 280 40 Q 340 260 450 380 T 620 480"
              fill="none"
              stroke="#0f2238"
              strokeWidth="10"
            />
            <path
              d="M 280 40 Q 340 260 450 380 T 620 480"
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="2"
            />

            {/* Sector Labels */}
            {[
              { label: 'SECTOR 1 (NORTH)', x: 160, y: 80 },
              { label: 'SECTOR 4 (CENTRAL)', x: 260, y: 220 },
              { label: 'SECTOR 7 (BORDER)', x: 740, y: 160 },
              { label: 'SECTOR 9 (WEST)', x: 120, y: 380 },
              { label: 'SECTOR 12 (SOUTH)', x: 680, y: 440 }
            ].map((s, idx) => (
              <text
                key={idx}
                x={s.x}
                y={s.y}
                fill="#1e3852"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="1.5"
              >
                {s.label}
              </text>
            ))}

            {/* Command Center Central Hub */}
            <g transform={`translate(${MAP_WIDTH / 2}, ${MAP_HEIGHT / 2})`}>
              <circle r="18" fill="rgba(245, 158, 11, 0.12)" />
              <circle r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              <text y="24" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">
                COMMAND HQ (NORTH BLOCK)
              </text>
            </g>

            {/* ── DYNAMIC INTERCEPT TRAJECTORY LINE TO NEAREST UNIT ── */}
            <line
              x1={nearestSvg.x}
              y1={nearestSvg.y}
              x2={touchSvg.x}
              y2={touchSvg.y}
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* Distance Vector Midpoint Tag */}
            <g transform={`translate(${(nearestSvg.x + touchSvg.x) / 2}, ${(nearestSvg.y + touchSvg.y) / 2 - 12})`}>
              <rect x="-48" y="-10" width="96" height="20" rx="4" fill="#020810" stroke="#10b981" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">
                {nearestUnit.distanceKm.toFixed(2)} km • {nearestUnit.etaFormatted}
              </text>
            </g>

            {/* ── INCIDENTS RENDER ── */}
            {(filterLayer === 'ALL' || filterLayer === 'INCIDENTS') && incidents.map(inc => {
              const pt = coordToSvg(inc.lat, inc.lng);
              const isSelected = selectedIncidentId === inc.id;
              return (
                <g
                  key={inc.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIncidentId(inc.id);
                    setTouchTarget({
                      lat: inc.lat,
                      lng: inc.lng,
                      name: `${inc.category} — ${inc.locationName}`
                    });
                  }}
                >
                  <circle r="22" fill="rgba(239, 68, 68, 0.2)" className="animate-ping" />
                  <circle r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">!</text>
                  <text y="24" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">
                    {inc.category}
                  </text>
                </g>
              );
            })}

            {/* ── PATROL UNITS RENDER ── */}
            {(filterLayer === 'ALL' || filterLayer === 'PATROLS') && patrolUnits.map(unit => {
              const pt = coordToSvg(unit.lat, unit.lng);
              const isSelected = selectedUnitId === unit.id;
              const isNearest = nearestUnit.id === unit.id;

              return (
                <g
                  key={unit.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUnitId(unit.id);
                  }}
                >
                  {/* Outer selection ring */}
                  {(isSelected || isNearest) && (
                    <circle r="24" fill="none" stroke={isNearest ? '#10b981' : '#06b6d4'} strokeWidth="1.5" strokeDasharray="3 3" />
                  )}

                  {/* Vehicle Body Marker */}
                  <circle
                    r="10"
                    fill={isNearest ? '#10b981' : isSelected ? '#06b6d4' : '#38bdf8'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />

                  {/* Direction Heading Indicator */}
                  <line
                    x1="0"
                    y1="0"
                    x2={Math.sin((unit.heading * Math.PI) / 180) * 16}
                    y2={-Math.cos((unit.heading * Math.PI) / 180) * 16}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* Callsign Tag */}
                  <rect x="-32" y="14" width="64" height="14" rx="3" fill="#020810" stroke={isNearest ? '#10b981' : '#1e3a5f'} strokeWidth="0.8" />
                  <text x="0" y="24" textAnchor="middle" fill={isNearest ? '#10b981' : '#e2e8f0'} fontSize="8" fontWeight="bold">
                    {unit.callsign}
                  </text>
                </g>
              );
            })}

            {/* ── TOUCH TARGET PIN (USER TAPPED POINT) ── */}
            <g transform={`translate(${touchSvg.x}, ${touchSvg.y})`} pointerEvents="none">
              <circle r="18" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="animate-ping" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#06b6d4" strokeWidth="2" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#06b6d4" strokeWidth="2" />
              <circle r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="1" />
            </g>

          </svg>

          {/* Map Footer Help Bar */}
          <div className="bg-[#050c15] border-t border-slate-800 px-4 py-2 flex flex-wrap justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>TOUCH ANY MAP LOCATION TO SET INTERCEPT WAYPOINT &amp; MEASURE DISTANCE</span>
            <span>PROJECTION: WGS-84 / UTM ZONE 43N • REFRESH: 1.5s</span>
          </div>
        </div>

        {/* ── RIGHT: LIVE TRACKING TELEMETRY & DISTANCE RADAR (4 Cols) ── */}
        <div className="lg:col-span-4 space-y-4">

          {/* Nearest Interceptor Card */}
          <div className="bg-[#0a1525] border-2 border-emerald-600/70 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  OPTIMAL INTERCEPTOR UNIT
                </span>
                <div className="text-base font-bold text-white mt-1">{nearestUnit.name}</div>
                <div className="text-[10px] text-cyan-400">{nearestUnit.officer}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400 font-mono">{nearestUnit.distanceKm.toFixed(2)} km</div>
                <div className="text-[10px] text-slate-400">ETA: <strong className="text-amber-400">{nearestUnit.etaFormatted}</strong></div>
              </div>
            </div>

            {/* GPS Ground Telemetry */}
            <div className="bg-[#060d1a] p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">LIVE GPS COORDS:</span>
                <span className="text-slate-200 font-mono">{nearestUnit.lat.toFixed(4)}°N, {nearestUnit.lng.toFixed(4)}°E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CURRENT SPEED:</span>
                <span className="text-cyan-400 font-bold">{nearestUnit.speed} km/h (Active Transit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BEARING / HEADING:</span>
                <span className="text-slate-300">{nearestUnit.heading}° NNE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">UNIT STATUS:</span>
                <span className="text-emerald-400 font-bold">{nearestUnit.status}</span>
              </div>
            </div>

            {/* Touch Action Button: Dispatch Nearest Patrol */}
            <button
              onClick={() => handleDispatchNearest(nearestUnit.id)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              DISPATCH {nearestUnit.callsign} TO WAYPOINT
            </button>
          </div>

          {/* All Patrol Units Distance Breakdown List */}
          <div className="bg-[#0a1525] border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                PATROL PROXIMITY RADAR
              </h4>
              <span className="text-[10px] text-slate-500">Sorted by distance</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {unitDistances.map((unit, idx) => (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedUnitId === unit.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                      : 'bg-[#060d1a] border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500">#{idx + 1}</span>
                      <span className="font-bold text-slate-200">{unit.callsign}</span>
                      <span className="text-[9px] text-slate-500">({unit.type})</span>
                    </div>
                    <span className="font-bold text-emerald-400 font-mono">
                      {unit.distanceKm.toFixed(2)} km
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Speed: {unit.speed} km/h</span>
                    <span>ETA: <strong className="text-amber-400">{unit.etaFormatted}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
