import React from 'react';
import { MockState } from '../../types';
import { Bell } from 'lucide-react';

interface Props { state: MockState; }

export const PushNotificationView: React.FC<Props> = ({ state }) => {
  const pc = state.pushConfig;
  const isIOS = pc.pushStyle === 'ios';

  return (
    <div className={`w-full flex-1 flex flex-col items-center justify-start p-4 gap-3 font-sans select-none ${state.theme === 'dark' ? 'bg-[#0b141a]' : 'bg-[#e5ddd5]'} overflow-hidden`}>
      {/* Device hint */}
      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-black/5 px-3 py-1 rounded-full">
        <Bell className="w-3 h-3" /> Push · {isIOS ? 'iOS' : 'Android'} · {pc.timeAgo}
      </div>

      {/* iOS style */}
      {isIOS ? (
        <div className="w-full max-w-[360px] bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-black/10 overflow-hidden">
          <div className="px-4 py-3 flex items-start gap-3">
            <img src={pc.appIcon} alt={pc.appName} referrerPolicy="no-referrer" className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-[13px] text-slate-900 truncate">{pc.appName}</span>
                <span className="text-[11px] text-slate-500 shrink-0">{pc.timeAgo}</span>
              </div>
              <div className="font-bold text-[13px] text-slate-900 leading-tight mt-0.5 line-clamp-1">{pc.title}</div>
              <div className="text-[12.5px] text-slate-700 leading-snug line-clamp-2 mt-0.5">{pc.body}</div>
              {pc.badgeCount !== undefined && (
                <div className="mt-2 inline-flex px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full">{pc.badgeCount} nuevos</div>
              )}
            </div>
          </div>
          {pc.showActions && (
            <div className="flex border-t border-slate-200">
              <button className="flex-1 py-2.5 text-[12px] font-semibold text-[#007aff] border-r border-slate-200">Responder</button>
              <button className="flex-1 py-2.5 text-[12px] font-semibold text-slate-600">Silenciar</button>
            </div>
          )}
        </div>
      ) : (
        /* Android style */
        <div className="w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-black/5 overflow-hidden">
          <div className="px-3 py-2.5 flex items-start gap-3">
            <img src={pc.appIcon} alt={pc.appName} referrerPolicy="no-referrer" className="w-8 h-8 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[12px] text-slate-900">{pc.appName}</span>
                <span className="text-[10px] text-slate-500">· {pc.timeAgo}</span>
                {pc.badgeCount !== undefined && <span className="ml-auto w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{pc.badgeCount}</span>}
              </div>
              <div className="font-semibold text-[13px] text-slate-900 leading-tight mt-0.5">{pc.title}</div>
              <div className="text-[12px] text-slate-600 leading-snug mt-0.5 line-clamp-3">{pc.body}</div>
            </div>
          </div>
          {pc.showActions && (
            <div className="px-3 pb-2.5 flex gap-2">
              <button className="px-3 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-full">Abrir</button>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-full">Archivar</button>
            </div>
          )}
        </div>
      )}

      {/* Stack hint */}
      <div className="w-full max-w-[360px] opacity-60 scale-[0.97] -mt-1">
        <div className={`h-2 rounded-b-xl ${isIOS ? 'bg-white/70' : 'bg-white'} border-x border-b border-black/5`} />
      </div>
    </div>
  );
};
