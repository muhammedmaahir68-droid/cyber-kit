import React, { useState } from 'react';

export default function GovernmentAuthPortal({ onAuthenticate }) {
  const [officerId, setOfficerId] = useState('IN-DL-4412-SIT');
  const [officerName, setOfficerName] = useState('Inspector Vikramaditya Rao');
  const [designation, setDesignation] = useState('Inspector (Special Cyber Operations)');
  const [agency, setAgency] = useState('Indian Cyber Crime Coordination Centre (I4C)');
  const [branch, setBranch] = useState('Special Investigation Team (SIT) - Financial Mule & Hawala Ring');
  const [city, setCity] = useState('New Delhi HQ (North Block)');
  const [securityToken, setSecurityToken] = useState('MHA-SEC-TOKEN-89412');
  const [clearanceLevel, setClearanceLevel] = useState('LEVEL-3 (SECRET)');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);

  const verificationSteps = [
    'Verifying Security Token with National Intelligence Grid (NATGRID)...',
    'Validating Officer Public Key with Ministry of Home Affairs Root CA...',
    'Confirming Jurisdiction & Sub-Station Clearance (BNS Sec 63 Compliance)...',
    'Initializing FIPS 140-3 Cryptographic Hardware Handshake...',
    'Terminal Clearance Granted: LEVEL-3 (SECRET) Session Established.'
  ];

  const presets = [
    {
      name: 'Insp. Vikramaditya Rao',
      id: 'IN-DL-4412-SIT',
      desig: 'Inspector (Special Cyber Operations)',
      agency: 'Indian Cyber Crime Coordination Centre (I4C)',
      branch: 'Special Investigation Team (SIT) - Financial Mule & Hawala Ring',
      city: 'New Delhi HQ (North Block)',
      clearance: 'LEVEL-3 (SECRET)'
    },
    {
      name: 'SP Ananya Deshmukh, IPS',
      id: 'MH-IPS-2018-091',
      desig: 'Superintendent of Police (Cyber Crime)',
      agency: 'State Cyber Crime Police Station (CID Cyber Cell)',
      branch: 'Darknet & Crypto Threat Analytics Unit',
      city: 'Mumbai (Maharashtra State Cyber HQ, BKC)',
      clearance: 'LEVEL-3 (SECRET)'
    },
    {
      name: 'DSP Arvind Menon',
      id: 'TS-CYBER-5521',
      desig: 'Deputy Superintendent of Police',
      agency: 'Telangana Cyber Security Bureau (TGCSB)',
      branch: 'GNN Syndicate & Organized Crime Cartel Desk',
      city: 'Hyderabad (Cyberabad SIT Command)',
      clearance: 'LEVEL-3 (SECRET)'
    }
  ];

  const applyPreset = (p) => {
    setOfficerId(p.id);
    setOfficerName(p.name);
    setDesignation(p.desig);
    setAgency(p.agency);
    setBranch(p.branch);
    setCity(p.city);
    setClearanceLevel(p.clearance);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setVerifyStep(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setVerifyStep(currentStep);
      if (currentStep >= verificationSteps.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVerifying(false);
          onAuthenticate({
            officerId,
            officerName,
            designation,
            agency,
            branch,
            city,
            clearanceLevel,
            loginTime: new Date().toISOString(),
            sessionHash: 'a89f3b2c1e4d781056c9a341b802e49c7162fd0395e87a2bc1d8479e0fa61234'
          });
        }, 600);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Subtle Watermark Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="max-w-4xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl p-6 sm:p-10 relative z-10 space-y-6">
        
        {/* National Emblem & Institutional Header */}
        <div className="text-center space-y-3 border-b border-slate-800/80 pb-6">
          {/* Emblem of India Graphic (Ashoka Lion Capital SVG) */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center p-2.5 shadow-lg shadow-amber-950/40">
              <svg className="w-full h-full text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                {/* Ashoka Chakra & Lions Motif */}
                <path d="M12 2L15 5H18V8L21 11V13L18 16V19H15L12 22L9 19H6V16L3 13V11L6 8V5H9L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <path d="M12 8V16M8 12H16M9.17 9.17L14.83 14.83M14.83 9.17L9.17 14.83" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            
            <div className="text-left">
              <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold flex items-center gap-2">
                <span>GOVERNMENT OF INDIA</span>
                <span className="text-slate-500">•</span>
                <span>MINISTRY OF HOME AFFAIRS</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white mt-0.5">
                INDIAN CYBER CRIME COORDINATION CENTRE (I4C)
              </h1>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                <span>NATIONAL CYBER CRIME & FORENSIC INVESTIGATION SYSTEM (NCIS)</span>
                <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800 px-2 py-0.2 rounded font-bold">
                  RESTRICTED // SECRET
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs font-mono text-amber-300/80 tracking-widest font-semibold uppercase">
              सत्यमेव जयते (SATYAMEVA JAYATE)
            </span>
          </div>

          {/* Statutory Law Warning */}
          <div className="bg-red-950/30 border border-red-800/60 rounded-xl p-3 text-[11px] text-red-200/90 font-mono text-left space-y-1">
            <div className="font-bold flex items-center gap-2 text-red-400">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              OFFICIAL SECRETS ACT 1923 & SECTION 66F IT ACT 2000 (CYBER TERRORISM)
            </div>
            <p className="text-[10.5px] leading-relaxed text-red-300/80">
              Unauthorized access, tampering, or dissemination of classified forensic intelligence from this terminal is a non-bailable offense punishable by life imprisonment. Keystrokes, terminal fingerprints, and cryptographic handshakes are subject to continuous judicial audit.
            </p>
          </div>
        </div>

        {/* Quick Demo Credentials Presets */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex justify-between items-center">
            <span>Select Authorized Investigation Profile:</span>
            <span className="text-[10px] text-cyan-400 font-semibold">1-Click Fast Verification</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  officerId === p.id
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-slate-200 truncate">{p.name}</div>
                <div className="text-[10px] text-cyan-400 truncate mt-0.5">{p.id}</div>
                <div className="text-[10px] text-slate-500 truncate">{p.city}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Officer ID & Designation */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px]">Officer Service ID / Police PIN:</label>
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px]">Officer Full Name & Designation:</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Department & Agency */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px]">Law Enforcement Agency / Directorate:</label>
              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Indian Cyber Crime Coordination Centre (I4C)">Indian Cyber Crime Coordination Centre (I4C) - MHA</option>
                <option value="State Cyber Crime Police Station (CID Cyber Cell)">State Cyber Crime Police Station (CID Cyber Cell)</option>
                <option value="National Investigation Agency (NIA) - Cyber Wing">National Investigation Agency (NIA) - Cyber Wing</option>
                <option value="Central Bureau of Investigation (CBI) - Cyber Crimes">Central Bureau of Investigation (CBI) - Cyber Crimes</option>
                <option value="Telangana Cyber Security Bureau (TGCSB)">Telangana Cyber Security Bureau (TGCSB)</option>
                <option value="Maharashtra State Cyber Department (BKC)">Maharashtra State Cyber Department (BKC)</option>
              </select>
            </div>

            {/* Operational Desk / Branch */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px]">Operational Division / Desk:</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Special Investigation Team (SIT) - Financial Mule & Hawala Ring">SIT - Financial Mule & Hawala Ring</option>
                <option value="Darknet & Crypto Threat Analytics Unit">Darknet & Crypto Threat Analytics Unit</option>
                <option value="Digital Forensics & On-Scene Physical Drive Carving Wing">Digital Forensics & Physical Drive Carving Wing</option>
                <option value="GNN Syndicate & Organized Crime Cartel Desk">GNN Syndicate & Organized Crime Cartel Desk</option>
                <option value="Dial 112 ERSS Interceptor Mesh Command">Dial 112 ERSS Interceptor Mesh Command</option>
              </select>
            </div>

            {/* Jurisdiction City */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px]">Station Jurisdiction & City:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="New Delhi HQ (North Block)">New Delhi HQ (North Block / Central Command)</option>
                <option value="Mumbai (Maharashtra State Cyber HQ, BKC)">Mumbai (Maharashtra State Cyber HQ, BKC)</option>
                <option value="Bengaluru (Cyber Command Center)">Bengaluru (Cyber Command Center)</option>
                <option value="Hyderabad (Cyberabad SIT Command)">Hyderabad (Cyberabad SIT Command)</option>
                <option value="Kolkata (CID West Bengal Cyber Wing)">Kolkata (CID West Bengal Cyber Wing)</option>
                <option value="Chennai (State Cyber Crime Division)">Chennai (State Cyber Crime Division)</option>
                <option value="Ahmedabad (Gujarat Cyber Crime Police Station)">Ahmedabad (Gujarat Cyber Crime Police Station)</option>
                <option value="Jammu & Kashmir (Tactical Border Cyber Cell)">Jammu & Kashmir (Tactical Border Cyber Cell)</option>
              </select>
            </div>

            {/* Cryptographic Key Token */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px]">Hardware Token / 2FA Cryptographic Key:</label>
              <input
                type="password"
                value={securityToken}
                onChange={(e) => setSecurityToken(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-cyan-400 font-mono tracking-widest focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Verification Progress Modal / Strip */}
          {isVerifying && (
            <div className="bg-slate-950 border border-cyan-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-[11px] text-cyan-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  AUTHENTICATING WITH CENTRAL NATIONAL GRID...
                </span>
                <span className="font-bold">{verifyStep + 1} / {verificationSteps.length}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${((verifyStep + 1) / verificationSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                &gt; {verificationSteps[verifyStep]}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold uppercase tracking-wider text-xs shadow-xl shadow-cyan-950/50 transition-all border border-cyan-400/40 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <span>ESTABLISHING ENCRYPTED TERMINAL LINK...</span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <span>VERIFY CREDENTIALS & INITIALIZE NCIS-TACTICAL TERMINAL</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Audit Protocol */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-2">
          <span>PORTAL ID: I4C-NCIS-IND-2026-V3.4</span>
          <span>STATUTORY AUDIT: BNS 2023 SEC 63 & BSA SEC 65B CERTIFIED</span>
          <span className="text-emerald-400 font-bold">MHA SECURE NODE ONLINE</span>
        </div>

      </div>
    </div>
  );
}
