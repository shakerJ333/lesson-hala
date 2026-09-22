import React from 'react';
import { LESSON_META, SLIDES_DATA } from '../data/lessonData';
import { Printer, BookOpen, CheckCircle2 } from 'lucide-react';

export const PrintableWorksheet: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            بطاقة المراجعة والملخص الشامل للدرس (للطباعة والحفظ)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ملخص بيداغوجي مكثف يجمع القوانين والمفاهيم والأشكال الهندسية لدرس جمع وطرح المتجهات
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
        >
          <Printer className="w-4 h-4" />
          طباعة الملخص / حفظ PDF
        </button>
      </div>

      {/* Printable Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-amber-300 text-sm">1. القواعد الذهبية لجمع المتجهات:</h4>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
            <li>الكميات القياسية تُجمع جبرياً (مثل الزمن والكتلة).</li>
            <li>الكميات المتجهة لا تُجمع جبرياً إلا إذا كانت في نفس الاتجاه تماماً (θ = 0°).</li>
            <li>عند وجود زاوية بين متجهين، نستخدم الجمع البياني بطريقة نقل المتجهات (ذيل على رأس).</li>
          </ul>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-rose-300 text-sm">2. طرح المتجهات ومعكوس المتجه:</h4>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
            <li>طرح المتجه هو جمع مع معكوسه: <strong className="text-white font-mono">A - B = A + (-B)</strong>.</li>
            <li>المتجه المعكوس (-B) له نفس طول B ويعاكسه في الاتجاه بزاوية 180°.</li>
            <li>لطرح المتجه E من D: نرسم D، ثم من رأسه نرسم (-E)، وسهم المحصلة يصل من ذيل D لرأس (-E).</li>
          </ul>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-emerald-300 text-sm">3. طريقة المضلع (Polygon Method):</h4>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
            <li>اختيار مقياس رسم مناسب (مثل 1cm : 10N).</li>
            <li>رسم المتجه الأول، ثم وضع ذيل المتجه الثاني عند رأس الأول، وهكذا تباعاً.</li>
            <li>متجه المحصلة R ينطلق دائماً من ذيل المتجه الأول إلى رأس المتجه الأخير.</li>
            <li>قياس طول R بالمسطرة، وقياس زاوية الاتجاه θ بالمنقلة.</li>
          </ul>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-sky-300 text-sm">4. خلاصة المثال 7 والتمرين (ص 20):</h4>
          <ul className="space-y-1.5 list-disc list-inside text-slate-300">
            <li>المثال 7: المحصلة <strong className="text-white">R = 41 N</strong>، والاتجاه <strong className="text-white">θ = 14° جنوب الغرب</strong>.</li>
            <li>تمرين الشحنة: المحصلة <strong className="text-white">R ≈ 680 N</strong>، والاتجاه <strong className="text-white">θ ≈ 3.4° شمال الغرب</strong>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
