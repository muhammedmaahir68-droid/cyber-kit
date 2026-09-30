import React, { useState } from 'react';

/* ══════════════════════════════════════════════════════════════════════════
   GOVERNMENT / I4C CYBER INTELLIGENCE & INVESTIGATION DASHBOARD
   Exact ASCII Wireframe Implementation:
   - Investigation Overview with 4 KPI Cards (Active 128, Pending 43, Linked 76, Alerts 12)
   - Crime / Entity Link Analysis Interactive Graph
   - Recent Investigations Table
   - Restrained Government Styling:
     Background #F4F6F8, Cards #FFFFFF, Borders #D9E1E8, Text #263238
══════════════════════════════════════════════════════════════════════════ */

export default function GovOverviewDashboard({ onNavigateToSection, officerSession, onOpenCopilot, onCopilotQuery }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [caseFilter, setCaseFilter] = useState('ALL');
  const [copilotInput, setCopilotInput] = useState('');

  const handleCopilotSubmit = (query) => {
    const q = query || copilotInput;
    if (!q.trim()) {
      if (onOpenCopilot) onOpenCopilot();
      return;
    }
    if (onCopilotQuery) {
      onCopilotQuery(q);
    } else if (onOpenCopilot) {
      onOpenCopilot();
    }
  };

  // 4 Core KPI Summary Cards
  const kpiCards = [
    {
      id: 'active',
      title: 'ACTIVE CASES',
      count: '128',
      sub: '+14 registered this week',
      color: '#1565C0',
      badgeBg: '#E3F2FD',
      badgeColor: '#1565C0',
      icon: (
        <svg className="w-4 h-4 text-[#1565C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      id: 'pending',
      title: 'PENDING INQUIRY',
      count: '43',
      sub: 'Awaiting Bank / ISP Response',
      color: '#EF6C00',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
      icon: (
        <svg className="w-4 h-4 text-[#EF6C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'linked',
      title: 'LINKED ENTITIES',
      count: '76',
      sub: 'Mule accounts & SIM arrays',
      color: '#00897B',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
      icon: (
        <svg className="w-4 h-4 text-[#00897B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      id: 'alerts',
      title: 'CRITICAL ALERTS',
      count: '12',
      sub: 'High-value Hawala triggers',
      color: '#C62828',
      badgeBg: '#FFEBEE',
      badgeColor: '#C62828',
      icon: (
        <svg className="w-4 h-4 text-[#C62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  // Crime / Entity Link Analysis Graph Nodes & Connections
  const linkNodes = [
    { id: 'N1', name: 'Vikram Singh (Kingpin)', role: 'Syndicate Hub', x: 260, y: 70, color: '#C62828', type: 'FUGITIVE' },
    { id: 'N2', name: 'Mewat SIM Box #03', role: 'Telecom Array (320 Ports)', x: 120, y: 170, color: '#EF6C00', type: 'INFRASTRUCTURE' },
    { id: 'N3', name: 'SBI Mule A/c 38920', role: 'Karol Bagh Mule Desk', x: 260, y: 220, color: '#1565C0', type: 'BANK_ACCOUNT' },
    { id: 'N4', name: 'Jamtara Cashout Ring', role: 'ATM Phishing Group', x: 420, y: 170, color: '#00897B', type: 'MULE_RING' },
    { id: 'N5', name: 'Crypto Wallet 0x71C', role: 'Hawala P2P USDT Node', x: 480, y: 70, color: '#C62828', type: 'CRYPTO_WALLET' },
    { id: 'N6', name: 'Telegram @cyber_ghost', role: 'C2 Command Channel', x: 100, y: 70, color: '#546E7A', type: 'COMMUNICATION' },
  ];

  const linkEdges = [
    { from: 'N6', to: 'N1', label: 'C2 Channel' },
    { from: 'N1', to: 'N2', label: 'Provisions SIMs' },
    { from: 'N1', to: 'N5', label: 'Hawala Settlement' },
    { from: 'N2', to: 'N3', label: 'OTP Intercepts' },
    { from: 'N4', to: 'N3', label: 'Cash Layering' },
    { from: 'N4', to: 'N5', label: 'Crypto Cashout' },
    { from: 'N1', to: 'N4', label: 'Syndicate Command' },
  ];

  // Recent Investigations Data Table
  const recentCases = [
    {
      id: 'CY-2026-9912',
      title: 'Inter-State Hawala Extortion Ring (Cyber-Ghost)',
      type: 'HAWALA FRAUD',
      status: 'ACTIVE',
      statusClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
      suspect: 'Vikram Singh @ Cyber-Ghost',
      jurisdiction: 'PS Special Cell, New Delhi',
      amount: '₹42,50,000',
      updated: '09:42 Today'
    },
    {
      id: 'CY-2026-4412',
      title: 'Mewat Automated SIM Box Phishing Operation',
      type: 'TELECOM FRAUD',
      status: 'UNDER REVIEW',
      statusClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]',
      suspect: '320 VoIP/GSM Virtual Ports',
      jurisdiction: 'PS Cyber Nuh, Haryana STF',
      amount: '₹18,20,000',
      updated: '08:31 Today'
    },
    {
      id: 'CY-2026-8801',
      title: 'Jamtara Student Jan Dhan Mule Network',
      type: 'BANK MULE RING',
      status: 'RAID DISPATCHED',
      statusClass: 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]',
      suspect: 'Ramesh Kumar & 24 Student Mules',
      jurisdiction: 'CID Cyber HQ, Jamtara Sadar',
      amount: '₹89,40,000',
      updated: 'Yesterday'
    },
    {
      id: 'CY-2026-1022',
      title: 'Commercial KYC Identity Hijacking & Loan Fraud',
      type: 'IDENTITY THEFT',
      status: 'CHARGESHEETED',
      statusClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]',
      suspect: 'Anil S. @ KYC Master',
      jurisdiction: 'Crime Branch Unit 4, Mumbai',
      amount: '₹14,90,000',
      updated: '23 Sep 2026'
    }
  ];

  return (
    <div className="space-y-5 font-sans text-[#263238]">

      {/* ── TOP BANNER: INVESTIGATION OVERVIEW ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#123B63] uppercase tracking-wide flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1565C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            INVESTIGATION OVERVIEW
          </h2>
          <p className="text-xs text-[#607D8B] mt-0.5">
            Operational status across active FIRs, entity link graph, and inter-state jurisdictional alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#607D8B] font-medium">Session Officer:</span>
          <span className="font-bold text-[#123B63] bg-[#F4F6F8] px-2.5 py-1 rounded border border-[#D9E1E8]">
            {officerSession?.officerName || 'Insp. Vikramaditya Rao'} ({officerSession?.officerId || 'IN-DL-4412-SIT'})
          </span>
          <span className="text-[11px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded border border-[#C8E6C9]">
            NATGRID / CCTNS SYNCED
          </span>
        </div>
      </div>

      {/* ── ASK COPILOT ACTION BAR ── */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0EA5A4] flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5A4] animate-pulse"></span>
            ASK CASE COPILOT:
          </div>
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={copilotInput}
              onChange={(e) => setCopilotInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCopilotSubmit(); }}
              placeholder='Ask about a case... e.g. "Open FIR 991/2025, who is the kingpin?"'
              className="w-full text-xs md:text-sm px-3.5 py-2.5 bg-[#F8FAFC] border border-[#D9E1E8] rounded-lg text-[#263238] placeholder-[#90A4AE] focus:outline-none focus:border-[#0EA5A4] focus:ring-1 focus:ring-[#0EA5A4]"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleCopilotSubmit()}
              className="px-4 py-2.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Query AI</span>
            </button>
            <button
              onClick={() => { if (onOpenCopilot) onOpenCopilot(true); }}
              title="Speak to Copilot (Voice Mic)"
              className="px-3 py-2.5 bg-[#F0FDFD] hover:bg-[#CCFBF1] text-[#0EA5A4] border border-[#80CBC4] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zm7 9a7 7 0 01-14 0H3a9 9 0 0018 0h-2z" />
              </svg>
              <span className="hidden sm:inline">Voice</span>
            </button>
          </div>
        </div>

        {/* Quick query chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F0F4F8] text-[11px]">
          <span className="text-[#78909C] font-medium">Quick Prompts:</span>
          {[
            'Open FIR 991/2025, who is the kingpin?',
            'List missing evidence for FIR 114/2025',
            'Draft CDR request for Airtel',
            'Show SIH26150 DVR Forensics',
            'Launch SIH26152 Social Media Intelligence',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCopilotInput(prompt);
                handleCopilotSubmit(prompt);
              }}
              className="bg-[#F8FAFC] hover:bg-[#E0F2F1] text-[#455A64] hover:text-[#004D40] px-2.5 py-1 rounded-md border border-[#D9E1E8] transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4 KPI OVERVIEW CARDS (ACTIVE, PENDING, LINKED, ALERTS) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm hover:shadow transition-shadow flex flex-col justify-between min-h-[105px]"
            style={{ borderLeftWidth: '4px', borderLeftColor: kpi.color }}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-[#607D8B] uppercase tracking-wider">
                {kpi.title}
              </span>
              <span className="text-base">{kpi.icon}</span>
            </div>
            <div>
              <div
                className="text-3xl font-bold font-sans mt-1"
                style={{ color: kpi.color }}
              >
                {kpi.count}
              </div>
              <div className="text-[11px] text-[#607D8B] mt-1 font-medium">
                {kpi.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── CASE COPILOT: TOP LEADS & MISSING EVIDENCE RADAR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Top Leads Card (6 Cols) */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl shadow-sm p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-[#D9E1E8] pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E65100]"></span>
                TOP LEADS (SUSPECT RANKINGS)
              </h3>
              <p className="text-[11px] text-[#607D8B] mt-0.5">
                AI decision-support scoring based on graph centrality &amp; behavioral correlation.
              </p>
            </div>
            <span className="text-[10px] bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2] px-2 py-0.5 rounded font-bold">
              3 ACTIVE LEADS
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Lead 1 */}
            <div className="p-3 bg-[#FFFBF0] border border-[#FFCC80] rounded-lg space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#E65100] text-white px-1.5 py-0.5 rounded">#1</span>
                  <span className="font-bold text-[#263238]">FARHAN KHAN</span>
                  <span className="text-[10px] text-[#607D8B] font-mono">[FIR-991/2025]</span>
                </div>
                <span className="font-bold text-[#C62828] text-xs">87% Confidence</span>
              </div>
              <p className="text-[11px] text-[#607D8B]">
                Direct SIM registration (+91-9876543210), physical IMEI recovery at Okhla Phase-II, UPI wallet farhan@paytm.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#78909C]">Investigative lead only · Not guilty finding</span>
                <button
                  onClick={() => handleCopilotSubmit('Open FIR 991/2025, who is the kingpin?')}
                  className="text-[11px] font-semibold text-[#0EA5A4] hover:text-[#0D8A89]"
                >
                  Analyze in Copilot &rarr;
                </button>
              </div>
            </div>

            {/* Lead 2 */}
            <div className="p-3 bg-[#F8FAFC] border border-[#D9E1E8] rounded-lg space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#1565C0] text-white px-1.5 py-0.5 rounded">#2</span>
                  <span className="font-bold text-[#263238]">RAHUL VERMA (CryptoKing)</span>
                  <span className="text-[10px] text-[#607D8B] font-mono">[FIR-114/2025]</span>
                </div>
                <span className="font-bold text-[#C62828] text-xs">91% Confidence</span>
              </div>
              <p className="text-[11px] text-[#607D8B]">
                Crypto wallet 0xA3f8... linked to HDFC A/c 1122334455; ₹82 lakh deposits; 3 foreign trips matching flight manifests.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#78909C]">Interpol coordination pending</span>
                <button
                  onClick={() => handleCopilotSubmit('Who is the suspect in FIR 114/2025?')}
                  className="text-[11px] font-semibold text-[#0EA5A4] hover:text-[#0D8A89]"
                >
                  Analyze in Copilot &rarr;
                </button>
              </div>
            </div>

            {/* Lead 3 */}
            <div className="p-3 bg-[#F8FAFC] border border-[#D9E1E8] rounded-lg space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#546E7A] text-white px-1.5 py-0.5 rounded">#3</span>
                  <span className="font-bold text-[#263238]">DEEPA NAIR</span>
                  <span className="text-[10px] text-[#607D8B] font-mono">[FIR-556/2025]</span>
                </div>
                <span className="font-bold text-[#E65100] text-xs">63% Confidence</span>
              </div>
              <p className="text-[11px] text-[#607D8B]">
                Primary mule account node for Bengaluru banking trojan; ATM Koramangala cash withdrawal video verified.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#78909C]">11 associated mule accounts under review</span>
                <button
                  onClick={() => handleCopilotSubmit('Open FIR 556/2025')}
                  className="text-[11px] font-semibold text-[#0EA5A4] hover:text-[#0D8A89]"
                >
                  Analyze in Copilot &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Evidence Radar Card (6 Cols) */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl shadow-sm p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-[#D9E1E8] pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C62828] animate-pulse"></span>
                MISSING EVIDENCE RADAR
              </h3>
              <p className="text-[11px] text-[#607D8B] mt-0.5">
                Proactive evidentiary gap detection under BNSS 2023 with one-click statutory draft requests.
              </p>
            </div>
            <span className="text-[10px] bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2] px-2 py-0.5 rounded font-bold">
              4 CRITICAL GAPS
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Gap 1 */}
            <div className="p-3 bg-[#FFF8F8] border border-[#FFCDD2] rounded-lg flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#C62828] text-white px-1.5 py-0.5 rounded">HIGH</span>
                  <span className="font-bold text-[#123B63]">Airtel CDR Logs</span>
                  <span className="text-[10px] text-[#607D8B]">[FIR-991/2025]</span>
                </div>
                <p className="text-[11px] text-[#607D8B]">Call Detail Records for +91-9876543210 (Target Farhan Khan SIM)</p>
                <div className="text-[10px] text-[#78909C]">Legal Basis: Sec 94 BNSS Production Notice</div>
              </div>
              <button
                onClick={() => handleCopilotSubmit('Draft a CDR request for FIR 991/2025')}
                className="flex-shrink-0 text-xs px-2.5 py-1.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded font-semibold transition-colors"
              >
                Draft Notice
              </button>
            </div>

            {/* Gap 2 */}
            <div className="p-3 bg-[#FFF8F8] border border-[#FFCDD2] rounded-lg flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#C62828] text-white px-1.5 py-0.5 rounded">HIGH</span>
                  <span className="font-bold text-[#123B63]">Paytm Bank Statements</span>
                  <span className="text-[10px] text-[#607D8B]">[FIR-991/2025]</span>
                </div>
                <p className="text-[11px] text-[#607D8B]">Transaction ledger for A/c 9988776655 under PMLA Sec 50</p>
                <div className="text-[10px] text-[#78909C]">Legal Basis: Sec 107 BNSS Property Attachment</div>
              </div>
              <button
                onClick={() => handleCopilotSubmit('Draft a bank statement request for FIR 991/2025')}
                className="flex-shrink-0 text-xs px-2.5 py-1.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded font-semibold transition-colors"
              >
                Draft Notice
              </button>
            </div>

            {/* Gap 3 */}
            <div className="p-3 bg-[#FFFBF0] border border-[#FFE082] rounded-lg flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#E65100] text-white px-1.5 py-0.5 rounded">MEDIUM</span>
                  <span className="font-bold text-[#123B63]">Sector-15 ATM CCTV Footage</span>
                  <span className="text-[10px] text-[#607D8B]">[FIR-991/2025]</span>
                </div>
                <p className="text-[11px] text-[#607D8B]">CCTV recording of 12-Jul-2025 14:00-15:00 hrs at Noida ATM kiosk</p>
                <div className="text-[10px] text-[#78909C]">Legal Basis: Sec 94 BNSS Evidentiary Preservation</div>
              </div>
              <button
                onClick={() => handleCopilotSubmit('Draft a CCTV footage preservation notice for FIR 991/2025')}
                className="flex-shrink-0 text-xs px-2.5 py-1.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded font-semibold transition-colors"
              >
                Draft Notice
              </button>
            </div>

            {/* Gap 4: SIH26150 DVR/NVR Forensics */}
            <div className="p-3 bg-[#F8FAFC] border border-[#D9E1E8] rounded-lg flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#1565C0] text-white px-1.5 py-0.5 rounded">SIH26150</span>
                  <span className="font-bold text-[#123B63]">Multi-Vendor DVR/NVR Carve (NTRO)</span>
                </div>
                <p className="text-[11px] text-[#607D8B]">Standardized video stream extraction across Hikvision, Dahua, CP Plus &amp; Uniview</p>
                <div className="text-[10px] text-[#78909C]">Admissibility: Sec 65B BSA Cryptographic Bitstream Seal</div>
              </div>
              <button
                onClick={() => onNavigateToSection && onNavigateToSection('hardware')}
                className="flex-shrink-0 text-xs px-2.5 py-1.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded font-semibold transition-colors"
              >
                Open Carve
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── SPLIT SECTION: CRIME / ENTITY LINK ANALYSIS (LEFT 7) + STATUTORY COMPLIANCE (RIGHT 5) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT: CRIME / ENTITY LINK ANALYSIS (7 Cols) ── */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-[#D9E1E8] pb-3 mb-3">
            <div>
              <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1565C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                CRIME / ENTITY LINK ANALYSIS
              </h3>
              <p className="text-[11px] text-[#607D8B] mt-0.5">
                Multi-hop associative graph connecting Kingpins, SIM Boxes, Mule Accounts, and Cashout Points.
              </p>
            </div>
            <button
              onClick={() => onNavigateToSection && onNavigateToSection('pratibimb')}
              className="text-xs font-semibold text-[#1565C0] hover:text-[#0D47A1] bg-[#E3F2FD] px-2.5 py-1 rounded transition-colors"
            >
              Open Pratibimb Map &rarr;
            </button>
          </div>

          {/* Interactive Link Graph Canvas */}
          <div className="relative bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl h-64 overflow-hidden select-none">
            <svg viewBox="0 0 580 270" className="w-full h-full block">
              {/* Connecting Lines */}
              {linkEdges.map((edge, idx) => {
                const source = linkNodes.find(n => n.id === edge.from);
                const target = linkNodes.find(n => n.id === edge.to);
                if (!source || !target) return null;
                const isHighlighted = selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id);
                return (
                  <g key={idx}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isHighlighted ? '#1565C0' : '#B0BEC5'}
                      strokeWidth={isHighlighted ? 2.5 : 1.2}
                      strokeDasharray={isHighlighted ? 'none' : '4 3'}
                    />
                  </g>
                );
              })}

              {/* Graph Nodes */}
              {linkNodes.map((node) => {
                const isSelected = selectedNode && selectedNode.id === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(node)}
                  >
                    {isSelected && (
                      <circle r="18" fill="none" stroke={node.color} strokeWidth="2" strokeDasharray="3 2" />
                    )}
                    <circle
                      r="12"
                      fill={node.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      shadow="0 2px 4px rgba(0,0,0,0.1)"
                    />
                    <text
                      y="24"
                      textAnchor="middle"
                      fill="#263238"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {node.name.split(' ')[0]}
                    </text>
                    <text
                      y="34"
                      textAnchor="middle"
                      fill="#607D8B"
                      fontSize="7.5"
                    >
                      {node.role.slice(0, 16)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Node Tooltip Overlay */}
            {selectedNode ? (
              <div className="absolute top-2 right-2 bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg p-2.5 shadow-sm text-xs max-w-[210px]">
                <div className="flex justify-between items-center text-[10px] text-[#607D8B] font-bold uppercase">
                  <span>Selected Node</span>
                  <button onClick={() => setSelectedNode(null)} className="text-[#90A4AE] hover:text-[#263238] p-0.5 rounded hover:bg-[#F4F6F8]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="font-bold text-[#123B63] mt-1">{selectedNode.name}</div>
                <div className="text-[11px] text-[#607D8B]">{selectedNode.role}</div>
                <div className="text-[10px] font-semibold text-[#1565C0] mt-1 uppercase">Type: {selectedNode.type}</div>
              </div>
            ) : (
              <div className="absolute bottom-2 left-2 text-[10px] text-[#90A4AE] font-medium bg-[#FFFFFF]/80 px-2 py-0.5 rounded">
                Click any node to inspect relationship links
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: STATUTORY JURISDICTION & QUICK DISPATCH (5 Cols) ── */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl shadow-sm p-4 space-y-3.5">
          <div className="border-b border-[#D9E1E8] pb-2.5">
            <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1565C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              LEGAL STATUTORY COMPLIANCE
            </h3>
            <p className="text-[11px] text-[#607D8B] mt-0.5">
              Judicial mandates under Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) and BSA Sec 65B.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-[#F8FAFC] border border-[#D9E1E8] p-2.5 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-semibold text-[#263238]">Sec 94 BNSS (Production Notice)</div>
                <div className="text-[10px] text-[#607D8B]">Mandatory CDR/IPDR telecom disclosures</div>
              </div>
              <span className="text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded border border-[#C8E6C9]">
                ACTIVE
              </span>
            </div>

            <div className="bg-[#F8FAFC] border border-[#D9E1E8] p-2.5 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-semibold text-[#263238]">Sec 107 BNSS (Property Attachment)</div>
                <div className="text-[10px] text-[#607D8B]">PMLA / Mule account digital freeze</div>
              </div>
              <span className="text-[10px] font-bold bg-[#E3F2FD] text-[#1565C0] px-2 py-0.5 rounded border border-[#90CAF9]">
                4 ACCOUNTS FROZEN
              </span>
            </div>

            <div className="bg-[#F8FAFC] border border-[#D9E1E8] p-2.5 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-semibold text-[#263238]">Sec 63 BNS (Evidence Seizure)</div>
                <div className="text-[10px] text-[#607D8B]">Hardware write-blocker bitstream validation</div>
              </div>
              <span className="text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded border border-[#C8E6C9]">
                SHA-256 SEALED
              </span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => onNavigateToSection && onNavigateToSection('crossstation')}
              className="w-full py-2.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              FILE NEW INTER-STATE CASE / RUN FACE SEARCH
            </button>
          </div>
        </div>

      </div>

      {/* ── RECENT INVESTIGATIONS DATA TABLE ── */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[#D9E1E8] bg-[#F4F6F8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider">
              RECENT INVESTIGATIONS &amp; CASE REGISTRY
            </h3>
            <p className="text-[11px] text-[#607D8B] mt-0.5">
              Live updates logged across state cyber police stations and SIT hubs.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#607D8B] text-[11px] font-medium">Filter Status:</span>
            <select
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="bg-[#FFFFFF] border border-[#D9E1E8] text-[#263238] rounded-lg px-2.5 py-1 text-xs font-medium focus:outline-none focus:border-[#1565C0]"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="UNDER REVIEW">Under Review</option>
              <option value="RAID DISPATCHED">Raid Dispatched</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#607D8B] font-semibold text-[11px] uppercase border-b border-[#D9E1E8]">
              <tr>
                <th className="py-2.5 px-4">Case ID</th>
                <th className="py-2.5 px-4">Crime Category</th>
                <th className="py-2.5 px-4">Suspect / Target Infrastructure</th>
                <th className="py-2.5 px-4">Jurisdiction Station</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Last Updated</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#263238]">
              {recentCases
                .filter(c => caseFilter === 'ALL' || c.status === caseFilter)
                .map((c) => (
                  <tr key={c.id} className="hover:bg-[#F4F6F8] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#1565C0] font-mono whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#263238] whitespace-nowrap">
                      {c.type}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#455A64]">
                      {c.suspect}
                    </td>
                    <td className="py-3 px-4 text-[#607D8B] whitespace-nowrap">
                      {c.jurisdiction}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#C62828] font-mono whitespace-nowrap">
                      {c.amount}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${c.statusClass}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#607D8B] whitespace-nowrap text-[11px]">
                      {c.updated}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigateToSection && onNavigateToSection('pratibimb')}
                        className="text-[#1565C0] hover:text-[#0D47A1] font-semibold text-xs uppercase"
                      >
                        Inspect &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
