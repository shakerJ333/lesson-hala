import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Maximize,
  Minimize,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Sparkles,
  MousePointer2,
  PenTool,
  Eraser,
  Volume2,
  Share2,
  Layers,
  FileText,
  Clock,
  CheckCircle2,
  FileQuestion
} from 'lucide-react';
import { SlideContent } from '../types';
import { SLIDES_DATA, LESSON_META } from '../data/lessonData';
import { CartForcesWidget } from './InteractiveWidgets/CartForcesWidget';
import { VectorHeadTailWidget } from './InteractiveWidgets/VectorHeadTailWidget';
import { VectorSubtractionWidget } from './InteractiveWidgets/VectorSubtractionWidget';
import { PolygonMethodWidget } from './InteractiveWidgets/PolygonMethodWidget';
import { Example7Widget } from './InteractiveWidgets/Example7Widget';
import { ExerciseWidget } from './InteractiveWidgets/ExerciseWidget';
import { QuizSection } from './QuizSection';

interface SlideViewerProps {
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  onOpenTeacherGuide: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentSlideIndex,
  onSlideChange,
  onOpenTeacherGuide
}) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isLaserActive, setIsLaserActive] = useState<boolean>(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slide = SLIDES_DATA[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSlideIndex < SLIDES_DATA.length - 1) {
          onSlideChange(currentSlideIndex + 1);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSlideIndex > 0) {
          onSlideChange(currentSlideIndex - 1);
        }
      } else if (e.key === 'p' || e.key === 'P' || e.key === 'ح') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'l' || e.key === 'L' || e.key === 'م') {
        setIsLaserActive((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F' || e.key === 'ب') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, onSlideChange]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLaserActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full bg-slate-950 rounded-3xl border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? 'h-screen rounded-none' : 'min-h-[640px]'
      }`}
    >
      {/* Laser Pointer Overlay */}
      {isLaserActive && (
        <div
          className="pointer-events-none absolute z-50 w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_6px_rgba(239,68,68,0.8)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
          style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full absolute inset-0 m-auto" />
        </div>
      )}

      {/* Top Slide Presentation Toolbar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        {/* Left: Category & Page info */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold rounded-lg text-xs flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            {slide.categoryLabel}
          </span>
          <span className="text-slate-400 text-xs font-medium">
            مرجع الكتاب: صفحة {slide.pageNumberRef}
          </span>
        </div>

        {/* Center: Slide Progress Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60">
            الشريحة {currentSlideIndex + 1} / {SLIDES_DATA.length}
          </span>
        </div>

        {/* Right: Presentation Tools (Laser, Notes, Guide, Fullscreen) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLaserActive(!isLaserActive)}
            className={`p-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isLaserActive
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="مؤشر الليزر التفاعلي للشرح (L)"
          >
            <MousePointer2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">مؤشر الليزر</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              showNotes
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="ملاحظات المعلم / المتحدث (P)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ملاحظات العرض</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition-all"
            title="ملء الشاشة (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Content Screen */}
      <div className="flex-1 p-5 md:p-8 overflow-y-auto flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Slide Header: Title & Subtitle */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {slide.title}
                </h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 font-medium pr-5">
                {slide.subtitle}
              </p>
            </div>

            {/* Slide Concept Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-slate-900/90 border border-slate-800/90 shadow-md">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl mt-0.5 shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400">الفكرة المركزية:</span>
                  <p className="text-xs md:text-sm font-semibold text-slate-200 leading-relaxed">
                    {slide.mainConcept}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Widget according to Slide Type */}
            {slide.interactiveType === 'comparison' && <CartForcesWidget />}
            {slide.interactiveType === 'vectorAddition' && <VectorHeadTailWidget />}
            {slide.interactiveType === 'vectorSubtraction' && <VectorSubtractionWidget />}
            {slide.interactiveType === 'polygonMethod' && <PolygonMethodWidget />}
            {slide.interactiveType === 'example7' && <Example7Widget />}
            {slide.interactiveType === 'exercise' && <ExerciseWidget />}
            {slide.interactiveType === 'quiz' && <QuizSection />}

            {/* General Slide Grid Content if not pure quiz */}
            {slide.interactiveType !== 'quiz' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
                {/* Key Points Column */}
                <div className="lg:col-span-8 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                  <h4 className="font-bold text-blue-300 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    المفاهيم والنقاط الجوهرية للدرس:
                  </h4>
                  <ul className="space-y-2.5">
                    {slide.keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/40"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Callout: Formula / Question */}
                <div className="lg:col-span-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4">
                  {slide.formula && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-center space-y-1.5">
                      <span className="text-[11px] font-bold text-emerald-400">
                        العلاقة الرياضية المعتمدة:
                      </span>
                      <div className="text-base md:text-lg font-mono font-bold text-emerald-300 dir-ltr">
                        {slide.formula}
                      </div>
                    </div>
                  )}

                  {slide.quoteOrQuestion ? (
                    <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-800/40 text-xs text-amber-200 space-y-1">
                      <span className="font-bold text-amber-300 block">سؤال واستنتاج:</span>
                      <p className="italic leading-relaxed">{slide.quoteOrQuestion}</p>
                    </div>
                  ) : (
                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                      <span className="font-bold text-slate-300 block">إرشاد تعليمي:</span>
                      <p className="leading-relaxed">
                        احرص على تثبيت المسطرة والمنقلة بدقة للحصول على أدق نتائج بيانية للرسم.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={onOpenTeacherGuide}
                    className="w-full py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    عرض خطة تدريس الشريحة
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Speaker Notes Drawer */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 rounded-2xl bg-blue-950/30 border border-blue-800/50 text-xs text-blue-200 space-y-1.5 leading-relaxed"
            >
              <div className="flex items-center justify-between text-blue-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  ملاحظات وتوجيهات المتحدث للشريحة (Speaker Notes):
                </span>
                <span className="text-[10px] text-slate-400">مخصصة للمعلم أثناء الشرح</span>
              </div>
              <p className="text-slate-300">{slide.speakerNotes}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="px-5 py-3.5 border-t border-slate-800/80 bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-4">
        <button
          onClick={() => onSlideChange(Math.max(0, currentSlideIndex - 1))}
          disabled={currentSlideIndex === 0}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs md:text-sm font-bold rounded-xl transition-all flex items-center gap-2 active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
          الشريحة السابقة
        </button>

        {/* Slide Progress Dots */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-md px-2 py-1">
          {SLIDES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSlideChange(idx)}
              className={`transition-all rounded-full ${
                currentSlideIndex === idx
                  ? 'w-6 h-2 bg-amber-400 shadow-md shadow-amber-400/50'
                  : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`${s.title} (شريحة ${idx + 1})`}
            />
          ))}
        </div>

        <button
          onClick={() => onSlideChange(Math.min(SLIDES_DATA.length - 1, currentSlideIndex + 1))}
          disabled={currentSlideIndex === SLIDES_DATA.length - 1}
          className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-30 text-slate-950 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
        >
          الشريحة التالية
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
