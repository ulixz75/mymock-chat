import React from 'react';
import { StoryConfig } from '../../types';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface Props { storyConfig: StoryConfig; onChange: (u: Partial<StoryConfig>) => void; }

export const StoryEditor: React.FC<Props> = ({ storyConfig, onChange }) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { const r = new FileReader(); r.onload = () => { if (typeof r.result === 'string') onChange({ storyImageUrl: r.result }); }; r.readAsDataURL(f); }
  };
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Historia</span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Usuario</label>
            <input value={storyConfig.storyOwnerUsername} onChange={e=>onChange({storyOwnerUsername: e.target.value})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Vistas</label>
            <input value={storyConfig.viewerCount || ''} onChange={e=>onChange({viewerCount: e.target.value})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" placeholder="1.2k vistas" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Foto historia</label>
          <div className="flex items-center gap-2">
            <img src={storyConfig.storyImageUrl} alt="story" referrerPolicy="no-referrer" className="w-16 h-10 rounded-lg object-cover border border-slate-700" />
            <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1.5"><Upload className="w-3 h-3" /> Subir <input type="file" accept="image/*" onChange={handleUpload} className="hidden" /></label>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>onChange({mode:'reply'})} className={`flex-1 py-2 rounded-lg border text-xs font-semibold ${storyConfig.mode==='reply'?'bg-indigo-600 text-white border-indigo-500':'bg-slate-950 text-slate-400 border-slate-800'}`}>Reply</button>
          <button onClick={()=>onChange({mode:'poll'})} className={`flex-1 py-2 rounded-lg border text-xs font-semibold ${storyConfig.mode==='poll'?'bg-indigo-600 text-white border-indigo-500':'bg-slate-950 text-slate-400 border-slate-800'}`}>Poll / Encuesta</button>
        </div>
        {storyConfig.mode === 'poll' ? (
          <div className="space-y-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Pregunta</label>
              <input value={storyConfig.pollQuestion || ''} onChange={e=>onChange({pollQuestion: e.target.value})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" placeholder="¿Te gustó el resultado?" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Opción A</label>
                <input value={storyConfig.pollOptions?.[0] || ''} onChange={e=>onChange({pollOptions: [e.target.value, storyConfig.pollOptions?.[1] || 'No'] as any})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Opción B</label>
                <input value={storyConfig.pollOptions?.[1] || ''} onChange={e=>onChange({pollOptions: [storyConfig.pollOptions?.[0] || 'Sí', e.target.value] as any})} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">% A ({storyConfig.pollPercent?.[0] ?? 68}%)</label>
                <input type="range" min="0" max="100" value={storyConfig.pollPercent?.[0] ?? 68} onChange={e=>{ const v=parseInt(e.target.value,10); onChange({pollPercent:[v,100-v] as any}); }} className="w-full accent-indigo-500" />
              </div>
              <div className="text-[11px] text-slate-400 pt-6 text-center">{storyConfig.pollPercent?.[1] ?? 32}% B</div>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Texto reply</label>
            <textarea rows={2} value={storyConfig.replyText || ''} onChange={e=>onChange({replyText: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white" />
          </div>
        )}
      </div>
    </div>
  );
};
