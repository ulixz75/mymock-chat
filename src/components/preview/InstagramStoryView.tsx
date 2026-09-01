import React from 'react';
import { MockState } from '../../types';
import { X, MoreHorizontal, Send, Heart, Eye } from 'lucide-react';

interface Props { state: MockState; }

export const InstagramStoryView: React.FC<Props> = ({ state }) => {
  const isDark = state.theme === 'dark';
  const sc = state.storyConfig;
  const bg = isDark ? 'bg-black' : 'bg-zinc-900';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bg} text-white overflow-hidden relative`}>
      {/* Story image background */}
      <div className="flex-1 relative flex flex-col">
        <img src={sc.storyImageUrl} alt="story" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Top bar */}
        <div className="relative z-10">
          {/* Progress bars */}
          <div className="flex gap-1 p-1.5">
            <div className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"><div className="h-full w-[45%] bg-white" /></div>
            <div className="h-0.5 flex-1 bg-white/30 rounded-full" />
            <div className="h-0.5 flex-1 bg-white/30 rounded-full" />
          </div>
          <div className="px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={sc.storyOwnerAvatar} alt={sc.storyOwnerUsername} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover ring-1 ring-white/40" />
              <span className="font-semibold text-[13px]">{sc.storyOwnerUsername}</span>
              <span className="text-[11px] text-white/80">2h</span>
            </div>
            <div className="flex items-center gap-2">
              <MoreHorizontal className="w-5 h-5" />
              <X className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Center poll / reply */}
        <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6 gap-4">
          {sc.mode === 'poll' ? (
            <div className="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 text-center">
                <p className="text-slate-900 font-bold text-[14px] leading-tight">{sc.pollQuestion || '¿Te gustó el resultado?'}</p>
              </div>
              <div className="grid grid-cols-2 gap-0 border-t border-slate-200">
                {([0,1] as const).map((i) => {
                  const label = sc.pollOptions?.[i] || (i===0 ? 'Sí, brutal 🤩' : 'Aún no 😅');
                  const pct = sc.pollPercent?.[i] ?? (i===0?68:32);
                  return (
                    <div key={i} className="relative py-3 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8a2be2]/15 to-[#ff2d55]/15" style={{ width: `${pct}%` }} />
                      <span className="relative text-[12px] font-bold text-slate-900">{label}</span>
                      <span className="relative block text-[11px] font-semibold text-slate-600">{pct}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="py-1.5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> {sc.viewerCount || '1.2k vistas'}</div>
            </div>
          ) : (
            <div className="w-full max-w-[300px] bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl">
              <p className="text-slate-800 text-[13px] leading-relaxed whitespace-pre-wrap">{sc.replyText || '¡Felicidades! El cambio es increíble 🔥 ¿Cómo lo hiciste?'}</p>
            </div>
          )}
        </div>

        {/* Bottom reply bar */}
        <div className="relative z-10 p-3 flex items-center gap-2">
          <div className="flex-1 px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/20 text-[13px] text-white/90 flex items-center justify-between">
            <span>Responder a {sc.storyOwnerUsername}...</span>
            <Send className="w-4 h-4" />
          </div>
          <Heart className="w-6 h-6 text-white" />
          <Send className="w-6 h-6 text-white -rotate-45" />
        </div>
      </div>
    </div>
  );
};
