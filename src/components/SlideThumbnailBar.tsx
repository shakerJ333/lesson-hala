import React from 'react';
import { SLIDES_DATA } from '../data/lessonData';
import { Layers, Play, CheckCircle2 } from 'lucide-react';

interface SlideThumbnailBarProps {
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideThumbnailBar: React.FC<SlideThumbnailBarProps> = ({
  currentSlideIndex,
  onSelectSlide
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3 shadow-xl space-y-2">
      <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          فهرس شرائح العرض التقديمي (11 شريحة):
        </span>
        <span className="text-[11px] text-slate-400">اضغط على أي شريحة للانتقال السريع</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
        {SLIDES_DATA.map((slide, idx) => {
          const isActive = currentSlideIndex === idx;
          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(idx)}
              className={`group flex-shrink-0 w-44 text-right p-2.5 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                isActive
                  ? 'bg-slate-800 border-amber-400/80 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/30'
                  : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 group-hover:text-amber-300">
                  #{idx + 1}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                  ص {slide.pageNumberRef}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-200 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                {slide.title.replace('الدرس 2: ', '')}
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
