import React from 'react';
import { MockState } from '../../types';
import { StoredProject, MAX_PROJECTS } from '../../data/storage';
import { History, Trash2, Copy, Check, Clock, X, Edit3, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: StoredProject[];
  currentId?: string;
  onLoad: (state: MockState) => void;
  onDelete: (id: string) => void;
  onDuplicate: (state: MockState) => void;
}

function formatDate(ts: number) {
  try {
    return new Date(ts).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
}

export const ProjectsModal: React.FC<Props> = ({ isOpen, onClose, projects, currentId, onLoad, onDelete, onDuplicate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <History className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] sm:text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                Mis creaciones <span className="text-indigo-400 font-mono text-xs">({projects.length}/{MAX_PROJECTS})</span>
              </h3>
              <p className="text-[11px] text-slate-400 hidden sm:block">Se guardan localmente. Al llegar a {MAX_PROJECTS}, se borra la más antigua y entra la nueva.</p>
              <p className="text-[10px] text-slate-400 sm:hidden">Máx {MAX_PROJECTS} · LRU: la más vieja se borra</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 sm:p-1 text-slate-400 hover:text-white active:text-white rounded-lg shrink-0 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info bar */}
        <div className="px-3 sm:px-4 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
          <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Edita cualquier creación anterior: se cargará y pasará a ser la más reciente al guardar.</span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 overscroll-contain [-webkit-overflow-scrolling:touch]">
          {projects.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
                <History className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-300 font-semibold">Aún no hay creaciones guardadas</p>
              <p className="text-xs text-slate-500 mt-1">Edita el mock y pulsa <span className="text-emerald-400 font-semibold">Guardar</span> para crear una entrada. Auto-guardado actualiza la más reciente.</p>
            </div>
          ) : (
            projects.map((p, idx) => {
              const isActive = p.state.id === currentId;
              const isOldest = idx === projects.length - 1 && projects.length === MAX_PROJECTS;
              return (
                <div key={p.state.id + '-' + p.savedAt} className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-colors ${isActive ? 'bg-indigo-600/15 border-indigo-500/40 ring-1 ring-indigo-500/30' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'}`}>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[12px] font-bold text-white truncate max-w-[160px] sm:max-w-[240px]">{p.state.title || p.state.platform}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${p.state.platform.includes('instagram') ? 'bg-pink-500/15 text-pink-300 border-pink-500/20' : p.state.platform === 'whatsapp' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>{p.state.platform.replace('_',' ')}</span>
                      {isActive && <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full">ACTUAL</span>}
                      {isOldest && <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold rounded-full">MÁS ANTIGUA → se borrará</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(p.savedAt)}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="truncate">{p.state.theme === 'dark' ? 'Dark' : 'Light'} · {p.state.device}</span>
                      <span className="hidden sm:inline">· {p.state.messages?.length ?? p.state.commentConfig?.comments?.length ?? 0} items</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onLoad(p.state)}
                      className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 min-h-[32px]"
                      title="Cargar para editar"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => onDuplicate(p.state)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 min-w-[32px] min-h-[32px] flex items-center justify-center"
                      title="Duplicar"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { if (confirm('¿Borrar esta creación?')) onDelete(p.state.id); }}
                      className="p-1.5 bg-slate-800 hover:bg-rose-900/40 active:bg-rose-900/60 text-slate-400 hover:text-rose-300 rounded-lg border border-slate-700 hover:border-rose-800/50 min-w-[32px] min-h-[32px] flex items-center justify-center"
                      title="Borrar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Almacenado en este navegador · sin backend</span>
          <span className="font-mono">{projects.length}/{MAX_PROJECTS}</span>
        </div>
      </div>
    </div>
  );
};
