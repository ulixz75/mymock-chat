import React from 'react';
import { MockState } from '../../types';
import { Camera, Mic, MicOff, MoreHorizontal, Phone, Users, Volume2 } from 'lucide-react';

interface Props { state: MockState; platform: 'whatsapp_video_call' | 'zoom_meeting' | 'google_meet_meeting'; }

/** Layout compartido de llamadas y reuniones; estático y exportable como el resto del producto. */
export const VideoCallView: React.FC<Props> = ({ state, platform }) => {
  // El fallback permite abrir proyectos antiguos guardados antes de esta función.
  const cfg = state.videoCallConfig ?? { mode: 'active' as const, duration: '00:12:48', meetingTitle: 'Reunión de equipo', meetingCode: '', participantCount: 4, showSelfView: true, showChatPanel: false };
  const isWhatsApp = platform === 'whatsapp_video_call';
  const isZoom = platform === 'zoom_meeting';
  const brand = isWhatsApp ? '#075e54' : isZoom ? '#2d8cff' : '#1a73e8';
  const title = isWhatsApp ? state.contact.name : cfg.meetingTitle;
  const participants = Math.max(1, Math.min(cfg.participantCount, 6));
  return (
    <div className={`w-full flex-1 flex flex-col min-h-[560px] text-white ${state.theme === 'dark' ? 'bg-[#111827]' : 'bg-[#f8fafc] text-slate-900'}`}>
      <div className="px-4 py-3 flex items-center justify-between shadow-md" style={{ backgroundColor: brand }}>
        <div className="min-w-0"><div className="font-semibold truncate">{title}</div><div className="text-[11px] opacity-80">{cfg.mode === 'missed' ? 'Llamada perdida' : cfg.mode === 'incoming' ? 'Llamada entrante' : cfg.duration}</div></div>
        <div className="flex items-center gap-3"><Users className="w-4 h-4" /><MoreHorizontal className="w-5 h-5" /></div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div className={`grid ${participants > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 flex-1`}>
          {Array.from({ length: participants }, (_, i) => <div key={i} className="relative min-h-[120px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 flex items-center justify-center">
            <img src={i === 0 ? state.contact.avatar : state.meUser.avatar} alt="Participante" className="w-20 h-20 rounded-full object-cover ring-2 ring-white/30" referrerPolicy="no-referrer" />
            <span className="absolute bottom-2 left-2 text-[10px] bg-black/50 rounded px-1.5 py-0.5">{i === 0 ? state.contact.name : `Participante ${i + 1}`}</span><MicOff className="absolute bottom-2 right-2 w-3.5 h-3.5 opacity-80" />
          </div>)}
        </div>
        {cfg.showChatPanel && <div className="rounded-lg bg-black/20 px-3 py-2 text-[11px] opacity-80">Chat de la reunión · {cfg.meetingCode || 'sin código'}</div>}
      </div>
      <div className="px-4 py-3 flex items-center justify-center gap-3 bg-black/30"><button className="p-3 rounded-full bg-white/15"><Mic className="w-4 h-4" /></button><button className="p-3 rounded-full bg-white/15"><Camera className="w-4 h-4" /></button><button className="p-3 rounded-full bg-white/15"><Volume2 className="w-4 h-4" /></button><button className="p-3 rounded-full bg-red-600"><Phone className="w-4 h-4 rotate-[135deg]" /></button></div>
    </div>
  );
};
