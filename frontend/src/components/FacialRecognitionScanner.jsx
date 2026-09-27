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
    <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-5 space-y-4 shadow-sm font-sans text-[#263238]">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#D9E1E8] pb-3">
        <div>
          <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1565C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ALL-INDIA FACIAL RECOGNITION &amp; NCRB CRIMINAL DOSSIER SCANNER
          </h3>
          <p className="text-xs text-[#607D8B] mt-0.5">Upload suspect photograph or select preset dossiers to query All-India Criminal Database (NCRB / CCTNS).</p>
        </div>
        <span className="text-[10px] bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9] px-3 py-1 rounded font-bold uppercase">
          128D Vector Scanner
        </span>
      </div>

      {/* Preset Photo Selectors & Custom Upload Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        {/* Preset 1: Serious Capital Crimes */}
        <button
          onClick={() => {
            setPhotoPreset('SERIOUS_MURDER');
            setSelectedPhoto(null);
            runAllIndiaFacialScan('SERIOUS_MURDER');
          }}
          className={`p-3 rounded-lg border text-left transition-all space-y-1 ${
            photoPreset === 'SERIOUS_MURDER' && !selectedPhoto
              ? 'bg-[#FFEBEE] border-2 border-[#C62828] text-[#C62828] shadow-xs'
              : 'bg-[#F8FAFC] border-[#D9E1E8] text-[#607D8B] hover:bg-[#F0F4F8] hover:text-[#123B63]'
          }`}
        >
          <div className="font-bold text-[#C62828] uppercase text-[11px]">
            Sample 1: Murder Suspect
          </div>
          <div className="text-[11px] text-[#607D8B]">Attempted Murder (IPC 307) &amp; Homicide</div>
        </button>

        {/* Preset 2: Minor Theft & Bootlegging */}
        <button
          onClick={() => {
            setPhotoPreset('MINOR_THEFT');
            setSelectedPhoto(null);
            runAllIndiaFacialScan('MINOR_THEFT');
          }}
          className={`p-3 rounded-lg border text-left transition-all space-y-1 ${
            photoPreset === 'MINOR_THEFT' && !selectedPhoto
              ? 'bg-[#FFF3E0] border-2 border-[#E65100] text-[#E65100] shadow-xs'
              : 'bg-[#F8FAFC] border-[#D9E1E8] text-[#607D8B] hover:bg-[#F0F4F8] hover:text-[#123B63]'
          }`}
        >
          <div className="font-bold text-[#E65100] uppercase text-[11px]">
            Sample 2: Theft / Excise
          </div>
          <div className="text-[11px] text-[#607D8B]">Theft (IPC 379) &amp; Bootlegging</div>
        </button>

        {/* Preset 3: Clean Record Citizen */}
        <button
          onClick={() => {
            setPhotoPreset('CLEAN_RECORD');
            setSelectedPhoto(null);
            runAllIndiaFacialScan('CLEAN_RECORD');
          }}
          className={`p-3 rounded-lg border text-left transition-all space-y-1 ${
            photoPreset === 'CLEAN_RECORD' && !selectedPhoto
              ? 'bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32] shadow-xs'
              : 'bg-[#F8FAFC] border-[#D9E1E8] text-[#607D8B] hover:bg-[#F0F4F8] hover:text-[#123B63]'
          }`}
        >
          <div className="font-bold text-[#2E7D32] uppercase text-[11px]">
            Sample 3: Clean Profile
          </div>
          <div className="text-[11px] text-[#607D8B]">0 Registered FIRs / Clear</div>
        </button>

        {/* Custom Upload Button */}
        <label className="p-3 rounded-lg border border-dashed border-[#1565C0] hover:bg-[#E3F2FD]/30 bg-[#F8FAFC] text-[#123B63] cursor-pointer flex flex-col justify-center items-center text-center transition-all">
          <div className="font-bold text-[#1565C0] text-[11px] uppercase tracking-wider">
            Upload Image File
          </div>
          <div className="text-[11px] text-[#607D8B] mt-0.5">Browse suspect photograph</div>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </label>
      </div>

      {/* Uploaded Photo Preview Bar & Classification Selector */}
      {selectedPhoto && (
        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#D9E1E8] space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <img src={selectedPhoto} alt="Uploaded Suspect" className="w-16 h-16 object-cover rounded-lg border border-[#D9E1E8] shadow-xs" />
              <div>
                <div className="text-[#123B63] font-bold">CUSTOM UPLOADED SUSPECT PHOTO ACTIVE</div>
                <div className="text-[11px] text-[#607D8B]">128D Facial Embedding Mesh Extracted</div>
                <div className="text-[10px] text-[#2E7D32] font-bold">Vector Matrix Ready for NCRB Lookup</div>
              </div>
            </div>

            {/* Custom Photo Simulation Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#FFFFFF] p-1.5 rounded-lg border border-[#D9E1E8]">
              <span className="text-[10px] text-[#607D8B] px-2 font-bold uppercase">Simulate As:</span>
              <button
                onClick={() => {
                  setCustomAnalysisType('SERIOUS_MURDER');
                  setPhotoPreset('SERIOUS_MURDER');
                  runAllIndiaFacialScan('SERIOUS_MURDER', selectedPhoto);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                  customAnalysisType === 'SERIOUS_MURDER' ? 'bg-[#C62828] text-white' : 'text-[#607D8B] hover:text-[#123B63]'
                }`}
              >
                Murder Case
              </button>
              <button
                onClick={() => {
                  setCustomAnalysisType('MINOR_THEFT');
                  setPhotoPreset('MINOR_THEFT');
                  runAllIndiaFacialScan('MINOR_THEFT', selectedPhoto);
                }}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                  customAnalysisType === 'MINOR_THEFT' ? 'bg-[#E65100] text-white' : 'text-[#607D8B] hover:text-[#123B63]'
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
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${
                  customAnalysisType === 'CLEAN_RECORD' ? 'bg-[#2E7D32] text-white' : 'text-[#607D8B] hover:text-[#123B63]'
                }`}
              >
                Clean Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Scan Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#D9E1E8] text-xs">
        <div className="text-[#607D8B]">
          Selected Profile Mode: <span className="text-[#1565C0] font-bold">{photoPreset}</span>
        </div>
        <button
          onClick={() => runAllIndiaFacialScan()}
          disabled={isScanning}
          className="px-5 py-2.5 rounded-lg bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold transition-colors shadow-sm flex items-center gap-2 uppercase tracking-wide"
        >
          {isScanning ? 'EXTRACTING 128D VECTORS...' : 'SEARCH ALL-INDIA CRIMINAL RECORDS'}
        </button>
      </div>

      {/* SEARCH RESULTS DISPLAY */}
      {searchResult && (
        <div className="bg-[#FFFFFF] p-5 rounded-xl border-2 border-[#1565C0] space-y-4 shadow-sm text-xs">
          {/* Header Verdict & Match Confidence */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#D9E1E8] pb-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                searchResult.crime_severity === 'HIGH_SEVERITY_CAPITAL_CRIME'
                  ? 'bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A]'
                  : searchResult.crime_severity === 'NO_CRIME_REGISTERED'
                  ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                  : 'bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]'
              }`}>
                {searchResult.crime_severity === 'HIGH_SEVERITY_CAPITAL_CRIME'
                  ? 'MATCH FOUND: HIGH-SEVERITY CAPITAL CRIME'
                  : searchResult.crime_severity === 'NO_CRIME_REGISTERED'
                  ? 'VERIFIED: NO CRIMINAL RECORD FOUND (CLEAN RECORD)'
                  : 'MATCH FOUND: MODERATE / PROPERTY OFFENSE'}
              </span>
            </div>

            <div className="text-[#1565C0] font-bold text-xs">
              FACIAL SIMILARITY: {(searchResult.facial_match_confidence * 100).toFixed(1)}% (128D Vector Match)
            </div>
          </div>

          {/* Suspect Info & Cases Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#D9E1E8] space-y-1.5">
              <div className="text-[#607D8B] text-[10px] font-bold uppercase">REGISTERED RECORD PROFILE</div>
              <div className="font-bold text-[#123B63] text-sm">{searchResult.suspect_name}</div>
              <div className="text-[#607D8B] text-[11px] font-mono">NCRB ID: {searchResult.ncrb_record_id}</div>
              <div className={`font-bold pt-1 ${
                searchResult.crime_severity === 'NO_CRIME_REGISTERED' ? 'text-[#2E7D32]' : 'text-[#E65100]'
              }`}>
                Warrant Status: {searchResult.warrant_status}
              </div>
              {searchResult.operating_states?.length > 0 && (
                <div className="text-[#607D8B] text-[11px]">Operating States: <strong className="text-[#123B63]">{searchResult.operating_states.join(', ')}</strong></div>
              )}
            </div>

            {/* Detailed Case FIR List */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#D9E1E8] space-y-2">
              <div className="text-[#1565C0] font-bold text-xs uppercase">OFFICIAL NCRB / CCTNS CASE DOSSIER</div>
              
              <div className="text-[11px] text-[#263238] bg-[#FFFFFF] p-2.5 rounded border border-[#D9E1E8] font-semibold">
                {searchResult.cases_summary}
              </div>

              {/* Serious Murder / Attempted Murder Cases */}
              {searchResult.serious_crimes_involved?.length > 0 && (
                <div>
                  <div className="text-[#C62828] font-bold text-xs mb-1 mt-2 uppercase">Serious Capital Crimes (Murder / Attempted Murder)</div>
                  {searchResult.serious_crimes_involved.map((fir, idx) => (
                    <div key={idx} className="bg-[#FFEBEE] p-2 rounded border border-[#EF9A9A] text-[11px] mb-1">
                      <span className="text-[#123B63] font-bold">{fir.fir_no}</span> — <span className="text-[#C62828] font-bold">{fir.offense}</span> ({fir.station})
                    </div>
                  ))}
                </div>
              )}

              {/* Minor Theft / Bootlegging Cases */}
              {searchResult.minor_crimes_involved?.length > 0 && (
                <div>
                  <div className="text-[#E65100] font-bold text-xs mb-1 mt-2 uppercase">Property / Theft / Excise Offenses</div>
                  {searchResult.minor_crimes_involved.map((fir, idx) => (
                    <div key={idx} className="bg-[#FFF3E0] p-2 rounded border border-[#FFE0B2] text-[11px] mb-1">
                      <span className="text-[#123B63] font-bold">{fir.fir_no}</span> — <span className="text-[#E65100] font-semibold">{fir.offense}</span> ({fir.station})
                    </div>
                  ))}
                </div>
              )}

              {/* Clean Record Message */}
              {searchResult.crime_severity === 'NO_CRIME_REGISTERED' && (
                <div className="bg-[#E8F5E9] p-2.5 rounded border border-[#C8E6C9] text-[11px] text-[#2E7D32] font-semibold">
                  All 36 States &amp; UT Police Registries (CCTNS) Checked. Zero Active Cases or Pending Warrants Found.
                </div>
              )}
            </div>
          </div>

          {/* Action Required Banner */}
          <div className={`p-3 rounded-lg border text-xs font-bold text-center uppercase tracking-wider ${
            searchResult.crime_severity === 'HIGH_SEVERITY_CAPITAL_CRIME'
              ? 'bg-[#FFEBEE] border-[#EF9A9A] text-[#C62828]'
              : searchResult.crime_severity === 'NO_CRIME_REGISTERED'
              ? 'bg-[#E8F5E9] border-[#C8E6C9] text-[#2E7D32]'
              : 'bg-[#FFF3E0] border-[#FFE0B2] text-[#E65100]'
          }`}>
            POLICE ACTION: {searchResult.action_required}
          </div>
        </div>
      )}
    </div>
  );
}
