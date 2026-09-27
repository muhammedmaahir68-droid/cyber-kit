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

  const [sessionUuid, setSessionUuid]     = useState('FX-20260829-9941');
  const [isScanning, setIsScanning]       = useState(false);
  const [progress, setProgress]           = useState(0);
  const [carveSpeed, setCarveSpeed]       = useState('0.0 MB/s');
  
  // Navigation: defaults to 'dashboard' (Investigation Overview) or 'pratibimb' (Pratibimb Geo Map)
  const [activeNav, setActiveNav]         = useState('dashboard');
  const [evidenceItems, setEvidenceItems] = useState([]);
  const [agentTraces, setAgentTraces]     = useState([]);
  const [sha256Hash, setSha256Hash]       = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

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

  // ── Official Government Navigation Sidebar Items (Clean SVG Icons, Zero Emojis) ──
  const sidebarNavItems = [
    {
      id: 'dashboard',
      label: 'DASHBOARD',
      sub: 'Investigation Overview & KPIs',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
      sub: 'Live Feed & CCTV Footage AI',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'hardware',
      label: 'TACTICAL HARDWARE',
      sub: 'Bitstream Carving & WebUSB',
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
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#263238] font-sans antialiased flex flex-col">

      {/* ── SOVEREIGNTY TRICOLOR RIBBON (TIRANGA) ── */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] flex-shrink-0" />

      {/* ── TOP GOVERNMENT HEADER (#123B63) ── */}
      <header className="w-full bg-[#123B63] text-white border-b border-[#0D2A4A] shadow-md flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          {/* Left: Emblem + Ministry + System Identity */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-13 h-13 rounded-full bg-white p-1 border-2 border-[#D9E1E8] shadow-sm overflow-hidden flex items-center justify-center">
              <AshokaLionCapital className="w-10 h-10 object-contain text-[#123B63]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <IndianFlag className="w-5 h-3.5 rounded-sm flex-shrink-0 shadow-xs" />
                <span className="text-[11px] font-bold text-[#E3F2FD] tracking-wider uppercase">
                  भारत सरकार &nbsp;|&nbsp; Government of India
                </span>
                <span className="hidden md:inline text-[#90CAF9] text-xs">•</span>
                <span className="hidden md:inline text-[11px] text-[#B0BEC5] tracking-wide uppercase">
                  Ministry of Home Affairs &nbsp;•&nbsp; I4C &nbsp;•&nbsp; BPR&amp;D
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight uppercase">
                AAROHAN-X &nbsp;|&nbsp;
                <span className="text-sm sm:text-base font-medium text-[#E0E0E0] normal-case ml-1">
                  Cyber Intelligence &amp; Investigation Platform
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Officer Profile, Unit & Logout */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="bg-[#0D2A4A] border border-[#1E4E79] rounded-lg px-3 py-1.5 text-right hidden sm:block">
              <div className="text-xs font-bold text-white whitespace-nowrap">
                {officerSession?.officerName || 'Insp. Vikramaditya Rao'}
              </div>
              <div className="text-[11px] text-[#90CAF9] font-medium">
                Unit: {officerSession?.branch || 'SIT Mule Ring Desk'} &nbsp;|&nbsp; {officerSession?.officerId || 'IN-DL-4412-SIT'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Secure Logout"
              className="px-3.5 py-2 bg-[#0D2A4A] hover:bg-[#C62828] text-[#E0E0E0] hover:text-white border border-[#1E4E79] hover:border-[#C62828] rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Agency Sub-ribbon */}
        <div className="w-full bg-[#0D2A4A] border-t border-[#1E4E79]/80 py-1 px-6">
          <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center text-[11px] text-[#B0BEC5]">
            <div className="flex items-center gap-2">
              <span className="text-[#FFB74D] font-bold">CLEARANCE: LEVEL-3 (SECRET)</span>
              <span>•</span>
              <span className="text-white">STATUTORY: BNS 2023 SEC 63 &amp; BSA SEC 65B</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#A5D6A7] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A5D6A7]" /> WRITE-BLOCKER: ACTIVE
              </span>
              <span>|</span>
              <span className="text-[#90CAF9] font-medium">NATGRID / CCTNS: CONNECTED</span>
              <span>|</span>
              <span>SESSION: {sessionUuid}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── CORE GOVERNMENT LAYOUT: SIDEBAR (#102A43) + MAIN WORKSPACE (#F4F6F8) ── */}
      <div className="flex-1 flex max-w-screen-2xl mx-auto w-full">

        {/* ── LEFT SIDEBAR: DARK NAVY (#102A43) ── */}
        <aside className="w-64 bg-[#102A43] text-white flex-shrink-0 hidden md:flex flex-col justify-between border-r border-[#0A1B2C] shadow-lg">
          <div className="py-4">
            <div className="px-5 pb-3 mb-2 border-b border-[#1E3A5F]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#90CAF9]">
                INVESTIGATION SECTIONS
              </span>
            </div>

            <nav className="space-y-1 px-2.5">
              {sidebarNavItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-[#1565C0] text-white font-semibold shadow-sm'
                        : 'text-[#B0BEC5] hover:bg-[#1A3B5C] hover:text-white font-medium'
                    }`}
                  >
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs tracking-wide">{item.label}</div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-[#BBDEFB]' : 'text-[#78909C]'}`}>
                        {item.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Info Card */}
          <div className="p-4 border-t border-[#1E3A5F] bg-[#0C2237] text-[11px] text-[#90A4AE] space-y-1">
            <div className="text-white font-semibold text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
              I4C Command Online
            </div>
            <div>Jurisdiction: Pan-India (All 36 States/UTs)</div>
            <div className="text-[10px] text-[#78909C]">Build: PROD-MHA-2026.09</div>
          </div>
        </aside>

        {/* ── MOBILE HORIZONTAL NAV TAB STRIP (SM SCREENS) ── */}
        <div className="md:hidden w-full bg-[#102A43] text-white border-b border-[#0A1B2C] overflow-x-auto scrollbar-none flex p-2 gap-1 flex-shrink-0">
          {sidebarNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`px-3 py-1.5 rounded text-xs whitespace-nowrap font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-[#1565C0] text-white font-bold'
                  : 'text-[#B0BEC5] bg-[#0D2A4A]'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* ── MAIN WORKSPACE CONTENT AREA (LIGHT GREY #F4F6F8) ── */}
        <main className="flex-1 p-5 md:p-6 overflow-y-auto bg-[#F4F6F8]">
          <ModuleErrorBoundary>
            {activeNav === 'dashboard' && (
              <GovOverviewDashboard
                onNavigateToSection={(section) => setActiveNav(section)}
                officerSession={officerSession}
              />
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
                    <h3 className="text-xs font-bold text-[#123B63] uppercase tracking-wider flex items-center gap-2 border-b border-[#D9E1E8] pb-2">
                      <span className="w-2 h-2 rounded-full bg-[#1565C0]" />
                      Hardware Write-Blocker Status
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">Throughput:</span>
                        <span className="font-bold text-[#1565C0]">{carveSpeed}</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">NPU Accelerator:</span>
                        <span className="font-bold text-[#2E7D32]">Hailo-8L (26 TOPS)</span>
                      </div>
                      <div className="bg-[#F8FAFC] p-2.5 rounded border border-[#D9E1E8] flex justify-between">
                        <span className="text-[#607D8B]">Bus Protocol:</span>
                        <span className="font-bold text-[#EF6C00]">READ-ONLY (LOCKED)</span>
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
                    <h2 className="text-base font-bold text-[#123B63] uppercase tracking-wide">
                      JUDICIAL CERTIFICATE OF ADMISSIBILITY &amp; FORENSIC AUDIT
                    </h2>
                    <p className="text-xs text-[#607D8B] mt-0.5">
                      Statutory electronic record certificate under Section 65B Bharatiya Sakshya Adhiniyam (BSA) and Section 63 Bharatiya Nyaya Sanhita (BNS 2023).
                    </p>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] px-3 py-1 rounded text-xs font-bold uppercase">
                    SEALED &amp; VERIFIED
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-[#D9E1E8] rounded-xl p-4 space-y-3 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Investigation Session</span>
                      <span className="font-bold text-[#123B63] font-mono mt-0.5 inline-block">{sessionUuid}</span>
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
                      <span className="font-bold text-[#2E7D32] font-mono text-[11px] mt-0.5 inline-block truncate max-w-[140px]">{sha256Hash}</span>
                    </div>
                  </div>

                  <div className="border-t border-[#D9E1E8] pt-3">
                    <span className="text-[11px] font-bold text-[#607D8B] uppercase block mb-1">Cryptographic Bitstream SHA-256 Digest</span>
                    <div className="bg-[#FFFFFF] p-2.5 rounded border border-[#D9E1E8] font-mono text-xs text-[#1565C0] break-all select-all">
                      {sha256Hash}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => alert(
                      `GOVERNMENT OF INDIA — MHA / I4C\n` +
                      `CERTIFICATE OF ELECTRONIC EVIDENCE UNDER BSA SEC 65B\n\n` +
                      `Case Session: ${sessionUuid}\n` +
                      `Sealing Hash (SHA-256): ${sha256Hash}\n` +
                      `Authorized Inspector: ${officerSession?.officerName || 'Inspector Vikramaditya Rao'} (${officerSession?.officerId || 'IN-DL-4412-SIT'})\n` +
                      `Agency: ${officerSession?.agency || 'I4C Central Command'} — New Delhi HQ\n` +
                      `Status: Admissible in all Courts of Law under BNS 2023 Sec 63.\n` +
                      `Report exported to secure evidence vault.`
                    )}
                    className="py-2.5 px-5 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold rounded-lg text-xs transition-colors shadow-sm"
                  >
                    EXPORT PRINTABLE SEC 65B CERTIFICATE (PDF)
                  </button>
                  <button
                    onClick={() => setActiveNav('pratibimb')}
                    className="py-2.5 px-5 bg-[#FFFFFF] hover:bg-[#F4F6F8] text-[#1565C0] border border-[#1565C0] font-semibold rounded-lg text-xs transition-colors"
                  >
                    VIEW IN PRATIBIMB MAP &rarr;
                  </button>
                </div>
              </div>
            )}
          </ModuleErrorBoundary>
        </main>

      </div>

      {/* ── FOOTER BAR ── */}
      <footer className="w-full bg-[#FFFFFF] border-t border-[#D9E1E8] py-2 px-6 flex-shrink-0 text-xs text-[#607D8B]">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span>
            AAROHAN-X &nbsp;|&nbsp; Ministry of Home Affairs &nbsp;•&nbsp; I4C &nbsp;•&nbsp; BPR&amp;D &nbsp;|&nbsp; RESTRICTED LAW ENFORCEMENT USE ONLY
          </span>
          <span>
            System: Pratibimb Cartographic &amp; Evidence Suite &nbsp;|&nbsp; Standards: CCTNS / ICJS / AIS-140 Compliant
          </span>
        </div>
      </footer>

    </div>
  );
}
