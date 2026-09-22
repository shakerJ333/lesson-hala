import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Check, Sparkles } from 'lucide-react';

export const PolygonMethodWidget: React.FC = () => {
  const [step, setStep] = useState<number>(0); // 0: separated vectors, 1: vector 1 drawn, 2: vector 2 added, 3: vector 3 added, 4: Resultant R drawn

  // Coordinates for 3 vectors in polygon method (Figure 16)
  // Origin
  const originX = 70;
  const originY = 190;

  // Vector 1 (Horizontal to right: dx=120, dy=0)
  const v1EndX = originX + 120;
  const v1EndY = originY;

  // Vector 2 (Upwards-right: dx=50, dy=-90)
  const v2EndX = v1EndX + 50;
  const v2EndY = v1EndY - 90;

  // Vector 3 (Upwards-left: dx=-130, dy=-50)
  const v3EndX = v2EndX - 130;
  const v3EndY = v2EndY - 50;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
          <h4 className="font-bold text-emerald-300 text-base md:text-lg">
            طريقة المُضَلَّع لإيجاد محصلة متجهات عدة: الشكل (16)
          </h4>
        </div>
        <div className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-lg">
          {step === 0 && 'الحالة (أ): المتجهات الثلاثة منفصلة'}
          {step === 1 && 'الخطوة 1: رسم المتجه الأول (1)'}
          {step === 2 && 'الخطوة 2: نقل المتجه (2) لذيل على رأس (1)'}
          {step === 3 && 'الخطوة 3: نقل المتجه (3) لذيل على رأس (2)'}
          {step === 4 && 'الحالة (ج): رسم سهم المحصلة R وقياس الزاوية θ'}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:20px_20px]" />

        <svg viewBox="0 0 460 260" className="w-full h-full max-w-xl">
          <defs>
            <marker id="arr-poly-1" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
            </marker>
            <marker id="arr-poly-2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
            <marker id="arr-poly-3" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c084fc" />
            </marker>
            <marker id="arr-poly-r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Step 0: Separate representation (Figure 16/a) */}
          {step === 0 && (
            <g>
              {/* Isolated Vector 1 */}
              <line x1="80" y1="200" x2="200" y2="200" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arr-poly-1)" />
              <text x="140" y="220" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">المتجه 1</text>

              {/* Isolated Vector 2 */}
              <line x1="280" y1="180" x2="330" y2="90" stroke="#10b981" strokeWidth="3" markerEnd="url(#arr-poly-2)" />
              <text x="325" y="145" fill="#10b981" fontSize="12" fontWeight="bold">المتجه 2</text>

              {/* Isolated Vector 3 */}
              <line x1="240" y1="80" x2="110" y2="30" stroke="#c084fc" strokeWidth="3" markerEnd="url(#arr-poly-3)" />
              <text x="175" y="45" fill="#c084fc" fontSize="12" fontWeight="bold">المتجه 3</text>
            </g>
          )}

          {/* Step >= 1: Vector 1 placed */}
          {step >= 1 && (
            <g>
              <line x1={originX} y1={originY} x2={v1EndX} y2={v1EndY} stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#arr-poly-1)" />
              <text x={(originX + v1EndX) / 2} y={originY + 20} fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">المتجه 1</text>
            </g>
          )}

          {/* Step >= 2: Vector 2 placed at head of Vector 1 */}
          {step >= 2 && (
            <g>
              <line x1={v1EndX} y1={v1EndY} x2={v2EndX} y2={v2EndY} stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arr-poly-2)" />
              <text x={(v1EndX + v2EndX) / 2 + 20} y={(v1EndY + v2EndY) / 2} fill="#10b981" fontSize="12" fontWeight="bold">المتجه 2</text>
            </g>
          )}

          {/* Step >= 3: Vector 3 placed at head of Vector 2 */}
          {step >= 3 && (
            <g>
              <line x1={v2EndX} y1={v2EndY} x2={v3EndX} y2={v3EndY} stroke="#c084fc" strokeWidth="3.5" markerEnd="url(#arr-poly-3)" />
              <text x={(v2EndX + v3EndX) / 2} y={(v2EndY + v3EndY) / 2 - 12} fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">المتجه 3</text>
            </g>
          )}

          {/* Step 4: Resultant Vector R closing the polygon from Origin to end of Vector 3 */}
          {step === 4 && (
            <g>
              <line x1={originX} y1={originY} x2={v3EndX} y2={v3EndY} stroke="#ef4444" strokeWidth="4" markerEnd="url(#arr-poly-r)" />
              <text x={(originX + v3EndX) / 2 - 25} y={(originY + v3EndY) / 2} fill="#ef4444" fontSize="14" fontWeight="bold">
                المحصلة R
              </text>

              {/* Angle Arc θ at origin */}
              <path
                d={`M ${originX + 30} ${originY} A 30 30 0 0 0 ${originX + 18} ${originY - 24}`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <text x={originX + 32} y={originY - 12} fill="#fbbf24" fontSize="12" fontWeight="bold">θ</text>
            </g>
          )}
        </svg>

        {/* Step Guide Banner */}
        <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs max-w-sm">
          <p className="text-slate-300">
            {step === 0 && 'المتجهات المعطاة يراد إيجاد محصلتها R = A + B + C بيانياً.'}
            {step === 1 && '1. نرسم المتجه الأول (1) من نقطة الأصل بمقياس رسم محدد.'}
            {step === 2 && '2. ننقل المتجه الثاني (2) بحيث يقع ذيله عند رأس المتجه الأول.'}
            {step === 3 && '3. ننقل المتجه الثالث (3) بحيث يقع ذيله عند رأس المتجه الثاني.'}
            {step === 4 && '4. نرسم سهم المحصلة R من ذيل المتجه الأول إلى رأس المتجه الأخير (المضلع يغلق بالكامل).'}
          </p>
        </div>
      </div>

      {/* Stepper Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-lg transition-all"
          >
            السابق
          </button>
          {[0, 1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                step === s ? 'bg-emerald-500 text-slate-950 scale-110 shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {s === 0 ? 'أ' : s}
            </button>
          ))}
          <button
            onClick={() => setStep((prev) => Math.min(4, prev + 1))}
            disabled={step === 4}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
          >
            التالي
            <Play className="w-3 h-3 fill-white" />
          </button>
        </div>

        <div className="text-xs text-amber-300 font-mono font-bold bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/40">
          R⃗ = A⃗ + B⃗ + C⃗
        </div>
      </div>
    </div>
  );
};
