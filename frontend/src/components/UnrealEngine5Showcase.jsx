import React, { useEffect, useRef, useState } from 'react';

export default function UnrealEngine5Showcase({ isScanning, progress }) {
  const canvasRef = useRef(null);
  const [cameraMode, setCameraMode] = useState('TACTICAL_3D'); // TACTICAL_3D, OFFICER_VIEW, SCREEN_CLOSEUP

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Dark Tactical Environment Background
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.6, '#090d16');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Grid Floor (Perspective)
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.lineWidth = 1;
      const horizon = height * 0.45;
      for (let x = -width; x < width * 2; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(width / 2 + (x - width / 2) * 0.2, horizon);
        ctx.stroke();
      }
      for (let y = horizon; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      angle += 0.015;
      const offsetX = cameraMode === 'TACTICAL_3D' ? Math.sin(angle) * 15 : 0;

      // Draw Suspect Phone 3D Representation (Right Table)
      ctx.save();
      ctx.translate(width * 0.7 + offsetX, height * 0.65);
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-40, -80, 80, 160, 12);
      ctx.fill();
      ctx.stroke();
      
      // Phone Screen
      ctx.fillStyle = isScanning ? '#0284c7' : '#0f172a';
      ctx.fillRect(-34, -72, 68, 144);
      ctx.restore();

      // Draw Hardware Write-Blocker Module (Center Cable)
      ctx.save();
      ctx.translate(width * 0.5 + offsetX * 0.5, height * 0.65);
      ctx.fillStyle = '#065f46';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-25, -20, 50, 40, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#34d399';
      ctx.font = '9px monospace';
      ctx.fillText('HW-BLOCK', -20, 4);
      ctx.restore();

      // Draw ForensiX Handheld Unit (Left Table)
      ctx.save();
      ctx.translate(width * 0.3 + offsetX * 0.2, height * 0.65);
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-70, -90, 140, 180, 16);
      ctx.fill();
      ctx.stroke();

      // Touchscreen UI inside 3D Unit
      ctx.fillStyle = '#020617';
      ctx.fillRect(-60, -78, 120, 140);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1;
      ctx.strokeRect(-60, -78, 120, 140);

      // Live Scanning Bar inside 3D Screen
      if (isScanning) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-55, -20, (progress / 100) * 110, 12);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(`CARVING ${progress}%`, -45, 30);
      } else {
        ctx.fillStyle = '#34d399';
        ctx.font = '10px monospace';
        ctx.fillText('FX-TACTICAL READY', -50, 0);
      }
      ctx.restore();

      // Animated Glowing USB Data Cable & Particles
      ctx.save();
      ctx.strokeStyle = isScanning ? '#38bdf8' : '#475569';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = isScanning ? 15 : 0;
      ctx.beginPath();
      ctx.moveTo(width * 0.7 + offsetX, height * 0.65);
      ctx.lineTo(width * 0.5 + offsetX * 0.5, height * 0.65);
      ctx.lineTo(width * 0.3 + offsetX * 0.2, height * 0.65);
      ctx.stroke();

      // Flowing Data Particles
      if (isScanning) {
        for (let i = 0; i < 8; i++) {
          const p = ((Date.now() / 15 + i * 50) % 100) / 100;
          const px = (width * 0.7 + offsetX) - p * ((width * 0.7 + offsetX) - (width * 0.3 + offsetX * 0.2));
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, height * 0.65, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // UE5 Camera Overlay & Status Text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`UE5 CAMERA MODE: ${cameraMode}`, 20, 30);
      ctx.fillText(`LUMEN GI: 60 FPS | LATENCY: 2.1ms`, 20, 48);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isScanning, progress, cameraMode]);

  return (
    <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 border-b border-indigo-950 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></span>
          <span className="text-xs font-bold text-indigo-300 font-mono tracking-wider">
            UNREAL ENGINE 5.4 - 3D REAL-TIME DIGITAL TWIN SHOWCASE
          </span>
        </div>
        
        {/* Camera Switcher */}
        <div className="flex gap-1 text-[11px] font-mono">
          <button 
            onClick={() => setCameraMode('TACTICAL_3D')}
            className={`px-2 py-1 rounded border transition-all ${cameraMode === 'TACTICAL_3D' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
          >
            Tactical 3D
          </button>
          <button 
            onClick={() => setCameraMode('OFFICER_VIEW')}
            className={`px-2 py-1 rounded border transition-all ${cameraMode === 'OFFICER_VIEW' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
          >
            1st Person
          </button>
          <button 
            onClick={() => setCameraMode('SCREEN_CLOSEUP')}
            className={`px-2 py-1 rounded border transition-all ${cameraMode === 'SCREEN_CLOSEUP' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
          >
            Screen HUD
          </button>
        </div>
      </div>

      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950">
        <canvas ref={canvasRef} width={800} height={450} className="w-full h-full object-cover block" />
        
        {/* Live HUD Badges */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg p-2 text-[10px] font-mono space-y-1">
          <div className="text-emerald-400 font-bold"> HW WRITE-BLOCKER: BUS READ-ONLY</div>
          <div className="text-cyan-400"> ON-CHIP NPU: 35 FPS YOLOV8 INFERENCE</div>
          <div className="text-purple-400"> OFFLINE AGENTIC AI: ACTIVE</div>
        </div>
      </div>
    </div>
  );
}
