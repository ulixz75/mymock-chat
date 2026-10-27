import React from 'react';
import { Mic, MicOff, Video, VideoOff, Users, MessageSquare, SquareArrowUp, Smile, MoreHorizontal, ShieldCheck, Grid2X2, ChevronUp, Minus, Square, X, Sparkles } from 'lucide-react';
import { MockState } from '../../types';
import { getCallConfig } from '../../data/calls';
import { CallTile, CallChat } from './CallParts';

/** Zoom Workplace desktop: ventana, galería rectangular y barra inferior con etiquetas. */
export function ZoomMeetingView({ state }: { state: MockState }) {
  const c = getCallConfig(state);
  const people = c.participants!.filter(p => c.showSelfView || p.id !== 'self');
  const actions = [
    { icon: c.microphoneMuted ? MicOff : Mic, label: 'Audio', arrow: true },
    { icon: c.cameraOff ? VideoOff : Video, label: 'Vídeo', arrow: true },
    { icon: Users, label: 'Participantes (' + people.length + ')' },
    { icon: MessageSquare, label: 'Chat' }, { icon: Smile, label: 'Reacciones' },
    { icon: SquareArrowUp, label: 'Compartir', green: true }, { icon: Sparkles, label: 'AI Companion' },
    { icon: MoreHorizontal, label: 'Más' },
  ];
  return <section className="zoom-call">
    <header className="zoom-window"><span>zoom Workplace</span><span>{c.meetingTitle}</span><div><Minus size={14} /><Square size={12} /><X size={16} /></div></header>
    <div className="zoom-top"><span><ShieldCheck size={18} color="#59c96e" />{c.recording && <><i className="record-dot" /> Grabando</>}</span><span>{c.duration}</span><span><Grid2X2 size={15} /> Vista</span></div>
    <div className="meeting-body"><div className={`zoom-gallery ${c.layout === 'speaker' ? 'speaker-layout' : ''}`}>
      {people.map((p, i) => <CallTile key={p.id} person={p.id === 'self' ? { ...p, muted: !!c.microphoneMuted, cameraOff: !!c.cameraOff } : p} variant="zoom" active={i === 0} />)}
    </div>{c.showChatPanel && <CallChat name={people[0]?.name || ''} text={c.chatText || ''} />}</div>
    <footer className="zoom-toolbar">{actions.map(a => <div key={a.label} className={a.green ? 'zoom-share' : ''}><span><a.icon size={23} />{a.arrow && <ChevronUp size={10} />}</span><small>{a.label}</small></div>)}<span className="zoom-leave">Salir</span></footer>
  </section>;
}
