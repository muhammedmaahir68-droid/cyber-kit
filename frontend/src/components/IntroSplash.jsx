import React, { useState, useEffect } from 'react';
import { AshokaLionCapital, IndianFlag } from './NationalEmblems';

/**
 * NCIS-TACTICAL — Official Government Boot Intro Splash Screen
 * Official Dual-Color Theme: Navy #123B63, Blue #1565C0, Surfaces #FFFFFF, Background #F4F6F8
 * Auto-advances to login after 8 s if officer does not click.
 */
export default function IntroSplash({ onDone }) {
  const [phase, setPhase]           = useState(0);
  const [emblFade, setEmblFade]     = useState(false);
  const [nameFade, setNameFade]     = useState(false);
  const [idFade, setIdFade]         = useState(false);
  const [clsFade, setClsFade]       = useState(false);
  const [btnPulse, setBtnPulse]     = useState(false);

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

  const transition = 'transition-all duration-1000 ease-out';

  return (
    <div className="relative min-h-screen bg-[#F4F6F8] text-[#263238] flex flex-col overflow-hidden font-sans select-none">

      {/* Sovereignty Tricolor Top Ribbon */}
      <div className="w-full h-1.5 flex flex-shrink-0">
        <div className="w-1/3 bg-[#FF9933] h-full" />
        <div className="w-1/3 bg-white h-full" />
        <div className="w-1/3 bg-[#138808] h-full" />
      </div>

      {/* ── MAIN CONTENT — vertically centred ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-20">

        {/* ══ PHASE 0: EMBLEM ══ */}
        <div
          className={`flex flex-col items-center gap-4 ${transition} ${emblFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Emblem container */}
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-[#D9E1E8] bg-white p-2 shadow-md flex items-center justify-center">
              <AshokaLionCapital className="w-24 h-24 sm:w-28 sm:h-28 text-[#123B63] object-contain" />
            </div>
          </div>

          {/* सत्यमेव जयते */}
          <div className={`text-center ${transition} ${emblFade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="text-[#123B63] text-xl sm:text-2xl font-bold tracking-widest font-serif">
              सत्यमेव जयते
            </div>
            <div className="text-[#607D8B] text-xs tracking-[0.3em] uppercase mt-0.5">
              Truth Alone Triumphs
            </div>
          </div>

          {/* Govt of India line */}
          <div className={`flex items-center gap-3 ${transition} ${emblFade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <IndianFlag className="w-7 h-4.5 rounded-xs shadow-xs" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#123B63] uppercase">
              भारत सरकार &nbsp;|&nbsp; Government of India
            </span>
            <IndianFlag className="w-7 h-4.5 rounded-xs shadow-xs" />
          </div>
        </div>

        {/* ══ PHASE 1: PLATFORM IDENTITY ══ */}
        <div
          className={`mt-8 flex flex-col items-center gap-3 ${transition} ${nameFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Platform name */}
          <div className="text-center">
            <div className="text-xs font-semibold tracking-[0.3em] text-[#607D8B] uppercase mb-1">
              Secure Law Enforcement Platform
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-wider text-[#123B63] uppercase leading-none">
              NCIS
            </h1>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[0.2em] text-[#1565C0] uppercase mt-1">
              TACTICAL
            </h2>
          </div>

          {/* Full platform name */}
          <div className={`text-center ${transition} ${nameFade ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="text-sm sm:text-base text-[#263238] font-medium tracking-wide">
              National Cyber Crime &amp; Forensic Investigation System
            </div>
          </div>

          {/* Authority chain */}
          <div
            className={`mt-2 flex flex-col items-center gap-1 ${transition} ${idFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {[
              'Indian Cyber Crime Coordination Centre (I4C)',
              'Ministry of Home Affairs (MHA) · Bureau of Police Research & Development (BPR&D)',
              'Integrated with: NATGRID · CCTNS · ICJS · NCRB Watchlist',
            ].map((line, i) => (
              <div
                key={i}
                className="text-xs text-[#607D8B] tracking-wide text-center"
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {line}
              </div>
            ))}

            {/* Divider */}
            <div className="mt-3 flex items-center gap-3">
              <div className="w-16 h-px bg-[#D9E1E8]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
              <div className="w-16 h-px bg-[#D9E1E8]" />
            </div>
          </div>
        </div>

        {/* ══ PHASE 2: CLASSIFICATION + PROCEED ══ */}
        <div
          className={`mt-6 flex flex-col items-center gap-4 ${transition} ${clsFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Classification badge */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-[#EF9A9A] bg-[#FFEBEE]">
              <span className="w-2 h-2 rounded-full bg-[#C62828] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#C62828] uppercase">
                RESTRICTED &nbsp;//&nbsp; FOR LAW ENFORCEMENT USE ONLY
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C62828] animate-pulse" />
            </div>
            <div className="text-[11px] text-[#607D8B] text-center">
              Authorised under BNS 2023 Sec 63 &amp; Bharatiya Sakshya Adhiniyam Sec 65B
            </div>
          </div>

          {/* Proceed button (Solid Government Blue, No Gradients) */}
          <div className={`${transition} ${btnPulse ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <button
              onClick={onDone}
              className="px-8 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#1565C0] hover:bg-[#0D47A1] transition-colors shadow-sm flex items-center gap-2.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>PROCEED TO SECURE LOGIN</span>
            </button>
          </div>

          {/* Auto-advance hint */}
          <div className={`text-[11px] text-[#607D8B] ${transition} ${btnPulse ? 'opacity-100' : 'opacity-0'}`}>
            Auto-advancing in 8 seconds &nbsp;|&nbsp; Unauthorised access is a criminal offence
          </div>
        </div>

      </div>

      {/* Bottom status bar */}
      <div className="flex-shrink-0 border-t border-[#D9E1E8] bg-[#FFFFFF] px-6 py-2.5 flex justify-between items-center text-xs text-[#607D8B]">
        <span>NCIS-TACTICAL &bull; I4C / MHA &bull; CLASSIFIED</span>
        <span>Build: PROD-2026.09 &bull; CCTNS / ICJS / NATGRID Integrated</span>
      </div>

      {/* Bottom Tiranga stripe */}
      <div className="w-full h-1 flex flex-shrink-0">
        <div className="w-1/3 bg-[#FF9933] h-full" />
        <div className="w-1/3 bg-white h-full" />
        <div className="w-1/3 bg-[#138808] h-full" />
      </div>
    </div>
  );
}
