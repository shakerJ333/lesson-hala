import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, HelpCircle, Trophy, RefreshCw, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/lessonData';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;
  const isCorrect = isAnswered && selectedAnswers[currentQ.id] === currentQ.correctIndex;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    const newAnswers = { ...selectedAnswers, [currentQ.id]: optIdx };
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);

    if (optIdx === currentQ.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setShowHint(false);
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    setShowHint(false);
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setShowHint(false);
    setQuizFinished(false);
  };

  // Calculate score
  const correctCount = Object.keys(selectedAnswers).reduce((count, qId) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    if (q && selectedAnswers[Number(qId)] === q.correctIndex) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-8 shadow-2xl space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
            <Trophy className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white">
              بنك الأسئلة والتقويم الختامي
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              اختبر استيعابك للمفاهيم الفيزيائية وطريقة المضلع مع تغذية راجعة فورية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs bg-slate-800 px-3.5 py-1.5 rounded-xl text-slate-300 font-bold">
            السؤال {currentIdx + 1} من {QUIZ_QUESTIONS.length}
          </div>
          <button
            onClick={resetQuiz}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            title="إعادة الاختبار"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          {/* Question Text */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs text-amber-400 font-bold">
              <span>المفهوم: {currentQ.relatedConcept}</span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                {showHint ? 'إخفاء التلميح' : 'عرض تلميح'}
              </button>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-amber-200 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/50"
              >
                💡 {currentQ.hint}
              </motion.div>
            )}

            <h4 className="text-base md:text-lg font-bold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, idx) => {
              const selectedThis = selectedAnswers[currentQ.id] === idx;
              const isCorrectChoice = currentQ.correctIndex === idx;

              let btnStyle = 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200';

              if (isAnswered) {
                if (isCorrectChoice) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 font-bold';
                } else if (selectedThis) {
                  btnStyle = 'bg-rose-950/70 border-rose-500/80 text-rose-200';
                } else {
                  btnStyle = 'opacity-40 border-slate-800 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-right text-xs md:text-sm transition-all flex items-center justify-between group ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrectChoice && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {selectedThis && !isCorrectChoice && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-2xl border text-xs md:text-sm space-y-1.5 leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {isCorrect ? 'إجابة ممتازة وصحيحة! 🎉' : 'توضيح بيداغوجي: 📌'}
                </div>
                <p>{currentQ.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper controls */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4" />
              السؤال السابق
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-lg shadow-blue-600/30"
            >
              {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'عرض النتيجة النهائية' : 'السؤال التالي'}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-5"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-black text-white">
            نتيجة التقييم النهائي لدرس المتجهات
          </h3>

          <div className="text-4xl font-extrabold text-amber-400 font-mono">
            {correctCount} / {QUIZ_QUESTIONS.length}
          </div>

          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {correctCount === QUIZ_QUESTIONS.length
              ? 'أداء استثنائي! لقد استوعبت جميع مفاهيم جمع وطرح المتجهات وطريقة المضلع بنجاح تام.'
              : correctCount >= 3
              ? 'أداء رائع ومبشر! يمكنك مراجعة الشرائح لتثبيت المفاهيم الهندسية الدقيقة.'
              : 'نوصي بمراجعة شرائح الدرس وتجربة مختبر المتجهات مرة أخرى لتعزيز الفهم.'}
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              إعادة حل الاختبار
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
