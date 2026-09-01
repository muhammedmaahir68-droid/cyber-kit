import React, { useState } from 'react';

export default function FacialRecognitionScanner() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreset, setPhotoPreset] = useState('SERIOUS_MURDER'); // SERIOUS_MURDER, MINOR_THEFT, CLEAN_RECORD, CUSTOM
  const [customAnalysisType, setCustomAnalysisType] = useState('SERIOUS_MURDER');
  const [isScanning, setIsScanning] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const getApiBase = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    const host = window.location.hostname;
    if (host === 'localhost' || host.startsWith('10.') || host.startsWith('192.168.') || host.startsWith('172.')) {
      return `http://${host}:8000`;
    }
    return 'https://444ef2e5cecfe1c2-157-51-88-220.serveousercontent.com';
  };

  const runAllIndiaFacialScan = async (presetOverride, photoDataUrl) => {
    const preset = presetOverride || photoPreset;
    const photoToUse = photoDataUrl || selectedPhoto;
    setIsScanning(true);
    setSearchResult(null);

    const apiBase = getApiBase();

    try {
      const res = await fetch(`${apiBase}/api/v1/national-sec/scan-suspect-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photo_b64: photoToUse || 'DATA_FACE_SAMPLE',
          suspect_preset: preset
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResult(data);
      }
    } catch (err) {
      // Offline fallback
      if (preset === 'CLEAN_RECORD') {
        setSearchResult({
          status: 'NO_CRIMINAL_RECORD_FOUND',
          ncrb_record_id: 'NCRB-IND-2026-CLEAN',
          suspect_name: 'Citizen Profile: Verified (Clean Record)',
          facial_match_confidence: 0.991,
          crime_severity: 'NO_CRIME_REGISTERED',
          warrant_status: 'NO_ACTIVE_WARRANTS',
          operating_states: [],
          serious_crimes_involved: [],
          minor_crimes_involved: [],
          cases_summary: 'NO CRIMINAL CASES OR FIRs REGISTERED ACROSS ALL INDIA (NCRB / CCTNS CLEAR)',
          action_required: 'VERIFIED CITIZEN — No Police Action Required',
          control_room_alerted: 'SYSTEM LOG: CLEAR VERIFICATION RECORDED'
        });
      } else if (preset === 'MINOR_THEFT') {
        setSearchResult({
          status: 'ALL_INDIA_CRIME_RECORD_MATCH_FOUND',
          ncrb_record_id: 'NCRB-IND-2024-33102',
          suspect_name: 'Ramesh Kumar @ Chhotu',
          facial_match_confidence: 0.942,
          crime_severity: 'MODERATE_PROPERTY_OFFENSE',
          warrant_status: 'LOCAL_SUMMONS_ACTIVE',
          operating_states: ['Delhi NCR', 'Haryana (Gurugram)'],
          serious_crimes_involved: [],
          minor_crimes_involved: [
            { fir_no: 'FIR #112/2024', station: 'Kotwali PS Delhi', offense: 'Theft & Pickpocketing (IPC 379 / BNS 303)' },
            { fir_no: 'FIR #88/2023', station: 'Excise Branch PS Gurugram', offense: 'Illicit Liquor Bootlegging (Excise Act Sec 61)' }
          ],
          cases_summary: 'REGISTERED CASES: 2 Property/Theft & Bootlegging Offenses (No Capital Crimes)',
          action_required: 'NOTICE FOR INQUIRY — Issue Local Summons & File Field Entry',
          control_room_alerted: 'LOCAL BEAT PATROL NOTIFIED'
        });
      } else {
        setSearchResult({
          status: 'ALL_INDIA_CRIME_RECORD_MATCH_FOUND',
          ncrb_record_id: 'NCRB-IND-2025-88412',
          suspect_name: 'Vikram Singh @ Vicky (Alias: Cyber-Ghost)',
          facial_match_confidence: 0.986,
          crime_severity: 'HIGH_SEVERITY_CAPITAL_CRIME',
          warrant_status: 'INTER_STATE_ARREST_WARRANT_ACTIVE',
          operating_states: ['Delhi NCR', 'Maharashtra (Mumbai)', 'Punjab', 'Karnataka'],
          serious_crimes_involved: [
            { fir_no: 'FIR #991/2025', station: 'Special Cell PS Delhi', offense: 'Attempted Murder & Extortion (IPC 307/384 / BNS 109)' },
            { fir_no: 'FIR #412/2024', station: 'Crime Branch Unit 4 Mumbai', offense: 'Homicide & Syndicate Gang Crime (IPC 302/120B / BNS 103)' }
          ],
          minor_crimes_involved: [
            { fir_no: 'FIR #108/2023', station: 'State Cyber Cell Mohali', offense: 'Vehicle Theft & Identity Fraud' }
          ],
          cases_summary: 'REGISTERED CASES: 3 Severe Capital & Syndicate Crimes (Attempted Murder & Homicide)',
          action_required: 'IMMEDIATE ON-SCENE ARREST & DETENTION — Inter-State Fugitive Warrant Executable',
          control_room_alerted: 'DELHI, MUMBAI & PUNJAB PCR NOTIFIED VIA MESH'
        });
      }
    }
    setIsScanning(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const photoData = uploadEvent.target.result;
        setSelectedPhoto(photoData);
        setPhotoPreset(customAnalysisType);
        runAllIndiaFacialScan(customAnalysisType, photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900 border-2 border-purple-600/70 rounded-2xl p-5 space-y-5 shadow-2xl font-sans">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-purple-950 pb-3">
        <div>
          <h3 className="text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
            <span className="text-base">📷</span> ALL-INDIA FACIAL RECOGNITION & NCRB CRIMINAL HISTORY SCANNER
          </h3>
          <p className="text-xs text-slate-400">Upload any suspect photo or click sample presets to query All-India Criminal Records (NCRB / CCTNS) and detect registered cases.</p>
        </div>
        <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded font-mono font-bold">
          128D FACIAL VECTOR SCANNER
        </span>
      </div>

      {/* Preset Photo Selectors & Custom Upload Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
        {/* Preset 1: Serious Capital Crimes */}
        <button
          onClick={() => {
            setPhotoPreset('SERIOUS_MURDER');
            setSelectedPhoto(null);
            runAllIndiaFacialScan('SERIOUS_MURDER');
          }}
          className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
            photoPreset === 'SERIOUS_MURDER' && !selectedPhoto
              ? 'bg-red-950/80 border-red-500 text-red-200 ring-1 ring-red-500'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-red-400 flex items-center gap-1.5">
            <span>🔴</span> Sample 1: Serious Murder Suspect
          </div>
          <div className="text-[11px] text-slate-300">Attempted Murder (IPC 307) & Homicide</div>
        </button>

        {/* Preset 2: Minor Theft & Bootlegging */}
        <button
          onClick={() => {
            setPhotoPreset('MINOR_THEFT');
            setSelectedPhoto(null);
            runAllIndiaFacialScan('MINOR_THEFT');
          }}
          className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
            photoPreset === 'MINOR_THEFT' && !selectedPhoto
              ? 'bg-amber-950/80 border-amber-500 text-amber-200 ring-1 ring-amber-500'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-amber-400 flex items-center gap-1.5">
            <span>🟡</span> Sample 2: Theft & Alcohol Suspect
          </div>
          <div className="text-[11px] text-slate-300">Theft (IPC 379) & Bootlegging</div>
        </button>

        {/* Preset 3: Clean Record Citizen */}
        <button
          onClick={() => {
            setPhotoPreset('CLEAN_RECORD');
            setSelectedPhoto(null);
            runAllIndiaFacialScan('CLEAN_RECORD');
          }}
          className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
            photoPreset === 'CLEAN_RECORD' && !selectedPhoto
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-emerald-400 flex items-center gap-1.5">
            <span>🟢</span> Sample 3: Clean Citizen Profile
          </div>
          <div className="text-[11px] text-slate-300">No Cases / 0 FIRs Registered</div>
        </button>

        {/* Custom Upload Button */}
        <label className="p-3 rounded-xl border border-dashed border-cyan-500 hover:border-cyan-400 bg-slate-950 text-slate-300 cursor-pointer flex flex-col justify-center items-center text-center transition-all">
          <div className="font-bold text-cyan-400 flex items-center gap-1.5">
            <span>📤</span> Upload Sample Photo
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Click to browse photo file</div>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </label>
      </div>

      {/* Uploaded Photo Preview Bar & Classification Selector */}
      {selectedPhoto && (
        <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800 space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <img src={selectedPhoto} alt="Uploaded Suspect" className="w-16 h-16 object-cover rounded-lg border border-cyan-500 shadow-md" />
              <div>
                <div className="text-cyan-400 font-bold">CUSTOM UPLOADED SUSPECT PHOTO ACTIVE</div>
                <div className="text-[11px] text-slate-300">128D Facial Embedding Mesh Extracted</div>
                <div className="text-[10px] text-emerald-400 font-bold">✔ Ready for All-India Criminal Database Search</div>
              </div>
            </div>

            {/* Custom Photo Simulation Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 px-2 font-bold">Simulate As:</span>
              <button
                onClick={() => {
                  setCustomAnalysisType('SERIOUS_MURDER');
                  setPhotoPreset('SERIOUS_MURDER');
                  runAllIndiaFacialScan('SERIOUS_MURDER', selectedPhoto);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  customAnalysisType === 'SERIOUS_MURDER' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Murder/Serious Case
              </button>
              <button
                onClick={() => {
                  setCustomAnalysisType('MINOR_THEFT');
                  setPhotoPreset('MINOR_THEFT');
                  runAllIndiaFacialScan('MINOR_THEFT', selectedPhoto);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  customAnalysisType === 'MINOR_THEFT' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Theft Case
              </button>
              <button
                onClick={() => {
                  setCustomAnalysisType('CLEAN_RECORD');
                  setPhotoPreset('CLEAN_RECORD');
                  runAllIndiaFacialScan('CLEAN_RECORD', selectedPhoto);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  customAnalysisType === 'CLEAN_RECORD' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Clean Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Scan Action Bar */}
      <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs">
        <div className="text-slate-300">
          Selected Profile Mode: <span className="text-cyan-400 font-bold">{photoPreset}</span>
        </div>
        <button
          onClick={() => runAllIndiaFacialScan()}
          disabled={isScanning}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
        >
          {isScanning ? 'EXTRACTING 128D VECTORS...' : '🔍 SEARCH ALL-INDIA CRIMINAL RECORDS'}
        </button>
      </div>

      {/* SEARCH RESULTS DISPLAY */}
      {searchResult && (
        <div className="bg-slate-950 p-5 rounded-xl border border-purple-900 space-y-4 font-mono">
          {/* Header Verdict & Match Confidence */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded text-xs font-bold ${
                searchResult.crime_severity === 'HIGH_SEVERITY_CAPITAL_CRIME'
                  ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse'
                  : searchResult.crime_severity === 'NO_CRIME_REGISTERED'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {searchResult.crime_severity === 'HIGH_SEVERITY_CAPITAL_CRIME'
                  ? '🚨 MATCH FOUND: HIGH-SEVERITY CAPITAL CRIME'
                  : searchResult.crime_severity === 'NO_CRIME_REGISTERED'
                  ? '🟢 VERIFIED: NO CRIMINAL RECORD FOUND (CLEAN RECORD)'
                  : '⚠️ MATCH FOUND: MODERATE / PROPERTY OFFENSE'}
              </span>
            </div>

            <div className="text-cyan-400 font-bold text-xs">
              FACIAL SIMILARITY: {(searchResult.facial_match_confidence * 100).toFixed(1)}% (128D Vector Match)
            </div>
          </div>

          {/* Suspect Info & Cases Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-slate-400">REGISTERED RECORD PROFILE</div>
              <div className="font-bold text-white text-sm">{searchResult.suspect_name}</div>
              <div className="text-slate-400 text-[11px]">NCRB ID: {searchResult.ncrb_record_id}</div>
              <div className={`font-bold pt-1 ${
                searchResult.crime_severity === 'NO_CRIME_REGISTERED' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                Warrant Status: {searchResult.warrant_status}
              </div>
              {searchResult.operating_states?.length > 0 && (
                <div className="text-slate-300 text-[11px]">Operating States: {searchResult.operating_states.join(', ')}</div>
              )}
            </div>

            {/* Detailed Case FIR List */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold text-xs">OFFICIAL NCRB / CCTNS CASE DOSSIER</div>
              
              <div className="text-[11px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800 font-bold">
                {searchResult.cases_summary}
              </div>

              {/* Serious Murder / Attempted Murder Cases */}
              {searchResult.serious_crimes_involved?.length > 0 && (
                <div>
                  <div className="text-red-400 font-bold text-xs mb-1 mt-2">🔴 SERIOUS CAPITAL CRIMES (Murder / Attempted Murder)</div>
                  {searchResult.serious_crimes_involved.map((fir, idx) => (
                    <div key={idx} className="bg-slate-950 p-2 rounded border border-red-950 text-[11px] mb-1">
                      <span className="text-cyan-400 font-bold">{fir.fir_no}</span> — <span className="text-red-300 font-bold">{fir.offense}</span> ({fir.station})
                    </div>
                  ))}
                </div>
              )}

              {/* Minor Theft / Bootlegging Cases */}
              {searchResult.minor_crimes_involved?.length > 0 && (
                <div>
                  <div className="text-amber-400 font-bold text-xs mb-1 mt-2">🟡 PROPERTY / THEFT / EXCISE OFFENSES</div>
                  {searchResult.minor_crimes_involved.map((fir, idx) => (
                    <div key={idx} className="bg-slate-950 p-2 rounded border border-amber-950 text-[11px] mb-1">
                      <span className="text-cyan-400 font-bold">{fir.fir_no}</span> — {fir.offense} ({fir.station})
                    </div>
                  ))}
                </div>
              )}

              {/* Clean Record Message */}
              {searchResult.crime_severity === 'NO_CRIME_REGISTERED' && (
                <div className="bg-emerald-950/60 p-2.5 rounded border border-emerald-800 text-[11px] text-emerald-300 font-bold">
                  ✔ All 36 States & UT Police Registries (CCTNS) Checked. Zero Active Cases or Pending Warrants Found.
                </div>
              )}
            </div>
          </div>

          {/* Action Required Banner */}
          <div className={`p-3 rounded-xl border text-xs font-bold text-center ${
            searchResult.crime_severity === 'HIGH_SEVERITY_CAPITAL_CRIME'
              ? 'bg-red-950 border-red-600 text-white animate-glow'
              : searchResult.crime_severity === 'NO_CRIME_REGISTERED'
              ? 'bg-emerald-950 border-emerald-600 text-emerald-200'
              : 'bg-amber-950 border-amber-600 text-amber-200'
          }`}>
            ⚡ POLICE ACTION: {searchResult.action_required}
          </div>
        </div>
      )}
    </div>
  );
}
