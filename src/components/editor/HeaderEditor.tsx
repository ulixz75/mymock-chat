import React, { useState } from 'react';
import { MockState, ContactConfig, StatusBarConfig } from '../../types';
import { AVATAR_PRESETS } from '../../data/avatars';
import { 
  User, 
  Upload, 
  BadgeCheck, 
  Clock, 
  Battery, 
  Wifi, 
  Signal, 
  Sparkles,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';

interface Props {
  state: MockState;
  onChangeContact: (updates: Partial<ContactConfig>) => void;
  onChangeStatusBar: (updates: Partial<StatusBarConfig>) => void;
}

export const HeaderEditor: React.FC<Props> = ({
  state,
  onChangeContact,
  onChangeStatusBar
}) => {
  const [showAvatarPresets, setShowAvatarPresets] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onChangeContact({ avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Contact Profile Section */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" /> Perfil del Contacto / Usuario
          </span>
          <button
            onClick={() => setShowAvatarPresets(!showAvatarPresets)}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> {showAvatarPresets ? 'Ocultar fotos' : 'Ver fotos sugeridas'}
          </button>
        </div>

        {/* Avatar Selection & Upload */}
        <div className="flex items-center space-x-3">
          <div className="relative group shrink-0">
            <img 
              src={state.contact.avatar} 
              alt={state.contact.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/50"
            />
            <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Upload className="w-4 h-4 text-white" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarUpload} 
                className="hidden" 
              />
            </label>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center space-x-2">
              <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 cursor-pointer flex items-center space-x-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5 text-indigo-400" />
                <span>Subir Foto Personal</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  className="hidden" 
                />
              </label>
            </div>
            <p className="text-[11px] text-slate-400">
              Usa cualquier foto de tu galería o presiona en las fotos sugeridas abajo.
            </p>
          </div>
        </div>

        {/* Avatar Preset Grid (Collapsible) */}
        {showAvatarPresets && (
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 mb-2">Fotos de perfil sugeridas:</div>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onChangeContact({ avatar: preset.url, name: preset.name.split(' (')[0] })}
                  className="relative group rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title={preset.name}
                >
                  <img 
                    src={preset.url} 
                    alt={preset.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Name & Handle Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Nombre Visible
            </label>
            <input 
              type="text"
              value={state.contact.name}
              onChange={(e) => onChangeContact({ name: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="Ej. Ana Martínez"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Usuario (@handle)
            </label>
            <input 
              type="text"
              value={state.contact.username}
              onChange={(e) => onChangeContact({ username: e.target.value.replace('@', '') })}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="amrtinez_3450"
            />
          </div>
        </div>

        {/* Status text & Verified badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Subtexto / Estado de Conexión
            </label>
            <input 
              type="text"
              value={state.contact.statusText}
              onChange={(e) => onChangeContact({ statusText: e.target.value })}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
              placeholder="en línea, activo(a) ahora..."
            />
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={state.contact.isVerified}
                onChange={(e) => onChangeContact({ isVerified: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5 text-blue-400" /> Verificado
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={state.contact.isOnline}
                onChange={(e) => onChangeContact({ isOnline: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">
                Punto Verde (Online)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Status Bar Settings Section */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" /> Barra de Estado del Teléfono
          </span>
          <button
            onClick={() => onChangeStatusBar({ showStatusBar: !state.statusBar.showStatusBar })}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
          >
            {state.statusBar.showStatusBar ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            {state.statusBar.showStatusBar ? 'Visible' : 'Oculta'}
          </button>
        </div>

        {state.statusBar.showStatusBar && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Hora
                </label>
                <input 
                  type="text"
                  value={state.statusBar.time}
                  onChange={(e) => onChangeStatusBar({ time: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="9:41"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Battery className="w-3 h-3" /> Batería ({state.statusBar.batteryLevel}%)
                </label>
                <input 
                  type="range"
                  min="5"
                  max="100"
                  value={state.statusBar.batteryLevel}
                  onChange={(e) => onChangeStatusBar({ batteryLevel: parseInt(e.target.value, 10) })}
                  className="w-full accent-indigo-500 cursor-pointer mt-2"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Signal className="w-3 h-3" /> Señal Móvil (1-4)
                </label>
                <div className="flex space-x-1 mt-1">
                  {[1, 2, 3, 4].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => onChangeStatusBar({ cellularSignal: lvl })}
                      className={`flex-1 py-1 text-xs rounded font-medium ${
                        state.statusBar.cellularSignal === lvl 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={state.statusBar.showBatteryPercentage}
                  onChange={(e) => onChangeStatusBar({ showBatteryPercentage: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Mostrar % Batería</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={state.statusBar.showDynamicIsland}
                  onChange={(e) => onChangeStatusBar({ showDynamicIsland: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Dynamic Island (iPhone)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={state.statusBar.isCharging}
                  onChange={(e) => onChangeStatusBar({ isCharging: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Cargando ⚡</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
