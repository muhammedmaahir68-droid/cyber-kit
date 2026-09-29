import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    num: 1,
    title: 'Slide 1: Title & Problem Statement Details',
    badge: 'IDEA SUBMISSION',
    image: '/slides/Slide1_SIH189.jpg',
    summary: 'NCIS-TACTICAL platform overview, Problem Statement 189 (BPR&D / MHA) and SIH26150 (NTRO), Team NCIS Core Cyber Intelligence Team.'
  },
  {
    num: 2,
    title: 'Slide 2: Proposed Solution & 6 Modules',
    badge: 'PROPOSED SOLUTION',
    image: '/slides/Slide2_SIH189.jpg',
    summary: '6 Operational Modules (Live Surveillance, Forensics & DVR, GNN Syndicate, ERSS Patrol, Tactical HW, Case Copilot Voice AI) & 3 Core Differentiators.'
  },
  {
    num: 3,
    title: 'Slide 3: Technical Approach & Architecture',
    badge: 'TECHNICAL APPROACH',
    image: '/slides/Slide3_SIH189.jpg',
    summary: '5-Stage Engineering Pipeline: Sub-50ms Ingestion, Spectral GCN (98.6% precision), Case Copilot Voice/NLP Tool loop, Vector GIS, and BNS 63 Evidence Seal.'
  },
  {
    num: 4,
    title: 'Slide 4: Feasibility, Viability & Hardware',
    badge: 'FEASIBILITY & VIABILITY',
    image: '/slides/Slide4_SIH189.jpg',
    summary: 'Cost disruption (₹12,000 unit cost vs ₹25L Cellebrite), 4 hours to 5 seconds statutory drafting, Hailo-8L NPU edge AI, and human-in-the-loop safety.'
  },
  {
    num: 5,
    title: 'Slide 5: National Impact & Benefits',
    badge: 'IMPACT & BENEFITS',
    image: '/slides/Slide5_SIH189.jpg',
    summary: '+94% faster network discovery, ₹25+ Lakhs annual savings, 100.0% 50-case benchmark accuracy, <60s emergency dispatch across 16,000+ stations.'
  },
  {
    num: 6,
    title: 'Slide 6: Research, References & Live Demo',
    badge: 'RESEARCH & REFERENCES',
    image: '/slides/Slide6_SIH189.jpg',
    summary: 'BPR&D guidelines, BNSS 2023 Sec 94/107/176 compliance, NTRO SIH26150 standards, PyTorch Geometric GCN, and live portal access.'
  }
];

export default function SihSlideViewerModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slide = SLIDES[currentSlide];
  const pptxRawUrl = 'https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/presentation/SIH_Ideate_Template_NCIS.pptx';
  const officeOnlineUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(pptxRawUrl)}`;
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pptxRawUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#071326]/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[95vh] bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#D9E1E8] flex flex-col overflow-hidden text-[#0B1F3A]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0B1F3A] text-white border-b border-[#1E3A5F]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5A4] animate-pulse" />
            <h2 className="text-sm sm:text-base font-bold tracking-tight">
              SIH 2026 Presentation Deck (6 Slides)
            </h2>
            <span className="text-[10px] bg-[#1D4ED8] text-white px-2 py-0.5 rounded font-semibold hidden sm:inline">
              Slide {currentSlide + 1} of {SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct PPTX Download */}
            <a
              href="/SIH_Ideate_Template_NCIS.pptx"
              download="SIH_Ideate_Template_NCIS.pptx"
              className="px-2.5 py-1.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
              title="Download PowerPoint Presentation (.pptx)"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PPTX</span>
            </a>

            {/* Office Online Viewer */}
            <a
              href={officeOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-[#0EA5A4] hover:bg-[#0D8A89] text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm hidden sm:flex"
              title="Open in Microsoft PowerPoint Online"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>PowerPoint Online</span>
            </a>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#B0BEC5] hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Viewer Main Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F4F6F9] flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl relative group">
            {/* Slide Image Frame */}
            <div className="relative rounded-xl overflow-hidden border border-[#D9E1E8] shadow-lg bg-black aspect-[16/9] flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/docs/slides/Slide${slide.num}_SIH189.jpg`;
                }}
              />

              {/* Prev / Next Overlay Buttons */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all transform hover:scale-110 active:scale-95 shadow-md"
                title="Previous Slide (←)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all transform hover:scale-110 active:scale-95 shadow-md"
                title="Next Slide (→)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Details Banner */}
            <div className="mt-3 bg-white p-3.5 rounded-xl border border-[#D9E1E8] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#102A43] text-[#90CAF9] px-2 py-0.5 rounded">
                    {slide.badge}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                    {slide.title}
                  </h3>
                </div>
                <p className="text-xs text-[#546E7A]">
                  {slide.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={googleDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#F4F6F9] hover:bg-[#E2E8F0] text-[#1E3A5F] border border-[#CBD5E1] rounded-lg text-xs font-semibold transition-colors"
                >
                  Google Slides Viewer
                </a>
              </div>
            </div>
          </div>

          {/* Slide Thumbnails Selector */}
          <div className="w-full max-w-4xl mt-3 flex items-center justify-center gap-2 overflow-x-auto pb-1">
            {SLIDES.map((s, idx) => (
              <button
                key={s.num}
                onClick={() => setCurrentSlide(idx)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 w-20 sm:w-28 aspect-[16/9] ${
                  currentSlide === idx
                    ? 'border-[#0EA5A4] shadow-md scale-105'
                    : 'border-[#D9E1E8] opacity-60 hover:opacity-100 hover:border-[#90CAF9]'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://raw.githubusercontent.com/muhammedmaahir68-droid/cyber-kit/main/docs/slides/Slide${s.num}_SIH189.jpg`;
                  }}
                />
                <span className="absolute bottom-0.5 right-1 text-[9px] font-bold bg-black/75 text-white px-1 rounded">
                  {s.num}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#D9E1E8] flex flex-wrap items-center justify-between text-xs text-[#546E7A]">
          <div className="flex items-center gap-2">
            <span>Tip: Use <b>← / →</b> arrow keys to flip slides</span>
            <span>•</span>
            <span className="text-[#0EA5A4] font-medium">Smart India Hackathon 2026 (PS 189 &amp; SIH26150)</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/SIH_Ideate_Template_NCIS.pptx"
              download
              className="text-[#1D4ED8] hover:underline font-semibold"
            >
              Direct Download (.pptx)
            </a>
            <span>|</span>
            <button onClick={onClose} className="hover:text-[#0B1F3A] font-medium">
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
