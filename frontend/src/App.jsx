import React, { useState } from 'react';
import GovOverviewDashboard from './components/GovOverviewDashboard';
import PratibimbMap from './components/PratibimbMap';
import CrossStationRegistry from './components/CrossStationRegistry';
import FieldConsole from './components/FieldConsole';
import IntelligenceCenter from './components/IntelligenceCenter';
import EmergencyMesh from './components/EmergencyMesh';
import RealtimeOpsView from './components/RealtimeOpsView';
import EdgeHardwareConsole from './components/EdgeHardwareConsole';
import GovernmentAuthPortal from './components/GovernmentAuthPortal';
import IntroSplash from './components/IntroSplash';
import CaseCopilot from './components/CaseCopilot';
import SocialMediaIntelligence from './components/SocialMediaIntelligence';
import { AshokaLionCapital, IndianFlag } from './components/NationalEmblems';

class ModuleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('[Module Error Boundary caught]:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#FFEBEE] border-2 border-[#EF5350] rounded-xl p-6 text-[#C62828] font-sans space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] animate-pulse" />
            MODULE INITIALIZATION EXCEPTION RECOVERED
          </div>
          <p className="text-xs text-[#263238]">
            An unexpected rendering exception was caught safely:
          </p>
          <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#EF9A9A] text-xs font-mono text-[#B71C1C]">
            {this.state.error?.message || 'Unknown component rendering error'}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            RE-INITIALIZE MODULE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Restore session from browser storage
  const savedSession = (() => {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem('ncis_officer_session') : null;
    if (raw) { try { return JSON.parse(raw); } catch (e) { return null; } }
    return null;
  })();

  const [appStage, setAppStage]             = useState(savedSession ? 'dashboard' : 'intro');
  const [officerSession, setOfficerSession] = useState(savedSession);

  const handleIntroDone = () => setAppStage('login');

  const handleAuthenticate = (sessionData) => {
    setOfficerSession(sessionData);
    sessionStorage.setItem('ncis_officer_session', JSON.stringify(sessionData));
    setAppStage('dashboard');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ncis_officer_session');
    setOfficerSession(null);
    setAppStage('intro');
  };

  const [sessionUuid, setSessionUuid]       = useState('FX-20260829-9941');
  const [isScanning, setIsScanning]         = useState(false);
  const [progress, setProgress]             = useState(0);
  const [carveSpeed, setCarveSpeed]         = useState('0.0 MB/s');
  
  // Navigation
  const [activeNav, setActiveNav]           = useState('dashboard');
  const [evidenceItems, setEvidenceItems]   = useState([]);
  const [agentTraces, setAgentTraces]       = useState([]);
  const [sha256Hash, setSha256Hash]         = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  // Case Copilot drawer & mobile states
  const [isCopilotOpen, setIsCopilotOpen]       = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen]       = useState(true);

  const getApiBase = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    const host = window.location.hostname;
    if (host === 'localhost' || host.startsWith('10.') || host.startsWith('192.168.') || host.startsWith('172.'))
      return `http://${host}:8000`;
    return 'https://444ef2e5cecfe1c2-157-51-88-220.serveousercontent.com';
  };

  const startScan = async () => {
    setIsScanning(true); setProgress(0); setEvidenceItems([]); setAgentTraces([]);
    const apiBase = getApiBase();
    try {
      const res = await fetch(`${apiBase}/api/v1/scan/start`, { method: 'POST' });
      if (res.ok) { const data = await res.json(); setSessionUuid(data.session_uuid); }
    } catch (e) { console.log('Backend offline — standalone scan loop'); }

    let cur = 0;
    const iv = setInterval(() => {
      cur += 5; if (cur > 100) cur = 100;
      setProgress(cur); setCarveSpeed((42 + Math.random() * 12).toFixed(1) + ' MB/s');
      if (cur === 25) setEvidenceItems(p => [...p, { filename:'CARVED_IMG_4910.JPG', type:'IMAGE', class:'CONTRABAND', confidence:'96.4%', summary:'Weapon Detected: Glock 19 (Handgun)' }]);
      else if (cur === 50) setEvidenceItems(p => [...p, { filename:'CONTRABAND_PKG.JPG', type:'IMAGE', class:'CONTRABAND', confidence:'91.8%', summary:'Narcotics Package Identified' }]);
      else if (cur === 75) setEvidenceItems(p => [...p, { filename:'SUSPECT_FACE.JPG', type:'IMAGE', class:'SUSPICIOUS', confidence:'94.2%', summary:'Suspect Face Match #2 Isolated' }]);
      else if (cur === 100) {
        clearInterval(iv); setIsScanning(false); setCarveSpeed('0.0 MB/s');
        setSha256Hash('a7b89f32c1094e82b719024f0c829e1a388172df91023812831849182390a1bc');
        setAgentTraces([
          { phase:'PERCEIVE',   step:1, thought:'Ingested 131,072 raw block sectors. Hardware write-blocker bus confirmed read-only.',    action:'Signal protocol high.' },
          { phase:'ASSESS',     step:2, thought:'Ran local Hailo NPU YOLOv8 model. 2 Contraband & 1 Suspicious item identified.',         action:'Computed bounding box tensors.' },
          { phase:'CORRELATE',  step:3, thought:'Correlated SQLite chat freelist strings with EXIF creation timestamps.',                 action:'Linked chat payload to Glock 19 image.' },
          { phase:'SYNTHESIZE', step:4, thought:'Probable cause threshold achieved (96.4% confidence).',                                  action:'Sealed SHA-256 evidence log for court presentation.' }
        ]);
      }
    }, 200);
  };

  const handleHardwareDataRetrieved = (data) => {
    if (data.hash) {
      setSha256Hash(data.hash);
    }
  };

  if (appStage === 'intro') return <IntroSplash onDone={handleIntroDone} />;
  if (appStage === 'login') return <GovernmentAuthPortal onAuthenticate={handleAuthenticate} />;

  // ── Navigation Items ──
  const sidebarNavItems = [
    {
      id: 'dashboard',
      label: 'DASHBOARD',
      sub: 'Investigation Overview & Radar',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'copilot',
      label: 'CASE COPILOT',
      sub: 'Agentic Voice & Decision Support',
      highlight: true,
      icon: (
        <svg className="w-4 h-4 text-[#0EA5A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'pratibimb',
      label: 'GEO MAP (PRATIBIMB)',
      sub: 'Criminal & Crime Infra Grid',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      id: 'crossstation',
      label: 'CASES & REGISTRY',
      sub: 'Cross-Station Suspect Match',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 'network',
      label: 'ENTITIES & NETWORK',
      sub: 'Syndicate GNN Associative Graph',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'surveillance',
      label: 'SURVEILLANCE & CAMERA',
      sub: 'SIH26150 Multi-Vendor DVR Feeds',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'hardware',
      label: 'TACTICAL HARDWARE',
      sub: 'DVR/NVR Bitstream Carving',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      id: 'patrolmesh',
      label: 'PATROL MESH (ERSS 112)',
      sub: 'AIS-140 Live Device GPS Beacon',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'forensics',
      label: 'DIGITAL FORENSICS',
      sub: 'Drive Carve & Artifact Vault',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'reports',
      label: 'JUDICIAL REPORTS',
      sub: 'BSA Sec 65B & BNS Sec 63',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'socmint',
      label: 'SOCMINT (SIH26152)',
      sub: 'Social Media & Deep OSINT',
      highlight: true,
      icon: (
        <svg className="w-4 h-4 text-[#0EA5A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#263238] font-sans antialiased flex flex-col pb-16 md:pb-0">

      {/* ── SOVEREIGNTY TRICOLOR RIBBON (TIRANGA) ── */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] flex-shrink-0" />

      {/* ── TOP HEADER (#0B1F3A Navy) ── */}
      <header className="w-full bg-[#0B1F3A] text-white border-b border-[#1E3A5F] shadow-md flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

          {/* Left: 3-Bar Sidebar Toggle + Indian Emblem + NCIS Platform Identity */}
          <div className="flex items-center gap-3 min-w-0">
            {/* 3-Bar Hamburger Toggle to Open/Close Sidebar (iOS glass style) */}
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                  setIsMobileMoreOpen(!isMobileMoreOpen);
                }
              }}
              title={isSidebarOpen ? "Collapse sidebar (Ctrl+B)" : "Open sidebar (Ctrl+B)"}
              aria-label="Toggle Navigation Sidebar"
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all flex items-center justify-center border border-white/15 shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#0EA5A4]/60"
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Authentic State Emblem of India (Ashoka Lion Capital) */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white p-1 border-2 border-[#D9E1E8] shadow-sm overflow-hidden flex items-center justify-center">
              <AshokaLionCapital className="w-10 h-10 object-contain text-[#123B63]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <IndianFlag className="w-5 h-3.5 rounded-sm flex-shrink-0 shadow-xs" />
                <span className="text-[11px] font-bold text-[#E3F2FD] tracking-wider uppercase">
                  भारत सरकार &nbsp;|&nbsp; Government of India
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight uppercase flex items-center gap-2">
                <span>NCIS</span>
                <span className="text-xs sm:text-sm font-normal text-[#B0BEC5] normal-case hidden sm:inline">
                  | Cyber Intelligence &amp; Investigation Platform
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Ask Copilot Quick Button, Officer Profile & Logout */}
          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {/* Quick Copilot Trigger in Header */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-3 py-1.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              title="Open Case Copilot AI"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zm7 9a7 7 0 01-14 0H3a9 9 0 0018 0h-2z" />
              </svg>
              <span>Copilot</span>
            </button>

            <div className="bg-[#102A43] border border-[#1E3A5F] rounded-lg px-3 py-1 text-right hidden sm:block">
              <div className="text-xs font-bold text-white whitespace-nowrap">
                {officerSession?.officerName || 'Insp. Vikramaditya Rao'}
              </div>
              <div className="text-[10px] text-[#90CAF9]">
                {officerSession?.branch || 'SIT Mule Ring Desk'} · {officerSession?.officerId || 'IN-DL-4412-SIT'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Secure Logout"
              className="px-3 py-1.5 bg-[#102A43] hover:bg-[#DC2626] text-[#E0E0E0] hover:text-white border border-[#1E3A5F] hover:border-[#DC2626] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>

        {/* System Sub-ribbon */}
        <div className="w-full bg-[#071326] border-t border-[#1E3A5F] py-1 px-4 sm:px-6">
          <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center text-[11px] text-[#90A4AE]">
            <div className="flex items-center gap-2">
              <span className="text-[#F59E0B] font-bold">SYNTHETIC EVIDENCE MODE</span>
              <span>•</span>
              <span className="text-[#E0E0E0]">STATUTORY COMPLIANCE: BNS 2023 SEC 63 &amp; BSA SEC 65B</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> WRITE-BLOCKER: ACTIVE
              </span>
              <span>|</span>
              <span className="text-[#0EA5A4] font-medium">SIH26150 DVR ENGINE: READY</span>
              <span>|</span>
              <span>SESSION: {sessionUuid}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── CORE LAYOUT: SIDEBAR (#0B1F3A) + MAIN WORKSPACE (#F4F6F9) ── */}
      <div className="flex-1 flex max-w-screen-2xl mx-auto w-full relative">

        {/* ── DESKTOP SIDEBAR: EXPANDABLE / COLLAPSIBLE WITH SMOOTH TRANSITION ── */}
        <aside
          className={`bg-[#0B1F3A] text-white flex-shrink-0 hidden md:flex flex-col justify-between border-r border-[#1E3A5F] shadow-2xl transition-all duration-300 ease-in-out ${
            isSidebarOpen
              ? (isSidebarCollapsed ? 'w-20 opacity-100' : 'w-64 opacity-100')
              : 'w-0 overflow-hidden border-r-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-4">
            <div className="px-4 pb-3 mb-2 border-b border-[#1E3A5F] flex items-center justify-between">
              {!isSidebarCollapsed && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#90CAF9]">
                  INVESTIGATION MODULES
                </span>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                className="p-1 rounded text-[#90CAF9] hover:bg-[#1E3A5F] hover:text-white mx-auto transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isSidebarCollapsed ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  )}
                </svg>
              </button>
            </div>

            <nav className="space-y-1 px-2.5">
              {sidebarNavItems.map((item) => {
                const isActive = activeNav === item.id;
                const isHighlight = item.highlight;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'copilot') {
                        setIsCopilotOpen(true);
                      } else {
                        setActiveNav(item.id);
                      }
                    }}
                    title={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-[#1D4ED8] text-white font-semibold shadow-sm'
                        : isHighlight
                        ? 'bg-[#0EA5A4]/15 text-[#0EA5A4] hover:bg-[#0EA5A4]/25 font-semibold'
                        : 'text-[#B0BEC5] hover:bg-[#102A43] hover:text-white font-medium'
                    }`}
                  >
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    {!isSidebarCollapsed && (
                      <div className="min-w-0">
                        <div className="text-xs tracking-wide">{item.label}</div>
                        <div className={`text-[10px] truncate ${isActive ? 'text-[#BFDBFE]' : isHighlight ? 'text-[#0EA5A4]' : 'text-[#78909C]'}`}>
                          {item.sub}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Info Card */}
          {!isSidebarCollapsed && (
            <div className="p-3.5 border-t border-[#1E3A5F] bg-[#071326] text-[11px] text-[#90A4AE] space-y-1">
              <div className="text-white font-semibold text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                Forensic Hub Online
              </div>
              <div>SIH26150 NTRO Surveillance Suite</div>
              <div className="text-[10px] text-[#78909C]">Build: PROD-2026.09 (Demo)</div>
            </div>
          )}
        </aside>

        {/* ── MAIN WORKSPACE CONTENT AREA (#F4F6F9) ── */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#F4F6F9]">
          <ModuleErrorBoundary>
            {activeNav === 'dashboard' && (
              <GovOverviewDashboard
                onNavigateToSection={(section) => setActiveNav(section)}
                officerSession={officerSession}
                onOpenCopilot={() => setIsCopilotOpen(true)}
                onCopilotQuery={(query) => {
                  setIsCopilotOpen(true);
                }}
              />
            )}

            {activeNav === 'copilot' && (
              <div className="h-[calc(100vh-140px)]">
                <CaseCopilot isPanel={false} />
              </div>
            )}

            {activeNav === 'pratibimb' && (
              <PratibimbMap officerSession={officerSession} />
            )}

            {activeNav === 'crossstation' && (
              <CrossStationRegistry officerSession={officerSession} />
            )}

            {activeNav === 'network' && (
              <IntelligenceCenter
                evidenceItems={evidenceItems}
                agentTraces={agentTraces}
                officerSession={officerSession}
              />
            )}

            {activeNav === 'surveillance' && (
              <RealtimeOpsView
                getApiBase={getApiBase}
                officerSession={officerSession}
              />
            )}

            {activeNav === 'hardware' && (
              <EdgeHardwareConsole
                officerSession={officerSession}
                onDataRetrieved={handleHardwareDataRetrieved}
              />
            )}

            {activeNav === 'patrolmesh' && (
              <EmergencyMesh officerSession={officerSession} />
            )}

            {activeNav === 'forensics' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <FieldConsole
                    isScanning={isScanning}
                    progress={progress}
                    carveSpeed={carveSpeed}
                    sessionUuid={sessionUuid}
                    sha256Hash={sha256Hash}
                    onStartScan={startScan}
                    officerSession={officerSession}
                  />
                </div>
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm space-y-3">
                    <h3 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-2 border-b border-[#D9E1E8] pb-2">
                      <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                      Hardware Write-Blocker Status
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">Throughput:</span>
                        <span className="font-bold text-[#1D4ED8]">{carveSpeed}</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">NPU Accelerator:</span>
                        <span className="font-bold text-[#16A34A]">Hailo-8L (26 TOPS)</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">SIH26150 Multi-Vendor:</span>
                        <span className="font-bold text-[#0EA5A4]">Dahua/Hikvision/CP Plus</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">Bus Protocol:</span>
                        <span className="font-bold text-[#F59E0B]">READ-ONLY (LOCKED)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeNav === 'reports' && (
              <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-6 shadow-sm space-y-5">
                <div className="flex justify-between items-start border-b border-[#D9E1E8] pb-4">
                  <div>
                    <h2 className="text-base font-bold text-[#0B1F3A] uppercase tracking-wide">
                      JUDICIAL CERTIFICATE OF ADMISSIBILITY &amp; FORENSIC AUDIT
                    </h2>
                    <p className="text-xs text-[#607D8B] mt-0.5">
                      Statutory electronic record certificate under Section 65B Bharatiya Sakshya Adhiniyam (BSA) and Section 63 Bharatiya Nyaya Sanhita (BNS 2023).
                    </p>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#16A34A] border border-[#C8E6C9] px-3 py-1 rounded text-xs font-bold uppercase">
                    SEALED &amp; VERIFIED
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-[#D9E1E8] rounded-xl p-4 space-y-3 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Investigation Session</span>
                      <span className="font-bold text-[#0B1F3A] font-mono mt-0.5 inline-block">{sessionUuid}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Certifying Officer</span>
                      <span className="font-bold text-[#263238] mt-0.5 inline-block">{officerSession?.officerName || 'Inspector Vikramaditya Rao'}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Designation / Station</span>
                      <span className="font-medium text-[#607D8B] mt-0.5 inline-block">{officerSession?.branch || 'SIT Mule Ring Desk'}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Digital Vault Hash</span>
                      <span className="font-bold text-[#16A34A] font-mono text-[11px] mt-0.5 inline-block truncate max-w-[140px]">{sha256Hash}</span>
                    </div>
                  </div>

                  <div className="border-t border-[#D9E1E8] pt-3">
                    <span className="text-[11px] font-bold text-[#607D8B] uppercase block mb-1">Cryptographic Bitstream SHA-256 Digest</span>
                    <div className="bg-[#FFFFFF] p-2.5 rounded border border-[#D9E1E8] font-mono text-xs text-[#1D4ED8] break-all select-all">
                      {sha256Hash}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => alert(
                      `NCIS TACTICAL EVIDENCE SUITE\n` +
                      `CERTIFICATE OF ELECTRONIC EVIDENCE UNDER BSA SEC 65B\n\n` +
                      `Case Session: ${sessionUuid}\n` +
                      `Sealing Hash (SHA-256): ${sha256Hash}\n` +
                      `Authorized Inspector: ${officerSession?.officerName || 'Inspector Vikramaditya Rao'} (${officerSession?.officerId || 'IN-DL-4412-SIT'})\n` +
                      `Agency: ${officerSession?.agency || 'Cyber Investigation Division'}\n` +
                      `Status: Admissible in all Courts of Law under BNS 2023 Sec 63.\n` +
                      `Report exported to secure evidence vault.`
                    )}
                    className="py-2.5 px-5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold rounded-lg text-xs transition-colors shadow-sm"
                  >
                    EXPORT PRINTABLE SEC 65B CERTIFICATE (PDF)
                  </button>
                  <button
                    onClick={() => setActiveNav('pratibimb')}
                    className="py-2.5 px-5 bg-[#FFFFFF] hover:bg-[#F4F6F9] text-[#1D4ED8] border border-[#1D4ED8] font-semibold rounded-lg text-xs transition-colors"
                  >
                    VIEW IN PRATIBIMB MAP &rarr;
                  </button>
                </div>
              </div>
            )}

            {activeNav === 'socmint' && (
              <SocialMediaIntelligence officerSession={officerSession} />
            )}
          </ModuleErrorBoundary>
        </main>

        {/* ── COPILOT RIGHT SLIDE-OUT PANEL ── */}
        {isCopilotOpen && (
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] md:w-[500px] shadow-2xl bg-white border-l border-[#D9E1E8] flex flex-col animate-in slide-in-from-right duration-200">
            <CaseCopilot onClose={() => setIsCopilotOpen(false)} isPanel={true} />
          </div>
        )}

      </div>

      {/* ── FLOATING SIRI GLOWING ORB / COPILOT TRIGGER (APPLE INTELLIGENCE STYLE) ── */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center">
        <button
          onClick={() => setIsCopilotOpen(!isCopilotOpen)}
          title="Open Case Copilot (Voice & Agentic AI)"
          aria-label="Open Case Copilot"
          className="relative w-14 h-14 rounded-full p-[2.5px] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none group shadow-2xl"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #5EEAD4 0deg, #0EA5A4 110deg, #1D4ED8 230deg, #38BDF8 320deg, #5EEAD4 360deg)',
            boxShadow: '0 8px 32px rgba(14, 165, 164, 0.45), 0 0 24px rgba(29, 78, 216, 0.35)'
          }}
        >
          {/* Pulsing blurred ambient glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0EA5A4] via-[#38BDF8] to-[#1D4ED8] opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />

          {/* Inner glass core */}
          <div className="relative w-full h-full rounded-full bg-[#0B1F3A]/90 backdrop-blur-xl flex items-center justify-center border border-white/25 text-white overflow-hidden">
            {/* Spinning iridescent overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0EA5A4]/40 via-transparent to-[#38BDF8]/30 animate-spin" style={{ animationDuration: '9s' }} />

            {/* Mic / Waveform icon */}
            <svg className="w-6 h-6 text-white relative z-10 transition-transform group-hover:scale-115 drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>

            {/* Online verified indicator badge */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#16A34A] border-2 border-[#0B1F3A] shadow-sm z-20" />
          </div>
        </button>
      </div>

      {/* ── MOBILE BOTTOM TAB BAR (SM SCREENS) ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B1F3A] border-t border-[#1E3A5F] z-40 flex justify-around items-center py-2 px-1">
        {/* Tab 1: Home */}
        <button
          onClick={() => setActiveNav('dashboard')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            activeNav === 'dashboard' ? 'text-[#0EA5A4]' : 'text-[#90CAF9]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </button>

        {/* Tab 2: Map */}
        <button
          onClick={() => setActiveNav('pratibimb')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            activeNav === 'pratibimb' ? 'text-[#0EA5A4]' : 'text-[#90CAF9]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>Map</span>
        </button>

        {/* Tab 3: Cases */}
        <button
          onClick={() => setActiveNav('crossstation')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
            activeNav === 'crossstation' ? 'text-[#0EA5A4]' : 'text-[#90CAF9]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Cases</span>
        </button>

        {/* Tab 4: Copilot */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[11px] font-bold text-[#0EA5A4]"
        >
          <div className="w-6 h-6 rounded-full bg-[#0EA5A4] text-white flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3zm7 9a7 7 0 01-14 0H3a9 9 0 0018 0h-2z" />
            </svg>
          </div>
          <span>Copilot</span>
        </button>

        {/* Tab 5: More */}
        <button
          onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium text-[#90CAF9]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>More</span>
        </button>
      </div>

      {/* ── MOBILE MORE MODAL ── */}
      {isMobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex flex-col justify-end p-4 animate-in fade-in">
          <div className="bg-[#FFFFFF] rounded-2xl p-4 space-y-3 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#D9E1E8] pb-2">
              <span className="font-bold text-sm text-[#0B1F3A]">All Investigation Modules</span>
              <button onClick={() => setIsMobileMoreOpen(false)} className="p-1 text-[#607D8B]">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {sidebarNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'copilot') {
                      setIsCopilotOpen(true);
                    } else {
                      setActiveNav(item.id);
                    }
                    setIsMobileMoreOpen(false);
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 ${
                    activeNav === item.id ? 'bg-[#1D4ED8] text-white' : 'bg-[#F8FAFC] border-[#D9E1E8] text-[#263238]'
                  }`}
                >
                  <div className="font-bold">{item.label}</div>
                  <div className={`text-[10px] truncate ${activeNav === item.id ? 'text-[#BFDBFE]' : 'text-[#78909C]'}`}>
                    {item.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER BAR ── */}
      <footer className="w-full bg-[#FFFFFF] border-t border-[#D9E1E8] py-2 px-6 flex-shrink-0 text-xs text-[#607D8B] hidden md:block">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span>
            NCIS – Cyber Intelligence &amp; Investigation Platform | Case Copilot Voice Decision Support
          </span>
          <div className="flex items-center gap-3">
            <span>SIH26150 Multi-Vendor DVR/NVR Forensics (NTRO) | BSA Sec 65B</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
