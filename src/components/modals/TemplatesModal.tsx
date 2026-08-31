import React, { useState } from 'react';
import { TemplatePreset, MockState } from '../../types';
import { TEMPLATES_LIBRARY } from '../../data/templates';
import { 
  Sparkles, 
  X, 
  Check, 
  MessageCircle, 
  Instagram, 
  MessageSquare, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplatePreset) => void;
}

export const TemplatesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos los Templates' },
    { id: 'testimonial', label: '⭐ Testimonios & Reseñas' },
    { id: 'sales', label: '💰 Cierres de Venta & Pagos' },
    { id: 'whatsapp', label: '🟢 WhatsApp Chats' },
    { id: 'instagram', label: '📸 Instagram' },
    { id: 'viral', label: '🔥 Virales & Comunidad' },
  ];

  const filtered = selectedCategory === 'all'
    ? TEMPLATES_LIBRARY
    : TEMPLATES_LIBRARY.filter((t) => t.category === selectedCategory || (selectedCategory === 'whatsapp' && t.platform === 'whatsapp') || (selectedCategory === 'instagram' && (t.platform === 'instagram_comment' || t.platform === 'instagram_dm')));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] sm:text-sm font-bold text-white leading-tight truncate">Galería de Plantillas</h3>
              <p className="text-[11px] text-slate-400 hidden sm:block">Selecciona una plantilla pre-diseñada para cargarla y editarla al instante.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 sm:p-1 text-slate-400 hover:text-white active:text-white rounded-lg shrink-0 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills - scrollable with snap */}
        <div className="p-2.5 sm:p-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-2 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors snap-start min-h-[36px] sm:min-h-0 ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 active:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="p-3 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
          {filtered.map((tpl) => {
            const isFeatured = tpl.id === 'tpl-ig-comment-nabori';

            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelectTemplate(tpl);
                  onClose();
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-amber-500/60 ring-2 ring-amber-500/20 shadow-xl'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      tpl.platform.includes('instagram')
                        ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                        : tpl.platform === 'whatsapp'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : tpl.platform === 'imessage'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tpl.platform.replace('_', ' ')}
                    </span>

                    {isFeatured && (
                      <span className="px-2 py-0.5 bg-amber-500 text-black font-extrabold text-[10px] rounded-full">
                        ⭐ EJEMPLO ADJUNTO
                      </span>
                    )}
                  </div>

                  <h4 className="text-[14px] font-bold text-white leading-snug">{tpl.title}</h4>
                  <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">{tpl.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group">
                  <span>Cargar esta plantilla</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
