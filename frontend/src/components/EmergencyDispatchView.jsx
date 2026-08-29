import React, { useState } from 'react';

export default function EmergencyDispatchView() {
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [authLog, setAuthLog] = useState(null);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([
    {
      uuid: 'ERSS-2026-9912',
      category: 'WOMEN_SAFETY_SOS_CRITICAL',
      distress: 'RED_ALERT_IMMEDIATE_THREAT',
      phone: '+91-9988776655',
      location: 'Sector 4 Market (0.45 km away)',
      assigned: 'PATROL_VAN_SECTOR_4 (En Route)',
      target_time: '1m 30s',
      audio_ai: 'Distress screams & call for help detected by AI microphone sensor'
    },
    {
      uuid: 'ERSS-2026-8840',
      category: 'ATTEMPTED_ARMED_ROBBERY',
      distress: 'HIGH_PRIORITY',
      phone: '+91-9811223344',
      location: 'Main Highway Junction (1.2 km away)',
      assigned: 'TRAFFIC_POLICE_UNIT_12',
      target_time: '2m 45s',
      audio_ai: 'Gunshot acoustic signature recognized'
    }
  ]);

  const handleBiometricUnlock = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/emergency/biometric-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officer_badge_id: 'OFFICER #4412 (Delhi Cyber Cell)' })
      });
      if (res.ok) {
        const data = await res.json();
        setAuthLog(data);
        setIsUnlocked(true);
      }
    } catch (e) {
      setAuthLog({
        status: 'UNLOCKED_FULL_CLEARANCE',
        officer_badge_id: 'OFFICER #4412 (Delhi Cyber Cell)',
        fingerprint_verified: true,
        face_match_confidence: 0.988,
        clearance: 'DEFENSE_CYBER_LEVEL_3',
        mobile_linked: 'POLICE_MOBILE_S22_PAIRED_BLE'
      });
      setIsUnlocked(true);
    }
  };

  const triggerEmergencySOS = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/emergency/sos-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crime_category: 'WOMEN_SAFETY_SOS_CRITICAL',
          victim_phone: '+91-9988776655',
          latitude: 28.6139,
          longitude: 77.2090
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSosTriggered(true);
      }
    } catch (e) {
      setSosTriggered(true);
    }
  };

  return (
    <div className="bg-slate-900 border border-red-900/60 rounded-2xl p-5 space-y-5 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-red-950 pb-3">
        <div>
          <h3 className="text-sm font-bold text-red-400 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            DIAL 100 / 112 CRIME PREVENTION & BIOMETRIC SECURITY SYSTEM
          </h3>
          <p className="text-xs text-slate-400">Immediate patrol unit auto-dispatch mesh cutting response time to &lt;90s for women in danger & violent crimes.</p>
        </div>
        <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-3 py-1 rounded font-mono font-bold">
          ERSS-112 NATIONAL MESH
        </span>
      </div>

      {/* Officer Biometric Unlock Section */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="text-xs font-bold text-slate-200 font-mono flex items-center gap-2">
              <span className="text-base">🔐</span> DUAL BIOMETRIC AUTHENTICATION LOCK
            </div>
            <div className="text-[11px] text-slate-400">Requires officer fingerprint scanner + 3D facial recognition to unlock sensitive forensic & national defense features.</div>
          </div>

          <button
            onClick={handleBiometricUnlock}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-mono text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2"
          >
            <span className="text-sm">👆</span> SCAN FINGERPRINT & FACE
          </button>
        </div>

        {authLog && (
          <div className="bg-slate-900 p-3 rounded-xl border border-emerald-800 text-xs font-mono space-y-1">
            <div className="text-emerald-400 font-bold">✔ OFFICER AUTHENTICATED: {authLog.officer_badge_id}</div>
            <div className="text-slate-300">Fingerprint: VERIFIED | Face Match: {(authLog.face_match_confidence * 100).toFixed(1)}%</div>
            <div className="text-cyan-400">Paired Mobile: {authLog.mobile_linked} (BLE Encrypted)</div>
          </div>
        )}
      </div>

      {/* Dial 100 / 112 Crime-In-Progress Patrol Alert Console */}
      <div className="bg-slate-950 p-4 rounded-xl border border-red-900/60 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="text-xs font-bold text-red-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              LIVE DIAL 100 / 112 EMERGENCY DISPATCH ALERTS
            </div>
            <div className="text-[11px] text-slate-400">Auto-routes distress calls to nearest on-duty patrol vehicles, beat constables, and traffic police.</div>
          </div>

          <button
            onClick={triggerEmergencySOS}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-2 animate-pulse"
          >
            🚨 SIMULATE DIAL 100/112 SOS ALERT
          </button>
        </div>

        {sosTriggered && (
          <div className="bg-red-950/80 p-3 rounded-xl border border-red-600 text-xs font-mono text-white space-y-1 animate-glow">
            <div className="font-bold text-red-300 text-sm">⚠ CRITICAL ALERTS: WOMEN SAFETY SOS DISPATCHED</div>
            <div>Nearest Patrol Unit: PATROL_VAN_SECTOR_4 (Distance: 0.45 km)</div>
            <div>Target Arrival Time: 90 Seconds (En Route)</div>
            <div className="text-emerald-300 font-bold">✔ Automated GPS Route & Audio Stream Pushed to Officer Mobile</div>
          </div>
        )}

        {/* Active Emergency Alerts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeAlerts.map((alert, idx) => (
            <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-red-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-red-400">{alert.category}</span>
                <span className="text-[10px] bg-red-950 text-white px-2 py-0.5 rounded border border-red-800 font-bold">
                  TARGET: {alert.target_time}
                </span>
              </div>
              <div className="text-xs text-slate-200 font-mono">📍 Location: {alert.location}</div>
              <div className="text-xs text-cyan-400 font-mono">🚔 Assigned Unit: {alert.assigned}</div>
              <div className="text-[11px] text-amber-300 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                🎙 Audio AI: {alert.audio_ai}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Defense & Cyber Crime Branch Advisories */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono">
        <div className="text-xs font-bold text-purple-400">DEFENSE & CERT-IN CYBER ADVISORIES FEED</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-400">CERT-In Threat Advisory #991</div>
            <div className="text-[11px] text-slate-300">Targeted mobile malware attempting unauthorized location spoofing.</div>
            <div className="text-[10px] text-emerald-400">Action: USB Hardware Write-Blocker Mandatory</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400">Anti-Terror Squad Bulletin</div>
            <div className="text-[11px] text-slate-300">Cross-border VoIP encryption payload patterns identified.</div>
            <div className="text-[10px] text-purple-400">Action: Run Local Chat NLP Classifier</div>
          </div>
        </div>
      </div>
    </div>
  );
}
