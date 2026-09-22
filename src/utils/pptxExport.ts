import pptxgen from 'pptxgenjs';
import { SLIDES_DATA, LESSON_META } from '../data/lessonData';

export async function exportToPowerPoint(): Promise<void> {
  const pptx = new pptxgen();

  // Set presentation properties
  pptx.layout = 'LAYOUT_WIDE'; // 16:9 widescreen
  pptx.author = 'خبير التصميم التعليمي في الفيزياء';
  pptx.company = 'منهاج الفيزياء المدرسي';
  pptx.title = `${LESSON_META.lessonNumber}: ${LESSON_META.title}`;
  pptx.subject = 'شرح درس جمع المتجهات وطرحها بالطريقة البيانية وطريقة المضلع';

  // Palette constants (Elegant Educational Physics Theme)
  const COLOR_BG_DARK = '0B132B';
  const COLOR_BG_SLATE = '1C2541';
  const COLOR_PRIMARY = '3A86FF';
  const COLOR_ACCENT = 'FFB703';
  const COLOR_GREEN = '06D6A0';
  const COLOR_TEXT_LIGHT = 'F8F9FA';
  const COLOR_TEXT_MUTED = 'A0AEC0';
  const COLOR_CARD_BG = '151E3F';
  const FONT_ARABIC = 'Cairo';

  SLIDES_DATA.forEach((slideData, idx) => {
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_BG_DARK };

    // Slide Header / Top Banner
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6,
      y: 0.4,
      w: 12.13,
      h: 0.9,
      fill: { color: COLOR_BG_SLATE },
      line: { color: COLOR_PRIMARY, width: 1.5 },
      rectRadius: 0.1
    });

    // Header Category Badge
    slide.addText(`【 ${slideData.categoryLabel} 】- صفحة الكتاب: ${slideData.pageNumberRef}`, {
      x: 0.8,
      y: 0.45,
      w: 4.5,
      h: 0.35,
      fontSize: 11,
      fontFace: FONT_ARABIC,
      color: COLOR_ACCENT,
      bold: true,
      align: 'left'
    });

    // Slide Title
    slide.addText(slideData.title, {
      x: 5.5,
      y: 0.45,
      w: 7.0,
      h: 0.4,
      fontSize: 16,
      fontFace: FONT_ARABIC,
      color: COLOR_TEXT_LIGHT,
      bold: true,
      align: 'right'
    });

    // Slide Subtitle
    slide.addText(slideData.subtitle, {
      x: 0.8,
      y: 0.85,
      w: 11.7,
      h: 0.35,
      fontSize: 12,
      fontFace: FONT_ARABIC,
      color: COLOR_TEXT_MUTED,
      align: 'right'
    });

    // Main Card / Concept Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.6,
      y: 1.45,
      w: 12.13,
      h: 1.05,
      fill: { color: COLOR_CARD_BG },
      line: { color: COLOR_ACCENT, width: 1 },
      rectRadius: 0.08
    });

    slide.addText(slideData.mainConcept, {
      x: 0.8,
      y: 1.55,
      w: 11.73,
      h: 0.85,
      fontSize: 13,
      fontFace: FONT_ARABIC,
      color: COLOR_TEXT_LIGHT,
      bold: true,
      align: 'right'
    });

    // Left Column: Key Points
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 4.8,
      y: 2.65,
      w: 7.93,
      h: 4.1,
      fill: { color: COLOR_BG_SLATE },
      line: { color: '2D3748', width: 1 },
      rectRadius: 0.08
    });

    slide.addText('أهم الأفكار والمفاهيم المعرفية والعملية:', {
      x: 5.0,
      y: 2.8,
      w: 7.53,
      h: 0.35,
      fontSize: 13,
      fontFace: FONT_ARABIC,
      color: COLOR_PRIMARY,
      bold: true,
      align: 'right'
    });

    const bulletItems = slideData.keyPoints.map(point => ({
      text: point,
      options: {
        fontSize: 12,
        fontFace: FONT_ARABIC,
        color: COLOR_TEXT_LIGHT,
        breakLine: true,
        bullet: { type: 'bullet' as const, characterCode: '25AA' },
        align: 'right' as const
      }
    }));

    slide.addText(bulletItems, {
      x: 5.0,
      y: 3.25,
      w: 7.53,
      h: 3.3,
      paraSpaceAfter: 8
    });

    // Right Column: Formula & Pedagogical Callout / Summary
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.6,
      y: 2.65,
      w: 4.0,
      h: 4.1,
      fill: { color: '101A30' },
      line: { color: COLOR_PRIMARY, width: 1 },
      rectRadius: 0.08
    });

    slide.addText('القاعدة / التطبيق الرياضي', {
      x: 0.8,
      y: 2.8,
      w: 3.6,
      h: 0.35,
      fontSize: 13,
      fontFace: FONT_ARABIC,
      color: COLOR_ACCENT,
      bold: true,
      align: 'center'
    });

    if (slideData.formula) {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y: 3.3,
        w: 3.6,
        h: 1.1,
        fill: { color: '0A101D' },
        line: { color: COLOR_GREEN, width: 1.5 },
        rectRadius: 0.05
      });

      slide.addText(slideData.formula, {
        x: 0.9,
        y: 3.45,
        w: 3.4,
        h: 0.8,
        fontSize: 14,
        fontFace: 'Courier New',
        color: COLOR_GREEN,
        bold: true,
        align: 'center'
      });
    }

    if (slideData.quoteOrQuestion) {
      slide.addText(slideData.quoteOrQuestion, {
        x: 0.8,
        y: slideData.formula ? 4.55 : 3.3,
        w: 3.6,
        h: 1.9,
        fontSize: 11,
        fontFace: FONT_ARABIC,
        color: 'E2E8F0',
        italic: true,
        align: 'right'
      });
    } else {
      slide.addText('توجيه تربوي:\nاحرص على استخدام المسطرة والمنقلة على شبكة الرسم البياني بدقة للحصول على محصلة دقيقة بيانيا ورياضيا.', {
        x: 0.8,
        y: slideData.formula ? 4.55 : 3.3,
        w: 3.6,
        h: 1.9,
        fontSize: 11,
        fontFace: FONT_ARABIC,
        color: COLOR_TEXT_MUTED,
        align: 'right'
      });
    }

    // Footer
    slide.addText(`الفيزياء المدرسية | ${LESSON_META.title} | الشريحة ${idx + 1} من ${SLIDES_DATA.length}`, {
      x: 0.6,
      y: 6.9,
      w: 12.13,
      h: 0.3,
      fontSize: 10,
      fontFace: FONT_ARABIC,
      color: '718096',
      align: 'center'
    });

    // Speaker Notes (Embedded into PowerPoint notes view!)
    slide.addNotes(`[ملاحظات المعلم / المتحدث للتقديم]:\n${slideData.speakerNotes}`);
  });

  // Save the presentation
  await pptx.writeFile({ fileName: `درس_جمع_المتجهات_وطرحها_الفيزياء.pptx` });
}
