import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Compass, CheckCircle2, Play, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

export const Example7Widget: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showRuler, setShowRuler] = useState<boolean>(true);
  const [showProtractor, setShowProtractor] = useState<boolean>(true);

  // Coordinate system mapping (1 cm = 30 px, Origin at (240, 150))
  // Origin
  const ox = 240;
  const oy = 150;

  // F1: 30 N North -> 3 cm North -> dx = 0, dy = -3 * 30 = -90 px
  const f1_endX = ox;
  const f1_endY = oy - 90;

  // F2: 50 N at 37° North of West -> 5 cm at 180° - 37° = 143° (dx = -5 * cos(37°) * 30 = -120 px, dy = -5 * sin(37°) * 30 = -90 px)
  const f2_endX = f1_endX - 120;
  const f2_endY = f1_endY - 90;

  // F3: 70 N South -> 7 cm South -> dx = 0, dy = +7 * 30 = +210 px
  const f3_endX = f2_endX;
  const f3_endY = f2_endY + 210;

  // Resultant R: from (ox, oy) to (f3_endX, f3_endY) = from (240, 150) to (120, 180)
  // dx = -120 px (-4 cm), dy = +30 px (+1 cm) -> length = sqrt(120^2 + 30^2) = 123.7 px = 4.12 cm -> 41.2 N
  // angle with -x axis (West) = atan(30 / 120) = 14.04° South of West

  const stepsInfo = [
    {
      title: 'أ. اختيار مقياس الرسم المناسب',
      desc: 'المقياس: (1 cm : 10 N) -> طول F₁ = 3 cm، طول F₂ = 5 cm، طول F₃ = 7 cm.',
      stage: 'scale'
    },
    {
      title: 'ب.1. رسم المتجه الأول F₁',
      desc: 'رسم سهم القوة F₁ بطول 3 cm رأسياً للأعلى باتجاه الشمال (+y).',
      stage: 'f1'
    },
    {
      title: 'ب.2. رسم المتجه الثاني F₂ عند رأس F₁',
      desc: 'من رأس F₁ نرسم سهم F₂ بطول 5 cm وزاوية 37° شمال الغرب.',
      stage: 'f2'
    },
    {
      title: 'ب.3. رسم المتجه الثالث F₃ عند رأس F₂',
      desc: 'من رأس F₂ نرسم سهم F₃ بطول 7 cm رأسياً للأسفل باتجاه الجنوب (-y).',
      stage: 'f3'
    },
    {
      title: 'ج & د. رسم المحصلة R والقياس بالمسطرة والمنقلة',
      desc: 'نوصل سهماً من ذيل F₁ إلى رأس F₃. بالمسطرة: طول R = 4.1 cm (41 N)، وبالمنقلة: الزاوية θ = 14° جنوب الغرب.',
      stage: 'resultant'
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold rounded-md text-xs">
            المثال المحلول (7) - صفحة 20
          </span>
          <h4 className="font-bold text-white text-sm md:text-base">
            إيجاد محصلة 3 قوى بيانياً بطريقة المضلع
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRuler(!showRuler)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showRuler ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            {showRuler ? 'إخفاء المسطرة' : 'إظهار المسطرة'}
          </button>
          <button
            onClick={() => setShowProtractor(!showProtractor)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showProtractor ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {showProtractor ? 'إخفاء المنقلة' : 'إظهار المنقلة'}
          </button>
        </div>
      </div>

      {/* Interactive Grid Canvas */}
      <div className="relative bg-slate-950 border border-slate-800/90 rounded-xl p-4 h-84 flex items-center justify-center overflow-hidden">
        {/* Coordinate Grid Squares with cm markers */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415530_1px,transparent_1px),linear-gradient(to_bottom,#33415530_1px,transparent_1px)] bg-[size:30px_30px]" />

        <svg viewBox="0 0 460 300" className="w-full h-full max-w-xl">
          <defs>
            <marker id="ex7-f1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
            </marker>
            <marker id="ex7-f2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker id="ex7-f3" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c084fc" />
            </marker>
            <marker id="ex7-r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Coordinate Axes at Origin */}
          <line x1={ox - 180} y1={oy} x2={ox + 60} y2={oy} stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
          <line x1={ox} y1={oy - 120} x2={ox} y2={oy + 120} stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
          <text x={ox + 65} y={oy + 4} fill="#64748b" fontSize="10">الشرق (+x)</text>
          <text x={ox - 185} y={oy + 4} fill="#64748b" fontSize="10" textAnchor="end">الغرب (-x)</text>
          <text x={ox} y={oy - 125} fill="#64748b" fontSize="10" textAnchor="middle">الشمال (+y)</text>
          <text x={ox} y={oy + 135} fill="#64748b" fontSize="10" textAnchor="middle">الجنوب (-y)</text>

          {/* Origin Point */}
          <circle cx={ox} cy={oy} r="4" fill="#fbbf24" />
          <text x={ox + 10} y={oy + 14} fill="#fbbf24" fontSize="10" fontWeight="bold">نقطة البداية O</text>

          {/* Step 1: F1 vector (30N North) */}
          {activeStep >= 1 && (
            <g>
              <line x1={ox} y1={oy} x2={f1_endX} y2={f1_endY} stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#ex7-f1)" />
              <text x={ox + 15} y={(oy + f1_endY) / 2} fill="#38bdf8" fontSize="12" fontWeight="bold">
                F₁ = 30 N (3 cm)
              </text>
            </g>
          )}

          {/* Step 2: F2 vector (50N at 37° North of West) */}
          {activeStep >= 2 && (
            <g>
              {/* Dash horizontal guide from head of F1 */}
              <line x1={f1_endX - 130} y1={f1_endY} x2={f1_endX} y2={f1_endY} stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
              <line x1={f1_endX} y1={f1_endY} x2={f2_endX} y2={f2_endY} stroke="#10b981" strokeWidth="3.5" markerEnd="url(#ex7-f2)" />
              <text x={(f1_endX + f2_endX) / 2 - 10} y={(f1_endY + f2_endY) / 2 - 12} fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
                F₂ = 50 N (5 cm)
              </text>

              {/* Angle arc 37° */}
              {showProtractor && (
                <g>
                  <path d={`M ${f1_endX - 35} ${f1_endY} A 35 35 0 0 1 ${f1_endX - 28} ${f1_endY - 21}`} fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                  <text x={f1_endX - 48} y={f1_endY - 8} fill="#fbbf24" fontSize="10" fontWeight="bold">37°</text>
                </g>
              )}
            </g>
          )}

          {/* Step 3: F3 vector (70N South) */}
          {activeStep >= 3 && (
            <g>
              <line x1={f2_endX} y1={f2_endY} x2={f3_endX} y2={f3_endY} stroke="#c084fc" strokeWidth="3.5" markerEnd="url(#ex7-f3)" />
              <text x={f2_endX - 15} y={(f2_endY + f3_endY) / 2} fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="end">
                F₃ = 70 N (7 cm)
              </text>
            </g>
          )}

          {/* Step 4: Resultant R from Origin to Head of F3 */}
          {activeStep >= 4 && (
            <g>
              <line x1={ox} y1={oy} x2={f3_endX} y2={f3_endY} stroke="#ef4444" strokeWidth="4" markerEnd="url(#ex7-r)" />
              <text x={(ox + f3_endX) / 2} y={(oy + f3_endY) / 2 + 20} fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">
                المحصلة R = 41 N (4.1 cm)
              </text>

              {/* Protractor angle at origin */}
              {showProtractor && (
                <g>
                  <path d={`M ${ox - 40} ${oy} A 40 40 0 0 1 ${ox - 39} ${oy + 10}`} fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x={ox - 65} y={oy + 18} fill="#f59e0b" fontSize="11" fontWeight="bold">
                    θ = 14°
                  </text>
                </g>
              )}

              {/* Virtual Ruler Overlay if enabled */}
              {showRuler && (
                <g opacity="0.85">
                  <line x1={ox} y1={oy + 25} x2={f3_endX} y2={f3_endY + 25} stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                  <rect x={(ox + f3_endX) / 2 - 35} y={(oy + f3_endY) / 2 + 30} width="70" height="18" rx="4" fill="#0f172a" stroke="#38bdf8" />
                  <text x={(ox + f3_endX) / 2} y={(oy + f3_endY) / 2 + 43} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                    المسطرة: 4.1 cm
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>

        {/* Current Step Description Card */}
        <div className="absolute top-3 left-3 bg-slate-900/95 border border-slate-700 p-3 rounded-xl max-w-xs shadow-lg">
          <div className="text-amber-400 font-bold text-xs mb-1">
            {stepsInfo[activeStep].title}
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            {stepsInfo[activeStep].desc}
          </p>
        </div>
      </div>

      {/* Stepper Navigator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-bold rounded-lg transition-all"
          >
            السابق
          </button>
          {stepsInfo.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                activeStep === idx
                  ? 'bg-amber-400 text-slate-950 font-extrabold scale-110 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setActiveStep((prev) => Math.min(stepsInfo.length - 1, prev + 1))}
            disabled={activeStep === stepsInfo.length - 1}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1"
          >
            التالي
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
          النتيجة النهائية: R = 41 N ، والاتجاه θ = 14° جنوب الغرب
        </div>
      </div>
    </div>
  );
};
