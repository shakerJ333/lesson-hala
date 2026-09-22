import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, HelpCircle, Eye, Calculator } from 'lucide-react';

export const ExerciseWidget: React.FC = () => {
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false);
  const [userGuessMagnitude, setUserGuessMagnitude] = useState<string>('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'near' | 'wrong'>('none');

  const checkAnswer = () => {
    const val = parseFloat(userGuessMagnitude);
    if (!val) return;
    if (Math.abs(val - 680) <= 20) {
      setFeedback('correct');
    } else if (Math.abs(val - 680) <= 60) {
      setFeedback('near');
    } else {
      setFeedback('wrong');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl space-y-4">
      {/* Exercise Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold rounded-md text-xs">
            تمرين صفحة 20 (أستخدم الأرقام)
          </span>
          <h4 className="font-bold text-white text-sm md:text-base">
            محصلة القوى الكهربائية المؤثرة في الشحنة
          </h4>
        </div>
        <button
          onClick={() => setShowFullSolution(!showFullSolution)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          {showFullSolution ? 'إخفاء خطوات الحل' : 'عرض الحل النموذجي الكامل'}
        </button>
      </div>

      {/* Problem statement */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed">
        <strong className="text-cyan-300">نص المسألة:</strong> شحنة كهربائية تُؤثر فيها ثلاث قوى كهربائية على النحو الآتي:
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 font-mono text-xs">
          <div className="bg-slate-900 p-2 rounded border border-slate-800 text-red-300">
            F₁ = 200 N (جنوباً)
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-800 text-emerald-300">
            F₂ = 300 N (53° شمال الغرب)
          </div>
          <div className="bg-slate-900 p-2 rounded border border-slate-800 text-purple-300">
            F₃ = 500 N (غرباً)
          </div>
        </div>
        <div className="mt-2 text-amber-300 font-semibold">
          المطلوب: أجد مقدار محصلة القوى الكهربائية المؤثرة في الشحنة واتجاهها بيانياً.
        </div>
      </div>

      {/* Interactive Canvas & Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual Drawing */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-3 h-64 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415525_1px,transparent_1px),linear-gradient(to_bottom,#33415525_1px,transparent_1px)] bg-[size:25px_25px]" />

          <svg viewBox="0 0 380 200" className="w-full h-full">
            <defs>
              <marker id="ex-f1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
              </marker>
              <marker id="ex-f2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
              </marker>
              <marker id="ex-f3" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c084fc" />
              </marker>
              <marker id="ex-r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* Origin (320, 50) */}
            {/* F1: 200N south -> 2cm = 40px down -> (320, 90) */}
            <line x1="320" y1="50" x2="320" y2="90" stroke="#ef4444" strokeWidth="3" markerEnd="url(#ex-f1)" />
            <text x="325" y="75" fill="#f87171" fontSize="10" fontWeight="bold">F₁=2cm (200N)</text>

            {/* F2: 300N at 53° North of West -> 3cm = 60px -> dx = -60*cos(53°) = -36.1px, dy = -60*sin(53°) = -47.9px -> (284, 42) */}
            <line x1="320" y1="90" x2="284" y2="42" stroke="#10b981" strokeWidth="3" markerEnd="url(#ex-f2)" />
            <text x="305" y="55" fill="#34d399" fontSize="10" fontWeight="bold">F₂=3cm (300N)</text>

            {/* F3: 500N West -> 5cm = 100px West -> dx = -100px -> (184, 42) */}
            <line x1="284" y1="42" x2="184" y2="42" stroke="#c084fc" strokeWidth="3" markerEnd="url(#ex-f3)" />
            <text x="234" y="32" fill="#d8b4fe" fontSize="10" fontWeight="bold">F₃=5cm (500N)</text>

            {/* Resultant R from Origin (320, 50) to (184, 42) */}
            <line x1="320" y1="50" x2="184" y2="42" stroke="#f59e0b" strokeWidth="3.5" markerEnd="url(#ex-r)" />
            <text x="250" y="70" fill="#fbbf24" fontSize="11" fontWeight="bold">R ≈ 6.8 cm (680 N)</text>

            {/* Origin point */}
            <circle cx="320" cy="50" r="3" fill="#ffffff" />
            <text x="330" y="45" fill="#94a3b8" fontSize="9">نقطة البداية</text>
          </svg>
        </div>

        {/* Self Practice or Detailed Answer */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              تخمينك لمقدار المحصلة R (بالنيوتن):
            </span>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="مثلاً 680"
                value={userGuessMagnitude}
                onChange={(e) => setUserGuessMagnitude(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={checkAnswer}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shrink-0"
              >
                تحقق
              </button>
            </div>

            {feedback === 'correct' && (
              <div className="text-xs text-emerald-400 font-bold bg-emerald-950/50 p-2 rounded border border-emerald-800/60">
                ممتاز! إجابة صحيحة جداً (R ≈ 680 N).
              </div>
            )}
            {feedback === 'near' && (
              <div className="text-xs text-amber-400 font-bold bg-amber-950/50 p-2 rounded border border-amber-800/60">
                قريب جداً! القيمة الدقيقة هي حوالي 680 نيوتن.
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="text-xs text-rose-400 font-bold bg-rose-950/50 p-2 rounded border border-rose-800/60">
                حاول ثانية! استخدم مقياس الرسم 1cm : 100N.
              </div>
            )}
          </div>

          {showFullSolution && (
            <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/40 text-xs space-y-1.5 text-slate-300">
              <div className="text-emerald-300 font-bold">خطوات الحل التفصيلي:</div>
              <div>• مقياس الرسم: 1 cm : 100 N</div>
              <div>• طول سهم المحصلة المقاس بالمسطرة ≈ 6.8 cm</div>
              <div>• مقدار المحصلة: R = 6.8 × 100 = <strong className="text-white">680 N</strong></div>
              <div>• اتجاه المحصلة بالمنقلة: <strong className="text-white">θ ≈ 3.4° شمال الغرب (أو 176.6°)</strong></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
