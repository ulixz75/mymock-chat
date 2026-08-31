import React from 'react';
import { MockState, Message } from '../../types';
import { ChevronLeft, Phone, Video, Info, ThumbsUp, Image as ImageIcon, Mic, Plus } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const MessengerView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';

  const bgColor = isDark ? 'bg-[#18191a]' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const bubbleMe = 'bg-[#0084ff] text-white';
  const bubbleOther = isDark ? 'bg-[#3a3b3c] text-white' : 'bg-[#e4e6eb] text-black';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* Header */}
      <div className={`w-full px-3 py-2 flex items-center justify-between border-b ${
        isDark ? 'border-[#3a3b3c]' : 'border-slate-100'
      } z-10 shadow-2xs`}>
        <div className="flex items-center space-x-2.5 flex-1 min-w-0">
          <ChevronLeft className="w-6 h-6 -ml-1 text-[#0084ff] cursor-pointer" />
          <div className="relative">
            <img 
              src={state.contact.avatar} 
              alt={state.contact.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover"
            />
            {state.contact.isOnline && (
              <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-[#18191a] absolute bottom-0 right-0" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[14px] truncate">{state.contact.name}</span>
            <span className="text-[11px] text-slate-400 truncate">
              {state.contact.statusText || (state.contact.isOnline ? 'Activo(a) ahora' : 'Desconectado(a)')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-[#0084ff]">
          <Phone className="w-5 h-5 cursor-pointer" />
          <Video className="w-5 h-5 cursor-pointer" />
          <Info className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col justify-end">
        {state.messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          const isSelected = selectedMessageId === msg.id;

          return (
            <div
              key={msg.id}
              onClick={() => onSelectMessage?.(msg.id)}
              className={`flex flex-col cursor-pointer ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end space-x-2 max-w-[78%]">
                {!isMe && (
                  <img 
                    src={state.contact.avatar} 
                    alt={state.contact.name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover mb-0.5"
                  />
                )}

                <div className="relative">
                  <div
                    className={`rounded-[18px] px-3.5 py-2 text-[14.5px] leading-snug transition-transform ${
                      isMe ? bubbleMe : bubbleOther
                    } ${isSelected ? 'ring-2 ring-blue-400 scale-[1.01]' : ''}`}
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

                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`absolute -bottom-2 ${isMe ? 'right-2' : 'left-2'} px-1.5 py-0.5 rounded-full text-xs shadow-md border flex items-center space-x-0.5 ${
                      isDark ? 'bg-[#242526] border-[#3a3b3c]' : 'bg-white border-slate-200'
                    }`}>
                      {msg.reactions.map((r, i) => (
                        <span key={i}>{r.emoji}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Seen indicator avatar */}
              {isMe && index === state.messages.length - 1 && msg.status === 'read' && (
                <div className="mt-1 mr-1">
                  <img 
                    src={state.contact.avatar} 
                    alt="Seen"
                    referrerPolicy="no-referrer"
                    className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-white"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      {state.chat.showBottomBar && (
        <div className={`p-2 flex items-center space-x-2 border-t ${
          isDark ? 'border-[#3a3b3c] bg-[#18191a]' : 'border-slate-100 bg-white'
        }`}>
          <Plus className="w-5 h-5 text-[#0084ff] cursor-pointer" />
          <ImageIcon className="w-5 h-5 text-[#0084ff] cursor-pointer" />
          <Mic className="w-5 h-5 text-[#0084ff] cursor-pointer" />
          <div className={`flex-1 flex items-center px-3 py-1.5 rounded-full ${
            isDark ? 'bg-[#3a3b3c]' : 'bg-[#f0f2f5]'
          }`}>
            <input 
              type="text" 
              readOnly 
              placeholder={state.chat.inputPlaceholder || 'Aa'}
              className="flex-1 bg-transparent text-[14px] outline-none text-inherit placeholder:text-slate-400"
            />
          </div>
          <ThumbsUp className="w-5 h-5 text-[#0084ff] cursor-pointer" />
        </div>
      )}
    </div>
  );
};
