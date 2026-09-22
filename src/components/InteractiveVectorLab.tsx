import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, RotateCw, Ruler, Compass, Sparkles, RefreshCw, Eye, Check } from 'lucide-react';
import { VectorItem } from '../types';

const INITIAL_VECTORS: VectorItem[] = [
  { id: '1', name: 'المتجه الأول', symbol: 'A', magnitude: 40, angle: 0, color: '#38bdf8' },
  { id: '2', name: 'المتجه الثاني', symbol: 'B', magnitude: 30, angle: 90, color: '#10b981' },
];

export const InteractiveVectorLab: React.FC = () => {
  const [vectors, setVectors] = useState<VectorItem[]>(INITIAL_VECTORS);
  const [isSnappedHeadToTail, setIsSnappedHeadToTail] = useState<boolean>(true);
  const [showRuler, setShowRuler] = useState<boolean>(true);
  const [showProtractor, setShowProtractor] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(2.5); // px per unit

  // Canvas center
  const cx = 220;
  const cy = 200;

  // Calculate Resultant vector R (sum of Rx and Ry)
  let sumRx = 0;
  let sumRy = 0;

  vectors.forEach((v) => {
    const rad = (v.angle * Math.PI) / 180;
    sumRx += v.magnitude * Math.cos(rad);
    sumRy += v.magnitude * Math.sin(rad);
  });

  const resultantMag = Math.sqrt(sumRx * sumRx + sumRy * sumRy);
  let resultantAngle = (Math.atan2(sumRy, sumRx) * 180) / Math.PI;
  if (resultantAngle < 0) resultantAngle += 360;

  // Add new vector
  const addVector = () => {
    if (vectors.length >= 5) return;
    const colors = ['#f59e0b', '#c084fc', '#ec4899', '#14b8a6'];
    const newId = String(Date.now());
    const nextSymbol = String.fromCharCode(65 + vectors.length);
    setVectors([
      ...vectors,
      {
        id: newId,
        name: `المتجه ${vectors.length + 1}`,
        symbol: nextSymbol,
        magnitude: 35,
        angle: 45,
        color: colors[vectors.length % colors.length]
      }
    ]);
  };

  const removeVector = (id: string) => {
    if (vectors.length <= 1) return;
    setVectors(vectors.filter((v) => v.id !== id));
  };

  const updateVector = (id: string, updates: Partial<VectorItem>) => {
    setVectors(vectors.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  // Build polygon chains
  let currentChainX = cx;
  let currentChainY = cy;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-7 shadow-2xl space-y-6">
      {/* Lab Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">
              مختبر المتجهات البياني التفاعلي (Vector Physics Lab)
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            صمم متجهاتك بحرية، اختبر طريقة المضلع (الذيل على الرأس)، وشاهد المحصلة R فورياً بالرسم والأرقام!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSnappedHeadToTail(!isSnappedHeadToTail)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isSnappedHeadToTail
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Check className="w-4 h-4" />
            {isSnappedHeadToTail ? 'طريقة المضلع (مفعّلة)' : 'متجهات متفرقة من نقطة الأصل'}
          </button>
          <button
            onClick={addVector}
            disabled={vectors.length >= 5}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" />
            إضافة متجه جديد
          </button>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 h-96 relative flex items-center justify-center overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415525_1px,transparent_1px),linear-gradient(to_bottom,#33415525_1px,transparent_1px)] bg-[size:25px_25px]" />

          <svg viewBox="0 0 440 400" className="w-full h-full">
            <defs>
              <marker id="lab-arrow-r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
              </marker>
            </defs>

            {/* Main Axes */}
            <line x1="20" y1={cy} x2="420" y2={cy} stroke="#334155" strokeWidth="1.5" />
            <line x1={cx} y1="20" x2={cx} y2="380" stroke="#334155" strokeWidth="1.5" />
            <text x="415" y={cy - 6} fill="#64748b" fontSize="10" textAnchor="end">+x (الشرق)</text>
            <text x="25" y={cy - 6} fill="#64748b" fontSize="10">-x (الغرب)</text>
            <text x={cx + 8} y="30" fill="#64748b" fontSize="10">+y (الشمال)</text>
            <text x={cx + 8} y="375" fill="#64748b" fontSize="10">-y (الجنوب)</text>

            {/* Origin Point */}
            <circle cx={cx} cy={cy} r="4" fill="#94a3b8" />

            {/* Render Vectors */}
            {vectors.map((vec, i) => {
              const startX = isSnappedHeadToTail ? currentChainX : cx;
              const startY = isSnappedHeadToTail ? currentChainY : cy;

              const rad = (vec.angle * Math.PI) / 180;
              const dx = vec.magnitude * scale * Math.cos(rad);
              const dy = -vec.magnitude * scale * Math.sin(rad); // negative because SVG y is downwards

              const endX = startX + dx;
              const endY = startY + dy;

              // Advance chain for next vector
              if (isSnappedHeadToTail) {
                currentChainX = endX;
                currentChainY = endY;
              }

              const markerId = `lab-arr-${vec.id}`;

              return (
                <g key={vec.id}>
                  <defs>
                    <marker id={markerId} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={vec.color} />
                    </marker>
                  </defs>
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={vec.color}
                    strokeWidth="3.5"
                    markerEnd={`url(#${markerId})`}
                  />
                  <text
                    x={(startX + endX) / 2 + 10}
                    y={(startY + endY) / 2 - 8}
                    fill={vec.color}
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {vec.symbol} ({vec.magnitude} N, {vec.angle}°)
                  </text>
                </g>
              );
            })}

            {/* Resultant Vector R (From Origin cx,cy to end of chain) */}
            {vectors.length > 0 && isSnappedHeadToTail && (
              <g>
                <line
                  x1={cx}
                  y1={cy}
                  x2={currentChainX}
                  y2={currentChainY}
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeDasharray="6,3"
                  markerEnd="url(#lab-arrow-r)"
                />
                <text
                  x={(cx + currentChainX) / 2 - 20}
                  y={(cy + currentChainY) / 2 + 18}
                  fill="#f87171"
                  fontSize="13"
                  fontWeight="black"
                >
                  المحصلة R⃗
                </text>
              </g>
            )}
          </svg>

          {/* Quick Stats Overlay */}
          <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl shadow-lg space-y-1 text-xs">
            <div className="text-amber-400 font-bold">قيم المحصلة الكلية (R):</div>
            <div className="text-emerald-400 font-mono font-bold">
              المقدار: {resultantMag.toFixed(1)} N
            </div>
            <div className="text-sky-400 font-mono font-bold">
              الاتجاه: {resultantAngle.toFixed(1)}°
            </div>
          </div>
        </div>

        {/* Vector Controls & Sliders */}
        <div className="lg:col-span-5 space-y-3 overflow-y-auto max-h-96 pr-1">
          {vectors.map((vec, idx) => (
            <div
              key={vec.id}
              className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2.5 transition-all"
              style={{ borderRightWidth: '4px', borderRightColor: vec.color }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: vec.color }}
                  />
                  <span className="font-bold text-white text-xs">
                    {vec.name} ({vec.symbol})
                  </span>
                </div>
                {vectors.length > 1 && (
                  <button
                    onClick={() => removeVector(vec.id)}
                    className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                    title="حذف المتجه"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Magnitude Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>المقدار:</span>
                  <span className="text-white font-mono font-bold">{vec.magnitude} N</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={vec.magnitude}
                  onChange={(e) => updateVector(vec.id, { magnitude: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-blue-500"
                />
              </div>

              {/* Angle Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>الزاوية مع المحور السيني (+x):</span>
                  <span className="text-amber-400 font-mono font-bold">{vec.angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={vec.angle}
                  onChange={(e) => updateVector(vec.id, { angle: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => setVectors(INITIAL_VECTORS)}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            إعادة ضبط المتجهات
          </button>
        </div>
      </div>
    </div>
  );
};
