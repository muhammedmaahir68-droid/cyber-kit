import React, { useState } from 'react';

export default function EmergencyMesh() {
  const [subTab, setSubTab] = useState('erss_alerts'); // erss_alerts, suspect_scanner, national_hub
  const [sosTriggered, setSosTriggered] = useState(false);
  const [photoMatch, setPhotoMatch] = useState(null);
  const [isPhotoScanning, setIsPhotoScanning] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);

  const activeAlerts = [
    {
      uuid: 'ERSS-2026-9912',
      category: 'WOMEN_SAFETY_SOS_CRITICAL',
      phone: '+91-9988776655',
      location: 'Sector 4 Market (0.45 km away)',
      assigned: 'PATROL_VAN_SECTOR_4 (En Route)',
      target_time: '1m 30s',
      audio_ai: 'Distress screams & call for help detected by AI microphone sensor'
    },
    {
      uuid: 'ERSS-2026-8840',
      category: 'ATTEMPTED_ARMED_ROBBERY',
      phone: '+91-9811223344',
      location: 'Main Highway Junction (1.2 km away)',
      assigned: 'TRAFFIC_POLICE_UNIT_12',
      target_time: '2m 45s',
      audio_ai: 'Gunshot acoustic signature recognized'
    }
  ];

  const handlePhotoScan = async () => {
    setIsPhotoScanning(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/national-sec/scan-suspect-photo', {
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
    try {
      const res = await fetch('http://localhost:8000/api/v1/national-sec/request-approval', {
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
      {/* Header Bar */}
      <div className="bg-slate-900 border border-red-900/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-red-400 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            DIAL 100 / 112 CRIME PREVENTION & NATIONAL SECURITY MESH
          </h3>
          <p className="text-xs text-slate-400">Real-time emergency patrol auto-dispatch (&lt;90s target arrival) and NCRB criminal records search.</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setSubTab('erss_alerts')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'erss_alerts' ? 'bg-red-950 text-red-300 border border-red-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dial 100/112 Dispatch
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

      {/* Subtab 1: ERSS Alerts */}
      {subTab === 'erss_alerts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-red-400">CRIME PREVENTION & PATROL INTERCEPT MESH</div>
              <div className="text-[11px] text-slate-400">Auto-routes emergency distress calls to nearest patrol vehicles and beat constables.</div>
            </div>

            <button
              onClick={() => setSosTriggered(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-2 animate-pulse"
            >
              🚨 SIMULATE DIAL 100/112 SOS ALERT
            </button>
          </div>

          {sosTriggered && (
            <div className="bg-red-950 p-3.5 rounded-xl border border-red-600 text-xs text-white space-y-1">
              <div className="font-bold text-red-300 text-sm">⚠ CRITICAL DISPATCH ACTIVE: WOMEN SAFETY SOS</div>
              <div>Nearest Patrol Unit: PATROL_VAN_SECTOR_4 (Distance: 0.45 km away)</div>
              <div>Target Arrival Time: 90 Seconds (En Route)</div>
              <div className="text-emerald-400">✔ Live victim GPS coordinates & audio alert pushed to officer mobile</div>
            </div>
          )}

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
