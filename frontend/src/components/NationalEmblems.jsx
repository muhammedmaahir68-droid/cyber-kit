import React from 'react';

/**
 * Official State Emblem of India (Lion Capital of Ashoka with Indian Flag overlay)
 * High-definition authentic government seal with three lions, Ashoka Chakra, and Satyameva Jayate.
 */
export function AshokaLionCapital({ className = "w-14 h-14", rounded = "rounded-full" }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/emblem_india.jpg"
        alt="State Emblem of India"
        className={`w-full h-full object-cover shadow-2xl border-2 border-amber-500/70 ring-2 ring-amber-500/30 ${rounded}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/240px-Emblem_of_India.svg.png";
        }}
      />
    </div>
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
