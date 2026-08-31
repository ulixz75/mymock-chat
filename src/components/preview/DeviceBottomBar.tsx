import React from 'react';
import { DeviceType, ThemeMode } from '../../types';

interface Props {
  device: DeviceType;
  theme: ThemeMode;
}

export const DeviceBottomBar: React.FC<Props> = ({ device, theme }) => {
  if (device === 'frameless' || device === 'social_card') return null;

  const isDark = theme === 'dark';

  if (device === 'android') {
    return (
      <div className="w-full h-5 flex items-center justify-center pb-1">
        <div className={`w-20 h-1 rounded-full ${isDark ? 'bg-white/40' : 'bg-slate-900/40'}`} />
      </div>
    );
  }

  return (
    <div className="w-full h-6 flex items-center justify-center pb-2">
      <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-white/50' : 'bg-slate-900/50'}`} />
    </div>
  );
};
