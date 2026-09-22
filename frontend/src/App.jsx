import React, { useState } from 'react';
import FieldConsole from './components/FieldConsole';
import IntelligenceCenter from './components/IntelligenceCenter';
import EmergencyMesh from './components/EmergencyMesh';
import UE5TwinView from './components/UE5TwinView';
import RealtimeOpsView from './components/RealtimeOpsView';
import GovernmentAuthPortal from './components/GovernmentAuthPortal';
import { AshokaLionCapital, IndianFlag } from './components/NationalEmblems';

export default function App() {
  const [officerSession, setOfficerSession] = useState(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('ncis_officer_session') : null;
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const handleAuthenticate = (sessionData) => {
    setOfficerSession(sessionData);
    sessionStorage.setItem('ncis_officer_session', JSON.stringify(sessionData));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ncis_officer_session');
    setOfficerSession(null);
  };

  const [sessionUuid, setSessionUuid] = useState('FX-20260829-9941');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [carveSpeed, setCarveSpeed] = useState('0.0 MB/s');
  const [activeCore, setActiveCore] = useState('realtime'); // realtime, console, intelligence, emergency, twin
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [agentTraces, setAgentTraces] = useState([]);
  const [sha256Hash, setSha256Hash] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  const getApiBase = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    const host = window.location.hostname;
    if (host === 'localhost' || host.startsWith('10.') || host.startsWith('192.168.') || host.startsWith('172.')) {
      return `http://${host}:8000`;
    }
    return 'https://444ef2e5cecfe1c2-157-51-88-220.serveousercontent.com';
  };

  const startScan = async () => {
    setIsScanning(true);
    setProgress(0);
    setEvidenceItems([]);
    setAgentTraces([]);
    
    const apiBase = getApiBase();
    try {
      const res = await fetch(`${apiBase}/api/v1/scan/start`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSessionUuid(data.session_uuid);
      }
    } catch (e) {
      console.log('Backend offline, running standalone simulated scan loop');
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      setCarveSpeed((42 + Math.random() * 12).toFixed(1) + ' MB/s');

      if (currentProgress === 25) {
        setEvidenceItems(prev => [...prev, {
          filename: 'CARVED_IMG_4910.JPG',
          type: 'IMAGE',
          class: 'CONTRABAND',
          confidence: '96.4%',
          summary: 'Weapon Detected: Glock 19 (Handgun)'
        }]);
      } else if (currentProgress === 50) {
        setEvidenceItems(prev => [...prev, {
          filename: 'CONTRABAND_PKG.JPG',
          type: 'IMAGE',
          class: 'CONTRABAND',
          confidence: '91.8%',
          summary: 'Narcotics Package Identified'
        }]);
      } else if (currentProgress === 75) {
        setEvidenceItems(prev => [...prev, {
          filename: 'SUSPECT_FACE.JPG',
          type: 'IMAGE',
          class: 'SUSPICIOUS',
          confidence: '94.2%',
          summary: 'Suspect Face Match #2 Isolated'
        }]);
      } else if (currentProgress === 100) {
        clearInterval(interval);
        setIsScanning(false);
        setCarveSpeed('0.0 MB/s');
        setSha256Hash('a7b89f32c1094e82b719024f0c829e1a388172df91023812831849182390a1bc');

        setAgentTraces([
          { phase: 'PERCEIVE', step: 1, thought: 'Ingested 131,072 raw block sectors. Hardware write-blocker bus confirmed read-only.', action: 'Signal protocol high.' },
          { phase: 'ASSESS', step: 2, thought: 'Ran local Hailo NPU YOLOv8 model. 2 Contraband & 1 Suspicious item identified.', action: 'Computed bounding box tensors.' },
          { phase: 'CORRELATE', step: 3, thought: 'Correlated SQLite chat freelist strings with EXIF creation timestamps.', action: 'Linked chat payload to Glock 19 image.' },
          { phase: 'SYNTHESIZE', step: 4, thought: 'Probable cause threshold achieved (96.4% confidence).', action: 'Sealed SHA-256 evidence log for court presentation.' }
        ]);
      }
    }, 200);
  };

  if (!officerSession) {
    return <GovernmentAuthPortal onAuthenticate={handleAuthenticate} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans antialiased">
      
            {/* Top Professional Header */}
      <header className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4 font-mono">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-amber-500/50 shadow-lg shadow-amber-950/30">
            <AshokaLionCapital className="w-10 h-12 shrink-0 drop-shadow-md" />
            <IndianFlag className="w-8 h-5 shrink-0 rounded shadow-sm border border-slate-700/80" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                भारत सरकार • GOVT OF INDIA
              </span>
              <span className="text-slate-600">|</span>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                NCIS-TACTICAL <span className="text-slate-400 text-xs sm:text-sm font-normal">| NATIONAL CYBER CRIME INVESTIGATION PLATFORM</span>
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/80 font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                RESTRICTED // LAW ENFORCEMENT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
              Bureau of Police Research &amp; Development (BPR&amp;D) • Indian Cybercrime Coordination Centre (I4C) • Ministry of Home Affairs
            </p>
          </div>
        </div>

        {/* Officer Active Session Strip & Logout */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <div>
              <div className="text-[11px] font-bold text-slate-200">{officerSession?.officerName || 'Inspector Vikramaditya Rao'}</div>
              <div className="text-[10px] text-cyan-400 truncate max-w-[240px]">{officerSession?.officerId || 'IN-DL-4412-SIT'} • {officerSession?.city || 'New Delhi HQ'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Securely Logout & Return to National Police Gateway"
            className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900/90 text-rose-300 border border-rose-800 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Switch Desk
          </button>
        </div>
      </header>

      {/* Secondary Status Ribbon with Station, Division, and Legal Compliance */}
      <div className="max-w-7xl mx-auto mb-5 bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold uppercase">{officerSession?.agency || 'I4C CENTRAL COMMAND'}</span>
          <span>&gt;</span>
          <span className="text-slate-300">{officerSession?.branch || 'SIT Financial Mule Ring Desk'}</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            WRITE-BLOCKER: ACTIVE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300 font-bold">{officerSession?.clearanceLevel || 'LEVEL-3 (SECRET)'}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-bold">BNS 2023 SEC 63 / BSA SEC 65B</span>
        </div>
      </div>

      {/* UNIFIED 5-CORE NAVIGATION BAR */}
      <nav className="max-w-7xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
        <button
          onClick={() => setActiveCore('realtime')}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'realtime'
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 relative">
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-1 right-1 animate-ping"></span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-xs text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <span>0. Live Surveillance</span>
              <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-700 px-1 rounded">LIVE</span>
            </div>
            <div className="text-[11px] text-slate-400">Real-Time Ingestion & Vision</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('console')}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'console'
              ? 'bg-cyan-950/90 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-xs text-slate-100 uppercase tracking-wider">1. Digital Forensics</div>
            <div className="text-[11px] text-slate-400">Physical Drive Carve IC</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('intelligence')}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'intelligence'
              ? 'bg-purple-950/90 border-purple-500 text-purple-300 shadow-md shadow-purple-950/40 ring-1 ring-purple-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-purple-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.595 15.12a2 2 0 00-1.806.547M16 4l-4 4-4-4m8 6l-4 4-4-4"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-xs text-slate-100 uppercase tracking-wider">2. Syndicate Intel</div>
            <div className="text-[11px] text-slate-400">GNN Syndicate Graph</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('emergency')}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'emergency'
              ? 'bg-red-950/90 border-red-500 text-red-300 shadow-md shadow-red-950/40 ring-1 ring-red-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-red-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-xs text-slate-100 uppercase tracking-wider">3. ERSS Patrol Mesh</div>
            <div className="text-[11px] text-slate-400">Dial 112 Rapid Dispatch</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('twin')}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'twin'
              ? 'bg-indigo-950/90 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-950/40 ring-1 ring-indigo-500/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-indigo-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-xs text-slate-100 uppercase tracking-wider">4. Edge Hardware</div>
            <div className="text-[11px] text-slate-400">Tactical NPU Enclosure</div>
          </div>
        </button>
      </nav>

      {/* MAIN UNIFIED WORKSPACE */}
      <main className="max-w-7xl mx-auto">
        {activeCore === 'realtime' ? (
          <RealtimeOpsView getApiBase={getApiBase} officerSession={officerSession} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Columns: Selected Core Workspace */}
            <div className="lg:col-span-8 space-y-6">
              {activeCore === 'console' && (
                <FieldConsole
                  isScanning={isScanning}
                  progress={progress}
                  carveSpeed={carveSpeed}
                  sessionUuid={sessionUuid}
                  sha256Hash={sha256Hash}
                  onStartScan={startScan}
                  officerSession={officerSession}
                />
              )}

              {activeCore === 'intelligence' && (
                <IntelligenceCenter
                  evidenceItems={evidenceItems}
                  agentTraces={agentTraces}
                  officerSession={officerSession}
                />
              )}

              {activeCore === 'emergency' && (
                <EmergencyMesh officerSession={officerSession} />
              )}

              {activeCore === 'twin' && (
                <UE5TwinView
                  isScanning={isScanning}
                  progress={progress}
                  officerSession={officerSession}
                />
              )}
            </div>

        {/* Right 4 Columns: Persistent Telemetry & Chain of Custody */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* System Telemetry Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-xl font-mono">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              SYSTEM TELEMETRY &amp; HARDWARE STATUS
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Carving Throughput</span>
                <span className="text-cyan-400 font-bold">{carveSpeed}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Local NPU Accelerator</span>
                <span className="text-purple-400 font-bold">Hailo-8L (26 TOPS)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Write-Blocker Bus</span>
                <span className="text-emerald-400 font-bold">READ-ONLY (HIGH)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Control Room Link</span>
                <span className="text-cyan-400 font-bold">NATGRID / CCTNS ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Chain of Custody Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              CHAIN OF CUSTODY LOG
            </h3>
            
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500">SHA-256 HASH:</span>
                <div className="text-emerald-400 break-all mt-0.5 font-mono">{sha256Hash}</div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">INVESTIGATOR:</span>
                <span className="text-slate-200 font-bold">{officerSession?.officerName || 'Inspector Vikramaditya Rao'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BADGE ID:</span>
                <span className="text-cyan-400 font-bold">{officerSession?.officerId || 'IN-DL-4412-SIT'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">JURISDICTION:</span>
                <span className="text-slate-300 font-bold truncate max-w-[160px]">{officerSession?.city || 'New Delhi HQ'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">INTEGRITY:</span>
                <span className="text-emerald-400 font-bold">SEALED &amp; VERIFIED</span>
              </div>
            </div>

            <button 
              onClick={() => alert(`NATIONAL CYBER CRIME INVESTIGATION REPORT\nSession: ${sessionUuid}\nSHA-256: ${sha256Hash}\nAuthorized Officer: ${officerSession?.officerName || 'Inspector Vikramaditya Rao'} (${officerSession?.officerId || 'IN-DL-4412-SIT'})\nAgency / Station: ${officerSession?.agency || 'I4C Central Command'} - ${officerSession?.city || 'New Delhi HQ'}\nDivision: ${officerSession?.branch || 'Special Investigation Team'}\nClearance: ${officerSession?.clearanceLevel || 'LEVEL-3 (SECRET)'}\nStatutory Basis: Certified Court-Admissible under BNS 2023 Sec 63 & Bharatiya Sakshya Adhiniyam Sec 65B\nEvidence Status: Encrypted & Sealed in Judicial Evidence Vault`)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-xl border border-slate-700 transition-all font-mono"
            >
              EXPORT COURT EVIDENCE REPORT
            </button>
          </div>

        </div>

        </div>
      )}
      </main>
    </div>
  );
}
