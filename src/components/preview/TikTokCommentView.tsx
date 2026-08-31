import React from 'react';
import { MockState, MockComment } from '../../types';
import { Heart, BadgeCheck, X, Smile, AtSign } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateComment?: (id: string, updates: Partial<MockComment>) => void;
  onSelectComment?: (id: string) => void;
  selectedCommentId?: string | null;
}

export const TikTokCommentView: React.FC<Props> = ({
  state,
  onUpdateComment,
  onSelectComment,
  selectedCommentId
}) => {
  const isDark = state.theme === 'dark';
  const isStandalone = state.device === 'social_card';

  const bgColor = isDark ? 'bg-[#121212]' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const mutedText = isDark ? 'text-neutral-400' : 'text-neutral-500';

  const comments = state.commentConfig.comments || [];

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* Header if not standalone */}
      {!isStandalone && (
        <div className={`px-4 py-3 flex items-center justify-between border-b ${
          isDark ? 'border-neutral-800' : 'border-slate-100'
        }`}>
          <div className="w-6" />
          <span className="font-bold text-[14px]">
            {state.commentConfig.totalCommentsCount || `${comments.length} comentarios`}
          </span>
          <X className="w-5 h-5 cursor-pointer opacity-70" />
        </div>
      )}

      {/* Main Comment list */}
      <div className={`flex-1 overflow-y-auto ${isStandalone ? 'p-6 flex flex-col justify-center' : 'p-4 space-y-4'}`}>
        {comments.map((comment) => {
          const isSelected = selectedCommentId === comment.id;

          return (
            <div
              key={comment.id}
              onClick={() => onSelectComment?.(comment.id)}
              className={`flex items-start justify-between space-x-3 p-2 rounded-xl transition-all cursor-pointer ${
                isSelected ? 'ring-2 ring-rose-500 bg-white/5' : ''
              }`}
            >
              {/* Avatar */}
              <img 
                src={comment.authorAvatar} 
                alt={comment.authorUsername}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-white/10"
              />

              {/* Center */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center space-x-1">
                  <span className={`font-semibold text-[13px] ${mutedText}`}>
                    {comment.authorName || comment.authorUsername}
                  </span>
                  {comment.isAuthor && (
                    <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-400 font-bold text-[10px] rounded-sm">
                      Creador
                    </span>
                  )}
                  {comment.isVerified && (
                    <BadgeCheck className="w-3.5 h-3.5 fill-[#20d5ec] text-white inline shrink-0" />
                  )}
                </div>

                <div className="text-[14px] leading-snug mt-0.5 whitespace-pre-wrap">
                  {comment.content}
                </div>

                <div className={`flex items-center space-x-3 text-[12px] ${mutedText} mt-1 font-medium`}>
                  <span>{comment.timeAgo}</span>
                  <button className="font-semibold hover:text-white">Responder</button>
                </div>
              </div>

              {/* Right Heart */}
              <div className="flex flex-col items-center shrink-0 pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateComment?.(comment.id, { isLiked: !comment.isLiked });
                  }}
                >
                  <Heart className={`w-4 h-4 ${
                    comment.isLiked ? 'fill-[#fe2c55] text-[#fe2c55]' : `${mutedText}`
                  }`} />
                </button>
                {comment.likesCount && (
                  <span className={`text-[11px] ${mutedText} mt-0.5`}>
                    {comment.likesCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      {!isStandalone && (
        <div className={`p-3 flex items-center space-x-2 border-t ${
          isDark ? 'border-neutral-800 bg-[#161616]' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className={`flex-1 flex items-center px-4 py-2 rounded-full ${
            isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'
          } text-[13px] space-x-2`}>
            <span className="flex-1">Añadir comentario...</span>
            <AtSign className="w-4 h-4" />
            <Smile className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};
