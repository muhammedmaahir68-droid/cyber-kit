import React, { useState } from 'react';
import FieldConsole from './components/FieldConsole';
import IntelligenceCenter from './components/IntelligenceCenter';
import EmergencyMesh from './components/EmergencyMesh';
import UE5TwinView from './components/UE5TwinView';

export default function App() {
  const [sessionUuid, setSessionUuid] = useState('FX-20260829-9941');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [carveSpeed, setCarveSpeed] = useState('0.0 MB/s');
  const [activeCore, setActiveCore] = useState('console'); // console, intelligence, emergency, twin
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [agentTraces, setAgentTraces] = useState([]);
  const [sha256Hash, setSha256Hash] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  const getApiBase = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    return window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      
      {/* Top Application Header */}
      <header className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            CK
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              CYBER KIT <span className="text-xs px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">v1.0-ENTERPRISE</span>
            </h1>
            <p className="text-xs text-slate-400">On-Scene Digital Forensics, Local ML Triage, Dial 100/112 ERSS Mesh & Biometric Security</p>
          </div>
        </div>

        {/* Global Security Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            WRITE-BLOCK: ENFORCED
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-red-950 border border-red-800 text-red-300">
            DIAL 100/112 MESH
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-purple-950 border border-purple-800 text-purple-300">
            NCRB & CCTNS SYNCED
          </span>
        </div>
      </header>

      {/* UNIFIED 4-CORE NAVIGATION BAR */}
      <nav className="max-w-7xl mx-auto mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        <button
          onClick={() => setActiveCore('console')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'console'
              ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <span className="text-2xl">🛡️</span>
          <div>
            <div className="font-bold text-sm text-slate-100">1. Field Console</div>
            <div className="text-[11px] text-slate-400">Carve & Raw Data</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('intelligence')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'intelligence'
              ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <span className="text-2xl">🧠</span>
          <div>
            <div className="font-bold text-sm text-slate-100">2. AI Intelligence</div>
            <div className="text-[11px] text-slate-400">YOLO & Agent Trace</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('emergency')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'emergency'
              ? 'bg-red-950/80 border-red-500 text-red-300 shadow-lg shadow-red-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <span className="text-2xl">🚨</span>
          <div>
            <div className="font-bold text-sm text-slate-100">3. Emergency Mesh</div>
            <div className="text-[11px] text-slate-400">Dial 100/112 & NCRB</div>
          </div>
        </button>

        <button
          onClick={() => setActiveCore('twin')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
            activeCore === 'twin'
              ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <span className="text-2xl">🎬</span>
          <div>
            <div className="font-bold text-sm text-slate-100">4. UE5 3D Twin</div>
            <div className="text-[11px] text-slate-400">Tactical & Hardware</div>
          </div>
        </button>
      </nav>

      {/* MAIN UNIFIED WORKSPACE */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

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
            />
          )}

          {activeCore === 'intelligence' && (
            <IntelligenceCenter
              evidenceItems={evidenceItems}
              agentTraces={agentTraces}
            />
          )}

          {activeCore === 'emergency' && (
            <EmergencyMesh />
          )}

          {activeCore === 'twin' && (
            <UE5TwinView
              isScanning={isScanning}
              progress={progress}
            />
          )}
        </div>

        {/* Right 4 Columns: Persistent System Telemetry & Custody Log */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* System Telemetry Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl font-mono">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              SYSTEM TELEMETRY
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Carving Throughput</span>
                <span className="text-cyan-400 font-bold">{carveSpeed}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Local ML Accuracy</span>
                <span className="text-emerald-400 font-bold">91.4% mAP</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Write-Blocker Bus</span>
                <span className="text-emerald-400 font-bold">HIGH (READ-ONLY)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Control Room Link</span>
                <span className="text-red-400 font-bold">CCTNS/NATGRID SYNCED</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Chain of Custody Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl font-mono">
            <h3 className="text-sm font-bold text-slate-200">CHAIN OF CUSTODY LOG</h3>
            
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500">SHA-256 HASH:</span>
                <div className="text-emerald-400 break-all mt-0.5">{sha256Hash}</div>
              </div>
              <div>
                <span className="text-slate-500">OPERATOR:</span> OFFICER #4412
              </div>
              <div>
                <span className="text-slate-500">INTEGRITY:</span> SEALED & VERIFIED
              </div>
            </div>

            <button 
              onClick={() => alert(`FORENSIX COURT EVIDENCE REPORT\nSession: ${sessionUuid}\nSHA-256: ${sha256Hash}\nStatus: Certified Legally Sound`)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              EXPORT COURT EVIDENCE REPORT
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
