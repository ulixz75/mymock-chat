import React from 'react';
import { PushConfig } from '../../types';
import { Upload, Bell } from 'lucide-react';

interface Props { pushConfig: PushConfig; onChange: (u: Partial<PushConfig>) => void; }

export const PushEditor: React.FC<Props> = ({ pushConfig, onChange }) => {
  const handleIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { const r = new FileReader(); r.onload = () => { if (typeof r.result === 'string') onChange({ appIcon: r.result }); }; r.readAsDataURL(f); }
  };
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5"><Bell className="w-3.5 h-3.5 text-indigo-400" /> Notificación Push</span>
        <div className="flex gap-2">
          <button onClick={()=>onChange({pushStyle:'ios'})} className={`flex-1 py-2 rounded-lg border text-xs font-semibold ${pushConfig.pushStyle==='ios'?'bg-slate-800 border-indigo-500 text-white ring-1 ring-indigo-500/30':'bg-slate-950 border-slate-800 text-slate-400'}`}>iOS</button>
          <button onClick={()=>onChange({pushStyle:'android'})} className={`flex-1 py-2 rounded-lg border text-xs font-semibold ${pushConfig.pushStyle==='android'?'bg-slate-800 border-indigo-500 text-white ring-1 ring-indigo-500/30':'bg-slate-950 border-slate-800 text-slate-400'}`}>Android</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">App</label>
            <input value={pushConfig.appName} onChange={e=>onChange({appName: e.target.value})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Hora</label>
            <input value={pushConfig.timeAgo} onChange={e=>onChange({timeAgo: e.target.value})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" placeholder="ahora" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={pushConfig.appIcon} alt="icon" referrerPolicy="no-referrer" className="w-9 h-9 rounded-xl object-cover border border-slate-700" />
          <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1.5"><Upload className="w-3 h-3" /> Icono <input type="file" accept="image/*" onChange={handleIcon} className="hidden" /></label>
          <div>
            <label className="block text-[10px] text-slate-400">Badge</label>
            <input type="number" value={pushConfig.badgeCount ?? 1} onChange={e=>onChange({badgeCount: parseInt(e.target.value,10)||0})} className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white text-center" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Título</label>
          <input value={pushConfig.title} onChange={e=>onChange({title: e.target.value})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white font-semibold" />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Cuerpo</label>
          <textarea rows={2} value={pushConfig.body} onChange={e=>onChange({body: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={!!pushConfig.showActions} onChange={e=>onChange({showActions: e.target.checked})} className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800" />
          <span className="text-xs text-slate-300">Mostrar botones de acción</span>
        </label>
      </div>
    </div>
  );
};
