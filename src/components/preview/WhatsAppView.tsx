import React from 'react';
import { MockState, Message } from '../../types';
import { 
  ChevronLeft, 
  Video, 
  Phone, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  Clock, 
  Mic, 
  Paperclip, 
  Camera, 
  Smile, 
  Play, 
  Pause,
  Lock,
  BadgeCheck
} from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const WhatsAppView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';

  // WhatsApp authentic colors
  const headerBg = isDark ? 'bg-[#1f2c34]' : 'bg-[#008069]';
  const headerText = 'text-white';
  const chatBg = isDark ? 'bg-[#0b141a]' : 'bg-[#efeae2]';
  
  // Message bubbles
  const bubbleMe = isDark ? 'bg-[#005c4b] text-[#e9edef]' : 'bg-[#d9fdd3] text-[#111b21]';
  const bubbleOther = isDark ? 'bg-[#202c33] text-[#e9edef]' : 'bg-[#ffffff] text-[#111b21]';
  const timeColorMe = isDark ? 'text-[#8696a0]' : 'text-[#667781]';
  const timeColorOther = isDark ? 'text-[#8696a0]' : 'text-[#667781]';

  const renderStatusCheck = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-slate-400 inline ml-1" />;
      case 'sent':
        return <Check className="w-3.5 h-3.5 text-slate-400 inline ml-1" />;
      case 'delivered':
        return <CheckCheck className="w-3.5 h-3.5 text-slate-400 inline ml-1" />;
      case 'read':
        return <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] inline ml-1" />;
      default:
        return null;
    }
  };

  return (
    <div className={`w-full flex-1 flex flex-col font-sans relative select-none ${chatBg} overflow-hidden`}>
      {/* Optional WhatsApp Doodle Background Pattern */}
      {state.chat.chatWallpaper === 'whatsapp_pattern' && (
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Cpath d='M40 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm20 30a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 50h10v2H20zm40-20h6v6h-6z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px'
          }}
        />
      )}

      {/* WhatsApp Header */}
      <div className={`w-full px-3 py-2 flex items-center justify-between ${headerBg} ${headerText} z-10 shadow-sm`}>
        <div className="flex items-center space-x-1.5 flex-1 min-w-0">
          <ChevronLeft className="w-6 h-6 -ml-1 text-white/90 cursor-pointer" />
          
          <div className="relative">
            <img 
              src={state.contact.avatar} 
              alt={state.contact.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            {state.contact.isOnline && (
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 absolute bottom-0 right-0" />
            )}
          </div>

          <div className="flex flex-col min-w-0 ml-1.5 flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-[15px] leading-tight truncate text-white">
                {state.contact.name}
              </span>
              {state.contact.isVerified && (
                <BadgeCheck className="w-4 h-4 text-emerald-400 inline shrink-0 fill-emerald-500 text-white" />
              )}
            </div>
            <span className="text-[11px] leading-tight text-white/80 truncate">
              {state.contact.statusText || (state.contact.isOnline ? 'en línea' : 'activo(a)')}
            </span>
          </div>
        </div>

        {/* Header Icons */}
        <div className="flex items-center space-x-4 pr-1 text-white/90">
          <Video className="w-5 h-5 cursor-pointer hover:opacity-80" />
          <Phone className="w-4.5 h-4.5 cursor-pointer hover:opacity-80" />
          <MoreVertical className="w-4.5 h-4.5 cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 z-10 flex flex-col justify-end">
        {/* Encryption Notice */}
        {state.chat.showEncryptionNotice && (
          <div className="flex justify-center my-1">
            <div className={`px-3 py-1.5 rounded-lg text-center max-w-[85%] text-[11px] flex items-center justify-center space-x-1.5 shadow-xs ${
              isDark ? 'bg-[#182229] text-[#ffd279]' : 'bg-[#ffeecd] text-[#54656f]'
            }`}>
              <Lock className="w-3 h-3 shrink-0" />
              <span>{state.chat.encryptionNoticeText}</span>
            </div>
          </div>
        )}

        {/* Date Header */}
        {state.chat.showDateHeader && (
          <div className="flex justify-center my-1.5">
            <div className={`px-3 py-1 rounded-md text-[11px] font-medium tracking-wide shadow-2xs uppercase ${
              isDark ? 'bg-[#182229] text-[#8696a0]' : 'bg-[#ffffff] text-[#54656f]'
            }`}>
              {state.chat.dateHeaderText}
            </div>
          </div>
        )}

        {/* Messages */}
        {state.messages.map((msg) => {
          const isMe = msg.sender === 'me';
          const isSelected = selectedMessageId === msg.id;

          return (
            <div
              key={msg.id}
              onClick={() => onSelectMessage?.(msg.id)}
              className={`flex flex-col group cursor-pointer transition-all ${
                isMe ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[82%] relative rounded-2xl px-3 py-2 shadow-xs transition-transform ${
                  isMe ? `${bubbleMe} rounded-tr-xs` : `${bubbleOther} rounded-tl-xs`
                } ${isSelected ? 'ring-2 ring-emerald-500/80 scale-[1.01]' : ''}`}
              >
                {/* Reply To Preview if exists */}
                {msg.replyTo && (
                  <div className={`mb-1.5 p-1.5 rounded-md border-l-4 text-xs ${
                    isDark ? 'bg-black/20 border-emerald-500 text-white/80' : 'bg-black/5 border-emerald-600 text-slate-700'
                  }`}>
                    <div className="font-semibold text-[11px] text-emerald-500">{msg.replyTo.senderName}</div>
                    <div className="truncate text-[11px]">{msg.replyTo.text}</div>
                  </div>
                )}

                {/* Voice Note Message Type */}
                {msg.type === 'voice' && (
                  <div className="flex items-center space-x-3 py-1 pr-1 min-w-[200px]">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                      {msg.isVoicePlayed ? <Play className="w-5 h-5 ml-0.5" /> : <Pause className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      {/* Waveform graphic - editable longitud y alturas */}
                      {(() => {
                        const waveform = msg.voiceWaveform && msg.voiceWaveform.length > 0 ? msg.voiceWaveform : [40, 65, 85, 30, 90, 50, 75, 45, 95, 35, 60, 80, 55, 30, 70, 90, 45, 60];
                        const progressBars = Math.round(((msg.voiceProgress ?? 65) / 100) * waveform.length);
                        return (
                          <div className="flex items-center gap-[2px] h-6">
                            {waveform.map((h, i) => (
                              <div
                                key={i}
                                className={`w-[3px] flex-1 max-w-[4px] rounded-full ${
                                  i < progressBars
                                    ? isDark ? 'bg-emerald-400' : 'bg-emerald-600'
                                    : isDark ? 'bg-white/30' : 'bg-slate-300'
                                }`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        );
                      })()}
                      
                      <div className="flex items-center justify-between text-[11px] text-white/70 mt-0.5">
                        <span>{msg.voiceDuration || '0:42'}</span>
                        <Mic className={`w-3.5 h-3.5 ${msg.isVoicePlayed ? 'text-emerald-400' : 'text-slate-400'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Message Type */}
                {msg.type === 'image' && msg.mediaUrl && (
                  <div className="mb-1 rounded-xl overflow-hidden max-h-64">
                    <img 
                      src={msg.mediaUrl} 
                      alt="Attachment" 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Text Content */}
                {msg.text && (
                  <div className="text-[14.5px] leading-[1.38] break-words whitespace-pre-wrap">
                    {msg.text}
                  </div>
                )}

                {/* Bottom row: Time + Status Ticks */}
                <div className={`flex items-center justify-end space-x-1 text-[10px] mt-0.5 float-right ml-2 ${
                  isMe ? timeColorMe : timeColorOther
                }`}>
                  <span>{msg.time}</span>
                  {isMe && renderStatusCheck(msg.status)}
                </div>

                {/* Emoji Reactions Pill */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className={`absolute -bottom-2.5 ${isMe ? 'right-2' : 'left-2'} px-1.5 py-0.5 rounded-full text-xs shadow-md border flex items-center space-x-1 ${
                    isDark ? 'bg-[#202c33] border-[#374248] text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    {msg.reactions.map((r, idx) => (
                      <span key={idx} className="flex items-center space-x-0.5">
                        <span>{r.emoji}</span>
                        {r.count && r.count > 1 && <span className="text-[10px] text-slate-400">{r.count}</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp Bottom Input Bar */}
      {state.chat.showBottomBar && (
        <div className={`p-2 flex items-center space-x-2 z-10 ${isDark ? 'bg-[#1f2c34]' : 'bg-[#f0f2f5]'}`}>
          <div className={`flex-1 flex items-center px-3 py-2 rounded-3xl space-x-2 shadow-xs ${
            isDark ? 'bg-[#2a3942] text-[#8696a0]' : 'bg-white text-[#54656f]'
          }`}>
            <Smile className="w-5 h-5 cursor-pointer hover:text-emerald-500" />
            <input 
              type="text" 
              readOnly 
              placeholder={state.chat.inputPlaceholder || 'Mensaje'}
              className="flex-1 bg-transparent text-[14px] outline-none text-slate-200 placeholder:text-inherit"
            />
            <Paperclip className="w-5 h-5 cursor-pointer hover:text-emerald-500 rotate-45" />
            <Camera className="w-5 h-5 cursor-pointer hover:text-emerald-500" />
          </div>

          <button className="w-10 h-10 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow-md shrink-0 hover:bg-[#008f6f]">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
