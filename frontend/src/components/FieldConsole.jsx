import React, { useState } from 'react';
import FacialRecognitionScanner from './FacialRecognitionScanner';

export default function FieldConsole({ isScanning, progress, carveSpeed, sessionUuid, sha256Hash, onStartScan }) {
  const [viewMode, setViewMode] = useState('ai_filtered'); // ai_filtered vs unfiltered_all

  const allFiles = [
    { type: 'IMAGE', name: 'CARVED_IMG_4910.JPG', size: '1.2 MB', class: 'CONTRABAND', detail: 'Weapon: Glock 19 (96.4%)' },
    { type: 'SQLITE', name: 'whatsapp_freelist.sqlite', size: '45 KB', class: 'CONTRABAND', detail: 'Chat: "Transfer funds via crypto mixer"' },
    { type: 'IMAGE', name: 'CONTRABAND_PKG.JPG', size: '2.1 MB', class: 'CONTRABAND', detail: 'Narcotics Packaging (91.8%)' },
    { type: 'IMAGE', name: 'SUSPECT_FACE.JPG', size: '1.8 MB', class: 'SUSPICIOUS', detail: 'Suspect Face Match #2 (94.2%)' },
    { type: 'VIDEO', name: 'VID_0117.mp4', size: '5.1 MB', class: 'CLEAN', detail: 'Header verified intact' },
    { type: 'DOCUMENT', name: 'receipt_scan.pdf', size: '88 KB', class: 'CLEAN', detail: 'Document scan fragment' },
    { type: 'AUDIO', name: 'voice_note_01.m4a', size: '320 KB', class: 'CLEAN', detail: 'Audio recording' },
    { type: 'CONTACT', name: 'contacts_backup.vcf', size: '12 KB', class: 'CLEAN', detail: 'Contact VCF data' }
  ];

  const displayedFiles = viewMode === 'ai_filtered' 
    ? allFiles.filter(f => f.class === 'CONTRABAND' || f.class === 'SUSPICIOUS')
    : allFiles;

  return (
    <div className="space-y-4 font-sans text-[#263238]">
      {/* Device Connection & Write-Blocker Status Bar */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#123B63] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            HW
          </div>
          <div>
            <div className="text-xs font-bold text-[#123B63] flex items-center gap-2">
              SUSPECT DEVICE CONNECTED <span className="text-[10px] text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9] font-semibold">READ-ONLY BUS</span>
            </div>
            <div className="text-xs text-[#607D8B]">SAMSUNG-SM-S901B (512GB) via USB-C Write-Blocker IC</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#D9E1E8] text-[#123B63] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1565C0]"></span>
            OFFICER #4412 (Cyber Cell)
          </span>
        </div>
      </div>

      {/* Main Scan Control & Sector Telemetry */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-[11px] text-[#607D8B] font-bold uppercase tracking-wider">SESSION IDENTIFIER</div>
            <div className="text-sm font-bold text-[#1565C0] font-mono mt-0.5">{sessionUuid}</div>
          </div>

          <button
            onClick={onStartScan}
            disabled={isScanning}
            className={`px-5 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all shadow-sm flex items-center gap-2 ${
              isScanning
                ? 'bg-[#ECEFF1] text-[#90A4AE] cursor-not-allowed border border-[#CFD8DC]'
                : 'bg-[#1565C0] hover:bg-[#0D47A1] text-white'
            }`}
          >
            {isScanning ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>CARVING STORAGE SECTORS...</span>
              </>
            ) : (
              <span>START ON-SCENE FIELD TRIAGE</span>
            )}
          </button>
        </div>

        {/* Storage Carving Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[#607D8B] font-medium">
            <span>UNALLOCATED SECTOR CARVING</span>
            <span>{progress}% ({Math.floor((progress / 100) * 131072)} / 131,072 Sectors)</span>
          </div>
          <div className="w-full bg-[#ECEFF1] rounded-full h-2.5 overflow-hidden border border-[#D9E1E8]">
            <div
              className="bg-[#1565C0] h-full rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Triage Viewport & File List */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#D9E1E8] pb-3">
          <div>
            <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">RECOVERED STORAGE CARVE VIEWPORT</h3>
            <p className="text-xs text-[#607D8B] mt-0.5">Switch between AI-Triage Filtered High-Risk Evidence and 100% Unfiltered Raw Storage Browser.</p>
          </div>

          <div className="flex bg-[#F4F6F8] p-1 rounded-lg border border-[#D9E1E8] text-xs">
            <button
              onClick={() => setViewMode('ai_filtered')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                viewMode === 'ai_filtered' ? 'bg-[#1565C0] text-white shadow-xs' : 'text-[#607D8B] hover:text-[#123B63]'
              }`}
            >
              AI High-Risk Filter ({allFiles.filter(f => f.class !== 'CLEAN').length})
            </button>
            <button
              onClick={() => setViewMode('unfiltered_all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                viewMode === 'unfiltered_all' ? 'bg-[#1565C0] text-white shadow-xs' : 'text-[#607D8B] hover:text-[#123B63]'
              }`}
            >
              All Storage Files ({allFiles.length})
            </button>
          </div>
        </div>

        {/* File Browser Grid */}
        <div className="space-y-2">
          {displayedFiles.map((file, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 transition-all ${
                file.class === 'CONTRABAND'
                  ? 'bg-[#FFEBEE] border-[#EF9A9A] text-[#C62828]'
                  : file.class === 'SUSPICIOUS'
                  ? 'bg-[#FFF3E0] border-[#FFE0B2] text-[#E65100]'
                  : 'bg-[#F8FAFC] border-[#D9E1E8] text-[#263238]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#FFFFFF] border border-[#D9E1E8] text-[#607D8B] font-mono">
                  {file.type}
                </span>
                <div>
                  <div className="font-bold text-xs text-[#123B63]">{file.name}</div>
                  <div className="text-[11px] text-[#607D8B]">{file.detail}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#607D8B] font-medium">{file.size}</span>
                <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase border ${
                  file.class === 'CONTRABAND'
                    ? 'bg-[#FFCDD2] text-[#C62828] border-[#EF9A9A]'
                    : file.class === 'SUSPICIOUS'
                    ? 'bg-[#FFE0B2] text-[#E65100] border-[#FFCC80]'
                    : 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                }`}>
                  {file.class}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facial Recognition & Criminal Case Detection Module */}
      <FacialRecognitionScanner />
    </div>
  );
}
