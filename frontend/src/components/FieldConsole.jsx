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
    <div className="space-y-5 font-sans">
      {/* Device Connection & Write-Blocker Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl font-mono">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400 text-sm font-bold">
            HW
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              SUSPECT DEVICE CONNECTED <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">READ-ONLY BUS</span>
            </div>
            <div className="text-[11px] text-slate-400">SAMSUNG-SM-S901B (512GB) via USB-C Write-Blocker IC</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            OFFICER #4412 (Cyber Cell)
          </span>
        </div>
      </div>

      {/* Main Scan Control & Sector Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">SESSION IDENTIFIER</div>
            <div className="text-sm font-bold text-cyan-400">{sessionUuid}</div>
          </div>

          <button
            onClick={onStartScan}
            disabled={isScanning}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 ${
              isScanning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950/50 border border-cyan-400'
            }`}
          >
            {isScanning ? 'CARVING STORAGE SECTORS...' : 'START ON-SCENE FIELD TRIAGE'}
          </button>
        </div>

        {/* Storage Carving Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>UNALLOCATED SECTOR CARVING</span>
            <span>{progress}% ({Math.floor((progress / 100) * 131072)} / 131,072 Sectors)</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Triage Viewport & File List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">RECOVERED STORAGE CARVE VIEWPORT</h3>
            <p className="text-[11px] text-slate-400 font-sans">Switch between AI-Triage Filtered High-Risk Evidence and 100% Unfiltered Raw Storage Browser.</p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('ai_filtered')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'ai_filtered' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AI High-Risk Filter ({allFiles.filter(f => f.class !== 'CLEAN').length})
            </button>
            <button
              onClick={() => setViewMode('unfiltered_all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'unfiltered_all' ? 'bg-slate-800 text-slate-200 font-bold' : 'text-slate-400 hover:text-slate-200'
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
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 transition-all ${
                file.class === 'CONTRABAND'
                  ? 'bg-red-950/30 border-red-900/60 text-red-200'
                  : file.class === 'SUSPICIOUS'
                  ? 'bg-amber-950/30 border-amber-900/60 text-amber-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded font-bold bg-slate-900 border border-slate-800 text-slate-400">
                  {file.type}
                </span>
                <div>
                  <div className="font-bold text-xs">{file.name}</div>
                  <div className="text-[11px] text-slate-400">{file.detail}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">{file.size}</span>
                <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                  file.class === 'CONTRABAND'
                    ? 'bg-red-950 text-red-400 border border-red-800'
                    : file.class === 'SUSPICIOUS'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
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
