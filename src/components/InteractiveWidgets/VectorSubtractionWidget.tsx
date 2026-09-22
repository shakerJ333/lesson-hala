import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, CheckCircle2, RefreshCw } from 'lucide-react';

export const VectorSubtractionWidget: React.FC = () => {
  const [showNegative, setShowNegative] = useState<boolean>(true);
  const [showAddition, setShowAddition] = useState<boolean>(true);
  const [showSubtraction, setShowSubtraction] = useState<boolean>(true);

  // Vector coordinates
  const originX = 60;
  const originY = 130;
  const vectorALen = 150;
  const ax = originX + vectorALen;
  const ay = originY;

  // Vector B (pointing upwards-right: +60px x, -70px y)
  const bx = 60;
  const by = -70;

  // Vector +B end position (tail at head of A)
  const bPlusEndX = ax + bx;
  const bPlusEndY = ay + by;

  // Vector -B end position (tail at head of A, reversed direction: +60px x, +70px y or inverted)
  // Negative B is (-bx, -by)
  const bMinusEndX = ax + bx;
  const bMinusEndY = ay - by; // flipped downwards

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <h4 className="font-bold text-red-300 text-base md:text-lg">
            طرح المتجهات ومعكوس المتجه: الشكل (15)
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddition(!showAddition)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              showAddition ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {showAddition ? 'إخفاء الجمع (A + B)' : 'إظهار الجمع (A + B)'}
          </button>
          <button
            onClick={() => setShowSubtraction(!showSubtraction)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              showSubtraction ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {showSubtraction ? 'إخفاء الطرح (A - B)' : 'إظهار الطرح (A - B)'}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-72 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:20px_20px]" />

        <svg viewBox="0 0 440 260" className="w-full h-full max-w-xl">
          <defs>
            <marker id="arr-blue-sub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
            </marker>
            <marker id="arr-purple-sub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c084fc" />
            </marker>
            <marker id="arr-orange-sub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f97316" />
            </marker>
            <marker id="arr-red-add" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>
            <marker id="arr-rose-sub" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
            </marker>
          </defs>

          {/* Vector A (Horizontal) */}
          <line
            x1={originX}
            y1={originY}
            x2={ax}
            y2={ay}
            stroke="#3b82f6"
            strokeWidth="3.5"
            markerEnd="url(#arr-blue-sub)"
          />
          <text x={(originX + ax) / 2} y={originY - 8} fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">
            المتجه A
          </text>

          {/* Positive Vector B (Upward) */}
          {showAddition && (
            <g>
              <line
                x1={ax}
                y1={ay}
                x2={bPlusEndX}
                y2={bPlusEndY}
                stroke="#c084fc"
                strokeWidth="3.5"
                markerEnd="url(#arr-purple-sub)"
              />
              <text x={bPlusEndX + 10} y={bPlusEndY + 10} fill="#d8b4fe" fontSize="12" fontWeight="bold">
                B
              </text>

              {/* Addition Resultant A + B */}
              <line
                x1={originX}
                y1={originY}
                x2={bPlusEndX}
                y2={bPlusEndY}
                stroke="#ef4444"
                strokeWidth="3.5"
                markerEnd="url(#arr-red-add)"
              />
              <text x={(originX + bPlusEndX) / 2 - 25} y={(originY + bPlusEndY) / 2 - 10} fill="#f87171" fontSize="13" fontWeight="bold">
                A + B
              </text>
            </g>
          )}

          {/* Negative Vector -B (Downward) */}
          {showSubtraction && (
            <g>
              <line
                x1={ax}
                y1={ay}
                x2={bMinusEndX}
                y2={bMinusEndY}
                stroke="#f97316"
                strokeWidth="3.5"
                markerEnd="url(#arr-orange-sub)"
              />
              <text x={bMinusEndX + 10} y={bMinusEndY} fill="#fb923c" fontSize="12" fontWeight="bold">
                -B (المعكوس)
              </text>

              {/* Subtraction Resultant A - B */}
              <line
                x1={originX}
                y1={originY}
                x2={bMinusEndX}
                y2={bMinusEndY}
                stroke="#f43f5e"
                strokeWidth="3.5"
                markerEnd="url(#arr-rose-sub)"
              />
              <text x={(originX + bMinusEndX) / 2 - 25} y={(originY + bMinusEndY) / 2 + 20} fill="#fb7185" fontSize="13" fontWeight="bold">
                A - B = A + (-B)
              </text>
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-3 flex flex-wrap gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-lg text-xs">
          <span className="text-purple-400 font-medium">B : المتجه الأصلي</span>
          <span className="text-orange-400 font-medium">-B : معكوس المتجه (180°)</span>
        </div>
      </div>

      {/* Concept Clarification Box */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
          <CheckCircle2 className="w-4 h-4 text-rose-400" />
          القاعدة الأساسية لطرح المتجهات:
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          إن عملية طرح المتجهات <strong className="text-white">A - B</strong> تكافئ تماماً عملية جمع المتجه الاول مع معكوس المتجه الثاني:
          <span className="inline-block mx-2 font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
            A - B = A + (-B)
          </span>
          حيث أن معكوس المتجه (-B) يمتلك نفس المقدار تماماً، ولكن زاويته تدور بمقدار 180° في الاتجاه المعاكس.
        </p>
      </div>
    </div>
  );
};
