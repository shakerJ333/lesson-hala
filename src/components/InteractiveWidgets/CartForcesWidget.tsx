import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCw, Play, RefreshCw, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CartForcesWidget: React.FC = () => {
  const [angle, setAngle] = useState<number>(53);
  const [force1, setForce1] = useState<number>(200);
  const [force2, setForce2] = useState<number>(200);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'compare' | 'angleSlider'>('compare');

  // Calculate Resultant Force: R = sqrt(F1^2 + F2^2 + 2*F1*F2*cos(angle))
  const rad = (angle * Math.PI) / 180;
  const resultantForce = Math.sqrt(
    force1 * force1 + force2 * force2 + 2 * force1 * force2 * Math.cos(rad)
  );

  // Resultant angle relative to F1
  const resultantAngleRad = Math.atan2(
    force2 * Math.sin(rad),
    force1 + force2 * Math.cos(rad)
  );
  const resultantAngleDeg = (resultantAngleRad * 180) / Math.PI;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 shadow-xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
          <h4 className="font-bold text-amber-300 text-base md:text-lg">
            محاكاة تجربة جر العربة: الشكل (13) من الكتاب المدرسي
          </h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTab('compare');
              setAngle(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'compare' && angle === 0
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            الشكل (13/أ): اتجاه متطابق (0°)
          </button>
          <button
            onClick={() => {
              setActiveTab('compare');
              setAngle(53);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'compare' && angle === 53
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            الشكل (13/ب): زاوية 53°
          </button>
          <button
            onClick={() => setActiveTab('angleSlider')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'angleSlider'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            تحكم حر في الزاوية
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="relative bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-64 md:h-72 flex items-center justify-center overflow-hidden">
        {/* Coordinate Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* SVG Visualization */}
        <svg viewBox="-50 -120 400 240" className="w-full h-full max-w-xl">
          <defs>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Cart Base */}
          <g transform={`translate(${isSimulating ? (resultantForce / 400) * 80 : 0}, 0)`} className="transition-transform duration-700">
            {/* Wheels */}
            <circle cx="20" cy="40" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="20" cy="40" r="4" fill="#e2e8f0" />
            <circle cx="70" cy="40" r="14" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="70" cy="40" r="4" fill="#e2e8f0" />

            {/* Cart Box */}
            <rect x="0" y="-20" width="90" height="48" rx="6" fill="#475569" stroke="#64748b" strokeWidth="2" />
            <rect x="5" y="-15" width="80" height="20" fill="#334155" rx="3" />
            <text x="45" y="-3" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
              العربة (كتلة m)
            </text>

            {/* Tow hook point */}
            <circle cx="90" cy="5" r="4" fill="#f59e0b" />

            {/* Force 1 (Red Vector - Horizontal) */}
            <line
              x1="90"
              y1="0"
              x2={90 + (force1 / 200) * 110}
              y2="0"
              stroke="#ef4444"
              strokeWidth="3.5"
              markerEnd="url(#arrow-red)"
            />
            <text
              x={90 + (force1 / 200) * 55}
              y="-8"
              fill="#f87171"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              F₁ = {force1} N
            </text>

            {/* Force 2 (Blue Vector - at angle) */}
            <line
              x1="90"
              y1="10"
              x2={90 + (force2 / 200) * 110 * Math.cos((angle * Math.PI) / 180)}
              y2={10 + (force2 / 200) * 110 * Math.sin((angle * Math.PI) / 180)}
              stroke="#38bdf8"
              strokeWidth="3.5"
              markerEnd="url(#arrow-blue)"
            />
            <text
              x={90 + ((force2 / 200) * 110 * Math.cos((angle * Math.PI) / 180)) / 2 + 15}
              y={10 + ((force2 / 200) * 110 * Math.sin((angle * Math.PI) / 180)) / 2 + 16}
              fill="#7dd3fc"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              F₂ = {force2} N ({angle}°)
            </text>

            {/* Angle Arc if angle > 5 */}
            {angle > 5 && (
              <path
                d={`M 130 5 A 40 40 0 0 1 ${90 + 40 * Math.cos(rad)} ${5 + 40 * Math.sin(rad)}`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
            )}
            {angle > 5 && (
              <text x="140" y="22" fill="#fbbf24" fontSize="10" fontWeight="bold">
                {angle}°
              </text>
            )}

            {/* Resultant Vector (Green dashed arrow) */}
            <line
              x1="90"
              y1="5"
              x2={90 + (resultantForce / 200) * 110 * Math.cos(resultantAngleRad)}
              y2={5 + (resultantForce / 200) * 110 * Math.sin(resultantAngleRad)}
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray={angle === 0 ? 'none' : '4,2'}
              markerEnd="url(#arrow-green)"
            />
            <text
              x={90 + (resultantForce / 200) * 110 * Math.cos(resultantAngleRad) + 10}
              y={5 + (resultantForce / 200) * 110 * Math.sin(resultantAngleRad) - 5}
              fill="#34d399"
              fontSize="12"
              fontWeight="bold"
            >
              المحصلة R = {resultantForce.toFixed(1)} N
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-3 flex flex-wrap gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
          <span className="flex items-center gap-1 text-red-400 font-semibold">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full" /> القوة F₁
          </span>
          <span className="flex items-center gap-1 text-sky-400 font-semibold">
            <span className="w-2.5 h-2.5 bg-sky-400 rounded-full" /> القوة F₂
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> المحصلة R
          </span>
        </div>
      </div>

      {/* Controls & Angle Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">الزاوية بين القوتين (θ):</span>
            <span className="text-amber-400 font-mono font-bold text-sm bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
              {angle}°
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0° (نفس الاتجاه: 400N)</span>
            <span>90° (تعامد: 283N)</span>
            <span>180° (اتجاهان متعاكسان: 0N)</span>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-300">مقارنة النتيجة مع الجمع الجبري:</span>
            <div className="text-left">
              <span className="text-emerald-400 font-bold text-sm">
                R = {resultantForce.toFixed(1)} N
              </span>
              <span className="text-slate-500 text-xs mr-2">
                (جبرياً: {force1 + force2} N)
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsSimulating(true);
                setTimeout(() => setIsSimulating(false), 1200);
              }}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              اختبار تأثير الجر الفعلي
            </button>
            <button
              onClick={() => {
                setAngle(53);
                setForce1(200);
                setForce2(200);
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
              title="إعادة ضبط"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Physics Takeaway Box */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">الاستنتاج البيداغوجي الأساسي:</strong>{' '}
          {angle === 0 ? (
            <span>عندما تكون القوتان في نفس الاتجاه تماماً (0°)، فإن الجمع المتجهي يتطابق مع الجمع الجبري: 200 + 200 = 400 N.</span>
          ) : angle === 180 ? (
            <span>عندما تكون القوتان متعاكستين تماماً (180°)، تلغي كل منهما الأخرى وتكون المحصلة = 0 N (اتزان).</span>
          ) : (
            <span>
              عند الزاوية {angle}°، مقدار المحصلة ({resultantForce.toFixed(1)} N) أقل من 400 N، لأن جزءاً من قوة كل رجل يضيع في الاتجاه الجانبي بدلاً من سحب العربة للأمام!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
