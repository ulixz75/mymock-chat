import React from 'react';
import { ReviewConfig } from '../../types';
import { AVATAR_PRESETS } from '../../data/avatars';
import { Star, Building2, ShieldCheck, Upload, MapPin } from 'lucide-react';

interface Props {
  reviewConfig: ReviewConfig;
  onChange: (updates: Partial<ReviewConfig>) => void;
}

export const ReviewEditor: React.FC<Props> = ({ reviewConfig, onChange }) => {
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'authorAvatar' | 'businessAvatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { if (typeof reader.result === 'string') onChange({ [field]: reader.result } as any); };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Negocio
        </span>
        <div className="grid grid-cols-1 gap-2.5">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Nombre del negocio</label>
            <input value={reviewConfig.businessName} onChange={(e) => onChange({ businessName: e.target.value })} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" placeholder="Nabori Corp" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Dirección (opcional)</label>
            <input value={reviewConfig.businessAddress || ''} onChange={(e) => onChange({ businessAddress: e.target.value })} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" placeholder="Av. Reforma 222, CDMX" />
          </div>
          <div className="flex items-center gap-3">
            <img src={reviewConfig.businessAvatar} alt="biz" referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
            <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> Cambiar logo
              <input type="file" accept="image/*" onChange={(e) => handleAvatarUpload(e, 'businessAvatar')} className="hidden" />
            </label>
            <span className="text-[11px] text-slate-500">TrustScore</span>
            <input value={reviewConfig.trustScore || ''} onChange={(e) => onChange({ trustScore: e.target.value })} className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white text-center" placeholder="4.8" />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Reseña</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Rating</span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => onChange({ rating: n })} className={`w-7 h-7 rounded flex items-center justify-center ${n <= reviewConfig.rating ? 'bg-[#fbbc04] text-white' : 'bg-slate-800 text-slate-500'}`}>
                <Star className={`w-3.5 h-3.5 ${n <= reviewConfig.rating ? 'fill-white' : ''}`} />
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-300 ml-2">{reviewConfig.rating}/5</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Autor</label>
            <input value={reviewConfig.authorName} onChange={(e) => onChange({ authorName: e.target.value })} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Fecha</label>
            <input value={reviewConfig.reviewDate} onChange={(e) => onChange({ reviewDate: e.target.value })} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white" placeholder="hace 2 días" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src={reviewConfig.authorAvatar} alt="author" referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
          <label className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1">
            <Upload className="w-3 h-3" /> Foto autor
            <input type="file" accept="image/*" onChange={(e) => handleAvatarUpload(e, 'authorAvatar')} className="hidden" />
          </label>
          <div className="grid grid-cols-5 gap-1">
            {AVATAR_PRESETS.slice(0,5).map(p => (
              <button key={p.id} onClick={() => onChange({ authorAvatar: p.url })} className="w-6 h-6 rounded-full overflow-hidden"><img src={p.url} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" /></button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Texto reseña</label>
          <textarea rows={3} value={reviewConfig.content} onChange={(e) => onChange({ content: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 leading-relaxed resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Útil (ej. 12)</label>
            <input value={reviewConfig.helpfulCount || ''} onChange={(e) => onChange({ helpfulCount: e.target.value })} className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white" />
          </div>
          <label className="flex items-center gap-2 pt-5 cursor-pointer">
            <input type="checkbox" checked={!!reviewConfig.verifiedPurchase} onChange={(e) => onChange({ verifiedPurchase: e.target.checked })} className="w-4 h-4 rounded text-emerald-600 bg-slate-950 border-slate-800" />
            <span className="text-xs text-slate-300 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Verificada</span>
          </label>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Respuesta del propietario (opcional)</label>
          <textarea rows={2} value={reviewConfig.ownerResponse || ''} onChange={(e) => onChange({ ownerResponse: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100" placeholder="Gracias Ana, nos alegra..." />
        </div>
      </div>
    </div>
  );
};
