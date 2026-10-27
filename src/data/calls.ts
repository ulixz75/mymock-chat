import { MockState, PlatformId, VideoCallConfig, CallParticipant } from '../types';

export const isCallPlatform = (p: PlatformId) =>
  p === 'whatsapp_video_call' || p === 'zoom_meeting' || p === 'google_meet_meeting';

/** Centraliza valores legacy para importación JSON, historial y sesión guardada. */
export function getCallConfig(state: MockState): VideoCallConfig {
  const saved = state.videoCallConfig;
  const defaults: CallParticipant[] = [
    { id: 'remote', name: state.contact.name, image: state.contact.avatar, cameraOff: false, muted: false },
    { id: 'guest-2', name: 'Carlos López', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=450&fit=crop', cameraOff: false, muted: true },
    { id: 'guest-3', name: 'Lucía Torres', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=450&fit=crop', cameraOff: false, muted: true },
    { id: 'self', name: state.meUser.name + ' (Tú)', image: state.meUser.avatar, cameraOff: true, muted: true },
  ];
  const count = Math.max(1, Math.min(6, Number(saved?.participantCount) || 4));
  return {
    mode: 'active', duration: '12:48', meetingTitle: 'Reunión de equipo',
    meetingCode: state.platform === 'zoom_meeting' ? '842 5310 2806' : 'abc-defg-hij',
    participantCount: count, showSelfView: true, showChatPanel: false,
    layout: 'gallery', microphoneMuted: false, cameraOff: false, recording: false,
    chatText: '¡Hola a todos! ¿Empezamos?',
    ...saved,
    participants: saved?.participants?.length ? saved.participants : Array.from({ length: count }, (_, i) =>
      defaults[i] ?? { id: 'guest-' + i, name: 'Participante ' + (i + 1), image: '', cameraOff: true, muted: true }),
  };
}
