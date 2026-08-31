import React from 'react';
import { MockState, ThemeMode, DeviceType, ExportSettings, ChatConfig } from '../../types';
import { 
  Sun, 
  Moon, 
  Smartphone, 
  Square, 
  Layers, 
  Sparkles, 
  Sliders, 
  Palette,
  Image as ImageIcon
} from 'lucide-react';

interface Props {
  state: MockState;
  onChangeTheme: (theme: ThemeMode) => void;
  onChangeDevice: (device: DeviceType) => void;
  onChangeExportSettings: (updates: Partial<ExportSettings>) => void;
  onChangeChat: (updates: Partial<ChatConfig>) => void;
}

export const AppearanceEditor: React.FC<Props> = ({
  state,
  onChangeTheme,
  onChangeDevice,
  onChangeExportSettings,
  onChangeChat
}) => {
  const { theme, device, exportSettings, chat, platform } = state;

  return (
    <div className="space-y-4">
      {/* Theme Selection: Light / Dark */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" /> Tema Visual
        </span>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onChangeTheme('dark')}
            className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
              theme === 'dark'
                ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/40 text-white font-semibold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span className="text-xs">Modo Oscuro (Dark)</span>
          </button>

          <button
            onClick={() => onChangeTheme('light')}
            className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
              theme === 'light'
                ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/40 text-white font-semibold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-xs">Modo Claro (Light)</span>
          </button>
        </div>
      </div>

      {/* Device Frame Style */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> Marco del Dispositivo
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'social_card', label: 'Tarjeta Social', desc: 'Como el ejemplo adjunto' },
            { id: 'iphone_16_pro', label: 'iPhone 16 Pro', desc: 'Chasis realista' },
            { id: 'android', label: 'Android Phone', desc: 'Pantalla completa' },
            { id: 'frameless', label: 'Sin Marco (Captura)', desc: 'Puro contenido' },
          ].map((d) => {
            const isSelected = device === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onChangeDevice(d.id as DeviceType)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/40 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">{d.label}</div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{d.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* WhatsApp or Instagram Specific Options */}
      {platform === 'whatsapp' && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Fondo de Chat WhatsApp
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onChangeChat({ chatWallpaper: 'whatsapp_pattern' })}
              className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium ${
                chat.chatWallpaper === 'whatsapp_pattern'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Patrón con Doodles
            </button>
            <button
              onClick={() => onChangeChat({ chatWallpaper: 'default' })}
              className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium ${
                chat.chatWallpaper === 'default'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              Fondo Plano
            </button>
          </div>
        </div>
      )}

      {platform === 'instagram_dm' && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox"
              checked={chat.instagramGradientBubbles}
              onChange={(e) => onChangeChat({ instagramGradientBubbles: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-slate-300 font-medium">
              Burbujas en Gradiente Instagram (Púrpura - Naranja)
            </span>
          </label>
        </div>
      )}

      {/* Export Canvas Backdrop & Aspect Ratio */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> Fondo & Formato del Lienzo
        </span>

        {/* Backdrop presets */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
            Fondo para Exportar / Redes Sociales
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { id: 'none', label: 'Sin fondo', bg: 'bg-slate-950 border-slate-700' },
              { id: 'transparent', label: 'Transparente', bg: 'bg-neutral-800 border-dashed border-slate-600' },
              { id: 'gradient_purple', label: 'Violeta', bg: 'bg-gradient-to-r from-indigo-600 to-purple-600' },
              { id: 'gradient_ocean', label: 'Océano', bg: 'bg-gradient-to-r from-cyan-600 to-blue-600' },
              { id: 'gradient_sunset', label: 'Sunset', bg: 'bg-gradient-to-r from-amber-600 to-rose-600' },
              { id: 'dark', label: 'Dark Studio', bg: 'bg-neutral-900 border border-neutral-700' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => onChangeExportSettings({ backgroundStyle: b.id as any })}
                className={`py-2 px-1 rounded-lg border text-center transition-all ${
                  exportSettings.backgroundStyle === b.id
                    ? 'ring-2 ring-indigo-500 scale-105 shadow-md'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-full h-4 rounded ${b.bg} mb-1`} />
                <span className="text-[10px] text-slate-300 block truncate">{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {[
            { id: 'auto', label: 'Automático', sub: 'Ajuste exacto' },
            { id: '1:1', label: '1:1 Cuadrado', sub: 'Post Instagram' },
            { id: '9:16', label: '9:16 Vertical', sub: 'Historias / Reels' },
            { id: '4:5', label: '4:5 Retrato', sub: 'Feed Instagram' },
          ].map((ar) => (
            <button
              key={ar.id}
              onClick={() => onChangeExportSettings({ aspectRatio: ar.id as any })}
              className={`p-2 rounded-lg border text-left transition-colors ${
                exportSettings.aspectRatio === ar.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-semibold">{ar.label}</div>
              <div className="text-[10px] text-slate-500">{ar.sub}</div>
            </button>
          ))}
        </div>

        {/* Padding and Shadow sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>Margen / Relleno ({exportSettings.padding}px)</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              step="8"
              value={exportSettings.padding}
              onChange={(e) => onChangeExportSettings({ padding: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-4 pt-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={exportSettings.showShadow}
                onChange={(e) => onChangeExportSettings({ showShadow: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">Sombra 3D Realista</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
