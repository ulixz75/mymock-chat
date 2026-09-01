import React from 'react';
import { PlatformId, MockType } from '../../types';
import { 
  MessageSquare, 
  Instagram, 
  Send, 
  Smartphone, 
  Flame, 
  Twitter, 
  Sparkles,
  MessageCircle,
  Star,
  ShieldCheck,
  Bell,
  Smartphone as PhoneIcon
} from 'lucide-react';

interface Props {
  currentPlatform: PlatformId;
  onSelectPlatform: (platform: PlatformId) => void;
}

export const PlatformSelector: React.FC<Props> = ({ currentPlatform, onSelectPlatform }) => {
  const platforms: {
    id: PlatformId;
    name: string;
    category: string;
    icon: React.ReactNode;
    color: string;
    badge?: string;
  }[] = [
    {
      id: 'instagram_comment',
      name: 'Instagram Testimonio',
      category: 'Comentario / Reseña',
      icon: <Instagram className="w-5 h-5" />,
      color: 'from-pink-500 via-red-500 to-yellow-500',
      badge: 'Ejemplo adjunto'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      category: 'Chat Directo',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Más usado'
    },
    {
      id: 'instagram_dm',
      name: 'Instagram DM',
      category: 'Mensajes Directos',
      icon: <Instagram className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'imessage',
      name: 'Apple iMessage / SMS',
      category: 'iOS Mensajes',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      badge: 'iOS'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      category: 'Canales & Chat',
      icon: <Send className="w-5 h-5" />,
      color: 'from-sky-400 to-blue-600'
    },
    {
      id: 'messenger',
      name: 'Facebook Messenger',
      category: 'Facebook Chat',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'android_sms',
      name: 'Android SMS / RCS',
      category: 'Google Messages',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-500',
      badge: 'Android'
    },
    {
      id: 'tiktok_comment',
      name: 'TikTok Comentarios',
      category: 'Comentarios Virales',
      icon: <Flame className="w-5 h-5" />,
      color: 'from-rose-500 to-teal-400'
    },
    {
      id: 'twitter_dm',
      name: 'X (Twitter) DM',
      category: 'Mensajes X',
      icon: <Twitter className="w-5 h-5" />,
      color: 'from-slate-700 to-slate-900'
    },
    {
      id: 'google_review',
      name: 'Google Reviews',
      category: 'Reseña 5★ Google',
      icon: <Star className="w-5 h-5" />,
      color: 'from-[#4285f4] to-[#34a853]',
      badge: 'Nuevo'
    },
    {
      id: 'trustpilot_review',
      name: 'Trustpilot',
      category: 'Reseña Verificada',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'from-[#00b67a] to-[#005128]',
      badge: 'Nuevo'
    },
    {
      id: 'instagram_story',
      name: 'Instagram Story',
      category: 'Reply / Poll',
      icon: <PhoneIcon className="w-5 h-5" />,
      color: 'from-pink-500 via-purple-500 to-orange-400',
      badge: 'Story'
    },
    {
      id: 'push_notification',
      name: 'Push Notificación',
      category: 'iOS / Android',
      icon: <Bell className="w-5 h-5" />,
      color: 'from-slate-800 to-indigo-600',
      badge: 'Push'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Plataforma & Formato
        </label>
        <span className="text-[11px] text-indigo-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> 13 Plantillas Pro
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {platforms.map((p) => {
          const isSelected = currentPlatform === p.id;

          return (
            <button
              key={p.id}
              onClick={() => onSelectPlatform(p.id)}
              className={`relative flex items-center space-x-2.5 p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${p.color} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                {p.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold text-white truncate leading-tight">
                    {p.name}
                  </div>
                </div>
                <div className="text-[10.5px] text-slate-400 truncate">
                  {p.category}
                </div>
              </div>

              {p.badge && (
                <span className={`absolute -top-1.5 right-2 px-1.5 py-0.2 text-[9px] font-bold rounded-full uppercase tracking-tighter ${
                  p.badge === 'Ejemplo adjunto'
                    ? 'bg-amber-500 text-black font-extrabold ring-1 ring-black'
                    : 'bg-indigo-500/80 text-white'
                }`}>
                  {p.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
