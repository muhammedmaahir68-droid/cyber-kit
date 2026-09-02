import React from 'react';

export default function AICapabilitiesView() {
  const capabilities = [
    { icon: '', title: 'Weapons', desc: 'Handguns, rifles, knives, explosives', metric: '96.4% mAP', color: 'text-red-400 border-red-800 bg-red-950/40' },
    { icon: '', title: 'Narcotics', desc: 'Drug packaging, pills, powders', metric: '91.8% mAP', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
    { icon: '', title: 'Face Detection', desc: 'Suspect face isolation & matching', metric: '94.2% Prec', color: 'text-cyan-400 border-cyan-800 bg-cyan-950/40' },
    { icon: '', title: 'Documents', desc: 'IDs, passports, contracts, receipts', metric: '92.5% mAP', color: 'text-blue-400 border-blue-800 bg-blue-950/40' },
    { icon: '', title: 'Chat NLP', desc: 'Threat keywords, drug trade, fraud', metric: '89.7% F1', color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40' },
    { icon: '⏰', title: 'Timestamp Tamper', desc: 'EXIF vs MACB conflict audit', metric: '96.8% AUC', color: 'text-purple-400 border-purple-800 bg-purple-950/40' },
    { icon: '', title: 'Currency & Cash', desc: 'Large cash bundles & stacks', metric: '88.3% mAP', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
    { icon: '', title: 'License Plates', desc: 'Vehicle plate OCR from photos', metric: '93.1% Acc', color: 'text-slate-300 border-slate-700 bg-slate-900' },
    { icon: '', title: 'CSAM/NSFW', desc: 'Illegal media content classifier', metric: '97.2% Prec', color: 'text-red-400 border-red-800 bg-red-950/40' },
    { icon: '', title: 'GPS Extraction', desc: 'EXIF map coordinate parsing', metric: '100% Parse', color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            COMPLETE ON-DEVICE AI DETECTION MATRIX
          </h3>
          <p className="text-xs text-slate-400">All 10 edge AI detection modules running locally with 0 external API dependencies.</p>
        </div>
        <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-800 px-2.5 py-1 rounded font-mono">100% OFFLINE</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono">
        {capabilities.map((item, idx) => (
          <div key={idx} className={`p-3 rounded-xl border ${item.color} space-y-1 flex flex-col justify-between`}>
            <div className="text-2xl">{item.icon}</div>
            <div>
              <div className="text-xs font-bold text-slate-100">{item.title}</div>
              <div className="text-[10px] text-slate-400 line-clamp-2">{item.desc}</div>
            </div>
            <div className="text-[10px] font-bold mt-1">{item.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
