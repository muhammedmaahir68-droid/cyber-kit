import React, { useEffect, useRef } from 'react';

export default function PoliceSceneView() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;

      // Dark Tactical Night Sky
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, '#050810');
      bg.addColorStop(0.5, '#0a0f18');
      bg.addColorStop(1, '#12161b');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Skyline
      ctx.fillStyle = '#0f1318';
      const buildings = [[50,150,60,200],[130,120,50,230],[200,90,70,260],[290,130,55,220],[370,80,80,280],[470,110,60,240],[550,140,50,210],[620,70,75,290]];
      buildings.forEach(([bx,by,bw,bh]) => { ctx.fillRect(bx,by,bw,bh); });

      // Ground
      ctx.fillStyle = '#1a1f26';
      ctx.fillRect(0, 280, canvas.width, 120);

      // Police Cruiser
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.roundRect(40, 265, 110, 35, 6); ctx.fill();
      const flash = Math.sin(t * 8) > 0;
      ctx.fillStyle = flash ? '#3B82F6' : '#D64545';
      ctx.beginPath(); ctx.arc(80, 255, 5, 0, Math.PI * 2); ctx.fill();

      // Police Officer Figure
      ctx.fillStyle = '#334155';
      ctx.beginPath(); ctx.arc(280, 240, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(275, 250, 10, 25);
      ctx.fillStyle = '#3EC6E0'; ctx.font = '8px monospace'; ctx.fillText('OFFICER', 265, 225);

      // Handheld ForensiX Device
      ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '#A855F7'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(290, 250, 25, 18, 3); ctx.fill(); ctx.stroke();

      // Cable with flow
      ctx.strokeStyle = '#3EC6E0'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(315, 260); ctx.quadraticCurveTo(360, 275, 410, 255); ctx.stroke();

      // Suspect Figure
      ctx.fillStyle = '#475569';
      ctx.beginPath(); ctx.arc(480, 240, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(475, 250, 10, 25);
      ctx.fillStyle = '#D64545'; ctx.font = '8px monospace'; ctx.fillText('SUSPECT', 465, 225);

      // Alert HUD overlay
      const alertY = 40 + Math.sin(t * 2) * 2;
      ctx.fillStyle = 'rgba(214,69,69,0.15)'; ctx.strokeStyle = '#D64545'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(250, alertY, 260, 70, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#D64545'; ctx.font = '10px monospace';
      ctx.fillText(' PROBABLE CAUSE ESTABLISHED ON SCENE', 260, alertY + 18);
      ctx.fillStyle = '#EDEFF2'; ctx.font = '9px monospace';
      ctx.fillText(' Weapon: Glock 19 (96.4% confidence)', 260, alertY + 34);
      ctx.fillText(' Contraband Package (91.8% confidence)', 260, alertY + 48);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            UE5 TACTICAL POLICE FIELD ARREST SCENARIO
          </h3>
          <p className="text-xs text-slate-400">Step-by-step 3D visual showing officers catching a thief, scanning the phone, and taking immediate action.</p>
        </div>
        <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-2.5 py-1 rounded font-mono">PROBABLE CAUSE ACTIVE</span>
      </div>

      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <canvas ref={canvasRef} width={800} height={380} className="w-full h-full object-cover block" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-slate-950 p-3 rounded-xl border border-cyan-900 space-y-1">
          <div className="font-bold text-cyan-400">Step 1: Arrest</div>
          <div className="text-slate-400 text-[11px]">Suspect apprehended, phone seized as evidence.</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-amber-900 space-y-1">
          <div className="font-bold text-amber-400">Step 2: Connect</div>
          <div className="text-slate-400 text-[11px]">Phone plugged in via hardware write-blocker.</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-purple-900 space-y-1">
          <div className="font-bold text-purple-400">Step 3: AI Scan</div>
          <div className="text-slate-400 text-[11px]">180s deep sector carve & YOLO AI triage.</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-red-900 space-y-1">
          <div className="font-bold text-red-400">Step 4: Action</div>
          <div className="text-slate-400 text-[11px]">Immediate arrest action supported by evidence.</div>
        </div>
      </div>
    </div>
  );
}
