import React, { useState, useMemo } from 'react';

/* ══════════════════════════════════════════════════════════════════════════
   PRATIBIMB GEOSPATIAL INTELLIGENCE PORTAL (I4C / MHA)
   Mapping Locations of Criminals & Crime Infrastructure for Jurisdictional Officers
   Style:
   - Light grey/white map background (#F4F6F8 / #FFFFFF)
   - Blue jurisdiction boundaries (#1565C0 / #90CAF9)
   - Red/orange markers for high-priority entities (#C62828 / #EF6C00)
   - Blue markers for normal entities (#1976D2)
   - Connecting lines for linked cases
   - Cluster markers when many entities exist
   - Right-side Entity Details panel
   - Filters: State | District | Crime Type | Date | Status
══════════════════════════════════════════════════════════════════════════ */

const PRATIBIMB_ENTITIES = [
  {
    id: 'ENT_001',
    name: 'Vikram Singh @ Vicky (Cyber-Ghost)',
    alias: 'Kingpin Operative',
    priority: 'HIGH', // HIGH (Red/Orange) vs NORMAL (Blue)
    category: 'SYNDICATE_HEAD',
    crimeType: 'Hawala Extortion',
    state: 'Delhi NCR',
    district: 'New Delhi Central',
    psJurisdiction: 'PS Special Cell, Lodhi Colony',
    status: 'ACTIVE_INFRASTRUCTURE',
    statusLabel: 'Active Warrant (BNS 111)',
    lat: 28.6139,
    lng: 77.2090,
    x: 430,
    y: 220,
    dateAdded: '2026-09-21',
    phone: '+91-9811223344',
    imei: '354678091234567',
    financialTag: 'Crypto Wallet 0x71C...88F1 (₹42.5 L)',
    lastActive: '12 mins ago (Cell Tower Sector 4)',
    linkedEntityIds: ['ENT_002', 'ENT_004', 'ENT_005'],
    firs: ['FIR #991/2025 PS Special Cell', 'FIR #412/2024 Crime Branch Mumbai'],
    description: 'Mastermind of multi-state extortion network. Operates virtual SIM hubs across border checkpoints.',
    avatar: '👨‍💼',
    officerInCharge: 'Insp. Vikramaditya Rao (I4C SIT)'
  },
  {
    id: 'ENT_002',
    name: 'Mewat High-Density SIM Box Array #03',
    alias: 'Infrastructure Node (320 Virtual Channels)',
    priority: 'HIGH',
    category: 'CRIME_INFRASTRUCTURE',
    crimeType: 'SIM Box Fraud',
    state: 'Haryana',
    district: 'Mewat / Nuh',
    psJurisdiction: 'PS Cyber Nuh, Haryana Police',
    status: 'ACTIVE_INFRASTRUCTURE',
    statusLabel: 'Active Transmitting Array',
    lat: 28.1100,
    lng: 77.0100,
    x: 340,
    y: 360,
    dateAdded: '2026-09-24',
    phone: '320 VoIP/GSM Virtual Ports',
    imei: '869201049921000 - 869201049921319',
    financialTag: 'Fake KYC Bulk SIM Procurement',
    lastActive: 'Real-Time Signal Active (4.2 pkts/sec)',
    linkedEntityIds: ['ENT_001', 'ENT_003', 'CLUSTER_MEWAT'],
    firs: ['FIR #188/2026 PS Cyber Nuh'],
    description: 'Multi-port GSM gateway spoofing local mobile towers for automated OTP bypass and phishing robocalls.',
    avatar: '📡',
    officerInCharge: 'DSP Anil Yadav (STF Haryana)'
  },
  {
    id: 'ENT_003',
    name: 'Jamtara Mule Account Cashout Ring',
    alias: 'Secondary Mule Syndicate',
    priority: 'HIGH',
    category: 'MULE_RING',
    crimeType: 'Mule Bank Accounts',
    state: 'Jharkhand',
    district: 'Jamtara Sadar',
    psJurisdiction: 'PS Jamtara Cyber Crime',
    status: 'UNDER_SURVEILLANCE',
    statusLabel: 'Surveillance / Intercept Order',
    lat: 23.9600,
    lng: 86.8000,
    x: 680,
    y: 310,
    dateAdded: '2026-09-18',
    phone: '+91-9431189920',
    imei: '861192038102941',
    financialTag: '24 Jan Dhan Accounts (₹89.4 L Routed)',
    lastActive: '1 hr ago (ATM Cashout Sector 2)',
    linkedEntityIds: ['ENT_002', 'ENT_006', 'CLUSTER_JAMTARA'],
    firs: ['FIR #312/2026 PS Jamtara Cyber'],
    description: 'Coordinates rapid cashouts through student Jan Dhan accounts immediately following phishing hits.',
    avatar: '🏦',
    officerInCharge: 'Sub-Insp. Priya Soren (CID Jharkhand)'
  },
  {
    id: 'ENT_004',
    name: 'Ramesh Kumar @ Chhotu',
    alias: 'Logistics Handler & Vehicle Operative',
    priority: 'NORMAL',
    category: 'OPERATIVE',
    crimeType: 'Theft & Vehicle Intercept',
    state: 'Delhi NCR',
    district: 'New Delhi Central',
    psJurisdiction: 'PS Kotwali, Central Delhi',
    status: 'WARRANT_ISSUED',
    statusLabel: 'Local Summons Executable',
    lat: 28.6500,
    lng: 77.2300,
    x: 480,
    y: 160,
    dateAdded: '2026-09-15',
    phone: '+91-9871029384',
    imei: '359102938475610',
    financialTag: 'Bank Acc XXXX-8812 (₹8.2 L)',
    lastActive: 'Yesterday (Kotwali Checkpost)',
    linkedEntityIds: ['ENT_001'],
    firs: ['FIR #112/2024 Kotwali PS', 'FIR #88/2023 Excise PS'],
    description: 'Handles physical cash deliveries, contraband drop points, and cloned vehicle registration plates.',
    avatar: '🛵',
    officerInCharge: 'ASI S. K. Meena (Delhi Police)'
  },
  {
    id: 'ENT_005',
    name: 'State Bank Mule Branch Gateway (Karol Bagh)',
    alias: 'Compromised Commercial Account Point',
    priority: 'NORMAL',
    category: 'FINANCIAL_NODE',
    crimeType: 'Mule Bank Accounts',
    state: 'Delhi NCR',
    district: 'New Delhi Central',
    psJurisdiction: 'PS Karol Bagh',
    status: 'FREEZE_ORDER_ACTIVE',
    statusLabel: 'Bank Freeze Order (BNSS 107)',
    lat: 28.6520,
    lng: 77.1900,
    x: 390,
    y: 180,
    dateAdded: '2026-09-22',
    phone: 'IFSC: SBIN0001234',
    imei: 'N/A (Corporate Branch Node)',
    financialTag: 'Current A/c: 38920194812 (₹18.4 L Frozen)',
    lastActive: 'Frozen via PMLA Portal 09:30 AM',
    linkedEntityIds: ['ENT_001', 'ENT_004'],
    firs: ['FIR #991/2025 PS Special Cell'],
    description: 'Mule corporate account used for layering cyber extortion funds prior to foreign Hawala conversion.',
    avatar: '🏛️',
    officerInCharge: 'Insp. R. K. Joshi (Economic Offenses Wing)'
  },
  {
    id: 'ENT_006',
    name: 'BKC Darknet Cashout Node (Mumbai)',
    alias: 'Hawala P2P Exchange Desk',
    priority: 'HIGH',
    category: 'HAWALA_NODE',
    crimeType: 'Hawala Extortion',
    state: 'Maharashtra',
    district: 'Mumbai South',
    psJurisdiction: 'PS Cyber Crime, Bandra-Kurla Complex',
    status: 'ACTIVE_INFRASTRUCTURE',
    statusLabel: 'Non-Bailable Warrant (NBW)',
    lat: 19.0600,
    lng: 72.8600,
    x: 240,
    y: 430,
    dateAdded: '2026-09-20',
    phone: '+91-9820192834',
    imei: '358291048291048',
    financialTag: 'USDT Trc-20 Wallet: T9xP...41Zk',
    lastActive: '45 mins ago (BKC Metro Link)',
    linkedEntityIds: ['ENT_001', 'ENT_003'],
    firs: ['FIR #412/2024 Crime Branch Unit 4 Mumbai'],
    description: 'P2P crypto-to-cash clearing office facilitating cross-border flight of syndicates proceeds.',
    avatar: '💼',
    officerInCharge: 'PI Sandeep Patil (Mumbai Cyber Police)'
  }
];

// Entity Cluster Markers for dense infrastructure hotspots
const INFRASTRUCTURE_CLUSTERS = [
  {
    id: 'CLUSTER_MEWAT',
    name: 'Mewat SIM-Box Belt',
    count: 18,
    category: 'SIM Box Infrastructure Cluster',
    state: 'Haryana',
    district: 'Mewat / Nuh',
    x: 320,
    y: 380,
    severity: 'HIGH_CONCENTRATION',
    description: '18 active unregistered SIM boxes operating across 4 village panchayats.'
  },
  {
    id: 'CLUSTER_JAMTARA',
    name: 'Jamtara Mule Hotspot',
    count: 24,
    category: 'Mule Bank Accounts Cluster',
    state: 'Jharkhand',
    district: 'Jamtara Sadar',
    x: 710,
    y: 330,
    severity: 'HIGH_CONCENTRATION',
    description: '24 synchronized mule accounts receiving phishing credits from Delhi NCR.'
  },
  {
    id: 'CLUSTER_SURAT',
    name: 'Surat Hawala Angadia Hub',
    count: 12,
    category: 'Hawala Cashout Terminals',
    state: 'Gujarat',
    district: 'Surat Central',
    x: 210,
    y: 350,
    severity: 'MODERATE_CONCENTRATION',
    description: '12 cash distribution points identified through suspicious transaction reports (STRs).'
  }
];

// Blue Jurisdiction Boundary Polygons
const JURISDICTION_POLYGONS = [
  {
    id: 'JUR_NORTH_NCR',
    name: 'NCR Central Command Jurisdiction (Delhi Police / Special Cell)',
    color: '#1565C0',
    fill: 'rgba(21, 101, 192, 0.05)',
    d: 'M 350 120 L 520 120 L 550 250 L 480 300 L 330 240 Z'
  },
  {
    id: 'JUR_MEWAT_STF',
    name: 'Mewat / Nuh Inter-State Cyber Zone (Haryana STF)',
    color: '#0D47A1',
    fill: 'rgba(13, 71, 161, 0.06)',
    d: 'M 290 310 L 400 320 L 420 420 L 300 440 Z'
  },
  {
    id: 'JUR_JAMTARA_SADAR',
    name: 'Jamtara Cyber Crime Investigation Belt (CID Jharkhand)',
    color: '#1976D2',
    fill: 'rgba(25, 118, 210, 0.06)',
    d: 'M 620 260 L 760 270 L 780 390 L 640 370 Z'
  },
  {
    id: 'JUR_MUMBAI_BKC',
    name: 'Western Financial Crime Jurisdiction (Mumbai Cyber Cell)',
    color: '#0277BD',
    fill: 'rgba(2, 119, 189, 0.06)',
    d: 'M 180 380 L 290 390 L 300 480 L 190 470 Z'
  }
];

export default function PratibimbMap({ officerSession }) {
  // ── Filters State ──
  const [filterState, setFilterState]       = useState('ALL');
  const [filterDistrict, setFilterDistrict] = useState('ALL');
  const [filterCrime, setFilterCrime]       = useState('ALL');
  const [filterDate, setFilterDate]         = useState('ALL');
  const [filterStatus, setFilterStatus]     = useState('ALL');
  const [searchQuery, setSearchQuery]       = useState('');

  // ── Selection State ──
  const [selectedEntity, setSelectedEntity] = useState(PRATIBIMB_ENTITIES[0]);
  const [showClusters, setShowClusters]     = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showLinks, setShowLinks]           = useState(true);
  const [actionAlert, setActionAlert]       = useState(null);

  // ── Filtered Entities ──
  const filteredEntities = useMemo(() => {
    return PRATIBIMB_ENTITIES.filter((ent) => {
      if (filterState !== 'ALL' && ent.state !== filterState) return false;
      if (filterDistrict !== 'ALL' && ent.district !== filterDistrict) return false;
      if (filterCrime !== 'ALL' && ent.crimeType !== filterCrime) return false;
      if (filterStatus !== 'ALL' && ent.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ent.name.toLowerCase().includes(q);
        const matchesPhone = ent.phone.toLowerCase().includes(q);
        const matchesImei = ent.imei.toLowerCase().includes(q);
        const matchesDistrict = ent.district.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesImei && !matchesDistrict) return false;
      }
      return true;
    });
  }, [filterState, filterDistrict, filterCrime, filterStatus, searchQuery]);

  // Quick action execution
  const executeAction = (type, title) => {
    setActionAlert({
      type,
      title,
      entity: selectedEntity.name,
      timestamp: new Date().toLocaleTimeString('en-IN'),
      dispatchCode: `MHA-ACT-${Math.floor(1000 + Math.random() * 9000)}`
    });
    setTimeout(() => setActionAlert(null), 5000);
  };

  return (
    <div className="space-y-4 font-sans text-[#263238]">

      {/* ── TOP CONTROL & FILTER BAR ── */}
      <div className="bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl p-4 shadow-sm space-y-3">
        {/* Title row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-[#D9E1E8] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#123B63] flex items-center justify-center text-white text-lg font-bold shadow-sm">
              🗺️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#123B63] uppercase tracking-wide">
                  PRATIBIMB — MHA CYBER CRIME INFRASTRUCTURE MAP
                </h2>
                <span className="text-[10px] bg-[#E3F2FD] text-[#1565C0] font-semibold px-2 py-0.5 rounded border border-[#90CAF9]">
                  I4C / BPR&amp;D JURISDICTIONAL GRID
                </span>
              </div>
              <p className="text-xs text-[#607D8B] mt-0.5">
                Mapping locations of criminals, active SIM boxes, mule accounts, and Hawala nodes for jurisdictional field officers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="bg-[#F4F6F8] border border-[#D9E1E8] px-3 py-1.5 rounded-lg text-[#263238] font-medium">
              Showing: <strong className="text-[#1565C0]">{filteredEntities.length}</strong> of {PRATIBIMB_ENTITIES.length} Entities
            </span>

            {/* Quick Layer Toggles */}
            <button
              onClick={() => setShowBoundaries(!showBoundaries)}
              className={`px-3 py-1.5 rounded-lg font-medium border text-xs transition-all ${
                showBoundaries
                  ? 'bg-[#1565C0] text-white border-[#1565C0]'
                  : 'bg-[#FFFFFF] text-[#607D8B] border-[#D9E1E8] hover:bg-[#F4F6F8]'
              }`}
            >
              Jurisdictions
            </button>
            <button
              onClick={() => setShowClusters(!showClusters)}
              className={`px-3 py-1.5 rounded-lg font-medium border text-xs transition-all ${
                showClusters
                  ? 'bg-[#1565C0] text-white border-[#1565C0]'
                  : 'bg-[#FFFFFF] text-[#607D8B] border-[#D9E1E8] hover:bg-[#F4F6F8]'
              }`}
            >
              Clusters ({INFRASTRUCTURE_CLUSTERS.length})
            </button>
            <button
              onClick={() => setShowLinks(!showLinks)}
              className={`px-3 py-1.5 rounded-lg font-medium border text-xs transition-all ${
                showLinks
                  ? 'bg-[#1565C0] text-white border-[#1565C0]'
                  : 'bg-[#FFFFFF] text-[#607D8B] border-[#D9E1E8] hover:bg-[#F4F6F8]'
              }`}
            >
              Syndicate Links
            </button>
          </div>
        </div>

        {/* 5 Dropdown Filters + Search (State | District | Crime Type | Date | Status) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-xs">
          {/* 1. State Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#607D8B] uppercase mb-1">State</label>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg px-2.5 py-1.5 text-[#263238] font-medium focus:outline-none focus:border-[#1565C0]"
            >
              <option value="ALL">All States (All India)</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Haryana">Haryana</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          {/* 2. District Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#607D8B] uppercase mb-1">District</label>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg px-2.5 py-1.5 text-[#263238] font-medium focus:outline-none focus:border-[#1565C0]"
            >
              <option value="ALL">All Districts</option>
              <option value="New Delhi Central">New Delhi Central</option>
              <option value="Mewat / Nuh">Mewat / Nuh</option>
              <option value="Jamtara Sadar">Jamtara Sadar</option>
              <option value="Mumbai South">Mumbai South</option>
            </select>
          </div>

          {/* 3. Crime Type Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#607D8B] uppercase mb-1">Crime Type</label>
            <select
              value={filterCrime}
              onChange={(e) => setFilterCrime(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg px-2.5 py-1.5 text-[#263238] font-medium focus:outline-none focus:border-[#1565C0]"
            >
              <option value="ALL">All Crime Types</option>
              <option value="Hawala Extortion">Hawala Extortion</option>
              <option value="SIM Box Fraud">SIM Box Fraud</option>
              <option value="Mule Bank Accounts">Mule Bank Accounts</option>
              <option value="Theft & Vehicle Intercept">Theft & Vehicle Intercept</option>
            </select>
          </div>

          {/* 4. Date Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#607D8B] uppercase mb-1">Date Ingested</label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg px-2.5 py-1.5 text-[#263238] font-medium focus:outline-none focus:border-[#1565C0]"
            >
              <option value="ALL">All Dates (30 Days)</option>
              <option value="24H">Last 24 Hours</option>
              <option value="7D">Last 7 Days</option>
              <option value="30D">Last 30 Days</option>
            </select>
          </div>

          {/* 5. Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#607D8B] uppercase mb-1">Enforcement Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg px-2.5 py-1.5 text-[#263238] font-medium focus:outline-none focus:border-[#1565C0]"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE_INFRASTRUCTURE">Active Infrastructure</option>
              <option value="UNDER_SURVEILLANCE">Under Surveillance</option>
              <option value="WARRANT_ISSUED">Warrant Issued</option>
              <option value="FREEZE_ORDER_ACTIVE">Freeze Order Active</option>
            </select>
          </div>

          {/* 6. Search Bar */}
          <div>
            <label className="block text-[11px] font-semibold text-[#607D8B] uppercase mb-1">Quick Search</label>
            <input
              type="text"
              placeholder="Search suspect, IMEI, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#D9E1E8] rounded-lg px-2.5 py-1.5 text-[#263238] placeholder-[#90A4AE] font-medium focus:outline-none focus:border-[#1565C0]"
            />
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionAlert && (
        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-3 flex justify-between items-center text-xs text-[#2E7D32] shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-base">✅</span>
            <span>
              <strong>{actionAlert.title}</strong> executed successfully against <strong>{actionAlert.entity}</strong>. Dispatch Code: <code>{actionAlert.dispatchCode}</code>.
            </span>
          </div>
          <span className="text-[11px] text-[#388E3C] font-semibold">{actionAlert.timestamp}</span>
        </div>
      )}

      {/* ── MAIN WORKSPACE: PRATIBIMB MAP (LEFT 8) + ENTITY DETAILS PANEL (RIGHT 4) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ── LEFT: PRATIBIMB GEOSPATIAL MAP CANVAS (8 Cols) ── */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl overflow-hidden shadow-sm flex flex-col">

          {/* Map Header Strip */}
          <div className="bg-[#F4F6F8] border-b border-[#D9E1E8] px-4 py-2.5 flex justify-between items-center text-xs text-[#607D8B]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
              <span className="font-semibold text-[#263238]">PRATIBIMB LIVE OPERATIONAL GRID</span>
              <span className="text-[#90A4AE]">|</span>
              <span>Light Grey Government Cartographic Background</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
                <span className="text-[#263238] font-medium">High-Priority Entity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1976D2]" />
                <span className="text-[#263238] font-medium">Normal Entity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF6C00]" />
                <span className="text-[#263238] font-medium">Cluster Zone</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="relative flex-1 bg-[#F8FAFC] min-h-[540px] overflow-hidden select-none">
            <svg
              viewBox="0 0 900 540"
              className="w-full h-full block"
              style={{ background: '#F4F6F8' }}
            >
              {/* Cartographic Subtle Grid */}
              <defs>
                <pattern id="pratibimbGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.7" />
                </pattern>
              </defs>

              <rect width="900" height="540" fill="#F4F6F8" />
              <rect width="900" height="540" fill="url(#pratibimbGrid)" />

              {/* Blue Jurisdiction Boundaries */}
              {showBoundaries && JURISDICTION_POLYGONS.map((poly) => (
                <g key={poly.id}>
                  <path
                    d={poly.d}
                    fill={poly.fill}
                    stroke={poly.color}
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                  />
                </g>
              ))}

              {/* State & District Border Lines */}
              <path
                d="M 120 180 Q 300 240 450 260 T 820 280"
                fill="none"
                stroke="#B0BEC5"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <path
                d="M 380 40 Q 420 240 480 380 T 640 500"
                fill="none"
                stroke="#B0BEC5"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* Jurisdiction Labels */}
              <text x="370" y="105" fill="#1565C0" fontSize="10" fontWeight="600" letterSpacing="0.5">
                DELHI NCR JURISDICTION (SPECIAL CELL)
              </text>
              <text x="250" y="325" fill="#0D47A1" fontSize="10" fontWeight="600">
                MEWAT / NUH FRAUD BELT
              </text>
              <text x="630" y="250" fill="#1976D2" fontSize="10" fontWeight="600">
                JAMTARA CYBER COORDINATION ZONE
              </text>
              <text x="140" y="405" fill="#0277BD" fontSize="10" fontWeight="600">
                MUMBAI BKC FINANCIAL CRIME
              </text>

              {/* ── Connecting Lines for Linked Cases ── */}
              {showLinks && filteredEntities.map((ent) => {
                return ent.linkedEntityIds.map((targetId) => {
                  const target = PRATIBIMB_ENTITIES.find((e) => e.id === targetId);
                  if (!target) return null;
                  const isSelected = selectedEntity.id === ent.id || selectedEntity.id === target.id;
                  return (
                    <line
                      key={`${ent.id}-${target.id}`}
                      x1={ent.x}
                      y1={ent.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isSelected ? '#C62828' : '#90CAF9'}
                      strokeWidth={isSelected ? 2.5 : 1.2}
                      strokeDasharray={isSelected ? '4 2' : '3 3'}
                      opacity={isSelected ? 0.95 : 0.6}
                    />
                  );
                });
              })}

              {/* ── Cluster Markers (Dense Infrastructure Hotspots) ── */}
              {showClusters && INFRASTRUCTURE_CLUSTERS.map((clust) => (
                <g
                  key={clust.id}
                  transform={`translate(${clust.x}, ${clust.y})`}
                  className="cursor-pointer"
                  onClick={() => {
                    // Find an entity in this cluster
                    const match = PRATIBIMB_ENTITIES.find(e => e.district === clust.district) || PRATIBIMB_ENTITIES[0];
                    setSelectedEntity(match);
                  }}
                >
                  <circle r="22" fill="rgba(239, 108, 0, 0.18)" />
                  <circle r="14" fill="#EF6C00" stroke="#FFFFFF" strokeWidth="2" shadow="0 2px 4px rgba(0,0,0,0.15)" />
                  <text y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                    {clust.count}
                  </text>
                  <text y="26" textAnchor="middle" fill="#E65100" fontSize="9" fontWeight="bold">
                    {clust.name}
                  </text>
                </g>
              ))}

              {/* ── Entities Markers (Red/Orange for High Priority, Blue for Normal) ── */}
              {filteredEntities.map((ent) => {
                const isSelected = selectedEntity.id === ent.id;
                const isHigh = ent.priority === 'HIGH';
                const markerColor = isHigh ? '#C62828' : '#1976D2';

                return (
                  <g
                    key={ent.id}
                    transform={`translate(${ent.x}, ${ent.y})`}
                    className="cursor-pointer transition-transform duration-150"
                    onClick={() => setSelectedEntity(ent)}
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke={markerColor}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        className="animate-spin"
                      />
                    )}

                    {/* Outer Drop Pin Base */}
                    <circle
                      r={isSelected ? 14 : 11}
                      fill={markerColor}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />

                    {/* Inner Center Dot */}
                    <circle r="4" fill="#FFFFFF" />

                    {/* Callsign / Identifier Tag */}
                    <rect
                      x="-45"
                      y="16"
                      width="90"
                      height="17"
                      rx="4"
                      fill="#FFFFFF"
                      stroke={isSelected ? markerColor : '#B0BEC5'}
                      strokeWidth={isSelected ? 1.5 : 0.8}
                    />
                    <text
                      x="0"
                      y="28"
                      textAnchor="middle"
                      fill={isSelected ? markerColor : '#263238'}
                      fontSize="8.5"
                      fontWeight="bold"
                    >
                      {ent.name.split(' ')[0]} ({ent.category.slice(0, 4)})
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Left Cartographic Legend */}
            <div className="absolute bottom-3 left-3 bg-[#FFFFFF]/95 border border-[#D9E1E8] rounded-lg p-2.5 shadow-sm text-[11px] text-[#263238] space-y-1">
              <div className="font-semibold text-[#123B63] uppercase tracking-wider text-[10px]">
                Pratibimb Operational Legend
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#C62828]" />
                <span className="text-[#607D8B]">Active Criminal / Kingpin Link</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#1565C0]" />
                <span className="text-[#607D8B]">Police Jurisdiction Sector Line</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF6C00]" />
                <span className="text-[#607D8B]">Infrastructure Density Cluster</span>
              </div>
            </div>
          </div>

          {/* Map Footer Bar */}
          <div className="bg-[#F4F6F8] border-t border-[#D9E1E8] px-4 py-2 flex flex-wrap justify-between items-center text-xs text-[#607D8B]">
            <span>Click any marker or cluster to inspect full dossier and execute statutory orders.</span>
            <span>SYSTEM: I4C-PRATIBIMB-V2 · PROJECTION: WGS-84 / UTM-43N</span>
          </div>
        </div>

        {/* ── RIGHT: ENTITY DETAILS PANEL (4 Cols) ── */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#D9E1E8] rounded-xl shadow-sm flex flex-col justify-between overflow-hidden">
          
          <div>
            {/* Panel Header */}
            <div className="bg-[#123B63] text-white p-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#90CAF9] bg-[#0D2A4A] px-2 py-0.5 rounded">
                  {selectedEntity.category.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold mt-1 text-white leading-tight">
                  {selectedEntity.name}
                </h3>
                <div className="text-xs text-[#B0BEC5] mt-0.5 font-medium">
                  {selectedEntity.alias}
                </div>
              </div>
              <span className="text-2xl">{selectedEntity.avatar}</span>
            </div>

            {/* Severity & Status Badge Bar */}
            <div className="px-4 py-3 bg-[#F4F6F8] border-b border-[#D9E1E8] flex justify-between items-center">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded border uppercase ${
                selectedEntity.priority === 'HIGH'
                  ? 'bg-[#FFEBEE] text-[#C62828] border-[#EF9A9A]'
                  : 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]'
              }`}>
                {selectedEntity.priority} PRIORITY ENTITY
              </span>
              <span className="text-[11px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#C8E6C9]">
                {selectedEntity.statusLabel}
              </span>
            </div>

            {/* Dossier Details List */}
            <div className="p-4 space-y-3.5 text-xs text-[#263238]">
              
              {/* Jurisdiction */}
              <div>
                <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Jurisdiction Police Station</span>
                <div className="text-sm font-semibold text-[#123B63] mt-0.5">
                  {selectedEntity.psJurisdiction}
                </div>
                <div className="text-[11px] text-[#607D8B] mt-0.5">
                  {selectedEntity.district}, {selectedEntity.state}
                </div>
              </div>

              {/* Crime Type & Financial Footprint */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#D9E1E8]">
                <div>
                  <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Crime Type</span>
                  <span className="font-semibold text-[#263238] mt-0.5 inline-block">
                    {selectedEntity.crimeType}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#607D8B] uppercase block">Investigating Officer</span>
                  <span className="font-semibold text-[#1565C0] mt-0.5 inline-block truncate max-w-[150px]">
                    {selectedEntity.officerInCharge}
                  </span>
                </div>
              </div>

              {/* Infrastructure Identifiers */}
              <div className="bg-[#F8FAFC] border border-[#D9E1E8] rounded-lg p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#607D8B] font-medium">Telecom / Phone:</span>
                  <span className="font-semibold text-[#263238] font-mono">{selectedEntity.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B] font-medium">Hardware IMEI:</span>
                  <span className="font-semibold text-[#263238] font-mono text-[11px]">{selectedEntity.imei}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B] font-medium">Financial Channel:</span>
                  <span className="font-semibold text-[#C62828] text-[11px] truncate max-w-[180px]">{selectedEntity.financialTag}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B] font-medium">Signal Activity:</span>
                  <span className="font-semibold text-[#2E7D32]">{selectedEntity.lastActive}</span>
                </div>
              </div>

              {/* Linked FIRs */}
              <div>
                <span className="text-[11px] font-bold text-[#607D8B] uppercase block mb-1">
                  Registered FIRs &amp; Warrants ({selectedEntity.firs.length})
                </span>
                <div className="space-y-1">
                  {selectedEntity.firs.map((fir, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] border border-[#D9E1E8] rounded p-2 text-[11px] font-medium flex justify-between items-center text-[#263238]"
                    >
                      <span>{fir}</span>
                      <span className="text-[10px] font-bold text-[#1565C0] uppercase">VIEW</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brief Intelligence Summary */}
              <div>
                <span className="text-[11px] font-bold text-[#607D8B] uppercase block mb-1">
                  Investigation Gist
                </span>
                <p className="text-xs text-[#455A64] bg-[#F4F6F8] p-2.5 rounded-lg border border-[#D9E1E8] leading-relaxed">
                  {selectedEntity.description}
                </p>
              </div>

            </div>
          </div>

          {/* Action Buttons in Official Government Style */}
          <div className="p-4 bg-[#F4F6F8] border-t border-[#D9E1E8] space-y-2">
            <button
              onClick={() => executeAction('RAID_DISPATCH', 'Field Raid Intercept Order')}
              className="w-full py-2.5 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>🚔</span> DISPATCH JURISDICTION FIELD UNIT
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => executeAction('BNSS_FREEZE', 'Asset Freeze Order (BNSS 107)')}
                className="py-2 bg-[#FFFFFF] hover:bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A] font-medium rounded-lg text-[11px] transition-colors"
              >
                🔒 FREEZE ACCOUNTS
              </button>
              <button
                onClick={() => executeAction('SUBPOENA_CDR', 'Notice u/s 94 BNSS (CDR Dump)')}
                className="py-2 bg-[#FFFFFF] hover:bg-[#E3F2FD] text-[#1565C0] border border-[#90CAF9] font-medium rounded-lg text-[11px] transition-colors"
              >
                📄 SUBPOENA CDR DUMP
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
