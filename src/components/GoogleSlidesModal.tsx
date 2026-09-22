import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, Sparkles, CheckCircle2, AlertCircle, Loader2, Presentation } from 'lucide-react';
import { createGoogleSlidesPresentation, GoogleSlidesExportResult } from '../utils/googleSlidesExport';
import { LESSON_META } from '../data/lessonData';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({ isOpen, onClose }) => {
  const [tokenInput, setTokenInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [exportResult, setExportResult] = useState<GoogleSlidesExportResult | null>(null);

  if (!isOpen) return null;

  const handleExportWithToken = async (token: string) => {
    if (!token.trim()) return;
    setIsLoading(true);
    setStatusMessage('جارٍ الاتصال بـ Google Slides...');
    setExportResult(null);

    const result = await createGoogleSlidesPresentation(token.trim(), (msg) => {
      setStatusMessage(msg);
    });

    setIsLoading(false);
    setExportResult(result);
  };

  // Google Identity Services (GIS) Token Client Request
  const handleAutoConnect = () => {
    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: '816392600308-placeholder.apps.googleusercontent.com', // standard GIS initiation
          scope: 'https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file',
          callback: (response: any) => {
            if (response.access_token) {
              handleExportWithToken(response.access_token);
            }
          }
        });
        client.requestAccessToken();
      } catch (e) {
        console.warn('GIS Token client request:', e);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Presentation className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                تصدير العرض إلى Google Slides
              </h3>
              <p className="text-xs text-slate-400">
                إنشاء العرض التقديمي مباشرة في حسابك على Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs md:text-sm text-slate-200">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              محتوى العرض التقديمي المصدر:
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              سيتم إنشاء ملف عرض تقديمي يحتوي على 11 شريحة مفصلة لدرس "{LESSON_META.title}" مع نتاجات التعلم، المقارنات، طريقة المضلع، حل المثال 7، وحل التمرين مع ملاحظات المتحدث.
            </p>
          </div>

          {/* Export Action */}
          {!exportResult?.success ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold block">
                  أدخل رمز الوصول (OAuth Access Token) أو اضغط للربط المباشر:
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="ya29.a0AfH6S..."
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => handleExportWithToken(tokenInput)}
                    disabled={isLoading || !tokenInput.trim()}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 shrink-0 flex items-center gap-1.5"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جارٍ الإنشاء...
                      </>
                    ) : (
                      'تصدير الآن'
                    )}
                  </button>
                </div>
              </div>

              {isLoading && statusMessage && (
                <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl text-xs text-blue-300 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0 text-blue-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {exportResult && !exportResult.success && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>تعذر التصدير:</strong> {exportResult.error}
                    <div className="text-[11px] text-slate-400 mt-1">
                      (ملاحظة: يمكنك دائماً تنزيل ملف PowerPoint (.pptx) مباشرة بدون أي إعدادات عبر زر "تنزيل PowerPoint").
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Success View */
            <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  تم إنشاء العرض التقديمي بنجاح!
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  الملف جاهز الآن في Google Drive الخاص بك للمعاينة والتعديل والعرض في الفصل.
                </p>
              </div>

              {exportResult.presentationUrl && (
                <a
                  href={exportResult.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
                >
                  فتح العرض في Google Slides
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
          >
            إغلاق
          </button>
        </div>
      </motion.div>
    </div>
  );
};
