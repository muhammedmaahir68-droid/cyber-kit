import os

with open(r"frontend/src/App.jsx", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add GovernmentAuthPortal import
old_import = "import RealtimeOpsView from './components/RealtimeOpsView';"
new_import = "import RealtimeOpsView from './components/RealtimeOpsView';\nimport GovernmentAuthPortal from './components/GovernmentAuthPortal';"
if old_import in code:
    code = code.replace(old_import, new_import, 1)

# 2. Add officerSession state and authentication handlers
old_state = "  const [sessionUuid, setSessionUuid] = useState('FX-20260829-9941');"
new_state = """  const [officerSession, setOfficerSession] = useState(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('ncis_officer_session') : null;
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const handleAuthenticate = (sessionData) => {
    setOfficerSession(sessionData);
    sessionStorage.setItem('ncis_officer_session', JSON.stringify(sessionData));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ncis_officer_session');
    setOfficerSession(null);
  };

  const [sessionUuid, setSessionUuid] = useState('FX-20260829-9941');"""
if old_state in code:
    code = code.replace(old_state, new_state, 1)

# 3. Add early return if !officerSession
old_return = "  return (\n    <div className=\"min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans antialiased\">"
new_return = """  if (!officerSession) {
    return <GovernmentAuthPortal onAuthenticate={handleAuthenticate} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans antialiased">"""
if old_return in code:
    code = code.replace(old_return, new_return, 1)

# 4. Enhance header with active officer details, Ashoka Capital emblem, and Switch Desk button
header_search = """      {/* Top Professional Header */}
      <header className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">"""

header_replace = """      {/* Top Professional Header */}
      <header className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4 font-mono">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-amber-500/50 flex items-center justify-center p-2 text-amber-400 shadow-lg shadow-amber-950/40">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 5H18V8L21 11V13L18 16V19H15L12 22L9 19H6V16L3 13V11L6 8V5H9L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <path d="M12 8V16M8 12H16M9.17 9.17L14.83 14.83M14.83 9.17L9.17 14.83" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                NCIS-TACTICAL <span className="text-slate-400 text-xs sm:text-sm font-normal">| NATIONAL CYBER CRIME INVESTIGATION PLATFORM</span>
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-700/80 font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                RESTRICTED // LAW ENFORCEMENT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
              Bureau of Police Research & Development (BPR&D) • Indian Cybercrime Coordination Centre (I4C) • Ministry of Home Affairs
            </p>
          </div>
        </div>

        {/* Officer Active Session Strip & Logout */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <div>
              <div className="text-[11px] font-bold text-slate-200">{officerSession?.officerName || 'Inspector Vikramaditya Rao'}</div>
              <div className="text-[10px] text-cyan-400 truncate max-w-[240px]">{officerSession?.officerId || 'IN-DL-4412-SIT'} • {officerSession?.city || 'New Delhi HQ'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Securely Logout & Return to National Police Gateway"
            className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900/90 text-rose-300 border border-rose-800 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Switch Desk
          </button>
        </div>
      </header>

      {/* Secondary Status Ribbon with Station, Division, and Legal Compliance */}
      <div className="max-w-7xl mx-auto mb-5 bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold uppercase">{officerSession?.agency || 'I4C CENTRAL COMMAND'}</span>
          <span>&gt;</span>
          <span className="text-slate-300">{officerSession?.branch || 'SIT Financial Mule Ring Desk'}</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            WRITE-BLOCKER: ACTIVE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300 font-bold">{officerSession?.clearanceLevel || 'LEVEL-3 (SECRET)'}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-bold">BNS 2023 SEC 63 / BSA SEC 65B</span>
        </div>
      </div>"""

# Replace the entire old header block
old_header_block_start = code.find('{/* Top Professional Header */}')
old_header_block_end = code.find('{/* UNIFIED 5-CORE NAVIGATION BAR */}')

if old_header_block_start >= 0 and old_header_block_end >= 0:
    code = code[:old_header_block_start] + header_replace + "\n\n      " + code[old_header_block_end:]
    print("[+] Successfully replaced header with active officer session ribbon.")
else:
    print("[-] Header block boundaries not found.")

with open(r"frontend/src/App.jsx", "w", encoding="utf-8", newline="\n") as f:
    f.write(code)

print("Updated App.jsx successfully.")
