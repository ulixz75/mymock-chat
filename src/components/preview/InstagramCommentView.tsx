import React from 'react';
import { MockState, MockComment } from '../../types';
import { Heart, BadgeCheck, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft } from 'lucide-react';

interface Props {
  state: MockState;
  onUpdateComment?: (id: string, updates: Partial<MockComment>) => void;
  onSelectComment?: (id: string) => void;
  selectedCommentId?: string | null;
}

export const InstagramCommentView: React.FC<Props> = ({
  state,
  onUpdateComment,
  onSelectComment,
  selectedCommentId
}) => {
  const isDark = state.theme === 'dark';
  const isStandaloneCard = state.device === 'social_card';

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const mutedText = isDark ? 'text-[#a8a8a8]' : 'text-[#737373]';
  const heartColor = isDark ? 'text-white' : 'text-slate-900';

  const comments = state.commentConfig.comments || [];

  return (
    <div className={`w-full flex-1 flex flex-col font-sans select-none ${bgColor} ${textColor} overflow-hidden`}>
      {/* If in full mobile view (not standalone card), show Instagram Top Header & Post Info */}
      {!isStandaloneCard && (
        <div className={`w-full px-4 py-3 flex items-center justify-between border-b ${
          isDark ? 'border-[#262626]' : 'border-slate-200'
        }`}>
          <div className="flex items-center space-x-4">
            <ChevronLeft className="w-6 h-6 cursor-pointer" />
            <span className="font-bold text-[16px]">Comentarios</span>
          </div>
          <Send className="w-5 h-5 -rotate-45 cursor-pointer" />
        </div>
      )}

      {/* Main Comment Area */}
      <div className={`flex-1 overflow-y-auto ${isStandaloneCard ? 'p-6 flex flex-col justify-center' : 'p-4 space-y-5'}`}>
        {/* Post Owner caption if full view */}
        {!isStandaloneCard && state.commentConfig.postDescription && (
          <div className={`flex items-start space-x-3 pb-4 border-b ${isDark ? 'border-[#262626]' : 'border-slate-200'}`}>
            <img 
              src={state.commentConfig.postOwnerAvatar} 
              alt={state.commentConfig.postOwnerUsername}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 text-[13.5px] leading-relaxed">
              <span className="font-semibold mr-1.5">{state.commentConfig.postOwnerUsername}</span>
              <span>{state.commentConfig.postDescription}</span>
              <div className={`text-[12px] ${mutedText} mt-1`}>
                {state.commentConfig.postTimeAgo || '1d'}
              </div>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => {
            const isSelected = selectedCommentId === comment.id;

            return (
              <div 
                key={comment.id}
                onClick={() => onSelectComment?.(comment.id)}
                className={`flex items-start justify-between space-x-3 p-2 rounded-xl transition-all cursor-pointer ${
                  isSelected ? 'ring-2 ring-indigo-500/80 bg-white/5' : 'hover:bg-white/5'
                }`}
              >
                {/* Left: Avatar */}
                <div className="shrink-0 pt-0.5">
                  <img 
                    src={comment.authorAvatar} 
                    alt={comment.authorUsername}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                  />
                </div>

                {/* Center: Username + Content + Meta info */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-[14px] leading-[1.35] tracking-tight">
                    <span className="font-bold mr-1.5 text-[14px] hover:underline inline-flex items-center space-x-0.5">
                      <span>@{comment.authorUsername.replace('@', '')}</span>
                      {comment.isVerified && (
                        <BadgeCheck className="w-3.5 h-3.5 fill-[#0095f6] text-white inline ml-0.5 shrink-0" />
                      )}
                    </span>
                    <span className="font-normal whitespace-pre-wrap">{comment.content}</span>
                  </div>

                  {/* Bottom line: Time + Likes + Reply button */}
                  <div className={`flex items-center space-x-4 text-[12px] ${mutedText} mt-1.5 font-medium`}>
                    <span>{comment.timeAgo}</span>
                    {comment.likesCount && (
                      <span className="font-semibold">{comment.likesCount}</span>
                    )}
                    <button className="font-semibold hover:text-white transition-colors">
                      Responder
                    </button>
                  </div>

                  {/* Nested Replies if any */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l border-white/10 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start space-x-2.5">
                          <img 
                            src={reply.authorAvatar} 
                            alt={reply.authorUsername}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div className="flex-1 text-[13px] leading-snug">
                            <span className="font-bold mr-1">@{reply.authorUsername.replace('@', '')}</span>
                            <span>{reply.content}</span>
                            <div className={`flex items-center space-x-3 text-[11px] ${mutedText} mt-1`}>
                              <span>{reply.timeAgo}</span>
                              {reply.likesCount && <span>{reply.likesCount}</span>}
                              <button className="font-semibold">Responder</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Heart Like Icon */}
                <div className="shrink-0 flex flex-col items-center pt-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateComment?.(comment.id, { isLiked: !comment.isLiked });
                    }}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Heart 
                      className={`w-3.5 h-3.5 ${
                        comment.isLiked ? 'fill-red-500 text-red-500' : `${heartColor} opacity-70`
                      }`} 
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instagram Bottom Comment Input Bar if full view */}
      {!isStandaloneCard && (
        <div className={`px-4 py-2.5 flex items-center space-x-3 border-t ${
          isDark ? 'bg-[#121212] border-[#262626]' : 'bg-slate-50 border-slate-200'
        }`}>
          <img 
            src={state.meUser.avatar} 
            alt={state.meUser.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 flex items-center justify-between text-sm">
            <span className={mutedText}>Añade un comentario...</span>
            <span className="text-[#0095f6] font-semibold text-xs opacity-60">Publicar</span>
          </div>
        </div>
      )}
    </div>
  );
};
