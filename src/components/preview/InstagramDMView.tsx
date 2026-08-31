import React from 'react';
import { MockState, Message } from '../../types';
import { 
  ChevronLeft, 
  Phone, 
  Video, 
  Info, 
  Camera, 
  Mic, 
  Image as ImageIcon, 
  Heart, 
  Smile, 
  BadgeCheck 
} from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateMessage?: (id: string, updates: Partial<Message>) => void;
  onSelectMessage?: (id: string) => void;
  selectedMessageId?: string | null;
}

export const InstagramDMView: React.FC<Props> = ({
  state,
  onUpdateMessage,
  onSelectMessage,
  selectedMessageId
}) => {
  const isDark = state.theme === 'dark';

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const mutedText = isDark ? 'text-[#a8a8a8]' : 'text-[#737373]';

  // Bubble styles
  const bubbleMe = isDark 
    ? (state.chat.instagramGradientBubbles ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white' : 'bg-[#3797f0] text-white')
    : (state.chat.instagramGradientBubbles ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white' : 'bg-[#3797f0] text-white');
  
  const bubbleOther = isDark ? 'bg-[#262626] text-white' : 'bg-[#efefef] text-slate-900';

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* Header */}
      <div className={`w-full px-4 py-2.5 flex items-center justify-between border-b ${
        isDark ? 'border-[#262626]' : 'border-slate-100'
      } z-10`}>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <ChevronLeft className="w-6 h-6 -ml-1 cursor-pointer" />
          <div className="relative">
            <img 
              src={state.contact.avatar} 
              alt={state.contact.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
            />
            {state.contact.isOnline && (
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black absolute bottom-0 right-0" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-[14.5px] truncate">{state.contact.name}</span>
              {state.contact.isVerified && (
                <BadgeCheck className="w-3.5 h-3.5 fill-[#0095f6] text-white inline shrink-0" />
              )}
            </div>
            <span className={`text-[11.5px] ${mutedText} truncate`}>
              {state.contact.statusText || (state.contact.isOnline ? 'Activo(a) ahora' : `@${state.contact.username}`)}
            </span>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 cursor-pointer" />
          <Video className="w-5 h-5 cursor-pointer" />
          <Info className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2.5 flex flex-col justify-end">
        {state.messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          const isSelected = selectedMessageId === msg.id;

          return (
            <div
              key={msg.id}
              onClick={() => onSelectMessage?.(msg.id)}
              className={`flex flex-col cursor-pointer ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end space-x-2 max-w-[80%]">
                {!isMe && (
                  <img 
                    src={state.contact.avatar} 
                    alt={state.contact.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover mb-0.5 shrink-0"
                  />
                )}

                <div className="relative">
                  <div
                    className={`rounded-[20px] px-4 py-2.5 text-[14.5px] leading-relaxed transition-transform ${
                      isMe ? bubbleMe : bubbleOther
                    } ${isSelected ? 'ring-2 ring-indigo-500/90 scale-[1.01]' : ''}`}
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

                    {msg.text && <div>{msg.text}</div>}
                  </div>

                  {/* Heart / Reaction badge */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`absolute -bottom-2 ${isMe ? 'right-2' : 'left-2'} px-1.5 py-0.5 rounded-full text-xs shadow-md border flex items-center space-x-0.5 ${
                      isDark ? 'bg-[#262626] border-[#363636]' : 'bg-white border-slate-200'
                    }`}>
                      {msg.reactions.map((r, i) => (
                        <span key={i}>{r.emoji}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Read / Seen Receipt on last sent message */}
              {isMe && index === state.messages.length - 1 && msg.status === 'read' && (
                <span className={`text-[10.5px] ${mutedText} mt-1 mr-1`}>Visto</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Instagram Bottom Input Bar */}
      {state.chat.showBottomBar && (
        <div className={`p-3 flex items-center space-x-2 border-t ${
          isDark ? 'border-[#262626] bg-black' : 'border-slate-100 bg-white'
        }`}>
          <div className={`flex-1 flex items-center px-3.5 py-2 rounded-full border space-x-2 ${
            isDark ? 'border-[#363636] bg-[#121212]' : 'border-slate-200 bg-slate-50'
          }`}>
            <button className="w-7 h-7 rounded-full bg-[#0095f6] text-white flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </button>
            <input 
              type="text" 
              readOnly 
              placeholder={state.chat.inputPlaceholder || 'Enviar mensaje...'}
              className={`flex-1 bg-transparent text-[14px] outline-none ${textColor} placeholder:${mutedText}`}
            />
            <Mic className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
            <ImageIcon className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
            <Smile className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
          </div>
          <Heart className="w-6 h-6 text-slate-400 cursor-pointer hover:text-red-500" />
        </div>
      )}
    </div>
  );
};
