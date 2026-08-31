import React from 'react';
import { MockState, Message } from '../../types';
import { ChevronLeft, Video, Mic, Plus, ArrowUp } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const IMessageView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';
  const isSMS = state.chat.isSMSMode;

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const mutedText = isDark ? 'text-[#8e8e93]' : 'text-[#8e8e93]';

  // Apple Blue (iMessage) or Green (SMS)
  const bubbleMe = isSMS
    ? 'bg-[#34c759] text-white' // Green SMS
    : 'bg-[#007aff] text-white'; // Blue iMessage
  
  const bubbleOther = isDark ? 'bg-[#26252a] text-white' : 'bg-[#e9e9eb] text-black';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* iOS Top Navigation Bar */}
      <div className={`w-full px-3 py-2 flex items-center justify-between border-b ${
        isDark ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200/80 bg-neutral-50/80'
      } backdrop-blur-md z-10`}>
        {/* Back Button */}
        <div className="flex items-center text-[#007aff] cursor-pointer -ml-1">
          <ChevronLeft className="w-7 h-7" />
          <span className="text-[16px] -ml-1">Filtros</span>
        </div>

        {/* Contact Info Center */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src={state.contact.avatar} 
            alt={state.contact.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover shadow-xs ring-1 ring-white/10"
          />
          <span className="font-semibold text-[13px] leading-tight mt-0.5 max-w-[150px] truncate">
            {state.contact.name}
          </span>
        </div>

        {/* FaceTime Video Call icon */}
        <div className="text-[#007aff] cursor-pointer pr-1">
          <Video className="w-6 h-6" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-2 flex flex-col justify-end">
        {/* Date header */}
        {state.chat.showDateHeader && (
          <div className="text-center my-1 text-[11.5px] font-medium text-[#8e8e93]">
            {state.chat.dateHeaderText || 'Hoy 10:24'}
          </div>
        )}

        {state.messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          const isSelected = selectedMessageId === msg.id;

          return (
            <div
              key={msg.id}
              onClick={() => onSelectMessage?.(msg.id)}
              className={`flex flex-col cursor-pointer ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="relative max-w-[76%]">
                <div
                  className={`rounded-[18px] px-3.5 py-2 text-[15px] leading-[1.32] tracking-tight transition-transform ${
                    isMe ? `${bubbleMe} rounded-br-xs` : `${bubbleOther} rounded-bl-xs`
                  } ${isSelected ? 'ring-2 ring-blue-400 scale-[1.01]' : ''}`}
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
                </div>

                {/* Tapback / Reaction Badge on top of bubble */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className={`absolute -top-3.5 ${isMe ? 'left-1' : 'right-1'} px-1.5 py-0.5 rounded-full text-xs shadow-md border flex items-center space-x-0.5 ${
                    isDark ? 'bg-[#1c1c1e] border-neutral-700' : 'bg-white border-neutral-200'
                  }`}>
                    {msg.reactions.map((r, i) => (
                      <span key={i}>{r.emoji}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Status "Entregado" / "Leído" on the last message */}
              {isMe && index === state.messages.length - 1 && (
                <span className={`text-[10px] ${mutedText} mt-0.5 font-medium mr-1`}>
                  {msg.status === 'read' ? 'Leído' : msg.status === 'delivered' ? 'Entregado' : 'Enviado'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* iOS Bottom Message Input */}
      {state.chat.showBottomBar && (
        <div className={`p-2.5 flex items-center space-x-2 border-t ${
          isDark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <button className="w-8 h-8 rounded-full bg-neutral-700/40 text-neutral-400 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
          
          <div className={`flex-1 flex items-center px-3.5 py-1.5 rounded-full border space-x-2 ${
            isDark ? 'border-neutral-700 bg-neutral-900' : 'border-neutral-300 bg-white'
          }`}>
            <input 
              type="text" 
              readOnly 
              placeholder={isSMS ? 'Mensaje de texto' : (state.chat.inputPlaceholder || 'iMessage')}
              className="flex-1 bg-transparent text-[15px] outline-none text-inherit placeholder:text-neutral-500"
            />
            <Mic className="w-5 h-5 text-neutral-400 cursor-pointer" />
          </div>

          <button className={`w-7 h-7 rounded-full ${isSMS ? 'bg-[#34c759]' : 'bg-[#007aff]'} text-white flex items-center justify-center shrink-0`}>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
