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
  CommentConfig 
} from './types';
import { DEFAULT_MOCK_STATE, TEMPLATES_LIBRARY } from './data/templates';
import { MockCanvas } from './components/preview/MockCanvas';
import { PlatformSelector } from './components/editor/PlatformSelector';
import { HeaderEditor } from './components/editor/HeaderEditor';
import { MessagesEditor } from './components/editor/MessagesEditor';
import { CommentEditor } from './components/editor/CommentEditor';
import { AppearanceEditor } from './components/editor/AppearanceEditor';
import { ExportModal } from './components/modals/ExportModal';
import { TemplatesModal } from './components/modals/TemplatesModal';
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
  Eye
} from 'lucide-react';

export default function App() {
  const [state, setState] = useState<MockState>(() => {
    const saved = localStorage.getItem('mockchat_current_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_MOCK_STATE;
      }
    }
    return DEFAULT_MOCK_STATE;
  });

  const [activeTab, setActiveTab] = useState<'platform' | 'content' | 'profile' | 'style'>('content');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [quickCopied, setQuickCopied] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('mockchat_current_state', JSON.stringify(state));
  }, [state]);

  // Handlers for updating state
  const handleSelectPlatform = (platform: PlatformId) => {
    const isComment = platform === 'instagram_comment' || platform === 'tiktok_comment';
    
    // Pick relevant template if switching major types
    const matchingTemplate = TEMPLATES_LIBRARY.find((t) => t.platform === platform);

    setState((prev) => ({
      ...prev,
      platform,
      mockType: isComment ? 'comment' : 'chat',
      device: isComment && prev.device !== 'social_card' ? 'social_card' : (prev.device === 'social_card' && !isComment ? 'iphone_16_pro' : prev.device),
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

  const isCommentPlatform = state.platform === 'instagram_comment' || state.platform === 'tiktok_comment';

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans">
      {/* Top Header Navbar */}
      <header className="w-full px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
        {/* App Title & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-[15px] font-bold text-white tracking-tight">MockChat Studio</h1>
              <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-400 font-extrabold text-[10px] rounded border border-indigo-500/30">
                PWA HD
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Generador de maquetas realistas de conversaciones y comentarios en alta resolución
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center space-x-2">
          {/* Templates Library Button */}
          <button
            onClick={() => setIsTemplatesModalOpen(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1.5 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Plantillas</span>
          </button>

          {/* Quick Copy to Clipboard Button */}
          <button
            onClick={handleQuickCopy}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1.5 transition-colors shadow-xs"
            title="Copiar imagen directamente al portapapeles"
          >
            {quickCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-xs">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Copiar</span>
              </>
            )}
          </button>

          {/* Export High-Res Modal Trigger */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar HD</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reiniciar a plantilla inicial"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Area (Split Screen) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left / Center View: Live Preview Canvas */}
        <main className="flex-1 bg-slate-950/60 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-start lg:justify-center relative">
          <div className="mb-3 text-[11.5px] text-slate-400 flex items-center gap-1.5 select-none bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
            <Eye className="w-3 h-3 text-indigo-400" />
            <span>Haz clic en cualquier mensaje o comentario para seleccionarlo y editarlo.</span>
          </div>

          <div className="w-full flex items-center justify-center">
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

        {/* Right Sidebar: Precision Editor Controls */}
        <aside className="w-full lg:w-[460px] xl:w-[480px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0 h-[480px] lg:h-full">
          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/50 p-1.5 space-x-1 shrink-0">
            {[
              { id: 'platform', label: 'Plataforma', icon: <Smartphone className="w-3.5 h-3.5" /> },
              { id: 'content', label: isCommentPlatform ? 'Comentarios' : 'Mensajes', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { id: 'profile', label: 'Contacto & Barra', icon: <User className="w-3.5 h-3.5" /> },
              { id: 'style', label: 'Diseño & Marco', icon: <Palette className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {activeTab === 'platform' && (
              <PlatformSelector
                currentPlatform={state.platform}
                onSelectPlatform={handleSelectPlatform}
              />
            )}

            {activeTab === 'content' && (
              <>
                {isCommentPlatform ? (
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
    </div>
  );
}
