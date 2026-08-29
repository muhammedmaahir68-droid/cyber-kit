import React from 'react';

export default function PhoneSignalsView() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      <div>
        <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          PHONE SIGNALS & PROTOCOLS DETECTED
        </h3>
        <p className="text-xs text-slate-400">Supported OS platforms and USB bus protocols automatically recognized upon device connection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Supported OS */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-cyan-400">SUPPORTED PHONE OS</div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <div>
                <div className="font-bold text-slate-200">Android (5.0 – 15+)</div>
                <div className="text-[11px] text-slate-400">Samsung, Pixel, Xiaomi, OnePlus, Vivo</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">FULL SUPPORT</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-xl">🍎</span>
              <div>
                <div className="font-bold text-slate-200">iOS (Backup Protocol)</div>
                <div className="text-[11px] text-slate-400">iPhone, iPad encrypted extraction</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px]">PARTIAL</span>
          </div>
        </div>

        {/* USB Signal Protocols */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-purple-400">USB SIGNAL MODES</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="font-bold text-cyan-400">MTP Mode</div>
              <div className="text-[10px] text-slate-400">Media & File Transfer</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="font-bold text-purple-400">ADB Mode</div>
              <div className="text-[10px] text-slate-400">Raw DB & Shell Access</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="font-bold text-amber-400">PTP Mode</div>
              <div className="text-[10px] text-slate-400">Camera DCIM Direct</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div className="font-bold text-red-400">Mass Storage</div>
              <div className="text-[10px] text-slate-400">Raw Block Carving</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
