import React from 'react';
import { MockState } from '../../types';
import { Star, MoreVertical, ThumbsUp, MapPin, BadgeCheck, Building2 } from 'lucide-react';

interface Props {
  state: MockState;
}

export const GoogleReviewView: React.FC<Props> = ({ state }) => {
  const isDark = state.theme === 'dark';
  const rc = state.reviewConfig;
  const bg = isDark ? 'bg-black' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-[#9aa0a6]' : 'text-[#5f6368]';
  const border = isDark ? 'border-[#3c4043]' : 'border-slate-200';

  const stars = Array.from({ length: 5 }, (_, i) => i < rc.rating);

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bg} ${text} overflow-hidden`}>
      {/* Google Header */}
      <div className={`w-full px-4 py-3 flex items-center justify-between border-b ${border} ${isDark ? 'bg-[#202124]' : 'bg-white'}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[11px] font-bold text-[#4285f4] border border-slate-200">G</div>
          <span className={`text-[14px] font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>Google</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">· Reseñas</span>
        </div>
        <MoreVertical className="w-4 h-4 text-slate-400" />
      </div>

      {/* Business header */}
      <div className={`px-4 py-3 flex items-start gap-3 border-b ${border}`}>
        <img src={rc.businessAvatar} alt={rc.businessName} referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover ring-1 ring-black/10 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[14px] truncate">{rc.businessName}</span>
            <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
          </div>
          {rc.businessAddress && <div className={`flex items-center gap-1 text-[11px] ${muted} truncate`}><MapPin className="w-3 h-3" />{rc.businessAddress}</div>}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[12px] font-semibold">{rc.trustScore || '4.8'}</span>
            <div className="flex">
              {stars.map((filled, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${filled ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'}`} />
              ))}
            </div>
            <span className={`text-[11px] ${muted}`}>({rc.reviewCount || '1,248'})</span>
          </div>
        </div>
        <Building2 className="w-4 h-4 text-slate-400 hidden sm:block" />
      </div>

      {/* Review card */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#303134] border-[#3c4043]' : 'bg-slate-50 border-slate-200'} space-y-2.5`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img src={rc.authorAvatar} alt={rc.authorName} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[13px]">{rc.authorName}</span>
                  {rc.isLocalGuide && <span className="px-1 py-0.2 bg-blue-500/15 text-blue-500 text-[9px] font-bold rounded">Local Guide</span>}
                </div>
                <div className={`text-[11px] ${muted} flex items-center gap-1`}>
                  <span>{rc.reviewCount || '23 reseñas'}</span>
                  <span>·</span>
                  <span>{rc.reviewDate}</span>
                </div>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-1">
            {stars.map((filled, i) => (
              <Star key={i} className={`w-4 h-4 ${filled ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'}`} />
            ))}
            <span className={`text-[11px] ${muted} ml-1`}>{rc.reviewDate}</span>
          </div>

          <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap">{rc.content}</p>

          {rc.verifiedPurchase && (
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold border ${isDark ? 'bg-emerald-900/30 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
              <BadgeCheck className="w-3 h-3" /> Compra verificada
            </div>
          )}

          <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500">
            <button className="flex items-center gap-1 hover:text-slate-700">
              <ThumbsUp className="w-3.5 h-3.5" /> Útil {rc.helpfulCount ? `(${rc.helpfulCount})` : ''}
            </button>
            <button className="hover:text-slate-700">Compartir</button>
          </div>

          {rc.ownerResponse && (
            <div className={`mt-3 p-3 rounded-lg border ${isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-2 text-[11px] font-semibold">
                <img src={rc.businessAvatar} alt="owner" referrerPolicy="no-referrer" className="w-6 h-6 rounded-full" />
                <span>Respuesta del propietario</span>
                <span className={`font-normal ${muted}`}>· {rc.ownerResponseDate || 'hace 1 día'}</span>
              </div>
              <p className={`text-[12.5px] leading-relaxed mt-1.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{rc.ownerResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
