import React from 'react';

export default function UnfilteredItemsView() {
  const allFiles = [
    { icon: '️', name: 'IMG_0442.jpg', size: '240 KB', type: 'IMAGE', age: '3d ago' },
    { icon: '️', name: 'IMG_0501.jpg', size: '1.2 MB', type: 'IMAGE', age: '5d ago' },
    { icon: '️', name: 'VID_0117.mp4', size: '5.1 MB', type: 'VIDEO', age: '1w ago' },
    { icon: '️', name: 'IMG_0512.jpg', size: '890 KB', type: 'IMAGE', age: '2d ago' },
    { icon: '', name: 'whatsapp_chat.sqlite', size: '45 KB', type: 'CHAT DB', age: '1d ago' },
    { icon: '', name: 'receipt_scan.pdf', size: '88 KB', type: 'DOC', age: '3w ago' },
    { icon: '', name: 'voice_note_01.m4a', size: '320 KB', type: 'AUDIO', age: '4d ago' },
    { icon: '️', name: 'screenshot_PIN.png', size: '156 KB', type: 'IMAGE', age: '6d ago' },
    { icon: '️', name: 'VID_0122.mp4', size: '12 MB', type: 'VIDEO', age: '2w ago' },
    { icon: '', name: 'contacts_backup.vcf', size: '12 KB', type: 'DATA', age: '1m ago' },
    { icon: '️', name: 'location_history.json', size: '340 KB', type: 'DATA', age: '3d ago' },
    { icon: '️', name: 'DCIM_deleted_0091.jpg', size: '2.1 MB', type: 'IMAGE', age: '8d ago' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ALL UNFILTERED DELETED ITEMS (NO AI FILTERING)
          </h3>
          <p className="text-xs text-slate-400">Browsing 100% of carved raw storage sectors without AI suppression.</p>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded font-mono">12 ITEMS CARVED</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono">
        {allFiles.map((f, idx) => (
          <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 hover:border-cyan-500 transition-all flex flex-col justify-between">
            <div className="text-2xl text-center">{f.icon}</div>
            <div>
              <div className="text-[11px] font-bold text-slate-200 truncate">{f.name}</div>
              <div className="text-[9px] text-slate-400 flex justify-between mt-1">
                <span>{f.size}</span>
                <span className="text-cyan-400">{f.age}</span>
              </div>
            </div>
            <div className="text-[8px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded text-center border border-slate-800 mt-1">
              {f.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
