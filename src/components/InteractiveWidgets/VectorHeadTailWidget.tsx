import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, ArrowLeftRight, Check, Eye } from 'lucide-react';

export const VectorHeadTailWidget: React.FC = () => {
  const [step, setStep] = useState<number>(0); // 0: initial separated, 1: translate B to head of A, 2: draw resultant R
  const [vectorALength, setVectorALength] = useState<number>(140);
  const [vectorBLength, setVectorBLength] = useState<number>(100);
  const [vectorBAngle, setVectorBAngle] = useState<number>(60); // degrees up from +x

  // Vector A starts at origin (40, 140), extends right by vectorALength to (40+vectorALength, 140)
  const originX = 50;
  const originY = 160;

  const ax = originX + vectorALength;
  const ay = originY;

  // Vector B isolated position (in step 0)
  const bIsoStartX = 230;
  const bIsoStartY = 160;
  const bIsoEndX = bIsoStartX + vectorBLength * Math.cos((vectorBAngle * Math.PI) / 180);
  const bIsoEndY = bIsoStartY - vectorBLength * Math.sin((vectorBAngle * Math.PI) / 180);

  // Vector B placed at head of A (in step 1 & 2)
  const bTranslatedEndX = ax + vectorBLength * Math.cos((vectorBAngle * Math.PI) / 180);
  const bTranslatedEndY = ay - vectorBLength * Math.sin((vectorBAngle * Math.PI) / 180);

  // Resultant length & angle
  const rx = bTranslatedEndX - originX;
  const ry = originY - bTranslatedEndY;
  const rMag = Math.sqrt(rx * rx + ry * ry);
  const rAngleDeg = (Math.atan2(ry, rx) * 180) / Math.PI;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
          <h4 className="font-bold text-blue-300 text-base md:text-lg">
            التمثيل البياني لجمع المتجهين: الشكل (14) - طريقة الذيل على الرأس
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(0)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              step === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            الشكل (14/أ): المتجهان منفصلان
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            الشكل (14/ب): ناتج الجمع (A + B)
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-72 flex items-center justify-center overflow-hidden">
        {/* Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:20px_20px]" />

        <svg viewBox="0 0 440 220" className="w-full h-full max-w-xl">
          <defs>
            <marker id="arr-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
            </marker>
            <marker id="arr-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c084fc" />
            </marker>
            <marker id="arr-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* Vector A (Always at origin, horizontal) */}
          <line
            x1={originX}
            y1={originY}
            x2={ax}
            y2={ay}
            stroke="#3b82f6"
            strokeWidth="3.5"
            markerEnd="url(#arr-blue)"
          />
          <text
            x={(originX + ax) / 2}
            y={originY + 20}
            fill="#60a5fa"
            fontSize="13"
            fontWeight="bold"
            textAnchor="middle"
          >
            المتجه A
          </text>

          {/* Step 0: Isolated Vector B */}
          {step === 0 && (
            <g>
              <line
                x1={bIsoStartX}
                y1={bIsoStartY}
                x2={bIsoEndX}
                y2={bIsoEndY}
                stroke="#c084fc"
                strokeWidth="3.5"
                markerEnd="url(#arr-purple)"
              />
              <text
                x={(bIsoStartX + bIsoEndX) / 2 - 15}
                y={(bIsoStartY + bIsoEndY) / 2 - 8}
                fill="#d8b4fe"
                fontSize="13"
                fontWeight="bold"
              >
                المتجه B
              </text>
              <text x="220" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">
                (أ) المتجهان A و B قبل إجراء عملية الجمع
              </text>
            </g>
          )}

          {/* Step 1 & 2: Translated Vector B (Tail at Head of A) */}
          {step >= 1 && (
            <g>
              <line
                x1={ax}
                y1={ay}
                x2={bTranslatedEndX}
                y2={bTranslatedEndY}
                stroke="#c084fc"
                strokeWidth="3.5"
                markerEnd="url(#arr-purple)"
              />
              <text
                x={(ax + bTranslatedEndX) / 2 + 15}
                y={(ay + bTranslatedEndY) / 2}
                fill="#d8b4fe"
                fontSize="13"
                fontWeight="bold"
              >
                المتجه B
              </text>
            </g>
          )}

          {/* Step 2: Resultant Vector A + B */}
          {step === 2 && (
            <g>
              <line
                x1={originX}
                y1={originY}
                x2={bTranslatedEndX}
                y2={bTranslatedEndY}
                stroke="#ef4444"
                strokeWidth="4"
                markerEnd="url(#arr-red)"
              />
              <text
                x={(originX + bTranslatedEndX) / 2 - 20}
                y={(originY + bTranslatedEndY) / 2 - 12}
                fill="#f87171"
                fontSize="14"
                fontWeight="bold"
              >
                المحصلة (A + B)
              </text>
              <text x="220" y="205" fill="#94a3b8" fontSize="11" textAnchor="middle">
                (ب) وضع ذيل المتجه B عند رأس المتجه A ورسم المحصلة من ذيل A إلى رأس B
              </text>
            </g>
          )}
        </svg>

        {/* Floating Step Info Pill */}
        <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
          <span className="text-amber-400 font-bold">الخطوة {step + 1} من 3:</span>
          <span className="text-slate-200">
            {step === 0
              ? 'المتجهان A و B كل منهما في موقعه'
              : step === 1
              ? 'نقل المتجه B ليقع ذيله عند رأس المتجه A مع الحفاظ على مقداره واتجاهه'
              : 'رسم سهم المحصلة (A + B) من ذيل الأول (A) إلى رأس الأخير (B)'}
          </span>
        </div>
      </div>

      {/* Step Navigation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-lg transition-all"
          >
            الخطوة السابقة
          </button>
          <button
            onClick={() => setStep((prev) => Math.min(2, prev + 1))}
            disabled={step === 2}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
          >
            الخطوة التالية
            <Play className="w-3 h-3 fill-white" />
          </button>
          <button
            onClick={() => setStep(0)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
            title="إعادة تشغيل الخطوات"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Formula Display */}
        <div className="flex items-center gap-3 text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-slate-400 font-mono">القاعدة:</span>
          <span className="text-red-400 font-bold font-mono">R⃗ = A⃗ + B⃗</span>
        </div>
      </div>
    </div>
  );
};
