import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Clock, Target, AlertTriangle, Lightbulb, CheckCircle2, Award } from 'lucide-react';
import { LESSON_META, TEACHER_GUIDE } from '../data/lessonData';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                دليل المعلم وخطة الدرس النموذجية (Instructional Design Guide)
              </h3>
              <p className="text-xs text-slate-400">
                {LESSON_META.lessonNumber}: {LESSON_META.title} | {LESSON_META.pages}
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
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs md:text-sm leading-relaxed">
          {/* Section: Learning Outcomes */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Target className="w-4 h-4" />
              نتاجات التعلم المستهدفة (Learning Outcomes):
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {LESSON_META.learningOutcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Key Vocabulary */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              المصطلحات والمفاهيم الرئيسة (Key Terms):
            </div>
            <div className="flex flex-wrap gap-2">
              {LESSON_META.keyTerms.map((term, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <span className="font-bold text-slate-200">{term.ar}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({term.en})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Time Schedule & 5E Lesson Plan */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Clock className="w-4 h-4" />
              التوزيع الزمني واستراتيجيات التدريس (45 دقيقة):
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TEACHER_GUIDE.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs md:text-sm">
                      {step.title}
                    </h4>
                    <span className="px-2.5 py-0.5 bg-blue-950 border border-blue-800 text-blue-300 rounded-full text-[11px] font-mono">
                      {step.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    <div>
                      <strong className="text-slate-400">دور المعلم: </strong>
                      <span className="text-slate-300">{step.teacherRole}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400">نشاط الطالب: </strong>
                      <span className="text-slate-300">{step.studentActivity}</span>
                    </div>
                  </div>

                  {step.commonMisconceptions.length > 0 && (
                    <div className="bg-rose-950/20 border border-rose-900/40 p-2 rounded-xl flex items-start gap-2 text-[11px] text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>المفهوم الخاطئ الشائع: </strong>
                        {step.commonMisconceptions.join(' | ')}
                      </div>
                    </div>
                  )}

                  <div className="bg-amber-950/20 border border-amber-900/40 p-2 rounded-xl flex items-start gap-2 text-[11px] text-amber-300">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>توجيه بيداغوجي: </strong>
                      {step.pedagogicalTip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
          >
            إغلاق الدليل
          </button>
        </div>
      </motion.div>
    </div>
  );
};
