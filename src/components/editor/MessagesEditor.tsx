import React, { useState } from 'react';
import { Message, MessageSender, MessageStatus, MessageType } from '../../types';
import { SAMPLE_ATTACHMENTS } from '../../data/avatars';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  Mic, 
  CheckCheck, 
  Check, 
  Clock, 
  Smile, 
  Upload,
  Copy,
  MessageSquare
} from 'lucide-react';

interface Props {
  messages: Message[];
  onAddMessage: (msg: Message) => void;
  onUpdateMessage: (id: string, updates: Partial<Message>) => void;
  onDeleteMessage: (id: string) => void;
  onReorderMessage: (index: number, direction: 'up' | 'down') => void;
  selectedMessageId?: string | null;
  onSelectMessage?: (id: string) => void;
}

export const MessagesEditor: React.FC<Props> = ({
  messages,
  onAddMessage,
  onUpdateMessage,
  onDeleteMessage,
  onReorderMessage,
  selectedMessageId,
  onSelectMessage
}) => {
  const [newText, setNewText] = useState('');
  const [newSender, setNewSender] = useState<MessageSender>('other');
  const [newType, setNewType] = useState<MessageType>('text');
  const [newTime, setNewTime] = useState('10:30 AM');
  const [newStatus, setNewStatus] = useState<MessageStatus>('read');
  const [mediaUrl, setMediaUrl] = useState('');
  const [voiceDuration, setVoiceDuration] = useState('0:35');

  const handleAddNew = (sender: MessageSender = newSender) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender,
      type: newType,
      text: newText || (newType === 'voice' ? '' : (sender === 'me' ? '¡Entendido!' : '¡Hola!')),
      time: newTime || '10:30 AM',
      status: newStatus,
      mediaUrl: newType === 'image' ? (mediaUrl || SAMPLE_ATTACHMENTS.receipt) : undefined,
      voiceDuration: newType === 'voice' ? voiceDuration : undefined,
      voiceProgress: 65,
      isVoicePlayed: true,
    };

    onAddMessage(newMessage);
    setNewText('');
    onSelectMessage?.(newMessage.id);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, messageId?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (messageId) {
            onUpdateMessage(messageId, { mediaUrl: reader.result, type: 'image' });
          } else {
            setMediaUrl(reader.result);
            setNewType('image');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addReactionToMessage = (messageId: string, emoji: string) => {
    const msg = messages.find((m) => m.id === messageId);
    if (!msg) return;

    const currentReactions = msg.reactions || [];
    const exists = currentReactions.find((r) => r.emoji === emoji);

    let updated;
    if (exists) {
      updated = currentReactions.filter((r) => r.emoji !== emoji);
    } else {
      updated = [...currentReactions, { emoji, count: 1, userLiked: true }];
    }

    onUpdateMessage(messageId, { reactions: updated });
  };

  return (
    <div className="space-y-4">
      {/* Quick Add Message Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Añadir Nuevo Mensaje
          </span>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setNewType('text')}
              className={`px-2 py-1 text-xs rounded-md font-medium transition-colors ${
                newType === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800'
              }`}
            >
              Texto
            </button>
            <button
              onClick={() => setNewType('image')}
              className={`px-2 py-1 text-xs rounded-md font-medium flex items-center gap-1 transition-colors ${
                newType === 'image' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800'
              }`}
            >
              <ImageIcon className="w-3 h-3" /> Foto
            </button>
            <button
              onClick={() => setNewType('voice')}
              className={`px-2 py-1 text-xs rounded-md font-medium flex items-center gap-1 transition-colors ${
                newType === 'voice' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800'
              }`}
            >
              <Mic className="w-3 h-3" /> Audio
            </button>
          </div>
        </div>

        {/* Message Input Box */}
        {newType === 'text' && (
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Escribe el texto del mensaje..."
            rows={2}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-500 resize-none"
          />
        )}

        {newType === 'image' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="flex-1 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 rounded-lg text-xs text-slate-300 flex items-center justify-center space-x-2 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>{mediaUrl ? 'Cambiar Foto Adjunta' : 'Subir Foto / Comprobante / Producto'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleMediaUpload(e)} 
                  className="hidden" 
                />
              </label>
            </div>
            {mediaUrl && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-700">
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Leyenda o texto opcional..."
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>
        )}

        {newType === 'voice' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Duración (ej. 0:45)</label>
              <input
                type="text"
                value={voiceDuration}
                onChange={(e) => setVoiceDuration(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Hora</label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* Sender Actions: Send as "Other" (Client) or "Me" */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => handleAddNew('other')}
            className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <span>Mensaje del Cliente (Izquierda)</span>
          </button>

          <button
            onClick={() => handleAddNew('me')}
            className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Mi Respuesta (Derecha)</span>
          </button>
        </div>
      </div>

      {/* Messages List (Interactive & Reorderable) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Mensajes en la Conversación ({messages.length})
          </span>
          <span className="text-[11px] text-slate-500">Toca para editar detalles</span>
        </div>

        {messages.map((msg, index) => {
          const isSelected = selectedMessageId === msg.id;
          const isMe = msg.sender === 'me';

          return (
            <div
              key={msg.id}
              onClick={() => onSelectMessage?.(msg.id)}
              className={`p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                {/* Sender badge */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateMessage(msg.id, { sender: isMe ? 'other' : 'me' });
                  }}
                  className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold uppercase tracking-wider ${
                    isMe
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}
                  title="Cambiar remitente"
                >
                  {isMe ? 'Yo (Respuesta)' : 'Cliente'}
                </button>

                {/* Status check buttons */}
                {isMe && (
                  <div className="flex items-center space-x-1 bg-slate-950 px-1.5 py-0.5 rounded-md border border-slate-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateMessage(msg.id, { status: 'sent' });
                      }}
                      className={`p-0.5 rounded ${msg.status === 'sent' ? 'text-slate-200' : 'text-slate-600'}`}
                      title="Enviado (1 check)"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateMessage(msg.id, { status: 'delivered' });
                      }}
                      className={`p-0.5 rounded ${msg.status === 'delivered' ? 'text-slate-200' : 'text-slate-600'}`}
                      title="Entregado (2 checks grises)"
                    >
                      <CheckCheck className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateMessage(msg.id, { status: 'read' });
                      }}
                      className={`p-0.5 rounded ${msg.status === 'read' ? 'text-[#53bdeb]' : 'text-slate-600'}`}
                      title="Leído (2 checks azules / visto)"
                    >
                      <CheckCheck className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Reorder and Delete controls */}
                <div className="flex items-center space-x-1">
                  <button
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorderMessage(index, 'up');
                    }}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Subir"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === messages.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorderMessage(index, 'down');
                    }}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Bajar"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteMessage(msg.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="Eliminar mensaje"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message text editor */}
              <div className="mt-2 space-y-2">
                <textarea
                  value={msg.text}
                  onChange={(e) => onUpdateMessage(msg.id, { text: e.target.value })}
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-slate-950/90 border border-slate-800 rounded-md text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                  placeholder={msg.type === 'voice' ? 'Nota de voz' : 'Texto del mensaje...'}
                />

                {/* Image upload if message has image or user wants to add one */}
                {msg.type === 'image' && (
                  <div className="flex items-center space-x-2">
                    <img 
                      src={msg.mediaUrl} 
                      alt="Attachment" 
                      className="w-10 h-10 rounded-md object-cover border border-slate-700" 
                    />
                    <label className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                      Cambiar foto
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleMediaUpload(e, msg.id)} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                )}

                {/* Bottom Row: Time and Quick Emoji Reactions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-[10.5px] text-slate-400">Hora:</span>
                    <input
                      type="text"
                      value={msg.time}
                      onChange={(e) => onUpdateMessage(msg.id, { time: e.target.value })}
                      className="w-20 px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-200 text-center"
                    />
                  </div>

                  {/* Reaction buttons */}
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] text-slate-500">Reaccionar:</span>
                    {['❤️', '🔥', '😂', '👍', '🙏'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={(e) => {
                          e.stopPropagation();
                          addReactionToMessage(msg.id, emoji);
                        }}
                        className={`px-1 py-0.5 text-xs rounded hover:bg-slate-700 transition-colors ${
                          msg.reactions?.some((r) => r.emoji === emoji) ? 'bg-indigo-600/40 ring-1 ring-indigo-500' : ''
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
