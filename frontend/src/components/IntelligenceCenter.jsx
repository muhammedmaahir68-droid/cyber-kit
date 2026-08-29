import React, { useState } from 'react';

export default function IntelligenceCenter({ evidenceItems, agentTraces }) {
  const [subTab, setSubTab] = useState('yolo_gallery'); // yolo_gallery, agent_trace, ai_matrix

  const capabilities = [
    { icon: '🔫', title: 'Weapons', desc: 'Handguns, rifles, knives, explosives', metric: '96.4% mAP', color: 'text-red-400 border-red-800 bg-red-950/40' },
    { icon: '💊', title: 'Narcotics', desc: 'Drug packaging, pills, powders', metric: '91.8% mAP', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
    { icon: '👤', title: 'Face Detection', desc: 'Suspect face isolation & matching', metric: '94.2% Prec', color: 'text-cyan-400 border-cyan-800 bg-cyan-950/40' },
    { icon: '📄', title: 'Documents', desc: 'IDs, passports, contracts, receipts', metric: '92.5% mAP', color: 'text-blue-400 border-blue-800 bg-blue-950/40' },
    { icon: '💬', title: 'Chat NLP', desc: 'Threat keywords, drug trade, fraud', metric: '89.7% F1', color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40' },
    { icon: '⏰', title: 'Timestamp Tamper', desc: 'EXIF vs MACB conflict audit', metric: '96.8% AUC', color: 'text-purple-400 border-purple-800 bg-purple-950/40' },
    { icon: '💰', title: 'Currency & Cash', desc: 'Large cash bundles & stacks', metric: '88.3% mAP', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
    { icon: '🚗', title: 'License Plates', desc: 'Vehicle plate OCR from photos', metric: '93.1% Acc', color: 'text-slate-300 border-slate-700 bg-slate-900' },
    { icon: '🔞', title: 'CSAM/NSFW', desc: 'Illegal media content classifier', metric: '97.2% Prec', color: 'text-red-400 border-red-800 bg-red-950/40' },
    { icon: '📍', title: 'GPS Extraction', desc: 'EXIF map coordinate parsing', metric: '100% Parse', color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40' },
  ];

  return (
    <div className="space-y-5 font-sans">
      {/* Sub Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            ON-DEVICE AI EVIDENCE INTELLIGENCE CENTER
          </h3>
          <p className="text-xs text-slate-400">Quantized YOLOv8-Nano object detection and offline multi-step agentic reasoning.</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setSubTab('yolo_gallery')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'yolo_gallery' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            YOLO Bounding Boxes ({evidenceItems.length})
          </button>
          <button
            onClick={() => setSubTab('agent_trace')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'agent_trace' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Agentic AI Trace ({agentTraces.length})
          </button>
          <button
            onClick={() => setSubTab('ai_matrix')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'ai_matrix' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            10 AI Capabilities
          </button>
        </div>
      </div>

      {/* Subtab 1: YOLO Gallery */}
      {subTab === 'yolo_gallery' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="text-xs font-bold text-slate-200 font-mono">RECOVERED CARVED EVIDENCE WITH BOUNDING BOX ANNOTATIONS</div>

          {evidenceItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-xl">
              No evidence items scanned yet. Run field triage scan in the Field Console tab.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidenceItems.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 font-mono">
                  <div className="flex justify-between items-center text-xs">
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

      {/* Subtab 2: Agentic AI Reasoning Trace */}
      {subTab === 'agent_trace' && (
        <div className="bg-slate-900 border border-purple-900/60 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-purple-300">OFFLINE AGENTIC AI MULTI-STEP REASONING TRACE</h3>
            <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-800 px-2.5 py-1 rounded">0 EXTERNAL APIS USED</span>
          </div>

          {agentTraces.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
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
                    <span className="text-xs font-bold text-purple-400">PHASE: {trace.phase}</span>
                  </div>
                  <p className="text-xs text-slate-200 bg-slate-900/80 p-2.5 rounded border border-slate-800">{trace.thought}</p>
                  <div className="text-[11px] text-emerald-400">✔ Action: {trace.action}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab 3: AI Capabilities Matrix */}
      {subTab === 'ai_matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="text-xs font-bold text-purple-400">COMPLETE 10-MODULE ON-DEVICE AI DETECTION MATRIX</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {capabilities.map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl border ${item.color} space-y-1 flex flex-col justify-between`}>
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="text-xs font-bold text-slate-100">{item.title}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2">{item.desc}</div>
                </div>
                <div className="text-[10px] font-bold mt-1">{item.metric}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
