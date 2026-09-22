import React, { useState, useEffect, useRef } from 'react';

export default function EdgeHardwareConsole({ officerSession, onDataRetrieved }) {
  // ── Hardware Switch States ──
  const [powerOn, setPowerOn] = useState(true);
  const [writeBlockerEngaged, setWriteBlockerEngaged] = useState(true);
  const [selectedBus, setSelectedBus] = useState('NVME_PCIE'); // NVME_PCIE, SATA_DIRECT, USB32_EXPRESS, JTAG_DIAG
  const [selectedPort, setSelectedPort] = useState('PORT_A');
  const [npuCoProcessor, setNpuCoProcessor] = useState(true);

  // ── Device Connection & Acquisition States ──
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [retrievalProgress, setRetrievalProgress] = useState(0);
  const [bytesRetrieved, setBytesRetrieved] = useState(0);
  const [readSpeed, setReadSpeed] = useState('0.0 MB/s');
  const [retrievalComplete, setRetrievalComplete] = useState(false);
  const [retrievedHash, setRetrievedHash] = useState('CALCULATING...');
  const [badSectors, setBadSectors] = useState(0);

  // ── Live Hex Stream Preview ──
  const [hexLines, setHexLines] = useState([]);
  const [carvedArtifacts, setCarvedArtifacts] = useState([]);

  // Hardware Profiles (Seized drives/devices plugged into the physical unit)
  const deviceProfiles = {
    NVME_PCIE: {
      name: 'Samsung 980 PRO NVMe SSD (M.2 PCIe 4.0)',
      serial: 'S5GXNX0T820194E',
      capacity: '1,000,204,886,016 Bytes (1.0 TB)',
      sectors: '1,953,525,168 Sectors (512-byte emulation)',
      smartHealth: '98% (Good) • 42°C',
      controller: 'PCIe Gen4 x4 NVMe 1.3c Protocol',
      firmware: '5B2QGXA7'
    },
    SATA_DIRECT: {
      name: 'Seagate Barracuda 2TB Forensic HDD',
      serial: 'W0V2B89J',
      capacity: '2,000,398,934,016 Bytes (2.0 TB)',
      sectors: '3,907,029,168 Sectors',
      smartHealth: '92% (Normal) • 36°C',
      controller: 'SATA III 6.0 Gb/s Direct Host Channel',
      firmware: '0001SDM1'
    },
    USB32_EXPRESS: {
      name: 'SanDisk Extreme 512GB Ruggedized USB',
      serial: 'SD-EXT-9941-K',
      capacity: '512,110,592,000 Bytes (512 GB)',
      sectors: '1,000,216,000 Sectors',
      smartHealth: '100% (Optimal) • 31°C',
      controller: 'USB 3.2 Gen 2x2 (20 Gbps) Bridge',
      firmware: '1.04.09'
    },
    JTAG_DIAG: {
      name: 'OnePlus 11 Seized Mobile (Direct Chip Dump)',
      serial: 'QUALCOMM-SM8550-JTAG-UART',
      capacity: '256,000,000,000 Bytes (256 GB UFS 4.0)',
      sectors: '500,000,000 Memory Blocks',
      smartHealth: 'Locked Device • Test Points Active',
      controller: 'Qualcomm EDL / JTAG Boundary Scan Tap',
      firmware: 'QFIL-EDL-v2.9.1'
    }
  };

  const activeDevice = deviceProfiles[selectedBus];

  // Helper to generate live hex bytes
  const generateHexRow = (offset) => {
    const hexChars = '0123456789ABCDEF';
    let bytes = '';
    let ascii = '';
    for (let i = 0; i < 16; i++) {
      const b1 = hexChars[Math.floor(Math.random() * 16)];
      const b2 = hexChars[Math.floor(Math.random() * 16)];
      bytes += b1 + b2 + ' ';
      const code = parseInt(b1 + b2, 16);
      ascii += (code >= 32 && code <= 126) ? String.fromCharCode(code) : '.';
    }
    const offsetHex = offset.toString(16).padStart(8, '0').toUpperCase();
    return `${offsetHex}:  ${bytes.slice(0, 24)} ${bytes.slice(24)} |${ascii}|`;
  };

  // Connect / Disconnect flow
  const handleConnectToggle = () => {
    if (deviceConnected) {
      // Disconnect
      setDeviceConnected(false);
      setIsRetrieving(false);
      setRetrievalProgress(0);
      setRetrievalComplete(false);
      setHexLines([]);
      setCarvedArtifacts([]);
      return;
    }

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setDeviceConnected(true);
      // Generate initial sector dump
      const initial = [];
      for (let i = 0; i < 8; i++) {
        initial.push(generateHexRow(i * 16));
      }
      setHexLines(initial);
    }, 1200);
  };

  // Retrieve Data / Bitstream Acquisition flow
  const handleStartRetrieval = () => {
    if (!deviceConnected || isRetrieving) return;

    setIsRetrieving(true);
    setRetrievalComplete(false);
    setRetrievalProgress(0);
    setCarvedArtifacts([]);

    let progress = 0;
    let currentOffset = 128;

    const interval = setInterval(() => {
      progress += 4;
      if (progress > 100) progress = 100;
      setRetrievalProgress(progress);

      // Speed gauge
      const currentSpeed = (240 + Math.random() * 85).toFixed(1);
      setReadSpeed(`${currentSpeed} MB/s`);
      setBytesRetrieved(Math.round((progress / 100) * 512 * 1024 * 1024));

      // Stream fresh hex rows
      currentOffset += 16 * 4;
      setHexLines(prev => [
        generateHexRow(currentOffset),
        generateHexRow(currentOffset + 16),
        ...prev.slice(0, 10)
      ]);

      // Trigger carved artifacts detection during bitstream retrieval
      if (progress === 20) {
        setCarvedArtifacts(prev => [
          ...prev,
          { name: 'sqlite_chats_signal.db', offset: '0x000F41A0', size: '14.8 MB', hash: '8f92b7c4a1...', integrity: 'PASS' }
        ]);
      } else if (progress === 44) {
        setCarvedArtifacts(prev => [
          ...prev,
          { name: 'EXIF_Glock19_contraband.jpg', offset: '0x0021A900', size: '4.2 MB', hash: 'c4e901a88b...', integrity: 'PASS' }
        ]);
      } else if (progress === 68) {
        setCarvedArtifacts(prev => [
          ...prev,
          { name: 'hawala_ledger_accounts.xlsx', offset: '0x005E23C0', size: '1.9 MB', hash: 'e2091fb99c...', integrity: 'PASS' }
        ]);
      } else if (progress === 88) {
        setCarvedArtifacts(prev => [
          ...prev,
          { name: 'vpn_session_wireguard.conf', offset: '0x0088F020', size: '320 KB', hash: 'a12bc9004f...', integrity: 'PASS' }
        ]);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setIsRetrieving(false);
        setRetrievalComplete(true);
        setReadSpeed('0.0 MB/s');
        setRetrievedHash('9f83ac12781b2e67a0918c5e31fa6b7829104085e91a0c8b671a938b819f01ab');
        if (onDataRetrieved) {
          onDataRetrieved({
            bus: selectedBus,
            device: activeDevice.name,
            hash: '9f83ac12781b2e67a0918c5e31fa6b7829104085e91a0c8b671a938b819f01ab',
            artifacts: 4
          });
        }
      }
    }, 180);
  };

  const handleAbort = () => {
    setIsRetrieving(false);
    setReadSpeed('0.0 MB/s');
  };

  return (
    <div className="space-y-6 font-mono select-none">

      {/* ── TOP HARDWARE BANNER ── */}
      <div className="bg-[#050c15] border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-base font-black text-white tracking-widest uppercase">
              MOD-05: TACTICAL FORENSIC HARDWARE TERMINAL
            </h2>
            <span className="text-[10px] px-2.5 py-0.5 rounded border border-cyan-800 bg-cyan-950/80 text-cyan-300 font-bold">
              BPR&amp;D COMPLIANT BUS ACQUISITION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Direct physical hardware interface. Engage write-blocker, select target bus, connect target evidence drive, and execute raw sector bitstream retrieval.
          </p>
        </div>

        {/* Top Status LED Panel */}
        <div className="flex items-center gap-3 bg-[#020810] border border-slate-800 px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${powerOn ? 'bg-emerald-400 shadow-md shadow-emerald-500/50' : 'bg-slate-700'}`} />
            <span className="text-[10px] text-slate-400">PWR</span>
          </div>
          <div className="w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${writeBlockerEngaged ? 'bg-amber-400 shadow-md shadow-amber-500/50' : 'bg-rose-500 shadow-md shadow-rose-500/50'}`} />
            <span className="text-[10px] text-slate-400">W-BLOCK</span>
          </div>
          <div className="w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${deviceConnected ? 'bg-cyan-400 shadow-md shadow-cyan-500/50' : 'bg-slate-700'}`} />
            <span className="text-[10px] text-slate-400">LINK</span>
          </div>
          <div className="w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isRetrieving ? 'bg-purple-400 animate-ping' : 'bg-slate-700'}`} />
            <span className="text-[10px] text-slate-400">RX/TX</span>
          </div>
        </div>
      </div>

      {/* ── HARDWARE PHYSICAL SWITCHES & BUS SELECTOR ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* SWITCH 1: Hardware Write-Blocker */}
        <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            1. Write-Blocker Bus Lock
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-xs font-bold ${writeBlockerEngaged ? 'text-amber-400' : 'text-rose-400'}`}>
                {writeBlockerEngaged ? 'READ-ONLY (LOCKED)' : 'WRITE BYPASS (DANGER)'}
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                {writeBlockerEngaged ? 'Protects original physical media' : 'Evidentiary write contamination'}
              </div>
            </div>
            {/* Tactile toggle switch */}
            <button
              onClick={() => setWriteBlockerEngaged(!writeBlockerEngaged)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                writeBlockerEngaged ? 'bg-amber-600' : 'bg-rose-900 border border-rose-600'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  writeBlockerEngaged ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SWITCH 2: Power Rail Controller */}
        <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            2. 12V/5V Hardware Power Bus
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-xs font-bold ${powerOn ? 'text-emerald-400' : 'text-slate-500'}`}>
                {powerOn ? 'BUS POWER: ACTIVE' : 'BUS POWER: CUT'}
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">Isolated SATA/PCIe rail</div>
            </div>
            <button
              onClick={() => {
                setPowerOn(!powerOn);
                if (powerOn && deviceConnected) setDeviceConnected(false);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                powerOn ? 'bg-emerald-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  powerOn ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SWITCH 3: NPU Co-Processor */}
        <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            3. Hailo-8L NPU Co-Processor
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-xs font-bold ${npuCoProcessor ? 'text-purple-400' : 'text-slate-500'}`}>
                {npuCoProcessor ? '26 TOPS ON-CHIP' : 'STANDBY (BYPASS)'}
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">Real-time tensor carving</div>
            </div>
            <button
              onClick={() => setNpuCoProcessor(!npuCoProcessor)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                npuCoProcessor ? 'bg-purple-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  npuCoProcessor ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SWITCH 4: Physical Port Selection */}
        <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            4. Hardware Target Bay
          </div>
          <div className="flex items-center gap-2">
            {['PORT_A', 'PORT_B', 'PORT_C'].map(port => (
              <button
                key={port}
                onClick={() => {
                  setSelectedPort(port);
                  if (deviceConnected) setDeviceConnected(false);
                }}
                className={`flex-1 py-1.5 rounded text-[11px] font-bold border transition-all ${
                  selectedPort === port
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                    : 'bg-[#060d1a] text-slate-500 border-slate-800 hover:text-slate-300'
                }`}
              >
                {port.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── BUS PROTOCOL SELECTOR STRIP ── */}
      <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Target Interface Bus (Select Protocol based on Seized Media)</span>
          <span className="text-cyan-400 text-[11px]">ACTIVE: {selectedBus}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'NVME_PCIE', label: 'PCIe 4.0 NVMe', desc: 'Direct M.2 / U.2 Bus', max: '64 Gbps' },
            { id: 'SATA_DIRECT', label: 'SATA Direct', desc: '2.5" / 3.5" HDD & SSD', max: '6.0 Gbps' },
            { id: 'USB32_EXPRESS', label: 'USB 3.2 Gen2', desc: 'Flash & External SSD', max: '20 Gbps' },
            { id: 'JTAG_DIAG', label: 'JTAG / EDL Bus', desc: 'Mobile Chip Direct Dump', max: '1.2 Gbps' },
          ].map(bus => (
            <button
              key={bus.id}
              disabled={isRetrieving}
              onClick={() => {
                setSelectedBus(bus.id);
                if (deviceConnected) setDeviceConnected(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedBus === bus.id
                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/40 shadow-lg'
                  : 'bg-[#060d1a] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs uppercase">{bus.label}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                  {bus.max}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-sans">{bus.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN WORKSPACE: DEVICE DETAILS & CONTROLS (Left 5) + LIVE BITSTREAM RETRIEVAL (Right 7) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT: Hardware Diagnostics & Touch Control Buttons (5 cols) ── */}
        <div className="lg:col-span-5 space-y-4">

          {/* Connected Device Card */}
          <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">DETECTED PHYSICAL TARGET</div>
                <div className="text-sm font-bold text-white mt-0.5">{activeDevice.name}</div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                deviceConnected
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-slate-900 text-slate-500 border-slate-700'
              }`}>
                {deviceConnected ? 'HARDWARE LOCKED' : 'DISCONNECTED'}
              </span>
            </div>

            {/* Hardware Parameters */}
            <div className="bg-[#060d1a] rounded-xl p-3.5 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">SERIAL NO:</span>
                <span className="text-slate-200 font-bold">{activeDevice.serial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">RAW CAPACITY:</span>
                <span className="text-cyan-400 font-bold">{activeDevice.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TOTAL SECTORS:</span>
                <span className="text-slate-300">{activeDevice.sectors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BUS CONTROLLER:</span>
                <span className="text-slate-300 text-[11px] truncate max-w-[200px]">{activeDevice.controller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SMART TELEMETRY:</span>
                <span className="text-emerald-400 font-bold">{activeDevice.smartHealth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">FIRMWARE:</span>
                <span className="text-slate-400">{activeDevice.firmware}</span>
              </div>
            </div>

            {/* ACTION BUTTON 1: CONNECT / DISCONNECT TOUCH BUTTON */}
            <button
              onClick={handleConnectToggle}
              disabled={isConnecting || isRetrieving}
              className={`w-full py-3.5 rounded-xl font-bold tracking-widest text-xs uppercase transition-all shadow-xl flex items-center justify-center gap-2 ${
                deviceConnected
                  ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700 shadow-rose-950/40'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-black border border-cyan-400 shadow-cyan-950/50'
              }`}
            >
              {isConnecting ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  ESTABLISHING HARDWARE HANDSHAKE...
                </>
              ) : deviceConnected ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  DISCONNECT EVIDENCE HARDWARE
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  CONNECT HARDWARE BUS ({selectedBus})
                </>
              )}
            </button>

            {/* ACTION BUTTON 2: RETRIEVE DATA (RAW BITSTREAM ACQUISITION) */}
            <button
              onClick={handleStartRetrieval}
              disabled={!deviceConnected || isRetrieving}
              className={`w-full py-4 rounded-xl font-black tracking-widest text-sm uppercase transition-all shadow-2xl flex items-center justify-center gap-2.5 ${
                !deviceConnected
                  ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                  : isRetrieving
                  ? 'bg-amber-600/70 border border-amber-500 text-white animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black border border-emerald-400 shadow-emerald-950/60'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isRetrieving ? 'RETRIEVING PHYSICAL BITSTREAM...' : 'RETRIEVE DATA (RAW FORENSIC DUMP)'}
            </button>

            {/* Abort button when reading */}
            {isRetrieving && (
              <button
                onClick={handleAbort}
                className="w-full py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-lg text-xs font-bold transition-all uppercase tracking-wider"
              >
                ABORT / EMERGENCY STOP BUS
              </button>
            )}
          </div>

          {/* Quick Hardware Compliance Strip */}
          <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-4 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              JUDICIAL EVIDENCE INTEGRITY PROTOCOL
            </div>
            <div>• Bit-for-bit physical block capture with cryptographic verification.</div>
            <div>• Hardware write-blocker ensures zero modification to target media.</div>
            <div>• Court certified under BSA Sec 65B &amp; BNS 2023 Sec 63.</div>
          </div>
        </div>

        {/* ── RIGHT: Live Bitstream Retrieval Engine, Hex Display & Carved Artifacts (7 cols) ── */}
        <div className="lg:col-span-7 space-y-4">

          {/* Acquisition Progress & Gauges */}
          <div className="bg-[#0a1525] border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isRetrieving ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
                  PHYSICAL DATA ACQUISITION ENGINE
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Continuous raw sector bitstream dump with real-time SHA-256 sealing</p>
              </div>
              <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                {readSpeed}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Acquisition Progress:</span>
                <span className="text-emerald-400 font-bold">{retrievalProgress}%</span>
              </div>
              <div className="w-full bg-[#020810] h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-400 h-full transition-all duration-200"
                  style={{ width: `${retrievalProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>{(bytesRetrieved / (1024 * 1024)).toFixed(1)} MB Retained</span>
                <span>Bad Sectors: {badSectors} (Zero Faults)</span>
              </div>
            </div>

            {/* 3 Metric Mini-Tiles */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#060d1a] p-2.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Throughput</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">{readSpeed}</div>
              </div>
              <div className="bg-[#060d1a] p-2.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Hardware Hash</div>
                <div className="text-sm font-bold text-purple-400 mt-0.5">SHA-256 + MD5</div>
              </div>
              <div className="bg-[#060d1a] p-2.5 rounded-lg border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Evidence State</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  {retrievalComplete ? 'SEALED 100%' : isRetrieving ? 'STREAMING' : 'IDLE'}
                </div>
              </div>
            </div>

            {/* Live Raw Hex Stream Display */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest flex justify-between">
                <span>RAW PHYSICAL SECTOR STREAM (DIRECT DISK HEX)</span>
                <span className="text-slate-500">OFFSET: 0x00000000 &rarr; 0x1FFFFFFF</span>
              </div>
              <div className="bg-[#020810] border border-slate-800/90 rounded-lg p-3 font-mono text-[10px] text-emerald-400/90 h-36 overflow-hidden leading-relaxed select-text">
                {hexLines.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-600">
                    AWAITING HARDWARE BUS CONNECTION &amp; DATA RETRIEVAL COMMAND...
                  </div>
                ) : (
                  hexLines.map((line, idx) => (
                    <div key={idx} className="whitespace-pre truncate">{line}</div>
                  ))
                )}
              </div>
            </div>

            {/* Real-time Carved Artifacts Found */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest flex justify-between">
                <span>CARVED EVIDENCE ARTIFACTS ISOLATED IN REAL-TIME</span>
                <span className="text-purple-400 font-bold">{carvedArtifacts.length} FOUND</span>
              </div>

              {carvedArtifacts.length === 0 ? (
                <div className="bg-[#060d1a] border border-slate-800 rounded-lg p-4 text-center text-slate-600 text-xs">
                  Evidence artifacts will appear here as raw sectors are decoded by the Hailo-8L co-processor.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {carvedArtifacts.map((art, idx) => (
                    <div
                      key={idx}
                      className="bg-[#060d1a] border border-slate-800/90 p-2.5 rounded-lg flex justify-between items-center text-xs"
                    >
                      <div>
                        <div className="text-cyan-300 font-bold">{art.name}</div>
                        <div className="text-[10px] text-slate-500">Offset: {art.offset} • Size: {art.size}</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
                        {art.integrity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Retrieval Complete Summary & Forwarding */}
            {retrievalComplete && (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-700/80 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  PHYSICAL DATA RETRIEVAL COMPLETE • BITSTREAM SEALED
                </div>
                <div className="text-[10px] text-slate-300 break-all">
                  <span className="text-slate-500">COURT HASH (SHA-256): </span>{retrievedHash}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
