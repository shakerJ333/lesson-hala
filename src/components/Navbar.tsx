import React, { useState } from 'react';
import {
  Presentation,
  Sparkles,
  Download,
  Share2,
  BookOpen,
  HelpCircle,
  Printer,
  Compass,
  FileDown,
  Layers,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { LESSON_META } from '../data/lessonData';
import { exportToPowerPoint } from '../utils/pptxExport';

interface NavbarProps {
  currentTab: 'presentation' | 'lab' | 'quiz';
  onTabChange: (tab: 'presentation' | 'lab' | 'quiz') => void;
  onOpenTeacherGuide: () => void;
  onOpenGoogleSlidesModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenTeacherGuide,
  onOpenGoogleSlidesModal
}) => {
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);

  const handleDownloadPptx = async () => {
    try {
      setIsExportingPptx(true);
      await exportToPowerPoint();
    } catch (e) {
      console.error('Failed to export PPTX:', e);
    } finally {
      setIsExportingPptx(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/90 px-4 md:px-8 py-3.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Lesson Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-black text-lg">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {LESSON_META.lessonNumber}
              </span>
              <h1 className="text-base md:text-lg font-black text-white">
                {LESSON_META.title}
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              {LESSON_META.englishTitle} • {LESSON_META.pages}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => onTabChange('presentation')}
            className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'presentation'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Presentation className="w-4 h-4" />
            عرض الشرائح
          </button>
          <button
            onClick={() => onTabChange('lab')}
            className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'lab'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            مختبر المحاكاة
          </button>
          <button
            onClick={() => onTabChange('quiz')}
            className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            بنك الأسئلة
          </button>
        </nav>

        {/* Action / Export Buttons */}
        <div className="flex items-center gap-2">
          {/* Teacher Guide Button */}
          <button
            onClick={onOpenTeacherGuide}
            className="p-2 md:px-3.5 md:py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            title="دليل المعلم وخطة الدرس"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">دليل المعلم</span>
          </button>

          {/* Google Slides Export Button */}
          <button
            onClick={onOpenGoogleSlidesModal}
            className="p-2 md:px-3.5 md:py-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:border-amber-400"
            title="تصدير إلى Google Slides"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Google Slides</span>
          </button>

          {/* PPTX PowerPoint Download Button */}
          <button
            onClick={handleDownloadPptx}
            disabled={isExportingPptx}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            title="تنزيل عرض بوربوينت كامل (.pptx)"
          >
            {isExportingPptx ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden md:inline">جارٍ التحميل...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">تنزيل PowerPoint (.pptx)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
