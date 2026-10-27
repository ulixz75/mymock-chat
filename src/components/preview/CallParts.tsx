import React from 'react';
import { MicOff, X, Send } from 'lucide-react';
import { CallParticipant } from '../../types';

/** Sólo los fotogramas se comparten; cada plataforma controla su composición y sus controles. */
export function CallTile({ person, variant, active = false }: { person: CallParticipant; variant: 'zoom' | 'meet'; active?: boolean }) {
  return <div className={`call-tile ${variant}-tile ${active ? 'speaking' : ''}`}>
    {!person.cameraOff && person.image ? <img src={person.image} alt={person.name} referrerPolicy="no-referrer" onError={e => { e.currentTarget.style.opacity = '0'; }} /> :
      <div className="call-initial">{person.name.trim().slice(0, 1).toUpperCase() || '?'}</div>}
    <span className="call-name">{variant === 'zoom' && person.muted && <MicOff size={13} color="#ff5555" />}{person.name}</span>
    {variant === 'meet' && <span className="meet-tile-status">{person.muted ? <MicOff size={15} /> : <span>ııı</span>}</span>}
  </div>;
}

export function CallChat({ text, name, meet = false }: { text: string; name: string; meet?: boolean }) {
  return <aside className={`call-chat ${meet ? 'meet-chat' : ''}`}>
    <header>{meet ? 'Mensajes en la llamada' : 'Chat de la reunión'}<X size={18} /></header>
    {meet && <p className="chat-notice">Los mensajes solo pueden verlos las personas que participan en la llamada.</p>}
    <div className="chat-message"><b>{name}</b><small> Ahora</small><p>{text}</p></div>
    <footer>Enviar un mensaje<Send size={16} /></footer>
  </aside>;
}
