import React from 'react';
import { MockState, Message } from '../../types';
import { ChevronLeft, MoreVertical, Paperclip, Smile, Mic, Check, CheckCheck, BadgeCheck } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const TelegramView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';

  const headerBg = isDark ? 'bg-[#212d3b]' : 'bg-[#517da2]';
  const chatBg = isDark ? 'bg-[#0e1621]' : 'bg-[#98b5c9]';
  
  const bubbleMe = isDark ? 'bg-[#2b5278] text-white' : 'bg-[#effdde] text-slate-900';
  const bubbleOther = isDark ? 'bg-[#182533] text-white' : 'bg-white text-slate-900';
  const timeColor = isDark ? 'text-white/60' : 'text-slate-500';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${chatBg} overflow-hidden`}>
      {/* Header */}
      <div className={`w-full px-3 py-2 flex items-center justify-between ${headerBg} text-white z-10 shadow-sm`}>
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <ChevronLeft className="w-6 h-6 -ml-1 cursor-pointer" />
          <img 
            src={state.contact.avatar} 
            alt={state.contact.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-[14.5px] truncate">{state.contact.name}</span>
              {state.contact.isVerified && (
                <BadgeCheck className="w-3.5 h-3.5 fill-[#2481cc] text-white inline shrink-0" />
              )}
            </div>
            <span className="text-[11px] text-white/70 truncate">
              {state.contact.statusText || (state.contact.isOnline ? 'en línea' : 'visto recientemente')}
            </span>
          </div>
        </div>

        <MoreVertical className="w-5 h-5 cursor-pointer text-white/80" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col justify-end">
        {state.messages.map((msg) => {
          const isMe = msg.sender === 'me';
          const isSelected = selectedMessageId === msg.id;

          return (
            <div
              key={msg.id}
              onClick={() => onSelectMessage?.(msg.id)}
              className={`flex flex-col cursor-pointer ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-[14px] leading-relaxed shadow-xs relative transition-transform ${
                  isMe ? `${bubbleMe} rounded-br-xs` : `${bubbleOther} rounded-bl-xs`
                } ${isSelected ? 'ring-2 ring-sky-400 scale-[1.01]' : ''}`}
              >
                {/* Image */}
                {msg.type === 'image' && msg.mediaUrl && (
                  <div className="mb-1 rounded-xl overflow-hidden max-h-60">
                    <img 
                      src={msg.mediaUrl} 
                      alt="Attachment" 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Text */}
                {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}

                {/* Bottom Meta */}
                <div className={`flex items-center justify-end space-x-1 text-[10.5px] mt-0.5 float-right ml-2 ${timeColor}`}>
                  <span>{msg.time}</span>
                  {isMe && (
                    msg.status === 'read' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-[#4ea4f5] inline" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-white/60 inline" />
                    )
                  )}
                </div>

                {/* Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className={`absolute -bottom-2.5 ${isMe ? 'right-2' : 'left-2'} px-2 py-0.5 rounded-full text-xs shadow-md border flex items-center space-x-1 ${
                    isDark ? 'bg-[#182533] border-[#293d52] text-white' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    {msg.reactions.map((r, i) => (
                      <span key={i} className="flex items-center space-x-0.5">
                        <span>{r.emoji}</span>
                        {r.count && <span className="text-[10px] opacity-80">{r.count}</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      {state.chat.showBottomBar && (
        <div className={`p-2 flex items-center space-x-2 ${isDark ? 'bg-[#17212b]' : 'bg-white'} border-t ${
          isDark ? 'border-transparent' : 'border-slate-200'
        }`}>
          <Paperclip className={`w-5 h-5 cursor-pointer ${isDark ? 'text-white/60' : 'text-slate-500'}`} />
          <input 
            type="text" 
            readOnly 
            placeholder={state.chat.inputPlaceholder || 'Escribe un mensaje...'}
            className={`flex-1 bg-transparent text-[14px] outline-none ${isDark ? 'text-white' : 'text-slate-900'} placeholder:text-slate-500`}
          />
          <Smile className={`w-5 h-5 cursor-pointer ${isDark ? 'text-white/60' : 'text-slate-500'}`} />
          <div className="w-8 h-8 rounded-full bg-[#2481cc] text-white flex items-center justify-center">
            <Mic className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};
