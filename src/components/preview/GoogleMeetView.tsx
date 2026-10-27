import React from 'react';
import { Mic, MicOff, Video, VideoOff, Captions, Hand, ScreenShare, MoreVertical, Phone, Info, Users, MessageSquare, Shapes, LockKeyhole } from 'lucide-react';
import { MockState } from '../../types';
import { getCallConfig } from '../../data/calls';
import { CallTile, CallChat } from './CallParts';

/** Meet web: mosaicos suaves, código abajo a la izquierda y controles centrales en cápsulas. */
export function GoogleMeetView({ state }: { state: MockState }) {
  const c = getCallConfig(state);
  const people = c.participants!.filter(p => c.showSelfView || p.id !== 'self');
  return <section className="meet-call">
    {c.recording && <div className="meet-recording"><i className="record-dot" /> Grabando</div>}
    <div className="meeting-body"><div className={`meet-gallery ${c.layout === 'speaker' ? 'speaker-layout' : ''}`}>
      {people.map((p, i) => <CallTile key={p.id} person={p.id === 'self' ? { ...p, muted: !!c.microphoneMuted, cameraOff: !!c.cameraOff } : p} variant="meet" active={i === 0} />)}
    </div>{c.showChatPanel && <CallChat meet name={people[0]?.name || ''} text={c.chatText || ''} />}</div>
    <footer className="meet-toolbar">
      <div className="meet-code">{state.statusBar.time}<span>|</span>{c.meetingCode}</div>
      <div className="meet-controls"><span className={c.microphoneMuted ? 'off' : ''}>{c.microphoneMuted ? <MicOff /> : <Mic />}</span><span className={c.cameraOff ? 'off' : ''}>{c.cameraOff ? <VideoOff /> : <Video />}</span><span><Captions /></span><span><Hand /></span><span><ScreenShare /></span><span><MoreVertical /></span><span className="meet-hangup"><Phone /></span></div>
      <div className="meet-details"><Info /><span><Users /><small>{people.length}</small></span><MessageSquare /><Shapes /><LockKeyhole /></div>
    </footer>
  </section>;
}
