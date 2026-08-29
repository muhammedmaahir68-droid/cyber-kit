import React, { useState } from 'react';
import UnrealEngine5Showcase from './UnrealEngine5Showcase';
import PoliceSceneView from './PoliceSceneView';
import HardwareExplodedView from './HardwareExplodedView';

export default function UE5TwinView({ isScanning, progress }) {
  const [subTab, setSubTab] = useState('ue5_tactical'); // ue5_tactical, ue5_police, hw_exploded

  return (
    <div className="space-y-5 font-sans">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
            UNREAL ENGINE 5.4 REAL-TIME 3D DIGITAL TWIN & HARDWARE BLUEPRINT
          </h3>
          <p className="text-xs text-slate-400">Photorealistic 3D tactical scene rendering, police field arrest scenario, and hardware assembly stack.</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setSubTab('ue5_tactical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'ue5_tactical' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UE5 Tactical Twin
          </button>
          <button
            onClick={() => setSubTab('ue5_police')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'ue5_police' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UE5 Police Scene
          </button>
          <button
            onClick={() => setSubTab('hw_exploded')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              subTab === 'hw_exploded' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3D Hardware Prototype
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {subTab === 'ue5_tactical' && (
        <UnrealEngine5Showcase isScanning={isScanning} progress={progress} />
      )}

      {subTab === 'ue5_police' && (
        <PoliceSceneView />
      )}

      {subTab === 'hw_exploded' && (
        <HardwareExplodedView />
      )}
    </div>
  );
}
