import React, { useEffect, useRef } from 'react';

export default function HardwareExplodedView() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    let animId;

    const parts = [
      { label: 'TOUCHSCREEN', color: '#3EC6E0', x: 400, baseY: 40, w: 160, h: 16 },
      { label: 'RASPBERRY PI 5', color: '#4CAF7D', x: 370, baseY: 110, w: 130, h: 45 },
      { label: 'HAILO-8L NPU', color: '#A855F7', x: 520, baseY: 125, w: 85, h: 28 },
      { label: 'WRITE-BLOCKER IC', color: '#E8A33D', x: 340, baseY: 180, w: 95, h: 24 },
      { label: 'USB-C OTG PORT', color: '#D64545', x: 480, baseY: 190, w: 85, h: 20 },
      { label: 'NVMe SSD 128GB', color: '#4CAF7D', x: 390, baseY: 240, w: 105, h: 18 },
      { label: '10000mAh LiPo', color: '#3B82F6', x: 360, baseY: 285, w: 150, h: 32 },
      { label: 'CNC ENCLOSURE', color: '#64748B', x: 330, baseY: 345, w: 190, h: 50 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.015;

      const bg = ctx.createRadialGradient(450, 200, 30, 450, 200, 450);
      bg.addColorStop(0, '#0f172a');
      bg.addColorStop(1, '#020617');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center axis
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(430, 40);
      ctx.lineTo(430, 390);
      ctx.stroke();
      ctx.setLineDash([]);

      parts.forEach((p, i) => {
        const floatOffset = Math.sin(t + i * 0.8) * 5;
        const y = p.baseY + floatOffset;

        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color + '25';
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(p.x, y, p.w, p.h, 4);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = p.color;
        ctx.font = '10px monospace';
        ctx.fillText(p.label, p.x - 110, y + p.h / 2 + 3);
      });

      ctx.fillStyle = '#64748B';
      ctx.font = '10px monospace';
      ctx.fillText('UE5 3D EXPLODED VIEW — FORENSIX HARDWARE STACK', 15, 25);

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
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            HARDWARE PROTOTYPE — 8 INTERNAL MODULES
          </h3>
          <p className="text-xs text-slate-400">Interactive UE5 exploded 3D canvas animating internal SBC, NPU, write-blocker, and power modules.</p>
        </div>
        <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-1 rounded font-mono">MIL-SPEC IP54</span>
      </div>

      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
        <canvas ref={canvasRef} width={800} height={420} className="w-full h-full object-cover block" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="font-bold text-emerald-400">Raspberry Pi 5</div>
          <div className="text-slate-400 text-[11px]">BCM2712 Quad-Core @ 2.4GHz, 8GB RAM</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="font-bold text-purple-400">Hailo-8L AI NPU</div>
          <div className="text-slate-400 text-[11px]">13 TOPS Tensor Accelerator (35 FPS)</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="font-bold text-amber-400">HW Write-Blocker</div>
          <div className="text-slate-400 text-[11px]">Atmel IC drops SCSI WRITE (0x2A)</div>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <div className="font-bold text-cyan-400">5" Touchscreen</div>
          <div className="text-slate-400 text-[11px]">800x480 IPS Multi-Touch Display</div>
        </div>
      </div>
    </div>
  );
}
