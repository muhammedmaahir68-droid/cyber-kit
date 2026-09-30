import React, { useState } from 'react';

const MOCK_SOCIAL_FEEDS = [
  {
    id: 'FEED-8901',
    platform: 'Telegram',
    handle: '@DarkWebNCR_Leaks',
    channel: 'Delhi Mule & Crypto Exchange [Private Group]',
    timestamp: '2 mins ago',
    category: 'Cyber Fraud & Mule Network',
    severity: 'CRITICAL',
    threatScore: 94,
    language: 'Hinglish / Hindi',
    content: 'Urgent requirement 15 fresh Current Accounts (ICICI/HDFC) for daily IMPS inward. 10% instant commission. DM @Shadow_Operator_X. No police freeze guarantee.',
    entities: {
      phone: '+91-9811223344',
      upi: 'mulefast@paytm',
      cryptoWallet: '0x71C94...88F1',
      linkedSuspect: 'Vikram Singh @ Cyber-Ghost (FIR #991/2025)'
    },
    cibRisk: 'High (Bot swarm active across 8 cloned channels)',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'FEED-8902',
    platform: 'X / Twitter',
    handle: '@SecNotice_Alert',
    channel: 'Public Trend Spreading',
    timestamp: '7 mins ago',
    category: 'Disinformation & Coordinated Botnet',
    severity: 'HIGH',
    threatScore: 88,
    language: 'English',
    content: 'BREAKING: National Banking servers under major DDoS attack! Withdraw your funds immediately from UPI ATMs! #BankCrash #CyberAlertIndia',
    entities: {
      botSwarmId: 'BOTNET-ALPHA-44',
      amplificationRate: '1,420 retweets/min',
      originGeo: 'Cross-Border Proxy IP (Tor Exit Node)',
      linkedSuspect: 'Unauthenticated Bot Fleet'
    },
    cibRisk: 'CRITICAL (Coordinated Inauthentic Behavior: 92% synthetic velocity)',
    status: 'TAKEDOWN_QUEUED'
  },
  {
    id: 'FEED-8903',
    platform: 'DarkWeb / Pastebin',
    handle: 'Dump#4092_Raw',
    channel: 'Onion Hidden Service: http://mulehub247...onion',
    timestamp: '15 mins ago',
    category: 'Extortion & Data Leak',
    severity: 'CRITICAL',
    threatScore: 96,
    language: 'English / Hex',
    content: 'Government e-Portal KYC scrap: 42,000 Aadhaar-linked OTP logs and bank statements uploaded. Sample download link available for 0.5 BTC.',
    entities: {
      cryptoWallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      hashMatch: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      linkedSuspect: 'Ramesh Kumar @ Chhotu (NCRB-IND-2024-33102)'
    },
    cibRisk: 'High (Paste cloned across 14 mirrors)',
    status: 'SEIZED_PRESERVED'
  },
  {
    id: 'FEED-8904',
    platform: 'Instagram',
    handle: '@Vip_ExamPaper_Leak2026',
    channel: 'Direct Messaging Broadcast Channel',
    timestamp: '28 mins ago',
    category: 'Exam Paper Leak & Scams',
    severity: 'HIGH',
    threatScore: 82,
    language: 'Hindi',
    content: 'कल का प्रश्न पत्र 100% लीक उत्तर कुंजी के साथ उपलब्ध है। सिर्फ 5000 रुपये एडवांस। व्हाट्सएप पर तुरंत संपर्क करें +91-9876543210.',
    entities: {
      phone: '+91-9876543210',
      upi: 'farhan@paytm',
      linkedSuspect: 'Farhan Khan (FIR-991/2025 Lead)'
    },
    cibRisk: 'Medium (Automated follow bot detected)',
    status: 'ACTIVE_MONITORING'
  },
  {
    id: 'FEED-8905',
    platform: 'WhatsApp Freelist',
    handle: 'Channel_ID: 919988776655-group',
    channel: 'Hawala Operators Northern Grid',
    timestamp: '42 mins ago',
    category: 'Hawala & Money Laundering',
    severity: 'CRITICAL',
    threatScore: 91,
    language: 'Gujarati / Hindi',
    content: 'Code: GOLD-44. Token delivery 25 Lakhs cash at Chandni Chowk metro gate 3 today 5:00 PM. Verification bearer note serial number ending 8912.',
    entities: {
      phone: '+91-9988776655',
      tokenNote: 'Serial #8912',
      linkedSuspect: 'Deepa Nair / Mule Account Network'
    },
    cibRisk: 'Encrypted peer-to-peer syndicate broadcast',
    status: 'DISPATCH_LINKED'
  }
];

export default function SocialMediaIntelligence({ officerSession }) {
  const [activeTab, setActiveTab] = useState('threat-stream'); // 'threat-stream' | 'persona-unmask' | 'cib-botnet' | 'deepfake' | 'statutory'
  const [selectedFeed, setSelectedFeed] = useState(MOCK_SOCIAL_FEEDS[0]);
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [searchHandle, setSearchHandle] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [unmaskResult, setUnmaskResult] = useState(null);
  const [preservationNotice, setPreservationNotice] = useState(null);
  const [deepfakeResult, setDeepfakeResult] = useState(null);

  // Platform Filter
  const filteredFeeds = MOCK_SOCIAL_FEEDS.filter(item => {
    if (platformFilter === 'ALL') return true;
    return item.platform.toLowerCase().includes(platformFilter.toLowerCase());
  });

  // Handle Search & Unmasking simulation
  const handleUnmaskSearch = (e) => {
    e.preventDefault();
    if (!searchHandle.trim()) return;
    setIsScanning(true);
    setUnmaskResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setUnmaskResult({
        handle: searchHandle.trim(),
        confidenceScore: 98.4,
        realIdentity: 'Vikram Singh @ Vicky (Alias: Cyber-Ghost)',
        citizenshipId: 'Aadhaar Ref: XXXX-XXXX-4412 (Registered Mewat/Gurugram)',
        telecomNumber: '+91-9811223344 (Airtel SIM registered in Alwar)',
        hardwareImei: '354678891234567 (Xiaomi Redmi Note 12 - Geotagged Sector 4)',
        cryptoAddress: '0x71C94056bcDb39C8Ff88F1 (Balance: ₹42.5 Lakhs Tether)',
        correlatedPlatforms: [
          { platform: 'Telegram', handle: '@Shadow_Operator_X', status: 'Active (Last seen 12m ago)' },
          { platform: 'Instagram', handle: '@vicky_kingpin_delhi', status: 'Private Profile (14k followers)' },
          { platform: 'DarkWeb BreachForums', handle: 'GhostNet_IN', status: 'VIP Seller rank (Rep: +340)' },
          { platform: 'GitHub', handle: 'vicky-dev-mule', status: 'Script repository containing auto-crypto router' }
        ],
        stylometricFingerprint: {
          vocabularyMatch: '96.2% phraseology similarity to FIR 991/2025 ransom note',
          typingCadence: 'IST Peak Activity (11:00 PM – 4:00 AM)',
          slangTokens: ['IMPS inward', 'freeze safe', 'token note', 'hawala router']
        }
      });
    }, 1200);
  };

  // Generate Section 79(3)(b) & BNSS 94 Preservation Notice
  const handleGenerateNotice = (feed) => {
    const timestamp = new Date().toISOString();
    const noticeHash = `SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setPreservationNotice({
      noticeId: `LE-SOCMINT-${Date.now().toString().slice(-6)}`,
      timestamp,
      platform: feed.platform,
      targetHandle: feed.handle,
      offense: feed.category,
      statutoryLegalBasis: 'Section 79(3)(b) Information Technology Act 2000 r/w Section 94 Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)',
      evidenceHash: noticeHash,
      officer: officerSession?.officerName || 'Insp. Vikramaditya Rao (IN-DL-4412-SIT)',
      agency: 'Cyber Crime Investigation Division, Special Cell'
    });
  };

  // Simulate Deepfake Analysis
  const handleAnalyzeDeepfake = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDeepfakeResult({
        mediaType: 'Video & Audio Stream (Viral Political / Threat Clip)',
        deepfakeConfidence: 96.8,
        classification: 'SYNTHETIC AUDIO & GAN FACIAL SWAP DETECTED',
        manipulationIndicators: [
          'Unnatural eye blink interval (0.2 blinks/min vs normal 15-20 blinks/min)',
          'High-frequency facial boundary artifacts in cheek and jawline vectors',
          'Voice spectrogram reveals non-human acoustic pitch flatlines (ElevenLabs clone v2)',
          'Metadata discrepancy: Original camera EXIF stripped; re-rendered with FFmpeg NVENC'
        ],
        verdict: 'MANIPULATED / FABRICATED EVIDENCE (INADMISSIBLE UNDER BSA SEC 65B)'
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* ── Top SOCMINT Header Banner ── */}
      <div className="bg-[#0B1F3A] border border-[#1E3A5F] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#0EA5A4]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5A4] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#102A43] text-[#0EA5A4] border border-[#0EA5A4]/40 px-2 py-0.5 rounded">
                SIH26152 PROBLEM STATEMENT INNOVATION
              </span>
              <span className="text-[10px] font-semibold bg-[#1D4ED8] text-white px-2 py-0.5 rounded">
                SOCMINT &amp; OSINT ENGINE
              </span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Social Media Intelligence &amp; Deep OSINT Analytics Platform
            </h1>
            
            <p className="text-xs text-[#90CAF9] max-w-3xl mt-1 leading-relaxed">
              Automated cross-platform handle correlation, Telegram illicit syndicate crawling, dark web breach scraping, 
              stylometric linguistic profiling, and statutory notice drafting under IT Act Sec 79(3)(b) &amp; BNSS Sec 94.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 bg-[#071326]/80 border border-[#1E3A5F] p-3 rounded-xl backdrop-blur-md flex-shrink-0">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#90CAF9]">Monitored Feeds</div>
              <div className="text-base font-black text-[#0EA5A4]">1,420+ Groups</div>
            </div>
            <div className="w-px h-8 bg-[#1E3A5F]" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#90CAF9]">Unmask Accuracy</div>
              <div className="text-base font-black text-[#16A34A]">98.4%</div>
            </div>
            <div className="w-px h-8 bg-[#1E3A5F]" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#90CAF9]">Bot Detection</div>
              <div className="text-base font-black text-[#F59E0B]">&lt;1.2s</div>
            </div>
          </div>
        </div>

        {/* ── Sub Navigation Tabs ── */}
        <div className="flex items-center gap-2 mt-5 border-t border-[#1E3A5F] pt-3 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveTab('threat-stream')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'threat-stream'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'text-[#90CAF9] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📡 Live Threat Stream</span>
            <span className="bg-[#EF4444] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">5 ALERTS</span>
          </button>

          <button
            onClick={() => setActiveTab('persona-unmask')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'persona-unmask'
                ? 'bg-[#0EA5A4] text-white shadow-md'
                : 'text-[#90CAF9] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🔍 Persona Unmasker &amp; Stylometry</span>
          </button>

          <button
            onClick={() => setActiveTab('cib-botnet')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cib-botnet'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'text-[#90CAF9] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🤖 CIB &amp; Botnet Swarm Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('deepfake')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'deepfake'
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'text-[#90CAF9] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎭 Deepfake &amp; Synthetic Media</span>
          </button>

          <button
            onClick={() => setActiveTab('statutory')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'statutory'
                ? 'bg-[#16A34A] text-white shadow-md'
                : 'text-[#90CAF9] hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📜 Statutory Notices &amp; BSA 65B Seal</span>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* TAB 1: LIVE THREAT STREAM & SOCMINT RADAR                   */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === 'threat-stream' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Feed List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-[#D9E1E8] rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A] flex items-center gap-2">
                  <span>Monitored Dark Social &amp; OSINT Feeds</span>
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                </h3>
                <p className="text-[11px] text-[#607D8B]">Continuous multi-lingual keyword scraping across Telegram, DarkWeb, X &amp; WhatsApp</p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 bg-[#F4F6F9] p-1 rounded-lg border border-[#D9E1E8] text-[11px] font-semibold">
                {['ALL', 'Telegram', 'X / Twitter', 'DarkWeb', 'WhatsApp'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPlatformFilter(p)}
                    className={`px-2 py-0.5 rounded transition-all ${
                      platformFilter === p ? 'bg-[#0B1F3A] text-white' : 'text-[#607D8B] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Feed Cards */}
            <div className="space-y-3">
              {filteredFeeds.map(feed => (
                <div
                  key={feed.id}
                  onClick={() => setSelectedFeed(feed)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                    selectedFeed?.id === feed.id
                      ? 'border-[#0EA5A4] shadow-md ring-2 ring-[#0EA5A4]/20'
                      : 'border-[#D9E1E8] hover:border-[#90CAF9] hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        feed.platform === 'Telegram' ? 'bg-[#E1F5FE] text-[#0288D1]' :
                        feed.platform.includes('Twitter') ? 'bg-[#EDE7F6] text-[#5E35B1]' :
                        feed.platform.includes('DarkWeb') ? 'bg-[#263238] text-white' :
                        'bg-[#E8F5E9] text-[#2E7D32]'
                      }`}>
                        {feed.platform}
                      </span>
                      <span className="font-bold text-xs text-[#0B1F3A]">{feed.handle}</span>
                      <span className="text-[10px] text-[#90A4AE]">• {feed.timestamp}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      feed.severity === 'CRITICAL' ? 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]' :
                      'bg-[#FFF3E0] text-[#E65100] border border-[#FFE0B2]'
                    }`}>
                      {feed.severity} • {feed.threatScore}% THREAT
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-[#1D4ED8] mb-1.5">{feed.channel}</div>

                  <p className="text-xs text-[#263238] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0] font-mono leading-relaxed">
                    "{feed.content}"
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-[#546E7A] gap-2 pt-2 border-t border-[#F1F5F9]">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#1E3A5F]">Category:</span>
                      <span className="font-bold text-[#0B1F3A]">{feed.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#0EA5A4] font-bold">Unmasked Link:</span>
                      <span className="font-mono text-[#0B1F3A] font-semibold">{feed.entities.linkedSuspect}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Feed Deep Dossier & Actions */}
          <div className="lg:col-span-5 space-y-4">
            {selectedFeed ? (
              <div className="bg-white border border-[#D9E1E8] rounded-xl p-5 shadow-sm space-y-4 sticky top-4">
                <div className="flex items-center justify-between border-b border-[#D9E1E8] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0EA5A4] bg-[#E0F2F1] px-2 py-0.5 rounded">
                      OSINT INCIDENT DOSSIER
                    </span>
                    <h3 className="text-base font-bold text-[#0B1F3A] mt-1">
                      {selectedFeed.handle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#BFDBFE]">
                    {selectedFeed.id}
                  </span>
                </div>

                {/* Threat Indicators */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#D9E1E8]">
                    <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Platform Channel</span>
                    <span className="font-bold text-[#0B1F3A] text-xs">{selectedFeed.channel}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#D9E1E8]">
                    <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Detected Language</span>
                    <span className="font-bold text-[#0B1F3A] text-xs">{selectedFeed.language}</span>
                  </div>
                </div>

                {/* Correlated Entities */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-[#0B1F3A] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                    Extracted Telecom &amp; Financial Entities
                  </h4>
                  
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#D9E1E8] space-y-2 font-mono text-[11px]">
                    {selectedFeed.entities.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#607D8B]">Target MSISDN:</span>
                        <span className="font-bold text-[#0B1F3A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">{selectedFeed.entities.phone}</span>
                      </div>
                    )}
                    {selectedFeed.entities.upi && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#607D8B]">Mule UPI VPA:</span>
                        <span className="font-bold text-[#0EA5A4] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">{selectedFeed.entities.upi}</span>
                      </div>
                    )}
                    {selectedFeed.entities.cryptoWallet && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#607D8B]">Crypto Ledger:</span>
                        <span className="font-bold text-[#D97706] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">{selectedFeed.entities.cryptoWallet}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-1 border-t border-[#E2E8F0]">
                      <span className="text-[#607D8B]">Syndicate Kingpin:</span>
                      <span className="font-bold text-[#DC2626] bg-[#FFEBEE] px-2 py-0.5 rounded">{selectedFeed.entities.linkedSuspect}</span>
                    </div>
                  </div>
                </div>

                {/* Coordinated Inauthentic Behavior Analysis */}
                <div className="bg-[#FEF3C7] border border-[#FDE68A] p-3 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-[#92400E] flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>CIB &amp; Bot Amplification Radar:</span>
                  </div>
                  <p className="text-[#B45309] text-[11px]">
                    {selectedFeed.cibRisk}
                  </p>
                </div>

                {/* Action Controls */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setSearchHandle(selectedFeed.handle);
                      setActiveTab('persona-unmask');
                    }}
                    className="w-full py-2 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Unmask Persona Across 8 Platforms</span>
                  </button>

                  <button
                    onClick={() => {
                      handleGenerateNotice(selectedFeed);
                      setActiveTab('statutory');
                    }}
                    className="w-full py-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Draft IT Act Sec 79(3)(b) Notice (5s)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#D9E1E8] rounded-xl p-8 text-center text-xs text-[#607D8B]">
                Select a threat feed to inspect full OSINT analysis.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* TAB 2: CROSS-PLATFORM PERSONA UNMASKER & STYLOMETRY        */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === 'persona-unmask' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#D9E1E8] rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0EA5A4] bg-[#E0F2F1] px-2 py-0.5 rounded">
                AI STYLOMETRIC &amp; AVATAR MATCH ENGINE
              </span>
              <h2 className="text-lg font-bold text-[#0B1F3A] mt-1">
                Cross-Platform Anonymous Persona Unmasker
              </h2>
              <p className="text-xs text-[#607D8B]">
                Enter any social media handle, alias, or email to correlate avatar hashes (pHash), stylometric sentence structures, 
                posting timestamps, and dark web breach credentials into a single unified Aadhaar/FIR record.
              </p>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleUnmaskSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchHandle}
                  onChange={(e) => setSearchHandle(e.target.value)}
                  placeholder="Enter alias or handle (e.g. @Shadow_Operator_X, @DarkWebNCR, @Vicky_Ghost)..."
                  className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs text-[#0B1F3A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0EA5A4]"
                />
              </div>
              <button
                type="submit"
                disabled={isScanning}
                className="px-5 py-2.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 flex-shrink-0"
              >
                {isScanning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Correlating 8 Platforms...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Run Deep Unmasking Scan</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Handles */}
            <div className="flex items-center gap-2 text-xs text-[#607D8B]">
              <span className="font-semibold text-[11px]">Quick Samples:</span>
              {['@Shadow_Operator_X', '@DarkWebNCR_Leaks', '@Vip_ExamPaper_Leak2026'].map(h => (
                <button
                  key={h}
                  onClick={() => {
                    setSearchHandle(h);
                    setTimeout(() => {
                      setIsScanning(true);
                      setTimeout(() => {
                        setIsScanning(false);
                        setUnmaskResult({
                          handle: h,
                          confidenceScore: 98.4,
                          realIdentity: 'Vikram Singh @ Vicky (Alias: Cyber-Ghost)',
                          citizenshipId: 'Aadhaar Ref: XXXX-XXXX-4412 (Registered Mewat/Gurugram)',
                          telecomNumber: '+91-9811223344 (Airtel SIM registered in Alwar)',
                          hardwareImei: '354678891234567 (Xiaomi Redmi Note 12 - Geotagged Sector 4)',
                          cryptoAddress: '0x71C94056bcDb39C8Ff88F1 (Balance: ₹42.5 Lakhs Tether)',
                          correlatedPlatforms: [
                            { platform: 'Telegram', handle: h, status: 'Active (Last seen 12m ago)' },
                            { platform: 'Instagram', handle: '@vicky_kingpin_delhi', status: 'Private Profile (14k followers)' },
                            { platform: 'DarkWeb BreachForums', handle: 'GhostNet_IN', status: 'VIP Seller rank (Rep: +340)' },
                            { platform: 'GitHub', handle: 'vicky-dev-mule', status: 'Script repository containing auto-crypto router' }
                          ],
                          stylometricFingerprint: {
                            vocabularyMatch: '96.2% phraseology similarity to FIR 991/2025 ransom note',
                            typingCadence: 'IST Peak Activity (11:00 PM – 4:00 AM)',
                            slangTokens: ['IMPS inward', 'freeze safe', 'token note', 'hawala router']
                          }
                        });
                      }, 800);
                    }, 50);
                  }}
                  className="px-2.5 py-1 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E3A5F] rounded-lg font-mono text-[11px] transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Unmask Result Dossier Card */}
          {unmaskResult && (
            <div className="bg-white border-2 border-[#0EA5A4] rounded-2xl p-6 shadow-xl space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9E1E8] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-[#16A34A] text-white">
                      IDENTITY UNMASKED • {unmaskResult.confidenceScore}% CONFIDENCE
                    </span>
                    <span className="text-xs text-[#607D8B]">Correlated Across 4 Networks</span>
                  </div>
                  <h3 className="text-xl font-black text-[#0B1F3A] mt-1">
                    {unmaskResult.realIdentity}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleGenerateNotice({
                        platform: 'Cross-Platform',
                        handle: unmaskResult.handle,
                        category: 'Syndicate Cyber Fraud & Extortion'
                      });
                      setActiveTab('statutory');
                    }}
                    className="px-3.5 py-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    Draft IT Act Sec 79 Takedown Notice
                  </button>
                </div>
              </div>

              {/* Physical & Financial Anchor IDs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#D9E1E8]">
                  <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Citizenship ID Anchor</span>
                  <span className="font-bold text-[#0B1F3A] text-xs mt-0.5 block">{unmaskResult.citizenshipId}</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#D9E1E8]">
                  <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Telecom MSISDN</span>
                  <span className="font-bold text-[#1D4ED8] font-mono text-xs mt-0.5 block">{unmaskResult.telecomNumber}</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#D9E1E8]">
                  <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Hardware IMEI Bound</span>
                  <span className="font-bold text-[#0B1F3A] font-mono text-xs mt-0.5 block">{unmaskResult.hardwareImei}</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#D9E1E8]">
                  <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Crypto Hawala Ledger</span>
                  <span className="font-bold text-[#D97706] font-mono text-xs mt-0.5 block">{unmaskResult.cryptoAddress}</span>
                </div>
              </div>

              {/* Correlated Handles Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                  Associated Social &amp; DarkWeb Handles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {unmaskResult.correlatedPlatforms.map((p, idx) => (
                    <div key={idx} className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#1D4ED8] text-xs">{p.platform}</span>
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                      </div>
                      <div className="font-mono font-bold text-xs text-[#0B1F3A]">{p.handle}</div>
                      <div className="text-[10px] text-[#607D8B] mt-1">{p.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stylometric Authorship Profiling */}
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-4 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#166534] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    AI Stylometric &amp; Phraseology Linguistic Match
                  </span>
                  <span className="font-bold text-[#15803D] bg-white px-2 py-0.5 rounded border border-[#86EFAC]">
                    {unmaskResult.stylometricFingerprint.vocabularyMatch}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-[#166534] font-semibold">Circadian Posting Rhythm:</span>
                    <p className="text-[#15803D] font-mono">{unmaskResult.stylometricFingerprint.typingCadence}</p>
                  </div>
                  <div>
                    <span className="text-[#166534] font-semibold">Unique Subcultural Slang Tokens:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {unmaskResult.stylometricFingerprint.slangTokens.map(tok => (
                        <span key={tok} className="bg-white text-[#15803D] px-2 py-0.5 rounded border border-[#86EFAC] font-mono text-[10px]">
                          "{tok}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* TAB 3: COORD INAUTHENTIC BEHAVIOR (CIB) & BOTNET RADAR    */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === 'cib-botnet' && (
        <div className="bg-white border border-[#D9E1E8] rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D9E1E8] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded">
                GRAPH SWARM TOPOLOGY &amp; PROPAGANDA DETECTION
              </span>
              <h2 className="text-lg font-bold text-[#0B1F3A] mt-1">
                Coordinated Inauthentic Behavior (CIB) &amp; Botnet Radar
              </h2>
              <p className="text-xs text-[#607D8B]">
                Identifies synchronized posting waves, automated tweet storms, and synthetic amplification rings attempting to manipulate financial or national security sentiments.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                ACTIVE BOTNET ATTACK: BOTNET-ALPHA-44
              </span>
            </div>
          </div>

          {/* Botnet Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#D9E1E8]">
              <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Synchronized Accounts</span>
              <span className="text-xl font-black text-[#DC2626] mt-1 block">420 Handles</span>
              <span className="text-[10px] text-[#94A3B8]">Created within 48-hour window</span>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#D9E1E8]">
              <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Posting Velocity Spike</span>
              <span className="text-xl font-black text-[#B45309] mt-1 block">1,420 msgs / min</span>
              <span className="text-[10px] text-[#94A3B8]">Zero variance Poisson interval</span>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#D9E1E8]">
              <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Content Hash Collision</span>
              <span className="text-xl font-black text-[#1D4ED8] mt-1 block">99.1% Text Clones</span>
              <span className="text-[10px] text-[#94A3B8]">Identical syntax across 80% posts</span>
            </div>
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#D9E1E8]">
              <span className="text-[10px] font-bold text-[#607D8B] uppercase block">Command &amp; Control Host</span>
              <span className="text-xl font-black text-[#0B1F3A] mt-1 block font-mono">185.220.101.42</span>
              <span className="text-[10px] text-[#94A3B8]">Tor Exit Node • Foreign Proxy</span>
            </div>
          </div>

          {/* Interactive Bot Swarm Simulation Box */}
          <div className="bg-[#071326] border border-[#1E3A5F] rounded-xl p-5 text-white space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0EA5A4] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0EA5A4] animate-pulse" />
                Live Swarm Graph Stream (Simulated Bot Clusters)
              </span>
              <span className="text-[10px] text-[#90CAF9] font-mono">Target Tag: #BankCrash #UPI_Down</span>
            </div>

            <div className="h-44 bg-[#0B1F3A]/70 rounded-lg border border-[#1E3A5F] p-4 flex items-center justify-around relative overflow-hidden">
              <div className="text-center space-y-1 z-10">
                <div className="w-14 h-14 rounded-full bg-[#DC2626]/20 border-2 border-[#DC2626] mx-auto flex items-center justify-center font-bold text-xs text-[#FCA5A5] animate-pulse">
                  C&amp;C Node
                </div>
                <span className="text-[10px] font-mono text-[#FCA5A5]">Tor Controller</span>
              </div>

              <div className="flex flex-col gap-2 z-10">
                <div className="px-3 py-1 rounded bg-[#1D4ED8]/30 border border-[#38BDF8] text-[10px] font-mono text-[#93C5FD]">
                  Tier 1: 40 Automated Disseminators (X / Telegram)
                </div>
                <div className="px-3 py-1 rounded bg-[#0EA5A4]/30 border border-[#2DD4BF] text-[10px] font-mono text-[#99F6E4]">
                  Tier 2: 380 Zombie Retweet / Forward Clones
                </div>
              </div>

              <div className="text-center space-y-1 z-10">
                <div className="w-14 h-14 rounded-full bg-[#F59E0B]/20 border-2 border-[#F59E0B] mx-auto flex items-center justify-center font-bold text-xs text-[#FDE68A]">
                  Victims
                </div>
                <span className="text-[10px] font-mono text-[#FDE68A]">Panic Trend Trigger</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-[#94A3B8] text-[11px]">Recommended Action: Issue Immediate Intermediary Freeze under IT Act 2000 Section 69A</span>
              <button
                onClick={() => {
                  handleGenerateNotice({
                    platform: 'X / Twitter & Telegram',
                    handle: 'BOTNET-ALPHA-44 (420 Accounts)',
                    category: 'Coordinated Disinformation & Financial Panic'
                  });
                  setActiveTab('statutory');
                }}
                className="px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                Execute Mass Takedown Requisition
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* TAB 4: DEEPFAKE & SYNTHETIC MEDIA VERIFIER                 */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === 'deepfake' && (
        <div className="bg-white border border-[#D9E1E8] rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#D9E1E8] pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0EA5A4] bg-[#E0F2F1] px-2 py-0.5 rounded">
              NEURAL ARTIFACT VERIFIER
            </span>
            <h2 className="text-lg font-bold text-[#0B1F3A] mt-1">
              Deepfake Video &amp; Cloned Voice Synthesizer Radar
            </h2>
            <p className="text-xs text-[#607D8B]">
              Detects GAN-generated face swaps, ElevenLabs voice cloning, and audio spectral flatlines to prevent fabricated electronic evidence from being admitted into court.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload & Inspect Box */}
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-2xl p-6 text-center space-y-4 bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-full bg-[#E0F2F1] text-[#0EA5A4] mx-auto flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0B1F3A]">Analyze Suspect Video / Audio File</h4>
                <p className="text-xs text-[#607D8B] mt-1">Supported Formats: MP4, MKV, MP3, WAV (Max 500MB)</p>
              </div>

              <button
                onClick={handleAnalyzeDeepfake}
                disabled={isScanning}
                className="px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#1E3A5F] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                {isScanning ? 'Running Neural Spectrogram Scan...' : 'Analyze Sample Viral Threat Video'}
              </button>
            </div>

            {/* Analysis Result View */}
            {deepfakeResult ? (
              <div className="bg-[#FFF5F5] border-2 border-[#EF4444] rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#FCA5A5] pb-2">
                  <span className="text-[10px] font-black uppercase text-[#B91C1C] bg-white px-2 py-0.5 rounded border border-[#EF4444]">
                    SYNTHETIC EVIDENCE DETECTED • {deepfakeResult.deepfakeConfidence}%
                  </span>
                  <span className="text-xs font-bold text-[#DC2626]">FAIL (FAKE)</span>
                </div>

                <div className="font-bold text-xs text-[#991B1B]">
                  {deepfakeResult.classification}
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-[#7F1D1D] text-[11px] block">Forensic Anomaly Triggers:</span>
                  {deepfakeResult.manipulationIndicators.map((ind, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-[#991B1B]">
                      <span className="text-[#DC2626] font-bold">•</span>
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-3 rounded-lg border border-[#FCA5A5] text-[11px] font-mono text-[#7F1D1D]">
                  <b>Judicial Admissibility:</b> {deepfakeResult.verdict}
                </div>
              </div>
            ) : (
              <div className="bg-[#F8FAFC] border border-[#D9E1E8] rounded-2xl p-6 flex flex-col items-center justify-center text-center text-xs text-[#607D8B]">
                <p>Click "Analyze Sample Viral Threat Video" to inspect real neural frame and voice spectral anomalies.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* TAB 5: STATUTORY NOTICES & BSA 65B EVIDENCE VAULT           */}
      {/* ────────────────────────────────────────────────────────── */}
      {activeTab === 'statutory' && (
        <div className="bg-white border border-[#D9E1E8] rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#D9E1E8] pb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
                STATUTORY COMPLIANCE &amp; COURT ADMISSIBILITY
              </span>
              <h2 className="text-lg font-bold text-[#0B1F3A] mt-1">
                Statutory Takedown Notice &amp; Cryptographic Evidence Seal
              </h2>
              <p className="text-xs text-[#607D8B]">
                Generates legally binding preservation notices under IT Act 2000 Section 79(3)(b) &amp; BNSS 2023 Section 94, 
                with SHA-256 digital vault hash sealing under Section 65B of the Bharatiya Sakshya Adhiniyam (BSA 2023).
              </p>
            </div>

            <span className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] px-3 py-1 rounded text-xs font-bold">
              BNSS 2023 &amp; BSA 2023 COMPLIANT
            </span>
          </div>

          {preservationNotice ? (
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl p-6 space-y-4 font-mono text-xs text-[#0B1F3A]">
              <div className="text-center border-b border-[#CBD5E1] pb-3 space-y-1">
                <div className="font-bold text-sm text-[#0B1F3A]">GOVERNMENT OF INDIA • STATE POLICE SPECIAL CYBER CELL</div>
                <div className="text-[11px] text-[#607D8B]">STATUTORY PRESERVATION &amp; INTERMEDIARY TAKEDOWN NOTICE</div>
                <div className="text-[10px] text-[#1D4ED8]">Notice Reference ID: {preservationNotice.noticeId}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div><b>Date / Timestamp:</b> {preservationNotice.timestamp}</div>
                <div><b>Addressed To:</b> Legal Counsel / Grievance Officer, {preservationNotice.platform}</div>
                <div><b>Target Handle / Group:</b> <span className="text-[#DC2626] font-bold">{preservationNotice.targetHandle}</span></div>
                <div><b>Alleged Offense:</b> {preservationNotice.offense}</div>
                <div><b>Issuing Officer:</b> {preservationNotice.officer}</div>
                <div><b>Investigation Unit:</b> {preservationNotice.agency}</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-[#CBD5E1] text-[11px] space-y-2">
                <div className="font-bold text-[#0B1F3A]">STATUTORY DIRECTIVE UNDER LAW:</div>
                <p className="text-[#334155] leading-relaxed">
                  "You are hereby directed under Section 79(3)(b) of the Information Technology Act, 2000 and Section 94 of the 
                  Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) to immediately preserve and remove public access to the specified 
                  unlawful transmission within 36 hours. Furthermore, preserve all associated IP access logs, MSISDN records, 
                  and registration metadata for a minimum period of 180 days for electronic evidence certification under Section 65B of the Bharatiya Sakshya Adhiniyam."
                </p>
              </div>

              <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-lg flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-[#1D4ED8] block">Immutable SHA-256 Web Snapshot Hash:</span>
                  <span className="text-xs text-[#1E3A5F]">{preservationNotice.evidenceHash}</span>
                </div>
                <span className="bg-[#16A34A] text-white px-2.5 py-1 rounded text-[10px] font-bold">
                  BSA 65B SEALED
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => alert(`Notice ${preservationNotice.noticeId} exported as PDF and signed with Digital Token.`)}
                  className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Export Signed PDF Notice
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-2xl p-8 text-center text-xs text-[#607D8B] space-y-3">
              <p>No notice drafted yet. Select any feed from the <b>Live Threat Stream</b> or <b>Persona Unmasker</b> and click <b>"Draft IT Act Sec 79 Takedown Notice"</b>.</p>
              <button
                onClick={() => handleGenerateNotice(MOCK_SOCIAL_FEEDS[0])}
                className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#1E3A5F] text-white rounded-lg text-xs font-bold"
              >
                Generate Demo Notice for {MOCK_SOCIAL_FEEDS[0].handle}
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
