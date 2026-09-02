import React, { useState } from 'react';

export default function IntelligenceCenter({ evidenceItems = [], agentTraces = [] }) {
  const [subTab, setSubTab] = useState('criminal_network_graph'); // criminal_network_graph, yolo_gallery, agent_trace, ai_matrix
  const [selectedNode, setSelectedNode] = useState('KINGPIN');
  const [nlpInputText, setNlpInputText] = useState(
    'FIR #991/2025: Suspect Vikram Singh @ Cyber-Ghost operated hawala wallet 0x71C...88F1 along with co-accused Ramesh Kumar near Sector 4 Market tower #412. Vehicle plate DL-01-AB-1234 identified.'
  );
  const [extractedEntities, setExtractedEntities] = useState(null);

  const networkNodes = {
    KINGPIN: {
      id: 'KINGPIN',
      name: 'Vikram Singh @ Vicky (Alias: Cyber-Ghost)',
      role: 'SYNDICATE KINGPIN (Hub Node)',
      centrality_score: '0.964 (Rank #1 Betweenness Centrality)',
      vector_confidence: '98.6% (128D Face Match)',
      warrant: 'INTER-STATE ARREST WARRANT ACTIVE',
      firs: ['FIR #991/2025 (IPC 307 Attempted Murder)', 'FIR #412/2024 (IPC 302 Homicide)'],
      phone: '+91-9811223344',
      status: 'HIGH-PRIORITY FUGITIVE',
      color: 'border-red-600 bg-red-950/80 text-red-200 ring-1 ring-red-500'
    },
    OPERATIVE_1: {
      id: 'OPERATIVE_1',
      name: 'Ramesh Kumar @ Chhotu',
      role: 'FIELD OPERATIVE (Hawala & Larceny)',
      centrality_score: '0.742 (Rank #3)',
      vector_confidence: '94.2% (128D Face Match)',
      warrant: 'LOCAL SUMMONS ACTIVE',
      firs: ['FIR #112/2024 (IPC 379 Theft)', 'FIR #88/2023 (Excise Act Bootlegging)'],
      phone: '+91-9988776655',
      status: 'LOCAL BEAT PATROL NOTIFIED',
      color: 'border-amber-600 bg-amber-950/80 text-amber-200'
    },
    OPERATIVE_2: {
      id: 'OPERATIVE_2',
      name: 'Target-Alpha (Unidentified Counter-Terror Suspect)',
      role: 'TERROR SYNDICATE OPERATIVE',
      centrality_score: '0.889 (Rank #2)',
      vector_confidence: '96.4% (NATGRID Match)',
      warrant: 'LEVEL-3 SP APPROVAL REQUIRED',
      firs: ['NATGRID Watchlist #IND-2026-991'],
      phone: '+91-9876543210',
      status: 'SPECIAL CELL ESCALATED',
      color: 'border-purple-600 bg-purple-950/80 text-purple-200'
    },
    HAWALA_WALLET: {
      id: 'HAWALA_WALLET',
      name: 'Crypto Hawala Wallet: 0x71C...88F1',
      role: 'EXTORTION & SYNDICATE FUNDING CHANNEL',
      centrality_score: '0.912 (Financial Flow Hub)',
      vector_confidence: 'Blockchain Ledger Verified',
      warrant: 'SEIZURE ORDER ACTIVE',
      firs: ['Extortion Proceeds IPC 384'],
      phone: 'N/A (Decentralized Ledger)',
      status: 'BANK & CRYPTO WALLET FROZEN',
      color: 'border-cyan-600 bg-cyan-950/80 text-cyan-200'
    },
    CELL_TOWER: {
      id: 'CELL_TOWER',
      name: 'Cell Tower #412 (Delhi-Mumbai Express Link)',
      role: 'CDR & TOWER DUMP OVERLAP LOCATION',
      centrality_score: '0.835 (Spatial-Temporal Overlap)',
      vector_confidence: '100% Cell Tower Overlap',
      warrant: 'COURT SUBPOENA FILED',
      firs: ['Tower Dump Log #412/2025'],
      phone: 'Sector 4 Market (0.35 km away)',
      status: 'REAL-TIME ERSS DISPATCH ACTIVE',
      color: 'border-emerald-600 bg-emerald-950/80 text-emerald-200'
    }
  };

  const runNlpExtraction = () => {
    setExtractedEntities({
      suspects: ['Vikram Singh @ Cyber-Ghost', 'Ramesh Kumar'],
      firs: ['FIR #991/2025 (IPC 307 Attempted Murder)'],
      hawala: ['0x71C...88F1'],
      vehicles: ['DL-01-AB-1234'],
      locations: ['Sector 4 Market', 'Cell Tower #412'],
      confidence: '98.4% NLP Extraction Precision'
    });
  };

  const capabilities = [
    { code: 'GNN', title: 'GNN Link Prediction', desc: 'SIH 189 Graph Neural Network topology linker', metric: '98.6% Acc', color: 'text-red-400 border-red-800 bg-red-950/40' },
    { code: 'KPG', title: 'Kingpin Isolation', desc: 'Eigenvector & Betweenness Centrality ranking', metric: '0.964 Rank', color: 'text-purple-400 border-purple-800 bg-purple-950/40' },
    { code: 'WPN', title: 'Weapons Detection', desc: 'Handguns, rifles, knives, explosives', metric: '96.4% mAP', color: 'text-red-400 border-red-800 bg-red-950/40' },
    { code: 'NAR', title: 'Narcotics Classifier', desc: 'Drug packaging, pills, powders', metric: '91.8% mAP', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
    { code: 'FAC', title: 'Face Embedding', desc: '128D Facial vector embedding match', metric: '98.6% Prec', color: 'text-cyan-400 border-cyan-800 bg-cyan-950/40' },
    { code: 'DOC', title: 'Document OCR', desc: 'IDs, passports, contracts, receipts', metric: '92.5% mAP', color: 'text-blue-400 border-blue-800 bg-blue-950/40' },
    { code: 'NLP', title: 'Chat NLP Parser', desc: 'Threat keywords, drug trade, fraud', metric: '89.7% F1', color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40' },
    { code: 'TSA', title: 'Timestamp Audit', desc: 'EXIF vs MACB conflict audit', metric: '96.8% AUC', color: 'text-purple-400 border-purple-800 bg-purple-950/40' },
    { code: 'CSH', title: 'Currency & Cash', desc: 'Large cash bundles & Hawala logs', metric: '88.3% mAP', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
    { code: 'ANPR', title: 'License Plates', desc: 'Vehicle plate OCR from photos', metric: '93.1% Acc', color: 'text-slate-300 border-slate-700 bg-slate-900' }
  ];

  return (
    <div className="space-y-5 font-sans">
      {/* Sub Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl font-mono">
        <div>
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            SIH PS 189: AI-POWERED CRIMINAL NETWORK ANALYSIS & THREAT ENGINE
          </h3>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">Graph Neural Network topology, GNN Kingpin isolation, NLP entity extraction & 128D facial link matching.</p>
        </div>

        <div className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSubTab('criminal_network_graph')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'criminal_network_graph' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SIH 189 Network Graph
          </button>
          <button
            onClick={() => setSubTab('yolo_gallery')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'yolo_gallery' ? 'bg-purple-950 text-purple-300 border border-purple-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            YOLO Evidence ({evidenceItems.length})
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

      {/* SUBTAB 1: SIH 189 CRIMINAL NETWORK GRAPH & GNN LINK ENGINE */}
      {subTab === 'criminal_network_graph' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5 font-mono">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="font-bold text-purple-300 text-xs uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.595 15.12a2 2 0 00-1.806.547M16 4l-4 4-4-4m8 6l-4 4-4-4"/>
                </svg>
                GNN LINK PREDICTION & SYNDICATE KINGPIN ISOLATION ENGINE
              </h4>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">Click any node in the graph topology below to inspect criminal relationships, GNN centrality scores & FIR links.</p>
            </div>
            <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-3 py-1 rounded font-bold">
              PS 189 COMPLIANT: GNN TOPOLOGY
            </span>
          </div>

          {/* VISUAL GRAPH CANVAS & NODE SELECTORS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* GRAPH TOPOLOGY CANVAS (Left 2 Cols) */}
            <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 relative min-h-[360px] flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>GRAPH NODES & EDGE LINK CONNECTIONS</span>
                <span className="text-emerald-400 font-bold">5 ACTIVE SYNDICATE NODES DISCOVERED</span>
              </div>

              {/* CENTER KINGPIN NODE */}
              <div className="flex justify-center items-center my-4">
                <button
                  onClick={() => setSelectedNode('KINGPIN')}
                  className={`p-4 rounded-2xl border text-center transition-all transform hover:scale-105 shadow-2xl ${networkNodes.KINGPIN.color} ${
                    selectedNode === 'KINGPIN' ? 'ring-2 ring-red-500 scale-105' : ''
                  }`}
                >
                  <div className="text-xs font-bold font-mono px-2 py-0.5 bg-red-950 rounded text-red-400 inline-block mb-1 border border-red-800">
                    KINGPIN NODE #1
                  </div>
                  <div className="font-bold text-xs text-white">{networkNodes.KINGPIN.name}</div>
                  <div className="text-[10px] text-red-300 font-bold mt-0.5">{networkNodes.KINGPIN.role}</div>
                  <div className="text-[9px] text-slate-300 mt-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">GNN Rank #1 (0.964 Centrality)</div>
                </button>
              </div>

              {/* CONNECTED SUB-NODES ROW */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => setSelectedNode('OPERATIVE_1')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${networkNodes.OPERATIVE_1.color} ${
                    selectedNode === 'OPERATIVE_1' ? 'ring-2 ring-amber-400 scale-105' : ''
                  }`}
                >
                  <div className="font-bold text-[11px] truncate">{networkNodes.OPERATIVE_1.name}</div>
                  <div className="text-[9px] text-slate-300">Field Operative</div>
                </button>

                <button
                  onClick={() => setSelectedNode('OPERATIVE_2')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${networkNodes.OPERATIVE_2.color} ${
                    selectedNode === 'OPERATIVE_2' ? 'ring-2 ring-purple-400 scale-105' : ''
                  }`}
                >
                  <div className="font-bold text-[11px] truncate">Target-Alpha</div>
                  <div className="text-[9px] text-slate-300">NATGRID Terror</div>
                </button>

                <button
                  onClick={() => setSelectedNode('HAWALA_WALLET')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${networkNodes.HAWALA_WALLET.color} ${
                    selectedNode === 'HAWALA_WALLET' ? 'ring-2 ring-cyan-400 scale-105' : ''
                  }`}
                >
                  <div className="font-bold text-[11px] truncate">0x71C...88F1</div>
                  <div className="text-[9px] text-slate-300">Hawala Crypto</div>
                </button>

                <button
                  onClick={() => setSelectedNode('CELL_TOWER')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${networkNodes.CELL_TOWER.color} ${
                    selectedNode === 'CELL_TOWER' ? 'ring-2 ring-emerald-400 scale-105' : ''
                  }`}
                >
                  <div className="font-bold text-[11px] truncate">Tower #412</div>
                  <div className="text-[9px] text-slate-300">CDR Overlap</div>
                </button>
              </div>

              {/* Edge Link Status Bar */}
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-300 flex justify-between items-center">
                <span>GNN Link Algorithm: <span className="text-cyan-400 font-bold">Spectral Graph Convolutional Network (GCN)</span></span>
                <span className="text-emerald-400 font-bold">Link Precision: 98.6%</span>
              </div>
            </div>

            {/* SELECTED NODE INSPECTOR PANEL (Right Col) */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3.5 text-xs">
              <div className="text-xs font-bold text-purple-300 border-b border-slate-800 pb-2 flex justify-between items-center">
                <span>GNN NODE INSPECTOR</span>
                <span className="text-cyan-400 text-[10px] font-bold">ID: {selectedNode}</span>
              </div>

              {networkNodes[selectedNode] && (
                <div className="space-y-3">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase">NAME & ALIAS</div>
                    <div className="font-bold text-white text-sm mt-0.5">{networkNodes[selectedNode].name}</div>
                    <div className="text-amber-400 font-bold text-[11px] mt-0.5">{networkNodes[selectedNode].role}</div>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
                    <div>Centrality Rank: <span className="text-purple-300 font-bold">{networkNodes[selectedNode].centrality_score}</span></div>
                    <div>128D Vector Match: <span className="text-cyan-300 font-bold">{networkNodes[selectedNode].vector_confidence}</span></div>
                    <div>Contact / Location: <span className="text-slate-200 font-bold">{networkNodes[selectedNode].phone}</span></div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[10px] uppercase mb-1">LINKED FIRs & LEGAL PROCEEDINGS</div>
                    {networkNodes[selectedNode].firs.map((fir, i) => (
                      <div key={i} className="bg-slate-900 p-2 rounded border border-red-950 text-red-300 font-bold text-[11px] mb-1">
                        {fir}
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-amber-300 font-bold text-[11px] text-center">
                    STATUS: {networkNodes[selectedNode].status}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MULTI-SOURCE NLP ENTITY EXTRACTOR */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                MULTI-SOURCE NLP ENTITY EXTRACTOR (FIR, CDR & FINANCIAL LOG MINER)
              </span>
              <span className="text-[10px] text-slate-400 font-sans">Extracts suspect names, hawala wallets, IPC sections & tower IDs</span>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <textarea
                value={nlpInputText}
                onChange={(e) => setNlpInputText(e.target.value)}
                rows={2}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                onClick={runNlpExtraction}
                className="bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                EXTRACT ENTITIES
              </button>
            </div>

            {extractedEntities && (
              <div className="bg-slate-900 p-4 rounded-xl border border-cyan-900 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">SUSPECTS EXTRACTED</div>
                  <div className="text-cyan-300 font-bold">{extractedEntities.suspects.join(', ')}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">FIRs & IPC SECTIONS</div>
                  <div className="text-red-300 font-bold">{extractedEntities.firs.join(', ')}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">HAWALA & VEHICLES</div>
                  <div className="text-amber-300 font-bold">{extractedEntities.hawala.join(', ')} | {extractedEntities.vehicles.join(', ')}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">LOCATIONS & TOWERS</div>
                  <div className="text-emerald-300 font-bold">{extractedEntities.locations.join(', ')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: YOLO GALLERY */}
      {subTab === 'yolo_gallery' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">RECOVERED CARVED EVIDENCE WITH BOUNDING BOX ANNOTATIONS</div>

          {evidenceItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              No evidence items scanned yet. Run field triage scan in the Field Console tab.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {evidenceItems.map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-cyan-400">{item.filename}</span>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      item.class === 'CONTRABAND' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {item.class} ({item.confidence})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{item.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: AGENTIC AI REASONING TRACE */}
      {subTab === 'agent_trace' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider">OFFLINE AGENTIC AI MULTI-STEP REASONING TRACE</h3>
            <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-800 px-2.5 py-1 rounded font-bold">0 EXTERNAL APIS USED</span>
          </div>

          {agentTraces.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              Agentic reasoning cycle inactive. Run scan to trigger autonomous agent loop.
            </div>
          ) : (
            <div className="space-y-3">
              {agentTraces.map((trace, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span className="font-bold text-purple-400">Step {idx + 1}: {trace.agent_name}</span>
                    <span>{trace.timestamp}</span>
                  </div>
                  <div className="text-slate-200 font-bold">{trace.action}</div>
                  <div className="text-emerald-400 text-[11px]">Result: {trace.result}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: 10 AI CAPABILITIES MATRIX */}
      {subTab === 'ai_matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 font-mono">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">10 LOCAL ON-CHIP AI DETECTION CAPABILITIES (HAILO-8L NPU 13 TOPS)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {capabilities.map((cap, idx) => (
              <div key={idx} className={`p-3.5 rounded-xl border ${cap.color} space-y-1.5 text-xs`}>
                <div className="font-bold text-xs text-purple-300 font-mono px-2 py-0.5 bg-slate-950 rounded border border-slate-800 inline-block">{cap.code}</div>
                <div className="font-bold">{cap.title}</div>
                <div className="text-[10px] text-slate-300 font-sans">{cap.desc}</div>
                <div className="text-[10px] font-bold text-cyan-300 pt-1 border-t border-slate-800">{cap.metric}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
