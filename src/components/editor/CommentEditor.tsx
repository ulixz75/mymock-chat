import React, { useState } from 'react';
import { CommentConfig, MockComment } from '../../types';
import { AVATAR_PRESETS } from '../../data/avatars';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Heart, 
  BadgeCheck, 
  Clock, 
  Sparkles,
  MessageCircle,
  CornerDownRight
} from 'lucide-react';

interface Props {
  commentConfig: CommentConfig;
  onChangeCommentConfig: (updates: Partial<CommentConfig>) => void;
  onUpdateComment: (id: string, updates: Partial<MockComment>) => void;
  onAddComment: (comment: MockComment) => void;
  onDeleteComment: (id: string) => void;
  selectedCommentId?: string | null;
  onSelectComment?: (id: string) => void;
}

export const CommentEditor: React.FC<Props> = ({
  commentConfig,
  onChangeCommentConfig,
  onUpdateComment,
  onAddComment,
  onDeleteComment,
  selectedCommentId,
  onSelectComment
}) => {
  const [showPresetsForId, setShowPresetsForId] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, commentId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateComment(commentId, { authorAvatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewComment = () => {
    const newComment: MockComment = {
      id: `comment-${Date.now()}`,
      authorName: 'Carlos Mendoza',
      authorUsername: 'carlos_mendoza',
      authorAvatar: AVATAR_PRESETS[4].url,
      isVerified: false,
      content: '¡Totalmente de acuerdo! El servicio superó todas mis expectativas 🔥👏',
      timeAgo: '2w',
      likesCount: '482 likes',
      isLiked: false,
    };
    onAddComment(newComment);
    onSelectComment?.(newComment.id);
  };

  const comments = commentConfig.comments || [];

  return (
    <div className="space-y-4">
      {/* Add New Comment Button */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-indigo-400" /> Editor de Comentarios ({comments.length})
          </span>
          <p className="text-[11px] text-slate-400">Personaliza el texto, usuario, fotos y likes del comentario.</p>
        </div>

        <button
          onClick={handleAddNewComment}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Comentario</span>
        </button>
      </div>

      {/* List of Comments to Edit */}
      <div className="space-y-3">
        {comments.map((comment, index) => {
          const isSelected = selectedCommentId === comment.id;

          return (
            <div
              key={comment.id}
              onClick={() => onSelectComment?.(comment.id)}
              className={`p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-800/95 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/80 border-slate-800/80 hover:bg-slate-850'
              }`}
            >
              {/* Header with Avatar & User details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    <img 
                      src={comment.authorAvatar} 
                      alt={comment.authorUsername}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/40"
                    />
                    <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Upload className="w-3.5 h-3.5 text-white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleAvatarUpload(e, comment.id)} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPresetsForId(showPresetsForId === comment.id ? null : comment.id);
                      }}
                      className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3 h-3" /> Cambiar foto de perfil
                    </button>
                    <div className="text-[10px] text-slate-400">O haz hover en la foto para subirla</div>
                  </div>
                </div>

                {comments.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteComment(comment.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Eliminar este comentario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Avatar Presets for this comment */}
              {showPresetsForId === comment.id && (
                <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-[10.5px] font-semibold text-slate-400 mb-1.5">Elige un avatar:</div>
                  <div className="grid grid-cols-5 gap-2">
                    {AVATAR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateComment(comment.id, { authorAvatar: preset.url });
                          setShowPresetsForId(null);
                        }}
                        className="relative group rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <img 
                          src={preset.url} 
                          alt={preset.name} 
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover group-hover:scale-110 transition-transform" 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Username & Verified */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Usuario (@handle)
                  </label>
                  <input 
                    type="text"
                    value={comment.authorUsername}
                    onChange={(e) => onUpdateComment(comment.id, { authorUsername: e.target.value.replace('@', '') })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                    placeholder="amrtinez_3450"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={comment.isVerified}
                      onChange={(e) => onUpdateComment(comment.id, { isVerified: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-blue-400" /> Insignia Verificada
                    </span>
                  </label>
                </div>
              </div>

              {/* Comment Content */}
              <div className="mt-2.5">
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Texto del Comentario / Testimonio
                </label>
                <textarea 
                  rows={3}
                  value={comment.content}
                  onChange={(e) => onUpdateComment(comment.id, { content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                  placeholder="Escribe el comentario..."
                />
              </div>

              {/* Meta information: Time ago + Likes count + Like toggle */}
              <div className="grid grid-cols-3 gap-2 mt-2.5 pt-1 border-t border-slate-800/60">
                <div>
                  <label className="block text-[10.5px] font-medium text-slate-400 mb-1">
                    Tiempo (ej. 18w, 2d)
                  </label>
                  <input 
                    type="text"
                    value={comment.timeAgo}
                    onChange={(e) => onUpdateComment(comment.id, { timeAgo: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-medium text-slate-400 mb-1">
                    Likes (ej. 1.3k likes)
                  </label>
                  <input 
                    type="text"
                    value={comment.likesCount}
                    onChange={(e) => onUpdateComment(comment.id, { likesCount: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-xs text-white"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateComment(comment.id, { isLiked: !comment.isLiked });
                    }}
                    className={`w-full py-1 px-2 rounded-md text-xs font-semibold flex items-center justify-center space-x-1 border transition-colors ${
                      comment.isLiked 
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{comment.isLiked ? 'Like Activo' : 'Sin Like'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
