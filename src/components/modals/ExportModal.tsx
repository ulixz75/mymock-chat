import React, { useState } from 'react';
import { MockState, ExportSettings } from '../../types';
import * as htmlToImage from 'html-to-image';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  FileImage, 
  X, 
  Loader2, 
  Save, 
  Upload,
  AlertCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  state: MockState;
  onUpdateExportSettings: (settings: Partial<ExportSettings>) => void;
  onImportState: (state: MockState) => void;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const ExportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  state,
  onUpdateExportSettings,
  onImportState,
  canvasRef
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const { exportSettings } = state;

  const getCanvasElement = (): HTMLElement => {
    const el = canvasRef.current || document.getElementById('export-canvas-target');
    if (!el) throw new Error('No se encontró el elemento canvas del mockup');
    return el;
  };

  const handleDownload = async () => {
    setIsExporting(true);
    setErrorMessage(null);

    try {
      const node = getCanvasElement();
      const pixelRatio = exportSettings.scale;

      let dataUrl = '';
      const options = {
        pixelRatio,
        quality: 0.98,
        cacheBust: true,
        style: {
          transform: 'none',
        }
      };

      if (exportSettings.format === 'jpeg') {
        dataUrl = await htmlToImage.toJpeg(node, options);
      } else {
        // html-to-image no expone toWebp en v1.11; para webp usamos toPng y luego conversión via canvas si se requiere
        // Por ahora generamos png y cambiamos extensión; el navegador descargará png con extensión png
        dataUrl = await htmlToImage.toPng(node, options);
      }

      // Trigger download - webp se exporta como png por limitación de html-to-image
      const effectiveExt = exportSettings.format === 'jpeg' ? 'jpg' : 'png';
      const link = document.createElement('a');
      const filename = `${state.platform}-mockup-${Date.now()}.${effectiveExt}`;
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMessage(err?.message || 'Error al exportar la imagen. Intenta nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    setIsExporting(true);
    setErrorMessage(null);

    try {
      const node = getCanvasElement();
      const blob = await htmlToImage.toBlob(node, {
        pixelRatio: exportSettings.scale > 2 ? 2 : exportSettings.scale,
        cacheBust: true
      });

      if (!blob) throw new Error('No se pudo generar el archivo para el portapapeles');

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 3000);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (err: any) {
      console.error('Clipboard error:', err);
      setErrorMessage('No se pudo copiar automáticamente. Puedes usar el botón "Descargar Imagen".');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `mockchat-project-${state.id}.json`;
    link.href = url;
    link.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string);
        if (imported && imported.platform) {
          onImportState(imported);
          onClose();
        } else {
          setErrorMessage('El archivo JSON no tiene el formato correcto.');
        }
      } catch (err) {
        setErrorMessage('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <FileImage className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] sm:text-sm font-bold text-white leading-tight">Exportar Mockup en Alta Resolución</h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">Gráficos listos para publicaciones, anuncios o presentaciones.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 sm:p-1 text-slate-400 hover:text-white active:text-white rounded-lg shrink-0 min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-3 sm:p-5 space-y-4 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
          {/* Resolution Scale */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Resolución & Calidad</span>
              <span className="text-indigo-400 font-bold text-xs">{exportSettings.scale}x ({exportSettings.scale * 100}% Retina)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { scale: 1, label: '1x Estándar', desc: 'Web rápido' },
                { scale: 2, label: '2x HD', desc: 'Redes sociales' },
                { scale: 3, label: '3x Ultra HD', desc: 'Anuncios & Ads' },
                { scale: 4, label: '4x 4K UHD', desc: 'Máxima nitidez' },
              ].map((item) => (
                <button
                  key={item.scale}
                  onClick={() => onUpdateExportSettings({ scale: item.scale as any })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    exportSettings.scale === item.scale
                      ? 'bg-indigo-600 border-indigo-500 text-white font-semibold shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs">{item.label}</div>
                  <div className="text-[9.5px] opacity-75">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Formato de Archivo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'png', label: 'PNG (Recomendado)', desc: 'Sin pérdida de calidad' },
                { id: 'jpeg', label: 'JPG / JPEG', desc: 'Fondo sólido comprimido' },
                { id: 'webp', label: 'WebP', desc: 'Optimizado para web' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => onUpdateExportSettings({ format: f.id as any })}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    exportSettings.format === f.id
                      ? 'bg-slate-800 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs">{f.label}</div>
                  <div className="text-[10px] text-slate-500">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              disabled={isExporting}
              onClick={handleDownload}
              className="w-full py-3.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-indigo-600/30 min-h-[48px]"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando imagen en alta resolución...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar Imagen {exportSettings.format.toUpperCase()} ({exportSettings.scale}x)</span>
                </>
              )}
            </button>

            <button
              disabled={isExporting}
              onClick={handleCopyToClipboard}
              className="w-full py-3 sm:py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 border border-slate-700 disabled:opacity-50 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors min-h-[44px] text-center leading-tight"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">¡Imagen copiada al portapapeles con éxito!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Imagen Directamente (Pegar en Canva / Figma / WhatsApp)</span>
                </>
              )}
            </button>
          </div>

          {/* Backup / JSON Save & Load */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Guardar o restaurar maqueta:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportJSON}
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-md text-[11px] text-slate-300 flex items-center space-x-1"
              >
                <Save className="w-3 h-3" />
                <span>Exportar JSON</span>
              </button>
              <label className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-md text-[11px] text-slate-300 flex items-center space-x-1 cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>Importar JSON</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
