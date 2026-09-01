import React from 'react';
import { MockState } from '../../types';
import { Star, ShieldCheck, BadgeCheck, MoreVertical, ThumbsUp } from 'lucide-react';

interface Props { state: MockState; }

export const TrustpilotView: React.FC<Props> = ({ state }) => {
  const isDark = state.theme === 'dark';
  const rc = state.reviewConfig;
  const bg = isDark ? 'bg-black' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-[#9aa0a6]' : 'text-[#5f6b7a]';
  const border = isDark ? 'border-[#3c4043]' : 'border-slate-200';

  const stars = Array.from({ length: 5 }, (_, i) => i < rc.rating);

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bg} ${text} overflow-hidden`}>
      {/* Trustpilot header */}
      <div className={`w-full px-4 py-3 flex items-center justify-between border-b ${border} ${isDark ? 'bg-[#0f1e1b]' : 'bg-[#f9fafb]'}`}>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-[#00b67a] text-white font-extrabold text-[11px] rounded flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" /> Trustpilot
          </div>
          <span className={`text-[11px] ${muted} hidden sm:inline`}>· Reseñas verificadas</span>
        </div>
        <MoreVertical className="w-4 h-4 text-slate-400" />
      </div>

      {/* Business */}
      <div className={`px-4 py-3 flex items-center gap-3 border-b ${border}`}>
        <img src={rc.businessAvatar} alt={rc.businessName} referrerPolicy="no-referrer" className="w-11 h-11 rounded-lg object-cover border border-black/10 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[13px] truncate">{rc.businessName}</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#00b67a] shrink-0" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {stars.map((filled, i) => (
                <div key={i} className={`w-5 h-5 rounded-sm flex items-center justify-center ${filled ? 'bg-[#00b67a]' : 'bg-slate-300'}`}>
                  <Star className="w-3 h-3 fill-white text-white" />
                </div>
              ))}
            </div>
            <span className="text-[11px] font-semibold">{rc.trustScore || '4.7'} · TrustScore</span>
          </div>
          <div className={`text-[11px] ${muted}`}>{rc.reviewCount || '3,421'} reseñas · Excelente</div>
        </div>
      </div>

      {/* Review */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#1e2e2a] border-[#2a3f3a]' : 'bg-slate-50 border-slate-200'} space-y-2.5`}>
          <div className="flex items-center gap-2">
            <div className="flex">
              {stars.map((filled, i) => (
                <div key={i} className={`w-6 h-6 flex items-center justify-center ${filled ? 'bg-[#00b67a]' : 'bg-slate-300'} ${i===0?'rounded-l':''} ${i===4?'rounded-r':''}`}>
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                </div>
              ))}
            </div>
            {rc.verifiedPurchase && <span className="ml-2 px-1.5 py-0.5 bg-[#00b67a]/15 text-[#00b67a] border border-[#00b67a]/20 text-[10px] font-bold rounded flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> Verificada</span>}
          </div>

          <div className="flex items-center gap-2">
            <img src={rc.authorAvatar} alt={rc.authorName} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <div className="font-semibold text-[12px]">{rc.authorName} {rc.isLocalGuide && <span className="text-[#00b67a] text-[10px]">· Comprador verificado</span>}</div>
              <div className={`text-[11px] ${muted}`}>{rc.reviewDate} · {rc.reviewCount || '5 reseñas'}</div>
            </div>
          </div>

          <p className="text-[13px] font-semibold leading-tight">{rc.content.split('.').slice(0,1).join('.')}</p>
          <p className="text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{rc.content}</p>

          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
            <button className="flex items-center gap-1 hover:text-slate-700"><ThumbsUp className="w-3.5 h-3.5" /> Útil {rc.helpfulCount && `(${rc.helpfulCount})`}</button>
            <button>Compartir</button>
            <span className={`ml-auto text-[10px] ${muted}`}>Invitada</span>
          </div>

          {rc.ownerResponse && (
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-black/40 border border-white/10' : 'bg-white border border-slate-200'}`}>
              <div className="text-[11px] font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#00b67a]" /> {rc.businessName} respondió · <span className={`font-normal ${muted}`}>{rc.ownerResponseDate || 'hace 1 día'}</span></div>
              <p className="text-[12px] leading-relaxed mt-1">{rc.ownerResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
