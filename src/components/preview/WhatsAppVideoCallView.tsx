import React from 'react';
import { ChevronDown, LockKeyhole, UserPlus, Video, VideoOff, Mic, MicOff, Phone, SwitchCamera, MessageCircle } from 'lucide-react';
import { MockState } from '../../types';
import { getCallConfig } from '../../data/calls';

/** WhatsApp móvil: vídeo remoto a sangre, PiP propio y controles superpuestos. */
export function WhatsAppVideoCallView({ state }: { state: MockState }) {
  const c = getCallConfig(state);
  const person = c.participants![0];
  const active = c.mode === 'active';
  return <section className="wa-call">
    {active && !person.cameraOff && person.image && <img className="wa-remote" src={person.image} alt={person.name} referrerPolicy="no-referrer" />}
    <div className="wa-shade" />
    <header className="wa-call-top"><ChevronDown /><span><LockKeyhole size={11} /> Cifrado de extremo a extremo</span><UserPlus size={22} /></header>
    <div className={`wa-identity ${active ? '' : 'wa-ringing'}`}>
      {!active && <img src={person.image || state.contact.avatar} alt={person.name} />}
      <h2>{person.name}</h2><p>{active ? c.duration : c.mode === 'incoming' ? 'Videollamada de WhatsApp' : 'Videollamada perdida'}</p>
    </div>
    {active && person.cameraOff && <div className="wa-camera-off"><img src={person.image || state.contact.avatar} alt="" /><span>Cámara desactivada</span></div>}
    {active && c.showSelfView && <div className="wa-self">{c.cameraOff ? <VideoOff /> : <img src={state.meUser.avatar} alt="Tu cámara" referrerPolicy="no-referrer" />}</div>}
    <footer className="wa-call-bottom">
      {active ? <><div className="wa-handle" /><div className="wa-controls">
        <span><SwitchCamera /></span><span className={c.cameraOff ? 'is-off' : ''}>{c.cameraOff ? <VideoOff /> : <Video />}</span>
        <span className={c.microphoneMuted ? 'is-off' : ''}>{c.microphoneMuted ? <MicOff /> : <Mic />}</span><span className="hangup"><Phone /></span>
      </div></> : <div className="wa-incoming-controls"><div><span className="hangup"><Phone /></span><small>{c.mode === 'incoming' ? 'Rechazar' : 'Cerrar'}</small></div><div><span className="answer">{c.mode === 'incoming' ? <Video /> : <MessageCircle />}</span><small>{c.mode === 'incoming' ? 'Aceptar' : 'Mensaje'}</small></div></div>}
    </footer>
  </section>;
}
