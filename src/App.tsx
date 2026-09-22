/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SlideViewer } from './components/SlideViewer';
import { SlideThumbnailBar } from './components/SlideThumbnailBar';
import { InteractiveVectorLab } from './components/InteractiveVectorLab';
import { QuizSection } from './components/QuizSection';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { SLIDES_DATA, LESSON_META } from './data/lessonData';
import { BookOpen, Sparkles, Compass, Presentation, HelpCircle, Download } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'presentation' | 'lab' | 'quiz'>('presentation');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);
  const [isGoogleSlidesModalOpen, setIsGoogleSlidesModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenGoogleSlidesModal={() => setIsGoogleSlidesModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Tab 1: Slide Presentation View */}
        {currentTab === 'presentation' && (
          <div className="space-y-6">
            <SlideViewer
              currentSlideIndex={currentSlideIndex}
              onSlideChange={setCurrentSlideIndex}
              onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
            />

            <SlideThumbnailBar
              currentSlideIndex={currentSlideIndex}
              onSelectSlide={setCurrentSlideIndex}
            />

            {/* Printable summary at bottom of presentation */}
            <PrintableWorksheet />
          </div>
        )}

        {/* Tab 2: Vector Simulation Lab */}
        {currentTab === 'lab' && (
          <div className="space-y-6">
            <InteractiveVectorLab />
            <PrintableWorksheet />
          </div>
        )}

        {/* Tab 3: Formative Quiz */}
        {currentTab === 'quiz' && (
          <div className="space-y-6">
            <QuizSection />
            <PrintableWorksheet />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-bold text-slate-400">
              {LESSON_META.lessonNumber}: {LESSON_META.title}
            </span>
            <span>• {LESSON_META.pages}</span>
          </div>

          <div className="text-slate-400">
            تصميم تعليمي تفاعلي متوافق مع معايير البيداغوجيا الحديثة ويدعم PowerPoint و Google Slides
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />

      <GoogleSlidesModal
        isOpen={isGoogleSlidesModalOpen}
        onClose={() => setIsGoogleSlidesModalOpen(false)}
      />
    </div>
  );
}
