import React from 'react';
import { MockState, Message } from '../../types';
import { ChevronLeft, MoreVertical, Phone, Plus, Smile, Send, BadgeCheck } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const AndroidSMSView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';

  const bgColor = isDark ? 'bg-[#131314]' : 'bg-[#f8f9fa]';
  const textColor = isDark ? 'text-[#e3e3e3]' : 'text-[#1f1f1f]';
  
  // Material You Pill colors
  const bubbleMe = isDark ? 'bg-[#a8c7fa] text-[#040e1b]' : 'bg-[#0b57d0] text-white';
  const bubbleOther = isDark ? 'bg-[#282a2c] text-[#e3e3e3]' : 'bg-[#e9eef6] text-[#1f1f1f]';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* Google Messages / Android Top Bar */}
      <div className={`w-full px-4 py-2.5 flex items-center justify-between border-b ${
        isDark ? 'border-[#282a2c] bg-[#1e1f20]' : 'border-[#e0e2e6] bg-white'
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
              <span className="font-semibold text-[15px] truncate">{state.contact.name}</span>
              {state.contact.isVerified && (
                <BadgeCheck className="w-4 h-4 fill-[#0b57d0] text-white inline shrink-0" />
              )}
            </div>
            <span className="text-[11.5px] text-slate-400 truncate">
              {state.contact.statusText || 'Chat RCS'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-400">
          <Phone className="w-5 h-5 cursor-pointer hover:text-white" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end">
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
                className={`max-w-[80%] rounded-[22px] px-4 py-3 text-[14.5px] leading-relaxed transition-transform ${
                  isMe ? `${bubbleMe} rounded-br-xs` : `${bubbleOther} rounded-bl-xs`
                } ${isSelected ? 'ring-2 ring-blue-500 scale-[1.01]' : ''}`}
              >
                {msg.type === 'image' && msg.mediaUrl && (
                  <div className="mb-2 rounded-2xl overflow-hidden max-h-60">
                    <img 
                      src={msg.mediaUrl} 
                      alt="Attachment" 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                )}
                {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}
              </div>

              <span className="text-[10px] text-slate-500 mt-1 px-1">
                {msg.time} {isMe && '• Leído'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Android RCS Input Bar */}
      {state.chat.showBottomBar && (
        <div className={`p-3 flex items-center space-x-2 ${isDark ? 'bg-[#1e1f20]' : 'bg-white'} border-t ${
          isDark ? 'border-[#282a2c]' : 'border-[#e0e2e6]'
        }`}>
          <div className={`flex-1 flex items-center px-4 py-2 rounded-full ${
            isDark ? 'bg-[#282a2c]' : 'bg-[#e9eef6]'
          } space-x-2`}>
            <Plus className="w-5 h-5 text-slate-400 cursor-pointer" />
            <input 
              type="text" 
              readOnly 
              placeholder={state.chat.inputPlaceholder || 'Chat RCS'}
              className="flex-1 bg-transparent text-[14px] outline-none text-inherit placeholder:text-slate-400"
            />
            <Smile className="w-5 h-5 text-slate-400 cursor-pointer" />
          </div>

          <div className="w-10 h-10 rounded-full bg-[#0b57d0] text-white flex items-center justify-center shrink-0">
            <Send className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      )}
    </div>
  );
};
