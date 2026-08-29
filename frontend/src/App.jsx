import React, { useState } from 'react';
import UnrealEngine5Showcase from './components/UnrealEngine5Showcase';
import HardwareExplodedView from './components/HardwareExplodedView';
import PhoneSignalsView from './components/PhoneSignalsView';
import AICapabilitiesView from './components/AICapabilitiesView';
import UnfilteredItemsView from './components/UnfilteredItemsView';
import PoliceSceneView from './components/PoliceSceneView';
import NationalSecurityView from './components/NationalSecurityView';
import EmergencyDispatchView from './components/EmergencyDispatchView';

export default function App() {
  const [sessionUuid, setSessionUuid] = useState('FX-20260829-9941');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [carveSpeed, setCarveSpeed] = useState('0.0 MB/s');
  const [activeTab, setActiveTab] = useState('ue5'); // ue5, police, emergency, national_sec, hardware, signals, ai_matrix, vision, unfiltered, agent
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [agentTraces, setAgentTraces] = useState([]);
  const [sha256Hash, setSha256Hash] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  const startScan = async () => {
    setIsScanning(true);
    setProgress(0);
    setEvidenceItems([]);
    setAgentTraces([]);
    
    try {
      const res = await fetch('http://localhost:8000/api/v1/scan/start', { method: 'POST' });
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
            <p className="text-xs text-slate-400">On-Scene Digital Forensics, Local ML Triage, Dial 100/112 ERSS Patrol Dispatch & Biometric Security</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            HW WRITE-BLOCKER: ENFORCED
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-red-950 border border-red-800 text-red-300">
            DIAL 100/112 ERSS: ACTIVE
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-purple-950 border border-purple-800 text-purple-300">
            BIOMETRICS: FINGER+FACE
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left 8 Columns: Control Console & Main Canvas */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Scan Control & Live Sector Telemetry */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <div className="text-xs font-mono text-slate-400">TARGET SESSION ID</div>
                <div className="text-sm font-bold font-mono text-cyan-400">{sessionUuid}</div>
              </div>

              <button
                onClick={startScan}
                disabled={isScanning}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${
                  isScanning 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
                }`}
              >
                {isScanning ? 'CARVING RAW SECTORS...' : 'START FIELD TRIAGE SCAN'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>UNALLOCATED STORAGE CARVING</span>
                <span>{progress}% ({Math.floor((progress/100)*131072)} / 131,072 Sectors)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Navigation Tab Selector Bar */}
          <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('ue5')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'ue5' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              UE5 3D Showcase
            </button>

            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'emergency' ? 'bg-red-950 text-red-300 border border-red-800 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Dial 100/112 & Biometrics
            </button>

            <button
              onClick={() => setActiveTab('police')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'police' ? 'bg-red-950 text-red-300 border border-red-800 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              UE5 Police Scene
            </button>

            <button
              onClick={() => setActiveTab('national_sec')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'national_sec' ? 'bg-red-950 text-red-300 border border-red-800 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              National Security Hub
            </button>

            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                activeTab === 'hardware' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              HW Prototype Specs
            </button>

            <button
              onClick={() => setActiveTab('signals')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                activeTab === 'signals' ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Phone Signals
            </button>

            <button
              onClick={() => setActiveTab('ai_matrix')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                activeTab === 'ai_matrix' ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              AI Capabilities
            </button>

            <button
              onClick={() => setActiveTab('vision')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                activeTab === 'vision' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              YOLO Detection ({evidenceItems.length})
            </button>

            <button
              onClick={() => setActiveTab('unfiltered')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                activeTab === 'unfiltered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Unfiltered Items
            </button>

            <button
              onClick={() => setActiveTab('agent')}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                activeTab === 'agent' ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              Offline Agentic Trace ({agentTraces.length})
            </button>
          </div>

          {/* ACTIVE TAB CONTENT */}
          {activeTab === 'ue5' && (
            <UnrealEngine5Showcase isScanning={isScanning} progress={progress} />
          )}

          {activeTab === 'emergency' && (
            <EmergencyDispatchView />
          )}

          {activeTab === 'police' && (
            <PoliceSceneView />
          )}

          {activeTab === 'national_sec' && (
            <NationalSecurityView />
          )}

          {activeTab === 'hardware' && (
            <HardwareExplodedView />
          )}

          {activeTab === 'signals' && (
            <PhoneSignalsView />
          )}

          {activeTab === 'ai_matrix' && (
            <AICapabilitiesView />
          )}

          {activeTab === 'unfiltered' && (
            <UnfilteredItemsView />
          )}

          {activeTab === 'vision' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 font-mono">RECOVERED EVIDENCE WITH YOLO BOUNDING BOXES</h3>
              {evidenceItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-xl">
                  No evidence carved yet. Press "START FIELD TRIAGE SCAN" above.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evidenceItems.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-cyan-400">{item.filename}</span>
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          item.class === 'CONTRABAND' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {item.class} ({item.confidence})
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{item.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'agent' && (
            <div className="bg-slate-900 border border-purple-900/60 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-purple-300 font-mono">OFFLINE AGENTIC AI REASONING TRACE</h3>
                <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-800 px-2 py-0.5 rounded font-mono">0 EXTERNAL APIS USED</span>
              </div>

              {agentTraces.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-xl">
                  Agentic reasoning cycle inactive. Run scan to trigger autonomous agent loop.
                </div>
              ) : (
                <div className="space-y-3">
                  {agentTraces.map((trace, idx) => (
                    <div key={idx} className="bg-slate-950 border border-purple-950 p-4 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                          {trace.step}
                        </span>
                        <span className="text-xs font-bold text-purple-400 font-mono">PHASE: {trace.phase}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-mono bg-slate-900/80 p-2 rounded border border-slate-800">{trace.thought}</p>
                      <div className="text-[11px] text-emerald-400 font-mono">✔ Action: {trace.action}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right 4 Columns: System Metrics & Custody Log */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* System Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              SYSTEM TELEMETRY
            </h3>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Carving Speed</span>
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
                <span className="text-slate-400">ERSS 100/112 Mesh</span>
                <span className="text-red-400 font-bold">DISPATCH ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Chain of Custody */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-200 font-mono">CHAIN OF CUSTODY LOG</h3>
            
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500">SHA-256 HASH:</span>
                <div className="text-emerald-400 break-all mt-0.5">{sha256Hash}</div>
              </div>
              <div>
                <span className="text-slate-500">OPERATOR:</span> OFFICER #4412
              </div>
              <div>
                <span className="text-slate-500">INTEGRITY:</span> SEALED
              </div>
            </div>

            <button 
              onClick={() => alert(`FORENSIX COURT EVIDENCE REPORT\nSession: ${sessionUuid}\nSHA-256: ${sha256Hash}\nStatus: Certified Legally Sound`)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              EXPORT COURT EVIDENCE REPORT
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
