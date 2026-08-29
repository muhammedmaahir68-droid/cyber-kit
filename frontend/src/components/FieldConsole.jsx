import React, { useState } from 'react';

export default function FieldConsole({ isScanning, progress, carveSpeed, sessionUuid, sha256Hash, onStartScan }) {
  const [viewMode, setViewMode] = useState('ai_filtered'); // ai_filtered vs unfiltered_all
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [authStatus, setAuthStatus] = useState({ officer: 'OFFICER #4412 (Cyber Cell)', badge: 'DEFENSE-LEVEL-3' });

  const allFiles = [
    { icon: '🖼️', name: 'CARVED_IMG_4910.JPG', size: '1.2 MB', class: 'CONTRABAND', detail: 'Weapon: Glock 19 (96.4%)' },
    { icon: '💬', name: 'whatsapp_freelist.sqlite', size: '45 KB', class: 'CONTRABAND', detail: 'Chat: "Transfer funds via crypto mixer"' },
    { icon: '🖼️', name: 'CONTRABAND_PKG.JPG', size: '2.1 MB', class: 'CONTRABAND', detail: 'Narcotics Packaging (91.8%)' },
    { icon: '🖼️', name: 'SUSPECT_FACE.JPG', size: '1.8 MB', class: 'SUSPICIOUS', detail: 'Suspect Face Match #2 (94.2%)' },
    { icon: '🎞️', name: 'VID_0117.mp4', size: '5.1 MB', class: 'CLEAN', detail: 'Header verified intact' },
    { icon: '📄', name: 'receipt_scan.pdf', size: '88 KB', class: 'CLEAN', detail: 'Document scan fragment' },
    { icon: '🎵', name: 'voice_note_01.m4a', size: '320 KB', class: 'CLEAN', detail: 'Audio recording' },
    { icon: '📋', name: 'contacts_backup.vcf', size: '12 KB', class: 'CLEAN', detail: 'Contact VCF data' }
  ];

  const displayedFiles = viewMode === 'ai_filtered' 
    ? allFiles.filter(f => f.class === 'CONTRABAND' || f.class === 'SUSPICIOUS')
    : allFiles;

  return (
    <div className="space-y-5 font-sans">
      {/* Device Connection & Biometric Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-mono text-lg font-bold">
            HW
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200 font-mono flex items-center gap-2">
              SUSPECT DEVICE CONNECTED <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">READ-ONLY BUS</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">SAMSUNG-SM-S901B (512GB) via USB-C Write-Blocker</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            {authStatus.officer}
          </span>
        </div>
      </div>

      {/* Main Scan Control & Sector Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-xs font-mono text-slate-400">SESSION IDENTIFIER</div>
            <div className="text-sm font-bold font-mono text-cyan-400">{sessionUuid}</div>
          </div>

          <button
            onClick={onStartScan}
            disabled={isScanning}
            className={`px-6 py-3 rounded-xl font-bold text-sm font-mono transition-all shadow-lg flex items-center gap-2 ${
              isScanning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
            }`}
          >
            {isScanning ? 'CARVING STORAGE SECTORS...' : 'START ON-SCENE FIELD TRIAGE'}
          </button>
        </div>

        {/* Storage Carving Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>UNALLOCATED SECTOR CARVING</span>
            <span>{progress}% ({Math.floor((progress / 100) * 131072)} / 131,072 Sectors)</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Triage Viewport & Unfiltered Toggle Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-200 font-mono">RECOVERED STORAGE CARVE VIEWPORT</h3>
            <p className="text-xs text-slate-400">Switch between AI-Triage Filtered High-Risk Evidence and 100% Unfiltered Raw Storage Browser.</p>
          </div>

          {/* Unified Mode Toggle */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
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
                viewMode === 'unfiltered_all' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              100% Unfiltered All Items ({allFiles.length})
            </button>
          </div>
        </div>

        {/* Displayed Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono">
          {displayedFiles.map((f, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between hover:border-cyan-500 transition-all">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-xl">{f.icon}</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  f.class === 'CONTRABAND' ? 'bg-red-950 text-red-400 border border-red-800' :
                  f.class === 'SUSPICIOUS' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}>
                  {f.class}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-400 truncate">{f.name}</div>
                <div className="text-[11px] text-slate-300 mt-0.5">{f.detail}</div>
              </div>
              <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-900 flex justify-between">
                <span>Size: {f.size}</span>
                <span>SHA-256 OK</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
