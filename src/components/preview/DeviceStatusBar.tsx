import React from 'react';
import { StatusBarConfig, ThemeMode, DeviceType } from '../../types';
import { Wifi, Battery, BatteryCharging, Signal, Plane } from 'lucide-react';

interface Props {
  config: StatusBarConfig;
  theme: ThemeMode;
  device: DeviceType;
}

export const DeviceStatusBar: React.FC<Props> = ({ config, theme, device }) => {
  if (!config.showStatusBar) return null;

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';

  if (device === 'android') {
    return (
      <div className={`w-full px-5 pt-2 pb-1.5 flex items-center justify-between text-xs font-medium tracking-tight select-none ${textColor}`}>
        <span className="font-semibold text-xs tracking-normal">{config.time}</span>
        
        <div className="flex items-center space-x-2">
          {config.showAirplane ? (
            <Plane className="w-3.5 h-3.5" />
          ) : (
            <>
              <div className="flex items-end space-x-0.5 h-3">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`w-0.5 rounded-full ${
                      bar <= config.cellularSignal
                        ? isDark ? 'bg-white' : 'bg-slate-900'
                        : isDark ? 'bg-white/30' : 'bg-slate-900/30'
                    }`}
                    style={{ height: `${bar * 25}%` }}
                  />
                ))}
              </div>
              <Wifi className="w-3.5 h-3.5" />
            </>
          )}

          <div className="flex items-center space-x-1">
            {config.showBatteryPercentage && (
              <span className="text-[10px] font-medium">{config.batteryLevel}%</span>
            )}
            <div className={`w-5 h-2.5 border ${isDark ? 'border-white/80' : 'border-slate-800'} rounded-xs p-0.5 flex items-center relative`}>
              <div
                className={`h-full rounded-2xs ${isDark ? 'bg-white' : 'bg-slate-900'}`}
                style={{ width: `${Math.min(100, Math.max(5, config.batteryLevel))}%` }}
              />
              <div className={`w-0.5 h-1 ${isDark ? 'bg-white/80' : 'bg-slate-800'} absolute -right-1 top-0.5 rounded-r-xs`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // iOS Dynamic Island or Notch
  return (
    <div className={`w-full px-6 pt-3 pb-1 flex items-center justify-between text-xs select-none relative ${textColor}`}>
      {/* Left: Time */}
      <div className="w-20 font-semibold text-[14px] tracking-tight pl-1">
        {config.time}
      </div>

      {/* Center: Dynamic Island or Notch */}
      {config.showDynamicIsland && device === 'iphone_16_pro' && (
        <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-7 bg-black rounded-full flex items-center justify-between px-3 z-30 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-950/80 border border-blue-900/40" />
        </div>
      )}

      {/* Right: Icons */}
      <div className="w-20 flex items-center justify-end space-x-1.5 pr-1">
        {config.showAirplane ? (
          <Plane className="w-3.5 h-3.5" />
        ) : (
          <>
            {/* Cellular Signal */}
            <div className="flex items-end space-x-0.5 h-3">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`w-0.75 rounded-xs ${
                    bar <= config.cellularSignal
                      ? isDark ? 'bg-white' : 'bg-slate-900'
                      : isDark ? 'bg-white/30' : 'bg-slate-900/30'
                  }`}
                  style={{ height: `${bar * 25}%` }}
                />
              ))}
            </div>

            {/* Network or Wifi */}
            <Wifi className="w-3.5 h-3.5 ml-0.5" />
          </>
        )}

        {/* Battery */}
        <div className="flex items-center space-x-1 ml-1">
          {config.showBatteryPercentage && (
            <span className="text-[11px] font-semibold tracking-tighter mr-0.5">{config.batteryLevel}%</span>
          )}
          <div className={`w-5.5 h-3 border ${isDark ? 'border-white/60' : 'border-slate-800/80'} rounded-sm p-0.5 flex items-center relative`}>
            <div
              className={`h-full rounded-2xs ${
                config.batteryLevel <= 20
                  ? 'bg-red-500'
                  : isDark ? 'bg-white' : 'bg-slate-900'
              }`}
              style={{ width: `${Math.min(100, Math.max(8, config.batteryLevel))}%` }}
            />
            {config.isCharging ? (
              <BatteryCharging className="w-2.5 h-2.5 absolute inset-0 m-auto text-amber-400" />
            ) : null}
            <div className={`w-0.75 h-1.5 ${isDark ? 'bg-white/60' : 'bg-slate-800/80'} absolute -right-1 top-0.5 rounded-r-xs`} />
          </div>
        </div>
      </div>
    </div>
  );
};
