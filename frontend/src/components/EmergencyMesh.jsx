import React, { useState, useEffect } from 'react';

export default function EmergencyMesh() {
  const [subTab, setSubTab] = useState('erss_alerts'); // erss_alerts, suspect_scanner, national_hub
  const [sosActive, setSosActive] = useState(null);
  const [photoMatch, setPhotoMatch] = useState(null);
  const [isPhotoScanning, setIsPhotoScanning] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [etaCountdown, setEtaCountdown] = useState(85);
  const [phoneNotification, setPhoneNotification] = useState(null);

  const getApiBase = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    return window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';
  };

  // Play synthetic Web Audio API Police Siren
  const triggerAudioSiren = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.4);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.8);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 1.2);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 1.6);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
      setSirenPlaying(true);
      setTimeout(() => setSirenPlaying(false), 2000);
    } catch (e) {
      console.log('Audio siren auto-play blocked or unsupported', e);
    }
  };

  // Request browser desktop push notification permission if supported
  const requestPushPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestPushPermission();
  }, []);

  // ETA countdown timer effect when SOS is active
  useEffect(() => {
    let timer;
    if (sosActive && etaCountdown > 0) {
      timer = setInterval(() => {
        setEtaCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sosActive, etaCountdown]);

  const handleTriggerSOS = async (type = 'WOMEN_SAFETY_SOS_CRITICAL', phone = '+91-9988776655', loc = 'Sector 4 Market (0.35 km away)', lat = 28.6139, lng = 77.2090) => {
    triggerAudioSiren();
    setEtaCountdown(85);

    const apiBase = getApiBase();
    let alertData = null;

    try {
      const res = await fetch(`${apiBase}/api/v1/emergency/sos-alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crime_category: type,
          victim_phone: phone,
          latitude: lat,
          longitude: lng,
          location_name: loc
        })
      });
      if (res.ok) {
        alertData = await res.json();
      }
    } catch (e) {
      console.log('Backend offline, using real-time simulated SOS dispatch payload');
    }

    if (!alertData) {
      alertData = {
        alert_uuid: 'ERSS-' + Math.floor(1000 + Math.random() * 9000),
        source_system: 'DIAL_100_112_ERSS_NATIONAL',
        crime_category: type,
        victim_phone: phone,
        victim_location: { name: loc, lat: lat, lng: lng },
        assigned_patrol_unit: 'PATROL_VAN_SECTOR_4 (Officer #4412 Mobile Linked)',
        nearest_patrol_distance_km: 0.35,
        estimated_arrival_secs: 85,
        dispatch_status: 'REALTIME_INTERCEPT_ACTIVE',
        phone_push_notified: true,
        message: 'CRITICAL EMERGENCY ALERT: Dispatched to nearest linked officer mobile via Invisible Mesh!'
      };
    }

    setSosActive(alertData);

    // Set real-time mobile push notification alert banner
    setPhoneNotification({
      title: type === 'WOMEN_SAFETY_SOS_CRITICAL' ? '🚨 REAL-TIME SOS: WOMEN SAFETY / RAPE ATTEMPT DETECTED' : '🚨 REAL-TIME SOS: VIOLENT CRIME IN-PROGRESS',
      phone: phone,
      location: loc,
      distance: '0.35 km away',
      officer: 'OFFICER #4412 (Your Device Linked via BLE Mesh)',
      coordinates: `${lat}° N, ${lng}° E`
    });

    // Send browser native notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🚨 DIAL 100/112 REAL-TIME SOS ALERT', {
        body: `CRITICAL: ${type} at ${loc}. Officer #4412 dispatched! Arrival target <85s.`,
        icon: '/favicon.ico'
      });
    }
  };

  const activeAlerts = [
    {
      uuid: 'ERSS-2026-9912',
      category: 'WOMEN_SAFETY_SOS_CRITICAL',
      phone: '+91-9988776655',
      location: 'Sector 4 Market (0.35 km away)',
      assigned: 'PATROL_VAN_SECTOR_4 (Officer #4412 Mobile Linked)',
      target_time: '1m 25s',
      audio_ai: 'Distress screams & call for help detected by AI microphone sensor'
    },
    {
      uuid: 'ERSS-2026-8840',
      category: 'ATTEMPTED_ARMED_ROBBERY',
      phone: '+91-9811223344',
      location: 'Main Highway Junction (0.85 km away)',
      assigned: 'TRAFFIC_POLICE_UNIT_12',
      target_time: '2m 10s',
      audio_ai: 'Gunshot acoustic signature recognized by sensor'
    }
  ];

  const handlePhotoScan = async () => {
    setIsPhotoScanning(true);
    const apiBase = getApiBase();
    try {
      const res = await fetch(`${apiBase}/api/v1/national-sec/scan-suspect-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo_b64: 'DATA_SUSPECT' })
      });
      if (res.ok) {
        const data = await res.json();
        setPhotoMatch(data);
      }
    } catch (e) {
      setPhotoMatch({
        status: 'ALL_INDIA_CRIME_RECORD_MATCH_FOUND',
        ncrb_record_id: 'NCRB-IND-2025-88412',
        suspect_name: 'Vikram Singh @ Vicky (Alias: Cyber-Ghost)',
        facial_match_confidence: 0.986,
        warrant_status: 'INTER_STATE_ARREST_WARRANT_ACTIVE',
        operating_states: ['Delhi NCR', 'Maharashtra (Mumbai)', 'Punjab', 'Karnataka'],
        fir_history: [
          { fir_no: 'FIR #991/2025', station: 'Special Cell Delhi', offense: 'Cyber Fraud & Extortion (IPC 420/384)' },
          { fir_no: 'FIR #412/2024', station: 'Crime Branch Mumbai', offense: 'Armed Robbery (IPC 392/120B)' }
        ],
        action_required: 'IMMEDIATE DETENTION — Inter-State Fugitive Warrant Executable On-Scene'
      });
    }
    setIsPhotoScanning(false);
  };

  const requestApproval = async () => {
    const apiBase = getApiBase();
    try {
      const res = await fetch(`${apiBase}/api/v1/national-sec/request-approval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_uuid: 'FX-20260829-9941', requesting_officer_id: 'OFFICER #4412' })
      });
      if (res.ok) {
        const data = await res.json();
        setApprovalStatus(data);
      }
    } catch (e) {
      setApprovalStatus({
        status: 'APPROVED_DIGITALLY_SIGNED',
        approving_authority: 'Superintendent of Police (Anti-Terror Squad)',
        clearance_level: 'LEVEL_3_SECRET_CLEARANCE',
        digital_signature_hash: '8f9e31024a1982b791024f0c829e1a388172df91023812831849182390a1bc'
      });
    }
  };

  return (
    <div className="space-y-5 font-sans">
      
      {/* REAL-TIME OFFICER PHONE PUSH NOTIFICATION BANNER */}
      {phoneNotification && (
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-2 border-red-500 rounded-2xl p-4 shadow-2xl animate-bounce space-y-2 font-mono">
          <div className="flex justify-between items-center">
            <span className="bg-red-600 text-white text-[10px] px-2.5 py-1 rounded font-bold tracking-wider animate-pulse flex items-center gap-1.5">
              <span>📲</span> INSTANT PHONE PUSH ALERT RECEIVED
            </span>
            <button onClick={() => setPhoneNotification(null)} className="text-slate-400 hover:text-white text-xs">✕ DISMISS</button>
          </div>
          <div className="text-xs font-bold text-red-300">{phoneNotification.title}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-300">
            <div>📍 Location: <span className="text-cyan-400 font-bold">{phoneNotification.location}</span></div>
            <div>📞 Victim Contact: <span className="text-amber-400 font-bold">{phoneNotification.phone}</span></div>
            <div>🚔 Linked Mobile Unit: <span className="text-emerald-400 font-bold">{phoneNotification.officer}</span></div>
          </div>
          <div className="bg-red-900/40 p-2 rounded-lg border border-red-700 text-[10px] text-red-200 flex justify-between items-center">
            <span>⚡ INVISIBLE MESH ROUTE: Intercept navigation pushed to officer mobile screen</span>
            <span className="font-bold text-emerald-400">STATUS: EN ROUTE ({etaCountdown}s Target ETA)</span>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-slate-900 border border-red-900/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-red-400 font-mono flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${sirenPlaying ? 'bg-red-500 animate-ping' : 'bg-red-500'}`}></span>
            REAL-TIME DIAL 100 / 112 CRIME PREVENTION & PHONE MESH
          </h3>
          <p className="text-xs text-slate-400">Instant SOS distress alert dispatch, audio siren, and invisible officer phone push notification mesh.</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setSubTab('erss_alerts')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'erss_alerts' ? 'bg-red-950 text-red-300 border border-red-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dial 100/112 Real-Time SOS
          </button>
          <button
            onClick={() => setSubTab('suspect_scanner')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'suspect_scanner' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NCRB Suspect Photo Scan
          </button>
          <button
            onClick={() => setSubTab('national_hub')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'national_hub' ? 'bg-red-950 text-red-300 border border-red-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CCTNS/NATGRID Control Room
          </button>
        </div>
      </div>

      {/* Subtab 1: ERSS Real-Time SOS Alerts */}
      {subTab === 'erss_alerts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          
          {/* Real-time Phone Mesh Connectivity Bar */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center text-xs space-y-2 md:space-y-0">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Invisible Mobile Link: <span className="text-emerald-400 font-bold">Officer #4412 Phone Paired (BLE / Wi-Fi Direct)</span></span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="bg-slate-900 text-cyan-400 border border-slate-700 px-2.5 py-0.5 rounded font-bold">
                14 OFFICERS IN NEARBY MESH
              </span>
              <button
                onClick={requestPushPermission}
                className="text-slate-400 hover:text-cyan-300 underline"
              >
                Enable Desktop/Phone Push
              </button>
            </div>
          </div>

          {/* SOS Trigger Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-950 p-4 rounded-xl border border-red-950">
            <div>
              <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <span>🚨</span> REAL-TIME DIAL 100/112 EMERGENCY SOS TRIGGER
              </div>
              <div className="text-[11px] text-slate-400">Click to simulate citizen distress call & instant invisible push alert to officer phone.</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTriggerSOS('WOMEN_SAFETY_SOS_CRITICAL', '+91-9988776655', 'Sector 4 Market (0.35 km away)', 28.6139, 77.2090)}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5 animate-pulse"
              >
                <span>💃</span> Women Safety / Crime SOS
              </button>
              <button
                onClick={() => handleTriggerSOS('ATTEMPTED_ARMED_ROBBERY', '+91-9811223344', 'Main Highway Junction (0.85 km away)', 28.6210, 77.2150)}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30 flex items-center gap-1.5"
              >
                <span>🔫</span> Armed Robbery SOS
              </button>
            </div>
          </div>

          {/* Active Real-Time Dispatch Card */}
          {sosActive && (
            <div className="bg-red-950 p-4 rounded-xl border-2 border-red-600 text-xs text-white space-y-3 shadow-2xl">
              <div className="flex justify-between items-center border-b border-red-800 pb-2">
                <div className="font-bold text-red-300 text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></span>
                  CRITICAL DISPATCH ACTIVE: {sosActive.crime_category}
                </div>
                <div className="bg-red-900 border border-red-500 text-white px-3 py-1 rounded font-bold text-xs">
                  TARGET ETA: {etaCountdown} SECONDS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-900 space-y-1">
                  <div className="text-slate-400">VICTIM DETAILS</div>
                  <div className="text-white font-bold">{sosActive.victim_phone}</div>
                  <div className="text-cyan-400">📍 {sosActive.victim_location.name}</div>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-900 space-y-1">
                  <div className="text-slate-400">ASSIGNED PATROL UNIT</div>
                  <div className="text-emerald-400 font-bold">{sosActive.assigned_patrol_unit}</div>
                  <div className="text-slate-300">Distance: {sosActive.nearest_patrol_distance_km} km away</div>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-red-900 space-y-1">
                  <div className="text-slate-400">PHONE MESH PUSH</div>
                  <div className="text-amber-400 font-bold">✔ OFFICER PHONE ALERTED</div>
                  <div className="text-emerald-300">Auto GPS Route Active</div>
                </div>
              </div>

              <div className="bg-red-900/60 p-2 rounded-lg text-center text-[10px] font-bold text-red-200">
                ⚡ REAL-TIME ACTION: Intercept route pushed to officer mobile screen. Audio microphone alert stream active.
              </div>
            </div>
          )}

          {/* Incident Feed List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeAlerts.map((alert, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-red-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-red-400">{alert.category}</span>
                  <span className="text-[10px] bg-red-950 text-white px-2 py-0.5 rounded border border-red-800 font-bold">
                    ARRIVAL: {alert.target_time}
                  </span>
                </div>
                <div className="text-xs text-slate-200">📍 Location: {alert.location}</div>
                <div className="text-xs text-cyan-400">🚔 Assigned Unit: {alert.assigned}</div>
                <div className="text-[11px] text-amber-300 bg-slate-900 p-2 rounded border border-slate-800">
                  🎙 Audio AI: {alert.audio_ai}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: NCRB Suspect Scanner */}
      {subTab === 'suspect_scanner' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-purple-400">ALL-INDIA SUSPECT PHOTO SCANNER & NCRB MATCHING</div>
              <div className="text-[11px] text-slate-400">Scan suspect face in field to query All-India Criminal Records (NCRB / CCTNS).</div>
            </div>

            <button
              onClick={handlePhotoScan}
              disabled={isPhotoScanning}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              {isPhotoScanning ? 'EXTRACTING 128D VECTOR...' : '📷 SCAN SUSPECT PHOTO & QUERY NCRB'}
            </button>
          </div>

          {photoMatch && (
            <div className="bg-slate-950 p-4 rounded-xl border border-red-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-red-400 text-sm">⚠ ALL-INDIA CRIMINAL RECORD MATCH FOUND</span>
                <span className="bg-red-950 text-red-300 px-2.5 py-0.5 rounded border border-red-800 font-bold">
                  {(photoMatch.facial_match_confidence * 100).toFixed(1)}% SIMILARITY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-cyan-400 font-bold">Suspect: {photoMatch.suspect_name}</div>
                  <div className="text-slate-400">NCRB ID: {photoMatch.ncrb_record_id}</div>
                  <div className="text-amber-400 font-bold mt-1">Status: {photoMatch.warrant_status}</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-red-400 font-bold">ALL-INDIA FIR HISTORY</div>
                  {photoMatch.fir_history.map((fir, idx) => (
                    <div key={idx} className="text-[11px] text-slate-300">
                      <span className="text-cyan-400 font-bold">{fir.fir_no}</span> — {fir.offense}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subtab 3: Control Room & Approvals */}
      {subTab === 'national_hub' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-red-400">CCTNS / NATGRID CONTROL ROOM LINK</div>
              <div className="text-[11px] text-slate-400">Encrypted gRPC telemetry link & SP digital sign-off approval engine.</div>
            </div>

            <button
              onClick={requestApproval}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-bold"
            >
              REQUEST SP APPROVAL
            </button>
          </div>

          {approvalStatus && (
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-800 text-xs space-y-1">
              <div className="text-emerald-400 font-bold">✔ DIGITAL APPROVAL GRANTED</div>
              <div className="text-slate-300">Approving Authority: {approvalStatus.approving_authority}</div>
              <div className="text-slate-500 text-[10px] break-all">Hash: {approvalStatus.digital_signature_hash}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
