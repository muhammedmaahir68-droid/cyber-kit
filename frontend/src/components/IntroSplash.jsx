import React, { useState, useEffect } from 'react';
import { AshokaLionCapital, IndianFlag } from './NationalEmblems';

/**
 * NCIS-TACTICAL — Government Boot Intro Splash Screen
 * 3-phase cinematic sequence:
 *   Phase 0 → Emblem reveal
 *   Phase 1 → Identity / platform name
 *   Phase 2 → Classification + Proceed button
 * Auto-advances to login after 8 s if officer does not click.
 */
export default function IntroSplash({ onDone }) {
  const [phase, setPhase]           = useState(0);
  const [emblFade, setEmblFade]     = useState(false);
  const [nameFade, setNameFade]     = useState(false);
  const [idFade, setIdFade]         = useState(false);
  const [clsFade, setClsFade]       = useState(false);
  const [btnPulse, setBtnPulse]     = useState(false);
  const [scanLine, setScanLine]     = useState(0);

  /* ── Phase timer sequence ── */
  useEffect(() => {
    // Phase 0 — emblem fades in immediately
    const t0 = setTimeout(() => setEmblFade(true), 100);

    // Phase 1 — platform identity block
    const t1 = setTimeout(() => { setPhase(1); setNameFade(true); }, 2200);
    const t2 = setTimeout(() => setIdFade(true), 3200);

    // Phase 2 — classification + proceed
    const t3 = setTimeout(() => { setPhase(2); setClsFade(true); }, 5000);
    const t4 = setTimeout(() => setBtnPulse(true), 5600);

    // Auto-advance after 8 seconds
    const t5 = setTimeout(() => onDone(), 8000);

    return () => [t0,t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, [onDone]);

  /* ── Scan-line animation ── */
  useEffect(() => {
    const iv = setInterval(() => setScanLine(p => (p + 1) % 100), 30);
    return () => clearInterval(iv);
  }, []);

  const transition = 'transition-all duration-1000 ease-out';

  return (
    <div className="relative min-h-screen bg-[#020810] flex flex-col overflow-hidden font-mono select-none">

      {/* Tiranga top stripe */}
      <div className="w-full h-1.5 bg-gradient-to-r from-amber-500 via-white to-green-600 flex-shrink-0" />

      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(180,130,20,0.07) 0%, transparent 70%)' }}
      />

      {/* Scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`,
          backgroundPositionY: `${scanLine}px`
        }}
      />

      {/* Moving scan-bar */}
      <div
        className="absolute left-0 right-0 h-16 pointer-events-none z-10"
        style={{
          top: `${scanLine}%`,
          background: 'linear-gradient(to bottom, transparent, rgba(200,160,0,0.025), transparent)',
          transition: 'none'
        }}
      />

      {/* ── MAIN CONTENT — vertically centred ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-20">

        {/* ══ PHASE 0: EMBLEM ══ */}
        <div
          className={`flex flex-col items-center gap-5 ${transition} ${emblFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Emblem with glow rings */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulse ring */}
            <div className={`absolute rounded-full border border-amber-500/20 ${emblFade ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
              style={{ width: 220, height: 220, transition: 'all 3s ease-out', animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite' }}
            />
            {/* Amber glow */}
            <div className="absolute rounded-full"
              style={{ width: 180, height: 180, background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)' }}
            />
            {/* Emblem image */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-amber-500/80 ring-4 ring-amber-500/20 overflow-hidden shadow-2xl shadow-amber-950/60 bg-[#020810]">
              <img
                src="/emblem_india.jpg"
                alt="State Emblem of India"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/240px-Emblem_of_India.svg.png';
                }}
              />
            </div>
          </div>

          {/* सत्यमेव जयते */}
          <div className={`text-center ${transition} ${emblFade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="text-amber-400 text-xl sm:text-2xl font-bold tracking-widest" style={{ fontFamily: 'serif' }}>
              सत्यमेव जयते
            </div>
            <div className="text-slate-500 text-[10px] tracking-[0.4em] uppercase mt-1">
              Truth Alone Triumphs
            </div>
          </div>

          {/* Govt of India line */}
          <div className={`flex items-center gap-3 ${transition} ${emblFade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <IndianFlag className="w-8 h-5 rounded-sm" />
            <span className="text-[11px] font-mono tracking-[0.35em] text-amber-400/80 uppercase font-bold">
              भारत सरकार &nbsp;|&nbsp; Government of India
            </span>
            <IndianFlag className="w-8 h-5 rounded-sm" />
          </div>
        </div>

        {/* ══ PHASE 1: PLATFORM IDENTITY ══ */}
        <div
          className={`mt-10 flex flex-col items-center gap-4 ${transition} ${nameFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Platform name */}
          <div className="text-center">
            <div className="text-[11px] font-mono tracking-[0.5em] text-slate-500 uppercase mb-2">
              Secure Command Platform
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-wider text-white uppercase leading-none"
              style={{ letterSpacing: '0.12em', textShadow: '0 0 60px rgba(245,158,11,0.15)' }}
            >
              NCIS
            </h1>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-amber-400 uppercase mt-1">
              TACTICAL
            </h2>
          </div>

          {/* Full platform name */}
          <div className={`text-center ${transition} ${nameFade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="text-sm sm:text-base text-slate-300 tracking-wider font-light">
              National Cyber Crime Investigation Platform
            </div>
          </div>

          {/* Authority chain */}
          <div
            className={`mt-2 flex flex-col items-center gap-1.5 ${transition} ${idFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {[
              'Indian Cyber Crime Coordination Centre (I4C)',
              'Ministry of Home Affairs (MHA) · Bureau of Police Research & Development (BPR&D)',
              'Integrated with: NATGRID · CCTNS · ICJS · NCRB Watchlist',
            ].map((line, i) => (
              <div
                key={i}
                className="text-[11px] font-mono text-slate-500 tracking-widest text-center"
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {line}
              </div>
            ))}

            {/* Divider */}
            <div className="mt-3 flex items-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
            </div>
          </div>
        </div>

        {/* ══ PHASE 2: CLASSIFICATION + PROCEED ══ */}
        <div
          className={`mt-8 flex flex-col items-center gap-5 ${transition} ${clsFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Classification badge */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-5 py-2 rounded-lg border border-rose-700/70 bg-rose-950/50">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-rose-300 uppercase">
                RESTRICTED &nbsp;//&nbsp; FOR LAW ENFORCEMENT USE ONLY
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            </div>
            <div className="text-[10px] font-mono text-slate-600 tracking-widest text-center">
              Authorised under BNS 2023 Sec 63 &amp; Bharatiya Sakshya Adhiniyam Sec 65B
            </div>
          </div>

          {/* Proceed button */}
          <div className={`${transition} ${btnPulse ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <button
              onClick={onDone}
              className="relative group px-10 py-4 rounded-xl font-mono font-black text-sm tracking-[0.3em] uppercase text-black bg-amber-500 hover:bg-amber-400 transition-all shadow-2xl shadow-amber-950/50 overflow-hidden"
            >
              {/* Shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                PROCEED TO SECURE LOGIN
              </div>
            </button>
          </div>

          {/* Auto-advance hint */}
          <div className={`text-[10px] font-mono text-slate-700 tracking-widest ${transition} ${btnPulse ? 'opacity-100' : 'opacity-0'}`}>
            Auto-advancing in 8 seconds &nbsp;|&nbsp; Unauthorised access is a criminal offence
          </div>
        </div>

      </div>

      {/* Bottom status bar */}
      <div className="flex-shrink-0 border-t border-slate-800/60 bg-[#020810] px-6 py-2 flex justify-between items-center text-[10px] font-mono text-slate-700">
        <span>NCIS-TACTICAL · I4C / MHA · CLASSIFIED</span>
        <span>Build: PROD-2026.09 · CCTNS / ICJS / NATGRID Integrated</span>
      </div>

      {/* Bottom Tiranga stripe */}
      <div className="w-full h-1 bg-gradient-to-r from-amber-500 via-white to-green-600 flex-shrink-0" />
    </div>
  );
}
