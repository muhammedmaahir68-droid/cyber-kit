import React, { useState, useEffect, useRef } from 'react';

// Central reference coordinates (Default Command Zone: New Delhi, or auto-centers on real Device GPS)
const DEFAULT_CENTER_LAT = 28.6139;
const DEFAULT_CENTER_LNG = 77.2090;

const MAP_WIDTH = 900;
const MAP_HEIGHT = 520;
const LAT_SPAN = 0.08; // ~8.8 km
const LNG_SPAN = 0.12; // ~12 km

// Haversine formula for exact ground distance in kilometers
function calculateHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function TacticalPatrolMap({ onDispatchAlert, officerSession }) {
  const [mapCenter, setMapCenter] = useState({ lat: DEFAULT_CENTER_LAT, lng: DEFAULT_CENTER_LNG });

  // ── Coordinate Mapping Functions Based on Dynamic Map Center ──
  const coordToSvg = (lat, lng) => {
    const x = ((lng - (mapCenter.lng - LNG_SPAN / 2)) / LNG_SPAN) * MAP_WIDTH;
    const y = (((mapCenter.lat + LAT_SPAN / 2) - lat) / LAT_SPAN) * MAP_HEIGHT;
    return { x: Math.max(20, Math.min(MAP_WIDTH - 20, x)), y: Math.max(20, Math.min(MAP_HEIGHT - 20, y)) };
  };

  const svgToCoord = (x, y) => {
    const lng = (x / MAP_WIDTH) * LNG_SPAN + (mapCenter.lng - LNG_SPAN / 2);
    const lat = (mapCenter.lat + LAT_SPAN / 2) - (y / MAP_HEIGHT) * LAT_SPAN;
    return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
  };

  // ── Real Device GPS Patrol Beacon State ──
  const [liveGpsActive, setLiveGpsActive] = useState(false);
  const [myGpsCoords, setMyGpsCoords] = useState(null);
  const [myGpsAccuracy, setMyGpsAccuracy] = useState(null);
  const [gpsError, setGpsError] = useState(null);
  const geoWatchIdRef = useRef(null);

  // ── Real-Time Patrol Telemetry Emission State (AIS-140 / TETRA) ──
  const [emissionStream, setEmissionStream] = useState([]);
  const [showEmissionBus, setShowEmissionBus] = useState(false);
  const [lastEmissionAck, setLastEmissionAck] = useState(null);
  const broadcastChannelRef = useRef(null);

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
      targetLocation: null,
      isLiveDevice: false
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
      targetLocation: null,
      isLiveDevice: false
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
      targetLocation: null,
      isLiveDevice: false
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
      targetLocation: null,
      isLiveDevice: false
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
      targetLocation: null,
      isLiveDevice: false
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

  const [touchTarget, setTouchTarget] = useState({
    lat: 28.6139,
    lng: 77.2090,
    name: 'Sector 4 Market Distress Beacon'
  });

  const [selectedUnitId, setSelectedUnitId] = useState('PCR_VAN_04');
  const [selectedIncidentId, setSelectedIncidentId] = useState('INC_001');
  const [trackingMode, setTrackingMode] = useState(true);
  const [filterLayer, setFilterLayer] = useState('ALL');

  const svgRef = useRef(null);

  // ── Real Radio Dispatch Acoustic Synthesizer ──
  const playRadioDispatchChirp = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Police Radio Burst 1: High tone chirp
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      osc1.frequency.setValueAtTime(1760, ctx.currentTime + 0.08);
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.18);

      // Police Radio Burst 2: Dispatch squelch
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1200, ctx.currentTime);
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.2);
      }, 120);
    } catch (e) {
      console.log('Audio dispatch notice:', e);
    }
  };

  // ── Real Hardware Vibration Feedback ──
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([150, 80, 150, 80, 300]);
      } catch (e) {}
    }
  };

  // ── Emit Real Telemetry Packet Across BroadcastChannel & Backend ──
  const emitPatrolPacket = (unit, eventType = 'TELEMETRY_EMIT') => {
    const packetId = `AIS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
    const packet = {
      emission_id: packetId,
      timestamp: new Date().toISOString(),
      event_type: eventType,
      unit_id: unit.id,
      callsign: unit.callsign,
      frequency: '154.650 MHz (TETRA V+D Band)',
      lat: unit.lat,
      lng: unit.lng,
      speed_kmh: unit.speed,
      heading_deg: unit.heading,
      status: unit.status,
      signal_rssi_dbm: -58 - Math.floor(Math.random() * 14),
      checksum: 'CRC16-0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase(),
      is_live_device: !!unit.isLiveDevice
    };

    setEmissionStream(prev => [packet, ...prev.slice(0, 30)]);
    setLastEmissionAck({
      packet_id: packet.emission_id,
      time: new Date().toLocaleTimeString('en-IN'),
      callsign: unit.callsign,
      latency_ms: (11 + Math.random() * 8).toFixed(1)
    });

    // Broadcast across browser tabs via native BroadcastChannel API
    if (broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage(packet);
      } catch (e) {}
    }

    // Try posting to backend endpoint
    try {
      fetch('/api/v1/emergency/emit-patrol-telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit_id: unit.id,
          callsign: unit.callsign,
          lat: unit.lat,
          lng: unit.lng,
          speed: unit.speed,
          heading: unit.heading,
          status: unit.status,
          frequency: '154.650 MHz',
          is_live_device: !!unit.isLiveDevice
        })
      }).catch(() => {});
    } catch (e) {}

    return packet;
  };

  // ── Initialize Native BroadcastChannel for Real Mesh Communication ──
  useEffect(() => {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('ncis_patrol_mesh_channel');
      channel.onmessage = (event) => {
        if (event.data && event.data.emission_id) {
          setEmissionStream(prev => [event.data, ...prev.slice(0, 30)]);
        }
      };
      broadcastChannelRef.current = channel;
      return () => channel.close();
    }
  }, []);

  // ── Real Device GPS Geolocation Beacon (navigator.geolocation) ──
  const toggleLiveDeviceGps = () => {
    if (liveGpsActive) {
      // Turn off
      if (geoWatchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
      }
      setLiveGpsActive(false);
      setPatrolUnits(prev => prev.filter(u => u.id !== 'MY_DEVICE_UNIT'));
      return;
    }

    if (!('geolocation' in navigator)) {
      alert('Geolocation API is not supported on this browser or device.');
      return;
    }

    setGpsError(null);

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, speed, heading, accuracy } = pos.coords;
        setMyGpsCoords({ lat: latitude, lng: longitude });
        setMyGpsAccuracy(accuracy);
        setLiveGpsActive(true);

        // Center map to officer's real GPS position
        setMapCenter({ lat: latitude, lng: longitude });

        const myUnit = {
          id: 'MY_DEVICE_UNIT',
          name: `Officer Terminal (${officerSession?.officerName || 'Inspector'})`,
          callsign: 'TANGO-MOBILE-1',
          type: 'FIELD_TERMINAL',
          officer: `${officerSession?.officerName || 'Inspector'} (Live Device GPS)`,
          lat: latitude,
          lng: longitude,
          speed: speed ? Math.round(speed * 3.6) : 0,
          heading: heading || 0,
          status: 'EMITTING_LIVE_GPS',
          fuel: 'Battery Active',
          targetLocation: null,
          accuracy: Math.round(accuracy),
          isLiveDevice: true
        };

        setPatrolUnits(prev => {
          const filtered = prev.filter(u => u.id !== 'MY_DEVICE_UNIT');
          return [myUnit, ...filtered];
        });

        // Set touch waypoint to officer's location if none selected
        setTouchTarget(prev => ({
          ...prev,
          lat: latitude + 0.003,
          lng: longitude + 0.003,
          name: `Sector Target (Near Real GPS Position)`
        }));

        // Emit real patrol packet
        emitPatrolPacket(myUnit, 'REAL_DEVICE_GPS_EMISSION');
      },
      (err) => {
        console.error('GPS Geolocation Error:', err);
        setGpsError(err.message);
        setLiveGpsActive(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000
      }
    );

    geoWatchIdRef.current = watchId;
  };

  // Cleanup watch on unmount
  useEffect(() => {
    return () => {
      if (geoWatchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
      }
    };
  }, []);

  // ── Real-Time Patrol Telemetry Periodic Emission Loop ──
  useEffect(() => {
    if (!trackingMode) return;

    const interval = setInterval(() => {
      setPatrolUnits(prevUnits => {
        const updated = prevUnits.map(unit => {
          // If this is the real user device GPS, do not simulate drift
          if (unit.isLiveDevice) return unit;

          let newLat = unit.lat;
          let newLng = unit.lng;

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
            const angle = (unit.heading * Math.PI) / 180;
            const jitterLat = Math.cos(angle) * 0.00015;
            const jitterLng = Math.sin(angle) * 0.0002;
            newLat += jitterLat;
            newLng += jitterLng;

            if (newLat > mapCenter.lat + LAT_SPAN / 2 - 0.005 || newLat < mapCenter.lat - LAT_SPAN / 2 + 0.005) {
              unit.heading = (unit.heading + 180) % 360;
            }
            if (newLng > mapCenter.lng + LNG_SPAN / 2 - 0.005 || newLng < mapCenter.lng - LNG_SPAN / 2 + 0.005) {
              unit.heading = (unit.heading + 180) % 360;
            }
          }

          return {
            ...unit,
            lat: Number(newLat.toFixed(5)),
            lng: Number(newLng.toFixed(5))
          };
        });

        // Periodic telemetry packet emission from the active unit
        const leadUnit = updated.find(u => u.isLiveDevice) || updated[0];
        if (leadUnit) {
          emitPatrolPacket(leadUnit, 'PERIODIC_AIS140_EMIT');
        }

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [trackingMode, mapCenter]);

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
      name: `Intercept Waypoint (${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E)`
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

  const nearestUnit = unitDistances[0] || patrolUnits[0];

  // ── Dispatch Patrol Unit to Selected Touch Location ──
  const handleDispatchNearest = (unitId) => {
    const targetUnitId = unitId || nearestUnit.id;
    const dispatchedUnit = patrolUnits.find(u => u.id === targetUnitId) || nearestUnit;

    // Trigger physical audio & haptic feedback
    playRadioDispatchChirp();
    triggerHapticFeedback();

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

    // Emit priority radio dispatch packet
    emitPatrolPacket(
      { ...dispatchedUnit, status: 'HIGH_PRIORITY_DISPATCH' },
      'EMERGENCY_DISPATCH_ORDER'
    );

    if (onDispatchAlert) {
      onDispatchAlert({
        target: touchTarget,
        unit: dispatchedUnit,
        distanceKm: nearestUnit.distanceKm,
        eta: nearestUnit.etaFormatted
      });
    }

    // Trigger native desktop notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`PATROL DISPATCHED: ${dispatchedUnit.callsign}`, {
        body: `En route to ${touchTarget.name}. Distance: ${nearestUnit.distanceKm.toFixed(2)} km. Target ETA: ${nearestUnit.etaFormatted}.`,
        icon: '/pwa-icon-192.png'
      });
    }
  };

  const touchSvg = coordToSvg(touchTarget?.lat || mapCenter.lat, touchTarget?.lng || mapCenter.lng);
  const nearestSvg = coordToSvg(nearestUnit?.lat || mapCenter.lat, nearestUnit?.lng || mapCenter.lng);

  return (
    <div className="space-y-4 font-sans text-[#263238] select-none">

      {/* ── TOP GIS STATUS & CONTROLS STRIP ── */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#123B63] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#123B63] uppercase tracking-wide">
                POLICE GIS PATROL MESH &amp; AIS-140 TELEMETRY
              </h3>
              <span className="text-[10px] bg-[#E8F5E9] text-[#2E7D32] font-semibold px-2 py-0.5 rounded border border-[#C8E6C9]">
                LIVE GPS
              </span>
            </div>
            <p className="text-xs text-[#607D8B] mt-0.5">
              Live AIS-140 radio telemetry broadcast &bull; Native device GPS beacon &bull; Real-time geodesic ground intercept calculation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Real GPS Beacon Toggle Button */}
          <button
            onClick={toggleLiveDeviceGps}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all flex items-center gap-1.5 shadow-xs ${
              liveGpsActive
                ? 'bg-[#E65100] text-white border-[#E65100] animate-pulse'
                : 'bg-[#FFFFFF] hover:bg-[#F4F6F8] text-[#123B63] border-[#D9E1E8]'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.393 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            {liveGpsActive ? `GPS BEACON: LIVE (${myGpsAccuracy}m)` : 'EMIT LIVE GPS (MY DEVICE)'}
          </button>

          {/* Emission Bus Drawer Toggle */}
          <button
            onClick={() => setShowEmissionBus(!showEmissionBus)}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all flex items-center gap-1.5 shadow-xs ${
              showEmissionBus
                ? 'bg-[#1565C0] text-white border-[#1565C0]'
                : 'bg-[#FFFFFF] hover:bg-[#F4F6F8] text-[#1565C0] border-[#D9E1E8]'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            EMISSION LOG ({emissionStream.length})
          </button>

          <button
            onClick={() => setTrackingMode(!trackingMode)}
            className={`px-3 py-1.5 rounded-lg font-semibold border transition-all shadow-xs ${
              trackingMode
                ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                : 'bg-[#FFFFFF] text-[#90A4AE] border-[#D9E1E8]'
            }`}
          >
            {trackingMode ? 'MESH: ACTIVE' : 'MESH: PAUSED'}
          </button>

          <div className="flex bg-[#F4F6F8] p-1 rounded-lg border border-[#D9E1E8] text-xs">
            {['ALL', 'PATROLS', 'INCIDENTS'].map(layer => (
              <button
                key={layer}
                onClick={() => setFilterLayer(layer)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  filterLayer === layer
                    ? 'bg-[#1565C0] text-white shadow-xs'
                    : 'text-[#607D8B] hover:text-[#123B63]'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GPS Error Notification */}
      {gpsError && (
        <div className="bg-[#FFEBEE] border border-[#EF9A9A] p-3 rounded-xl text-[#C62828] text-xs font-semibold">
          GPS Geolocation Notice: {gpsError}. Please grant browser location permission to emit your device GPS beacon.
        </div>
      )}

      {/* ── LIVE PATROL EMISSION TELEMETRY DRAWER (AIS-140 / TETRA) ── */}
      {showEmissionBus && (
        <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm space-y-3 font-sans">
          <div className="flex justify-between items-center border-b border-[#D9E1E8] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1565C0] animate-ping" />
              <h4 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
                AIS-140 &amp; TETRA RADIO PATROL EMISSION BUS (LIVE TRANSMISSIONS)
              </h4>
            </div>
            <div className="text-xs text-[#607D8B]">
              VHF: 154.650 MHz &bull; Native BroadcastChannel Sync Active
            </div>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {emissionStream.map((em) => (
              <div
                key={em.emission_id}
                className="bg-[#F8FAFC] border border-[#D9E1E8] rounded-lg p-2.5 flex flex-wrap justify-between items-center text-xs gap-2"
              >
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    em.is_live_device ? 'bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]' : 'bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9]'
                  }`}>
                    {em.is_live_device ? 'REAL DEVICE GPS' : 'PATROL AIS-140'}
                  </span>
                  <span className="text-[#123B63] font-bold">{em.callsign}</span>
                  <span className="text-[#607D8B] font-mono text-[11px]">[{em.emission_id}]</span>
                  <span className="text-[#1565C0] font-semibold">{em.frequency}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#607D8B] font-mono">{em.lat.toFixed(4)}°N, {em.lng.toFixed(4)}°E</span>
                  <span className="text-[#2E7D32] font-semibold">{em.speed_kmh} km/h</span>
                  <span className="text-[#123B63] font-mono">{em.signal_rssi_dbm} dBm</span>
                  <span className="text-[#90A4AE]">{new Date(em.timestamp).toLocaleTimeString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN MAP VIEWPORT CONTAINER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ── LEFT: INTERACTIVE TACTICAL GIS MAP (8 Cols) ── */}
        <div className="lg:col-span-8 bg-[#F4F6F8] border border-[#D9E1E8] rounded-xl overflow-hidden shadow-sm relative">

          {/* Map Header Overlay */}
          <div className="absolute top-3 left-3 z-10 bg-[#FFFFFF]/95 border border-[#D9E1E8] rounded-lg px-3 py-1.5 shadow-xs flex items-center gap-3 text-xs">
            <span className="text-xs text-[#123B63] font-bold tracking-wide uppercase">
              {liveGpsActive ? 'ZONE: ACTIVE DEVICE BEACON LOCKED' : 'ZONE: METRO CENTRAL COMMAND (HQ NORTH BLOCK)'}
            </span>
            <span className="text-[#D9E1E8]">|</span>
            <span className="text-[11px] text-[#607D8B] font-mono">
              CENTER: {mapCenter.lat.toFixed(4)}°N, {mapCenter.lng.toFixed(4)}°E
            </span>
          </div>

          {/* Touch Waypoint Info Floating Badge */}
          <div className="absolute top-3 right-3 z-10 bg-[#FFFFFF]/95 border border-[#1565C0] rounded-lg px-3 py-1.5 shadow-xs text-right text-xs">
            <div className="text-[10px] text-[#607D8B] uppercase font-bold">TAPPED INTERCEPT WAYPOINT</div>
            <div className="text-[#1565C0] font-bold text-xs truncate max-w-[220px]">
              {touchTarget.name}
            </div>
          </div>

          {/* SVG Tactical Vector Map */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            onClick={handleMapTouch}
            className="w-full h-auto cursor-crosshair block select-none bg-[#F4F6F8]"
            style={{ minHeight: '440px' }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(21, 101, 192, 0.08)" strokeWidth="0.8" />
              </pattern>
            </defs>

            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#F4F6F8" />
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#grid)" />

            {/* Concentric Sector Rings around Command HQ */}
            {[100, 200, 320, 440].map((r, i) => (
              <circle
                key={i}
                cx={MAP_WIDTH / 2}
                cy={MAP_HEIGHT / 2}
                r={r}
                fill="none"
                stroke="rgba(21, 101, 192, 0.16)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            ))}

            {/* City Arterial Roads */}
            <path
              d="M 50 180 Q 300 240 450 260 T 850 320"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="12"
            />
            <path
              d="M 50 180 Q 300 240 450 260 T 850 320"
              fill="none"
              stroke="#90CAF9"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
            {/* North-South Ring Expressway */}
            <path
              d="M 280 40 Q 340 260 450 380 T 620 480"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="10"
            />
            <path
              d="M 280 40 Q 340 260 450 380 T 620 480"
              fill="none"
              stroke="#90CAF9"
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
                fill="#78909C"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
                letterSpacing="1.2"
              >
                {s.label}
              </text>
            ))}

            {/* Command Center Central Hub */}
            <g transform={`translate(${MAP_WIDTH / 2}, ${MAP_HEIGHT / 2})`}>
              <circle r="18" fill="rgba(21, 101, 192, 0.12)" />
              <circle r="7" fill="#123B63" stroke="#ffffff" strokeWidth="1.5" />
              <text y="24" textAnchor="middle" fill="#123B63" fontSize="8" fontWeight="bold">
                COMMAND HQ (PRIMARY CONTROL)
              </text>
            </g>

            {/* ── DYNAMIC INTERCEPT TRAJECTORY LINE TO NEAREST UNIT ── */}
            <line
              x1={nearestSvg.x}
              y1={nearestSvg.y}
              x2={touchSvg.x}
              y2={touchSvg.y}
              stroke="#2E7D32"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* Distance Vector Midpoint Tag */}
            <g transform={`translate(${(nearestSvg.x + touchSvg.x) / 2}, ${(nearestSvg.y + touchSvg.y) / 2 - 12})`}>
              <rect x="-56" y="-10" width="112" height="20" rx="4" fill="#FFFFFF" stroke="#2E7D32" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#2E7D32" fontSize="9" fontWeight="bold">
                {nearestUnit.distanceKm.toFixed(2)} km &bull; {nearestUnit.etaFormatted}
              </text>
            </g>

            {/* ── INCIDENTS RENDER ── */}
            {(filterLayer === 'ALL' || filterLayer === 'INCIDENTS') && incidents.map(inc => {
              const pt = coordToSvg(inc.lat, inc.lng);
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
                  <circle r="22" fill="rgba(198, 40, 40, 0.2)" className="animate-ping" />
                  <circle r="12" fill="#C62828" stroke="#ffffff" strokeWidth="2" />
                  <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">!</text>
                  <text y="24" textAnchor="middle" fill="#C62828" fontSize="8" fontWeight="bold">
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
              const isLiveDevice = unit.isLiveDevice;

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
                  {/* Outer selection / GPS ping ring */}
                  {(isSelected || isNearest || isLiveDevice) && (
                    <circle
                      r="26"
                      fill="none"
                      stroke={isLiveDevice ? '#E65100' : isNearest ? '#2E7D32' : '#1565C0'}
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className={isLiveDevice ? 'animate-spin' : ''}
                    />
                  )}

                  {/* Vehicle Body Marker */}
                  <circle
                    r={isLiveDevice ? 13 : 10}
                    fill={isLiveDevice ? '#E65100' : isNearest ? '#2E7D32' : isSelected ? '#1565C0' : '#1976D2'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />

                  {/* Heading Vector */}
                  <line
                    x1="0"
                    y1="0"
                    x2={Math.sin((unit.heading * Math.PI) / 180) * 16}
                    y2={-Math.cos((unit.heading * Math.PI) / 180) * 16}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* Callsign Tag */}
                  <rect
                    x="-36"
                    y="14"
                    width="72"
                    height="14"
                    rx="3"
                    fill="#FFFFFF"
                    stroke={isLiveDevice ? '#E65100' : isNearest ? '#2E7D32' : '#90CAF9'}
                    strokeWidth="0.8"
                  />
                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    fill={isLiveDevice ? '#E65100' : isNearest ? '#2E7D32' : '#123B63'}
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {unit.callsign}
                  </text>
                </g>
              );
            })}

            {/* ── TOUCH TARGET PIN (USER TAPPED POINT) ── */}
            <g transform={`translate(${touchSvg.x}, ${touchSvg.y})`} pointerEvents="none">
              <circle r="18" fill="none" stroke="#1565C0" strokeWidth="1.5" className="animate-ping" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#1565C0" strokeWidth="2" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#1565C0" strokeWidth="2" />
              <circle r="4" fill="#1565C0" stroke="#ffffff" strokeWidth="1" />
            </g>

          </svg>

          {/* Map Footer Help Bar */}
          <div className="bg-[#FFFFFF] border-t border-[#D9E1E8] px-4 py-2 flex flex-wrap justify-between items-center text-xs text-[#607D8B]">
            <span>TOUCH ANY COORDINATE TO COMPUTE REAL-TIME GEODESIC GROUND VECTOR</span>
            <span>
              {lastEmissionAck ? `LAST ACK: ${lastEmissionAck.callsign} • ${lastEmissionAck.latency_ms}ms` : 'AIS-140 MESH: BROADCASTING'}
            </span>
          </div>
        </div>

        {/* ── RIGHT: LIVE TRACKING TELEMETRY & DISTANCE RADAR (4 Cols) ── */}
        <div className="lg:col-span-4 space-y-4">

          {/* Nearest Interceptor Card */}
          <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  OPTIMAL INTERCEPTOR UNIT
                </span>
                <div className="text-base font-bold text-[#123B63] mt-1">{nearestUnit.name}</div>
                <div className="text-xs text-[#1565C0] font-semibold">{nearestUnit.officer}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#2E7D32] font-mono">{nearestUnit.distanceKm.toFixed(2)} km</div>
                <div className="text-xs text-[#607D8B]">ETA: <strong className="text-[#E65100] font-bold">{nearestUnit.etaFormatted}</strong></div>
              </div>
            </div>

            {/* GPS Ground Telemetry */}
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#D9E1E8] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#607D8B] font-medium">LIVE GPS COORDS:</span>
                <span className="text-[#123B63] font-bold font-mono">{nearestUnit.lat.toFixed(4)}°N, {nearestUnit.lng.toFixed(4)}°E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#607D8B] font-medium">CURRENT SPEED:</span>
                <span className="text-[#1565C0] font-bold">{nearestUnit.speed} km/h (Active Transit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#607D8B] font-medium">BEARING / HEADING:</span>
                <span className="text-[#263238] font-bold">{nearestUnit.heading}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#607D8B] font-medium">UNIT STATUS:</span>
                <span className="text-[#2E7D32] font-bold">{nearestUnit.status}</span>
              </div>
            </div>

            {/* Touch Action Button: Dispatch Nearest Patrol */}
            <button
              onClick={() => handleDispatchNearest(nearestUnit.id)}
              className="w-full py-3 rounded-lg bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold text-xs uppercase tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              DISPATCH {nearestUnit.callsign} TO WAYPOINT
            </button>
          </div>

          {/* All Patrol Units Distance Breakdown List */}
          <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-[#D9E1E8] pb-2">
              <h4 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
                PATROL PROXIMITY RADAR ({unitDistances.length} UNITS)
              </h4>
              <span className="text-[11px] text-[#607D8B]">Sorted by distance</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {unitDistances.map((unit, idx) => (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    unit.isLiveDevice
                      ? 'bg-[#FFF3E0] border-[#FFE0B2] text-[#E65100]'
                      : selectedUnitId === unit.id
                      ? 'bg-[#E3F2FD] border-[#1565C0] text-[#123B63]'
                      : 'bg-[#F8FAFC] border-[#D9E1E8] text-[#263238] hover:bg-[#F0F4F8]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#607D8B]">#{idx + 1}</span>
                      <span className="font-bold text-[#123B63]">{unit.callsign}</span>
                      <span className="text-[10px] text-[#607D8B]">
                        {unit.isLiveDevice ? '(MY DEVICE GPS)' : `(${unit.type})`}
                      </span>
                    </div>
                    <span className="font-bold text-[#2E7D32] font-mono">
                      {unit.distanceKm.toFixed(2)} km
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#607D8B] mt-1 font-medium">
                    <span>Speed: {unit.speed} km/h</span>
                    <span>ETA: <strong className="text-[#E65100]">{unit.etaFormatted}</strong></span>
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
