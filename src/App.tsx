import React, { useState, useRef, useEffect } from 'react';
import { 
  MockState, 
  PlatformId, 
  MockType, 
  ThemeMode, 
  DeviceType, 
  Message, 
  MockComment, 
  TemplatePreset, 
  ExportSettings, 
  ContactConfig, 
  StatusBarConfig, 
  ChatConfig, 
  CommentConfig,
  ReviewConfig,
  StoryConfig,
  PushConfig
} from './types';
import { DEFAULT_MOCK_STATE, TEMPLATES_LIBRARY } from './data/templates';
import { MockCanvas } from './components/preview/MockCanvas';
import { PlatformSelector } from './components/editor/PlatformSelector';
import { HeaderEditor } from './components/editor/HeaderEditor';
import { MessagesEditor } from './components/editor/MessagesEditor';
import { CommentEditor } from './components/editor/CommentEditor';
import { AppearanceEditor } from './components/editor/AppearanceEditor';
import { ReviewEditor } from './components/editor/ReviewEditor';
import { StoryEditor } from './components/editor/StoryEditor';
import { PushEditor } from './components/editor/PushEditor';
import { ExportModal } from './components/modals/ExportModal';
import { TemplatesModal } from './components/modals/TemplatesModal';
import { ProjectsModal } from './components/modals/ProjectsModal';
import { getProjects, saveProject, saveAsNewProject, deleteProject as deleteStoredProject, getCurrentStateFallback, StoredProject, MAX_PROJECTS } from './data/storage';
import * as htmlToImage from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  Smartphone, 
  MessageSquare, 
  Palette, 
  User, 
  Layers, 
  Share2, 
  HelpCircle,
  Eye,
  Sun,
  Moon,
  History,
  Save
} from 'lucide-react';

export default function App() {
  const [state, setState] = useState<MockState>(() => getCurrentStateFallback(DEFAULT_MOCK_STATE));

  const [activeTab, setActiveTab] = useState<'platform' | 'content' | 'profile' | 'style'>('content');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [quickCopied, setQuickCopied] = useState(false);
  const [projects, setProjects] = useState<StoredProject[]>(() => getProjects());

  const canvasRef = useRef<HTMLDivElement>(null);

  // Persist current - sin backend
  useEffect(() => {
    localStorage.setItem('mockchat_current_state', JSON.stringify(state));
  }, [state]);

  // Auto-actualiza la entrada actual en historial (no crea duplicados al tipear)
  const saveTimeoutRef = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = window.setTimeout(() => {
      const updated = saveProject(state);
      setProjects(updated);
    }, 800);
    return () => {
      if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    };
  }, [state]);

  // Inicializar historial si está vacío
  useEffect(() => {
    if (projects.length === 0) {
      const seeded = saveProject(state);
      setProjects(seeded);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers for updating state
  const handleSelectPlatform = (platform: PlatformId) => {
    const isComment = platform === 'instagram_comment' || platform === 'tiktok_comment';
    const isReview = platform === 'google_review' || platform === 'trustpilot_review';
    const isStory = platform === 'instagram_story';
    const isPush = platform === 'push_notification';
    const mockType: MockType = isComment ? 'comment' : isReview ? 'review' : isStory ? 'story' : isPush ? 'notification' : 'chat';
    const isCardLike = isComment || isReview;
    
    // Pick relevant template if switching major types
    const matchingTemplate = TEMPLATES_LIBRARY.find((t) => t.platform === platform);

    setState((prev) => ({
      ...prev,
      platform,
      mockType,
      device: isCardLike && prev.device !== 'social_card' ? 'social_card' : (prev.device === 'social_card' && !isCardLike ? 'iphone_16_pro' : prev.device),
      ...(matchingTemplate?.data ? matchingTemplate.data : {})
    }));
  };

  const handleUpdateContact = (updates: Partial<ContactConfig>) => {
    setState((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...updates }
    }));
  };

  const handleUpdateStatusBar = (updates: Partial<StatusBarConfig>) => {
    setState((prev) => ({
      ...prev,
      statusBar: { ...prev.statusBar, ...updates }
    }));
  };

  const handleUpdateExportSettings = (updates: Partial<ExportSettings>) => {
    setState((prev) => ({
      ...prev,
      exportSettings: { ...prev.exportSettings, ...updates }
    }));
  };

  const handleUpdateChat = (updates: Partial<ChatConfig>) => {
    setState((prev) => ({
      ...prev,
      chat: { ...prev.chat, ...updates }
    }));
  };

  const handleUpdateCommentConfig = (updates: Partial<CommentConfig>) => {
    setState((prev) => ({
      ...prev,
      commentConfig: { ...prev.commentConfig, ...updates }
    }));
  };

  const handleUpdateReviewConfig = (updates: Partial<ReviewConfig>) => {
    setState((prev) => ({
      ...prev,
      reviewConfig: { ...prev.reviewConfig, ...updates }
    }));
  };

  const handleUpdateStoryConfig = (updates: Partial<StoryConfig>) => {
    setState((prev) => ({
      ...prev,
      storyConfig: { ...prev.storyConfig, ...updates }
    }));
  };

  const handleUpdatePushConfig = (updates: Partial<PushConfig>) => {
    setState((prev) => ({
      ...prev,
      pushConfig: { ...prev.pushConfig, ...updates }
    }));
  };

  // Messages handlers
  const handleAddMessage = (msg: Message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, msg]
    }));
  };

  const handleUpdateMessage = (id: string, updates: Partial<Message>) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, ...updates } : m))
    }));
  };

  const handleDeleteMessage = (id: string) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id)
    }));
  };

  const handleReorderMessage = (index: number, direction: 'up' | 'down') => {
    setState((prev) => {
      const newMessages = [...prev.messages];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newMessages.length) return prev;

      const temp = newMessages[index];
      newMessages[index] = newMessages[targetIndex];
      newMessages[targetIndex] = temp;

      return { ...prev, messages: newMessages };
    });
  };

  // Comments handlers
  const handleAddComment = (comment: MockComment) => {
    setState((prev) => ({
      ...prev,
      commentConfig: {
        ...prev.commentConfig,
        comments: [...(prev.commentConfig.comments || []), comment]
      }
    }));
  };

  const handleUpdateComment = (id: string, updates: Partial<MockComment>) => {
    setState((prev) => ({
      ...prev,
      commentConfig: {
        ...prev.commentConfig,
        comments: (prev.commentConfig.comments || []).map((c) =>
          c.id === id ? { ...c, ...updates } : c
        )
      }
    }));
  };

  const handleDeleteComment = (id: string) => {
    setState((prev) => ({
      ...prev,
      commentConfig: {
        ...prev.commentConfig,
        comments: (prev.commentConfig.comments || []).filter((c) => c.id !== id)
      }
    }));
  };

  const handleSelectTemplate = (template: TemplatePreset) => {
    setState((prev) => ({
      ...prev,
      ...template.data,
      platform: template.platform,
      mockType: template.mockType,
    }));
  };

  const handleLoadProject = (projectState: MockState) => {
    setState(projectState);
    setIsProjectsModalOpen(false);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  const handleDeleteProject = (id: string) => {
    const updated = deleteStoredProject(id);
    setProjects(updated);
  };

  const handleDuplicateProject = (projectState: MockState) => {
    const duplicated: MockState = {
      ...JSON.parse(JSON.stringify(projectState)),
      id: `mock-${Date.now()}`,
      title: `${projectState.title || projectState.platform} (copia)`,
    };
    setState(duplicated);
    const updated = saveProject(duplicated);
    setProjects(updated);
    setIsProjectsModalOpen(false);
  };

  const handleSaveManual = () => {
    // Guardar como nueva creación: fuerza nuevo id para ocupar slot en historial 5
    const withTitle = { ...state, title: state.title?.trim() ? state.title : `${state.platform} - ${new Date().toLocaleDateString('es-ES')}` };
    const updated = saveAsNewProject(withTitle);
    setProjects(updated);
    const latest = updated[0]?.state;
    if (latest) setState(latest);
    setIsProjectsModalOpen(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  const handleQuickCopy = async () => {
    try {
      const node = canvasRef.current || document.getElementById('export-canvas-target');
      if (!node) return;

      const blob = await htmlToImage.toBlob(node, {
        pixelRatio: 2,
        cacheBust: true
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setQuickCopied(true);
        setTimeout(() => setQuickCopied(false), 2500);

        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    } catch (e) {
      setIsExportModalOpen(true);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas reiniciar la maqueta al estado inicial?')) {
      setState(DEFAULT_MOCK_STATE);
    }
  };

  const handleToggleTheme = () => {
    setState((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const isCommentPlatform = state.platform === 'instagram_comment' || state.platform === 'tiktok_comment';
  const isReviewPlatform = state.platform === 'google_review' || state.platform === 'trustpilot_review';
  const isStoryPlatform = state.platform === 'instagram_story';
  const isPushPlatform = state.platform === 'push_notification';

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans">
      {/* Top Header Navbar - Mobile Optimized */}
      <header className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between z-30 shrink-0 gap-2">
        {/* App Title & Brand */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <h1 className="text-[13px] sm:text-[15px] font-bold text-white tracking-tight truncate">MockChat Studio</h1>
              <span className="px-1 sm:px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 font-extrabold text-[9px] sm:text-[10px] rounded border border-indigo-500/30 shrink-0">
                PWA HD
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block truncate">
              Generador de maquetas realistas de conversaciones y comentarios en alta resolución
            </p>
          </div>
        </div>

        {/* Top Actions - wrap on very small screens */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end max-w-[68%] sm:max-w-none">
          {/* Mis creaciones - Historial 5 max LRU */}
          <button
            onClick={() => setIsProjectsModalOpen(true)}
            className="px-2 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1 sm:space-x-1.5 transition-colors shadow-xs min-h-[32px] relative"
            title="Ver historial (máx 5 - la más vieja se borra)"
          >
            <History className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">Mis creaciones</span>
            <span className="sm:hidden text-[11px]">Historial</span>
            <span className="px-1 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full min-w-[18px] text-center leading-none">{projects.length}/{MAX_PROJECTS}</span>
          </button>
          {/* Guardar ahora */}
          <button
            onClick={handleSaveManual}
            className="hidden sm:flex px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold rounded-lg items-center space-x-1 transition-colors shadow-xs min-h-[32px]"
            title="Guardar como nueva creación en historial (máx 5)"
          >
            <Save className="w-3.5 h-3.5 shrink-0" />
            <span>Guardar</span>
          </button>

          {/* Theme Toggle - Light / Dark (visible siempre) */}
          <button
            onClick={handleToggleTheme}
            className={`px-2 sm:px-3 py-1.5 rounded-lg border flex items-center space-x-1 sm:space-x-1.5 transition-all shadow-xs text-xs font-semibold min-h-[32px] ${
              state.theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 active:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100'
            }`}
            title={state.theme === 'dark' ? 'Cambiar a modo Claro' : 'Cambiar a modo Oscuro'}
            aria-label="Cambiar tema"
          >
            {state.theme === 'dark' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="hidden sm:inline">Oscuro</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="hidden sm:inline">Claro</span>
              </>
            )}
          </button>

          {/* Templates Library Button */}
          <button
            onClick={() => setIsTemplatesModalOpen(true)}
            className="px-2 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1 sm:space-x-1.5 transition-colors shadow-xs min-h-[32px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Plantillas</span>
          </button>

          {/* Quick Copy to Clipboard Button */}
          <button
            onClick={handleQuickCopy}
            className="px-2 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1 sm:space-x-1.5 transition-colors shadow-xs min-h-[32px]"
            title="Copiar imagen directamente al portapapeles"
          >
            {quickCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 text-xs hidden sm:inline">¡Copiado!</span>
                <span className="text-emerald-400 text-xs sm:hidden">✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="hidden sm:inline">Copiar</span>
              </>
            )}
          </button>

          {/* Export High-Res Modal Trigger */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-2.5 sm:px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center space-x-1 sm:space-x-1.5 transition-all shadow-md shadow-indigo-600/30 min-h-[32px]"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">Exportar</span>
            <span className="xs:hidden sm:inline">Exportar HD</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="Reiniciar a plantilla inicial"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Area (Split Screen) - Mobile First */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left / Center View: Live Preview Canvas */}
        <main className="flex-1 bg-slate-950/60 p-3 sm:p-4 lg:p-6 overflow-y-auto flex flex-col items-center justify-start lg:justify-center relative overscroll-contain">
          <div className="mb-2 sm:mb-3 text-[10px] sm:text-[11.5px] text-slate-400 flex items-center gap-1 sm:gap-1.5 select-none bg-slate-900/60 px-2.5 sm:px-3 py-1 sm:py-1 rounded-full border border-slate-800 text-center max-w-[92%] sm:max-w-none leading-tight">
            <Eye className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="truncate">Toca un mensaje/comentario para editarlo</span>
            <span className="hidden sm:inline truncate"> — Haz clic en cualquier mensaje o comentario para seleccionarlo y editarlo.</span>
          </div>

          <div className="w-full flex items-center justify-center px-1 sm:px-0">
            <MockCanvas
              ref={canvasRef}
              state={state}
              onUpdateMessage={handleUpdateMessage}
              onSelectMessage={(id) => {
                setSelectedMessageId(id);
                setActiveTab('content');
              }}
              onUpdateComment={handleUpdateComment}
              onSelectComment={(id) => {
                setSelectedCommentId(id);
                setActiveTab('content');
              }}
              selectedMessageId={selectedMessageId}
              selectedCommentId={selectedCommentId}
            />
          </div>
        </main>

        {/* Right Sidebar: Precision Editor Controls - Mobile Bottom Sheet */}
        <aside className="w-full lg:w-[460px] xl:w-[480px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0 h-[54vh] min-h-[380px] max-h-[62vh] sm:h-[480px] lg:h-full lg:max-h-none">
          {/* Navigation Tabs - Scrollable on mobile, touch-friendly */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/50 p-1 sm:p-1.5 gap-1 shrink-0 overflow-x-auto scrollbar-none snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
            {[
              { id: 'platform', label: 'Plataforma', shortLabel: 'Apps', icon: <Smartphone className="w-3.5 h-3.5" /> },
              { id: 'content', label: isReviewPlatform ? 'Reseña' : isStoryPlatform ? 'Historia' : isPushPlatform ? 'Push' : isCommentPlatform ? 'Comentarios' : 'Mensajes', shortLabel: isReviewPlatform ? 'Reseña' : isStoryPlatform ? 'Story' : isPushPlatform ? 'Push' : isCommentPlatform ? 'Texto' : 'Chat', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: 'profile', label: 'Contacto & Barra', shortLabel: 'Perfil', icon: <User className="w-3.5 h-3.5" /> },
              { id: 'style', label: 'Diseño & Marco', shortLabel: 'Estilo', icon: <Palette className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 sm:flex-1 min-w-[72px] sm:min-w-0 py-2.5 sm:py-2 px-1.5 sm:px-2 text-[11px] sm:text-xs font-semibold rounded-lg flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 transition-colors snap-start min-h-[44px] sm:min-h-0 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 active:bg-slate-800'
                }`}
              >
                {tab.icon}
                <span className="truncate leading-none">
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel Body - improved scroll for mobile */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 overscroll-contain [-webkit-overflow-scrolling:touch] pb-6 sm:pb-4">
            {activeTab === 'platform' && (
              <PlatformSelector
                currentPlatform={state.platform}
                onSelectPlatform={handleSelectPlatform}
              />
            )}

            {activeTab === 'content' && (
              <>
                {isReviewPlatform ? (
                  <ReviewEditor reviewConfig={state.reviewConfig} onChange={handleUpdateReviewConfig} />
                ) : isStoryPlatform ? (
                  <StoryEditor storyConfig={state.storyConfig} onChange={handleUpdateStoryConfig} />
                ) : isPushPlatform ? (
                  <PushEditor pushConfig={state.pushConfig} onChange={handleUpdatePushConfig} />
                ) : isCommentPlatform ? (
                  <CommentEditor
                    commentConfig={state.commentConfig}
                    onChangeCommentConfig={handleUpdateCommentConfig}
                    onUpdateComment={handleUpdateComment}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    selectedCommentId={selectedCommentId}
                    onSelectComment={setSelectedCommentId}
                  />
                ) : (
                  <MessagesEditor
                    messages={state.messages}
                    onAddMessage={handleAddMessage}
                    onUpdateMessage={handleUpdateMessage}
                    onDeleteMessage={handleDeleteMessage}
                    onReorderMessage={handleReorderMessage}
                    selectedMessageId={selectedMessageId}
                    onSelectMessage={setSelectedMessageId}
                  />
                )}
              </>
            )}

            {activeTab === 'profile' && (
              <HeaderEditor
                state={state}
                onChangeContact={handleUpdateContact}
                onChangeStatusBar={handleUpdateStatusBar}
              />
            )}

            {activeTab === 'style' && (
              <AppearanceEditor
                state={state}
                onChangeTheme={(theme) => setState((prev) => ({ ...prev, theme }))}
                onChangeDevice={(device) => setState((prev) => ({ ...prev, device }))}
                onChangeExportSettings={handleUpdateExportSettings}
                onChangeChat={handleUpdateChat}
              />
            )}
          </div>
        </aside>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        state={state}
        onUpdateExportSettings={handleUpdateExportSettings}
        onImportState={(newState) => setState(newState)}
        canvasRef={canvasRef}
      />

      {/* Templates Library Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Projects History Modal - 5 max LRU */}
      <ProjectsModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        projects={projects}
        currentId={state.id}
        onLoad={handleLoadProject}
        onDelete={handleDeleteProject}
        onDuplicate={handleDuplicateProject}
      />
    </div>
  );
}
