import React from 'react';

/**
 * Official State Emblem of India (Ashoka Lion Capital with Satyameva Jayate)
 * Features the three lions, abacus with Ashoka Chakra, horse, bull, and Devanagari motto.
 */
export function AshokaLionCapital({ className = "w-12 h-14", color = "#f59e0b" }) {
  return (
    <svg
      viewBox="0 0 120 145"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="State Emblem of India"
    >
      {/* Glow / Backdrop filter */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* --- CENTRAL LION (Facing Forward) --- */}
      {/* Crown & Ears */}
      <path d="M52 14 C52 10, 56 8, 60 8 C64 8, 68 10, 68 14 Z" fill="url(#goldGradient)" />
      <path d="M48 16 C46 12, 50 10, 53 13 Z" fill="url(#goldGradient)" />
      <path d="M72 16 C74 12, 70 10, 67 13 Z" fill="url(#goldGradient)" />

      {/* Mane & Head Structure */}
      <path
        d="M48 18 C43 22, 42 32, 45 42 C48 50, 53 54, 60 55 C67 54, 72 50, 75 42 C78 32, 77 22, 72 18 C68 20, 52 20, 48 18 Z"
        fill="url(#goldGradient)"
        stroke="#78350f"
        strokeWidth="0.8"
      />
      {/* Facial Features (Eyes, Muzzle, Whiskers) */}
      <circle cx="54" cy="28" r="1.8" fill="#1e1b4b" />
      <circle cx="66" cy="28" r="1.8" fill="#1e1b4b" />
      <path d="M59 31 L61 31 L60 34 Z" fill="#78350f" />
      <path d="M56 37 C58 39, 62 39, 64 37" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
      {/* Mane Waves */}
      <path d="M46 28 C42 34, 44 42, 47 48" stroke="#78350f" strokeWidth="1" />
      <path d="M74 28 C78 34, 76 42, 73 48" stroke="#78350f" strokeWidth="1" />
      <path d="M50 46 C55 52, 65 52, 70 46" stroke="#78350f" strokeWidth="1" />

      {/* --- LEFT LION (Profile Facing Left) --- */}
      <path
        d="M32 24 C28 20, 24 24, 25 30 C22 34, 22 42, 28 48 C34 53, 42 54, 46 51 C43 45, 42 36, 43 30 C38 27, 35 24, 32 24 Z"
        fill="url(#goldGradient)"
        stroke="#78350f"
        strokeWidth="0.8"
      />
      {/* Left Eye & Mouth */}
      <circle cx="28" cy="30" r="1.5" fill="#1e1b4b" />
      <path d="M24 35 L28 36" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />

      {/* --- RIGHT LION (Profile Facing Right) --- */}
      <path
        d="M88 24 C92 20, 96 24, 95 30 C98 34, 98 42, 92 48 C86 53, 78 54, 74 51 C77 45, 78 36, 77 30 C82 27, 85 24, 88 24 Z"
        fill="url(#goldGradient)"
        stroke="#78350f"
        strokeWidth="0.8"
      />
      {/* Right Eye & Mouth */}
      <circle cx="92" cy="30" r="1.5" fill="#1e1b4b" />
      <path d="M96 35 L92 36" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />

      {/* --- COMMON TORSO & CHEST --- */}
      <path
        d="M36 50 C38 65, 42 75, 45 82 L75 82 C78 75, 82 65, 84 50 C78 55, 68 57, 60 57 C52 57, 42 55, 36 50 Z"
        fill="url(#goldGradient)"
        stroke="#78350f"
        strokeWidth="0.8"
      />
      {/* Front Paws */}
      <rect x="46" y="70" width="8" height="13" rx="3" fill="url(#goldGradient)" stroke="#78350f" strokeWidth="0.8" />
      <rect x="66" y="70" width="8" height="13" rx="3" fill="url(#goldGradient)" stroke="#78350f" strokeWidth="0.8" />

      {/* --- ABACUS / PLINTH --- */}
      <rect x="18" y="83" width="84" height="20" rx="3" fill="url(#goldGradient)" stroke="#78350f" strokeWidth="1.2" />

      {/* Left Bull Relief */}
      <path d="M26 95 C28 91, 34 91, 37 94 C39 96, 38 99, 34 100 L28 100 Z" fill="#78350f" opacity="0.85" />

      {/* Central Ashoka Chakra on Abacus */}
      <circle cx="60" cy="93" r="7.5" fill="#0f172a" stroke="#1e3a8a" strokeWidth="1" />
      <circle cx="60" cy="93" r="6" fill="#ffffff" />
      <circle cx="60" cy="93" r="1.5" fill="#1e3a8a" />
      {/* 24-spokes stylized */}
      <g stroke="#1e3a8a" strokeWidth="0.6">
        <line x1="60" y1="87" x2="60" y2="99" />
        <line x1="54" y1="93" x2="66" y2="93" />
        <line x1="55.8" y1="88.8" x2="64.2" y2="97.2" />
        <line x1="55.8" y1="97.2" x2="64.2" y2="88.8" />
        <line x1="57.8" y1="87.3" x2="62.2" y2="98.7" />
        <line x1="62.2" y1="87.3" x2="57.8" y2="98.7" />
        <line x1="54.3" y1="90.8" x2="65.7" y2="95.2" />
        <line x1="54.3" y1="95.2" x2="65.7" y2="90.8" />
      </g>

      {/* Right Galloping Horse Relief */}
      <path d="M84 94 C86 91, 91 91, 94 93 C95 96, 94 99, 90 100 L85 100 Z" fill="#78350f" opacity="0.85" />

      {/* Inverted Lotus Base */}
      <path
        d="M26 103 C36 108, 48 110, 60 110 C72 110, 84 108, 94 103 C91 113, 80 118, 60 118 C40 118, 29 113, 26 103 Z"
        fill="url(#goldGradient)"
        stroke="#78350f"
        strokeWidth="1"
      />

      {/* Pedestal Base Ribbon */}
      <rect x="14" y="119" width="92" height="15" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />

      {/* Motto: SATYAMEVA JAYATE in Devanagari */}
      <text
        x="60"
        y="130"
        textAnchor="middle"
        fill="#fef08a"
        fontSize="8.5"
        fontFamily="sans-serif"
        fontWeight="bold"
        letterSpacing="1"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}

/**
 * Official Flag of India (Tiranga) with exact proportions and 24-spoke Navy Blue Ashoka Chakra
 */
export function IndianFlag({ className = "w-9 h-6", rounded = "rounded" }) {
  return (
    <div
      className={`inline-block overflow-hidden shadow-md border border-slate-700/60 ${rounded} ${className}`}
      style={{ aspectRatio: '3/2' }}
      title="National Flag of India (Tiranga)"
    >
      <svg
        viewBox="0 0 900 600"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Band: India Saffron */}
        <rect width="900" height="200" fill="#FF9933" />
        
        {/* Middle Band: White */}
        <rect y="200" width="900" height="200" fill="#FFFFFF" />
        
        {/* Bottom Band: India Green */}
        <rect y="400" width="900" height="200" fill="#138808" />

        {/* Ashoka Chakra in Center (Diameter = 160) */}
        <g transform="translate(450, 300)">
          {/* Outer Wheel Rim */}
          <circle r="80" fill="none" stroke="#000080" strokeWidth="9" />
          
          {/* Inner Hub */}
          <circle r="15" fill="#000080" />
          <circle r="5" fill="#FFFFFF" />

          {/* 24 Spokes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2="0"
                y2="-76"
                stroke="#000080"
                strokeWidth="4"
                transform={`rotate(${angle})`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/**
 * Combined Official Law Enforcement Authority Insignia
 * Ashoka Capital + Indian Flag + Official Government Police Banner
 */
export function GovernmentAuthorityBadge({ showFlag = true, subtitle = "MINISTRY OF HOME AFFAIRS" }) {
  return (
    <div className="flex items-center gap-3">
      {/* Ashoka Lion Capital */}
      <div className="relative">
        <AshokaLionCapital className="w-10 h-12 shrink-0 drop-shadow-md" />
      </div>

      <div>
        <div className="flex items-center gap-2">
          {showFlag && <IndianFlag className="w-6 h-4 shrink-0 rounded-sm shadow-sm" />}
          <span className="text-[10px] font-mono tracking-wider font-bold text-amber-400 uppercase">
            भारत सरकार • GOVT OF INDIA
          </span>
        </div>
        <div className="text-xs font-bold font-mono tracking-tight text-white leading-tight mt-0.5">
          INDIAN CYBER CRIME COORDINATION CENTRE
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
