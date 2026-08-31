import React from 'react';
import { MockState, Message } from '../../types';
import { ChevronLeft, Info, Image as ImageIcon, Smile, Send, BadgeCheck } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const TwitterView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const bubbleMe = 'bg-[#1d9bf0] text-white';
  const bubbleOther = isDark ? 'bg-[#2f3336] text-white' : 'bg-[#eff3f4] text-black';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* Header */}
      <div className={`w-full px-4 py-2.5 flex items-center justify-between border-b ${
        isDark ? 'border-[#2f3336]' : 'border-slate-100'
      } z-10`}>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <ChevronLeft className="w-6 h-6 -ml-1 cursor-pointer" />
          <img 
            src={state.contact.avatar} 
            alt={state.contact.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-[14.5px] truncate">{state.contact.name}</span>
              {state.contact.isVerified && (
                <BadgeCheck className="w-3.5 h-3.5 fill-[#1d9bf0] text-white inline shrink-0" />
              )}
            </div>
            <span className="text-[12px] text-slate-500 truncate">@{state.contact.username}</span>
          </div>
        </div>
        <Info className="w-5 h-5 text-slate-400 cursor-pointer" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 flex flex-col justify-end">
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
                className={`max-w-[78%] rounded-[20px] px-4 py-2.5 text-[14.5px] leading-relaxed transition-transform ${
                  isMe ? `${bubbleMe} rounded-br-xs` : `${bubbleOther} rounded-bl-xs`
                } ${isSelected ? 'ring-2 ring-sky-400 scale-[1.01]' : ''}`}
              >
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
                {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}
              </div>

              <span className="text-[10.5px] text-slate-500 mt-1 px-1">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      {state.chat.showBottomBar && (
        <div className={`p-2.5 flex items-center space-x-2 border-t ${
          isDark ? 'border-[#2f3336] bg-black' : 'border-slate-100 bg-white'
        }`}>
          <ImageIcon className="w-5 h-5 text-[#1d9bf0] cursor-pointer" />
          <div className={`flex-1 flex items-center px-4 py-2 rounded-full ${
            isDark ? 'bg-[#202327]' : 'bg-[#eff3f4]'
          } space-x-2`}>
            <input 
              type="text" 
              readOnly 
              placeholder={state.chat.inputPlaceholder || 'Escribe un mensaje'}
              className="flex-1 bg-transparent text-[14px] outline-none text-inherit placeholder:text-slate-500"
            />
            <Smile className="w-5 h-5 text-[#1d9bf0] cursor-pointer" />
          </div>
          <Send className="w-5 h-5 text-[#1d9bf0] cursor-pointer" />
        </div>
      )}
    </div>
  );
};
