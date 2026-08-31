import React, { forwardRef } from 'react';
import { MockState, Message, MockComment } from '../../types';
import { DeviceStatusBar } from './DeviceStatusBar';
import { DeviceBottomBar } from './DeviceBottomBar';
import { WhatsAppView } from './WhatsAppView';
import { InstagramCommentView } from './InstagramCommentView';
import { InstagramDMView } from './InstagramDMView';
import { IMessageView } from './IMessageView';
import { TelegramView } from './TelegramView';
import { MessengerView } from './MessengerView';
import { AndroidSMSView } from './AndroidSMSView';
import { TikTokCommentView } from './TikTokCommentView';
import { TwitterView } from './TwitterView';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  onUpdateComment?: (id: string, updates: Partial<MockComment>) => void;
  onSelectComment?: (id: string) => void;
  selectedMessageId?: string | null;
  selectedCommentId?: string | null;
}

export const MockCanvas = forwardRef<HTMLDivElement, Props>(({
  state,
  onUpdateMessage,
  onSelectMessage,
  onUpdateComment,
  onSelectComment,
  selectedMessageId,
  selectedCommentId
}, ref) => {
  const { device, theme, exportSettings, platform } = state;
  const isDark = theme === 'dark';

  // Backdrop background classes
  const getBackdropClass = () => {
    switch (exportSettings.backgroundStyle) {
      case 'gradient_purple':
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950';
      case 'gradient_ocean':
        return 'bg-gradient-to-br from-cyan-900 via-blue-900 to-slate-950';
      case 'gradient_sunset':
        return 'bg-gradient-to-br from-amber-700 via-rose-800 to-purple-950';
      case 'dark':
        return 'bg-neutral-900';
      case 'light':
        return 'bg-slate-100';
      case 'transparent':
        return 'bg-transparent';
      case 'none':
      default:
        return 'bg-transparent';
    }
  };

  // Aspect ratio styling
  const getAspectRatioStyle = () => {
    switch (exportSettings.aspectRatio) {
      case '1:1':
        return { aspectRatio: '1 / 1', minHeight: '600px' };
      case '9:16':
        return { aspectRatio: '9 / 16', minHeight: '750px' };
      case '4:5':
        return { aspectRatio: '4 / 5', minHeight: '680px' };
      case 'auto':
      default:
        return {};
    }
  };

  // Device Frame rendering
  const renderPlatformContent = () => {
    switch (platform) {
      case 'whatsapp':
        return (
          <WhatsAppView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      case 'instagram_comment':
        return (
          <InstagramCommentView 
            state={state} 
            onUpdateComment={onUpdateComment} 
            onSelectComment={onSelectComment}
            selectedCommentId={selectedCommentId}
          />
        );
      case 'instagram_dm':
        return (
          <InstagramDMView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      case 'imessage':
        return (
          <IMessageView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      case 'telegram':
        return (
          <TelegramView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      case 'messenger':
        return (
          <MessengerView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      case 'android_sms':
        return (
          <AndroidSMSView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      case 'tiktok_comment':
        return (
          <TikTokCommentView 
            state={state} 
            onUpdateComment={onUpdateComment} 
            onSelectComment={onSelectComment}
            selectedCommentId={selectedCommentId}
          />
        );
      case 'twitter_dm':
        return (
          <TwitterView 
            state={state} 
            onUpdateMessage={onUpdateMessage} 
            onSelectMessage={onSelectMessage}
            selectedMessageId={selectedMessageId}
          />
        );
      default:
        return <WhatsAppView state={state} />;
    }
  };

  const isCardMode = device === 'social_card';
  const isFrameless = device === 'frameless';

  return (
    <div
      ref={ref}
      id="export-canvas-target"
      className={`relative flex items-center justify-center transition-all ${getBackdropClass()} ${
        exportSettings.roundedCanvas ? 'rounded-2xl' : ''
      }`}
      style={{
        padding: `${exportSettings.padding}px`,
        ...getAspectRatioStyle()
      }}
    >
      {/* Social Card Mode (like the attached testimonial photo) */}
      {isCardMode ? (
        <div 
          className={`w-full max-w-[620px] rounded-2xl overflow-hidden transition-shadow ${
            isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
          } ${exportSettings.showShadow ? 'shadow-2xl ring-1 ring-white/10' : ''}`}
        >
          {renderPlatformContent()}
        </div>
      ) : isFrameless ? (
        /* Frameless mode: Clean screenshot view */
        <div 
          className={`w-full max-w-[390px] min-h-[640px] flex flex-col rounded-2xl overflow-hidden ${
            isDark ? 'bg-black' : 'bg-white'
          } ${exportSettings.showShadow ? 'shadow-2xl ring-1 ring-white/10' : ''}`}
        >
          <DeviceStatusBar config={state.statusBar} theme={theme} device={device} />
          {renderPlatformContent()}
          <DeviceBottomBar device={device} theme={theme} />
        </div>
      ) : (
        /* Realistic Phone Chassis Frame (iPhone 16 Pro / Android) */
        <div 
          className={`w-full max-w-[390px] min-h-[720px] rounded-[48px] p-3 transition-all relative flex flex-col ${
            device === 'iphone_16_pro' 
              ? 'bg-[#2b2a2e] ring-[5px] ring-[#464549] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]' 
              : 'bg-[#1e1e1e] ring-[4px] ring-[#333333] shadow-2xl rounded-[40px]'
          } ${exportSettings.showShadow ? 'shadow-2xl' : ''}`}
        >
          {/* Outer chassis hardware buttons */}
          <div className="absolute -left-[7px] top-24 w-[3px] h-9 bg-neutral-600 rounded-l-xs" />
          <div className="absolute -left-[7px] top-36 w-[3px] h-12 bg-neutral-600 rounded-l-xs" />
          <div className="absolute -left-[7px] top-52 w-[3px] h-12 bg-neutral-600 rounded-l-xs" />
          <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-neutral-600 rounded-r-xs" />

          {/* Screen Bezel & Inner display */}
          <div className={`w-full flex-1 flex flex-col rounded-[38px] overflow-hidden ${
            isDark ? 'bg-black' : 'bg-white'
          }`}>
            <DeviceStatusBar config={state.statusBar} theme={theme} device={device} />
            {renderPlatformContent()}
            <DeviceBottomBar device={device} theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
});

MockCanvas.displayName = 'MockCanvas';
