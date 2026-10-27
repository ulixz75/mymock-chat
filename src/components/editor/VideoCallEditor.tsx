import React from 'react';
import { MockState, VideoCallConfig } from '../../types';
import { getCallConfig } from '../../data/calls';

/** Edita datos persistidos; los controles dibujados dentro de la captura son decorativos. */
export function VideoCallEditor({ state, onChange }: { state: MockState; onChange: (config: VideoCallConfig) => void }) {
  const c = getCallConfig(state);
  const wa = state.platform === 'whatsapp_video_call';
  const update = (patch: Partial<VideoCallConfig>) => onChange({ ...c, ...patch });
  const field = 'w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm mt-1';
  return <div className="space-y-4 text-sm">
    <p className="text-slate-400">{wa ? 'WhatsApp · Videollamada móvil' : state.platform === 'zoom_meeting' ? 'Zoom Workplace · Escritorio' : 'Google Meet · Navegador'}</p>
    {wa ? <label className="block">Estado<select className={field} value={c.mode} onChange={e => update({ mode: e.target.value as VideoCallConfig['mode'] })}><option value="active">En curso</option><option value="incoming">Entrante</option><option value="missed">Perdida</option></select></label> :
      <><label className="block">{state.platform === 'zoom_meeting' ? 'Título de reunión' : 'Código de reunión'}<input className={field} value={state.platform === 'zoom_meeting' ? c.meetingTitle : c.meetingCode} onChange={e => update(state.platform === 'zoom_meeting' ? { meetingTitle: e.target.value } : { meetingCode: e.target.value })} /></label>
      <label className="block">Distribución<select className={field} value={c.layout} onChange={e => update({ layout: e.target.value as 'gallery' | 'speaker' })}><option value="gallery">Galería</option><option value="speaker">Orador destacado</option></select></label></>}
    {state.platform !== 'google_meet_meeting' && <label className="block">Duración<input className={field} value={c.duration} onChange={e => update({ duration: e.target.value })} /></label>}
    {([['microphoneMuted', 'Mi micrófono silenciado'], ['cameraOff', 'Mi cámara apagada'], ['showSelfView', 'Mostrar mi vista'], ...(!wa ? [['recording', 'Indicador de grabación'], ['showChatPanel', 'Panel de chat']] : [])] as [keyof VideoCallConfig, string][]).map(([key, label]) =>
      <label key={key} className="flex gap-2"><input type="checkbox" checked={!!c[key]} onChange={e => update({ [key]: e.target.checked })} />{label}</label>)}
    {!wa && c.showChatPanel && <label className="block">Mensaje del chat<textarea className={field} value={c.chatText} onChange={e => update({ chatText: e.target.value })} /></label>}
    <h3 className="font-semibold">{wa ? 'Contacto en la llamada' : 'Participantes'}</h3>
    {(wa ? c.participants!.slice(0, 1) : c.participants!).map(p => {
      const change = (patch: Partial<typeof p>) => update({ participants: c.participants!.map(item => item.id === p.id ? { ...item, ...patch } : item) });
      return <fieldset key={p.id} className="border border-slate-700 rounded-xl p-3 space-y-2">
        <label className="block">Nombre<input className={field} value={p.name} onChange={e => change({ name: e.target.value })} /></label>
        <label className="block">Foto / fotograma (URL)<input className={field} value={p.image} onChange={e => change({ image: e.target.value })} /></label>
        <label className="block text-xs text-slate-400">Subir imagen (máximo 1 MB)<input className="block mt-2 w-full" type="file" accept="image/png,image/jpeg,image/webp" onChange={e => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (file.size > 1024 * 1024) { window.alert('Usa una imagen de menos de 1 MB para el guardado local.'); return; }
          const reader = new FileReader();
          reader.onload = () => change({ image: String(reader.result) });
          reader.readAsDataURL(file);
        }} /></label>
        <label className="flex gap-2"><input type="checkbox" checked={p.cameraOff} onChange={e => change({ cameraOff: e.target.checked })} />Cámara apagada</label>
        {!wa && <><label className="flex gap-2"><input type="checkbox" checked={p.muted} onChange={e => change({ muted: e.target.checked })} />Silenciado</label>
        <button className="text-red-400 disabled:opacity-40" disabled={c.participants!.length <= 1 || p.id === 'remote'} onClick={() => update({ participants: c.participants!.filter(item => item.id !== p.id), participantCount: c.participants!.length - 1 })}>Eliminar participante</button></>}
      </fieldset>;
    })}
    {!wa && <button className="rounded-lg bg-indigo-600 px-3 py-2 disabled:opacity-40" disabled={c.participants!.length >= 6} onClick={() => update({ participants: [...c.participants!, { id: crypto.randomUUID(), name: 'Nuevo participante', image: '', cameraOff: true, muted: true }], participantCount: c.participants!.length + 1 })}>Añadir participante</button>}
  </div>;
}
