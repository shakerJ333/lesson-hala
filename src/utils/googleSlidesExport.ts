import { SLIDES_DATA, LESSON_META } from '../data/lessonData';

declare global {
  interface Window {
    google?: any;
    gapi?: any;
  }
}

export interface GoogleSlidesExportResult {
  success: boolean;
  presentationId?: string;
  presentationUrl?: string;
  error?: string;
}

export async function createGoogleSlidesPresentation(
  accessToken: string,
  onProgress?: (msg: string) => void
): Promise<GoogleSlidesExportResult> {
  try {
    onProgress?.('جارٍ إنشاء ملف عرض Google Slides في حسابك...');

    // 1. Create new presentation
    const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: `${LESSON_META.lessonNumber}: ${LESSON_META.title} - فيزياء`
      })
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`فشل إنشاء العرض في Google Slides: ${errText}`);
    }

    const presData = await createRes.json();
    const presentationId = presData.presentationId;
    onProgress?.('تم إنشاء العرض بنجاح! جارٍ تنسيق وإضافة الشرائح والمحتوى...');

    // Build batch requests for all slides
    const requests: any[] = [];

    // The presentation already has 1 title slide. We can populate it and add subsequent slides.
    const existingSlideId = presData.slides?.[0]?.objectId;

    // Iterate through slides data and generate layout requests
    for (let i = 0; i < SLIDES_DATA.length; i++) {
      const slide = SLIDES_DATA[i];
      let slideId = `slide_${i + 1}`;

      if (i === 0 && existingSlideId) {
        slideId = existingSlideId;
      } else {
        requests.push({
          createSlide: {
            objectId: slideId,
            insertionIndex: i,
            slideLayoutReference: { predefinedLayout: 'BLANK' }
          }
        });
      }

      // 1. Add Title box
      const titleBoxId = `title_${i + 1}`;
      requests.push({
        createShape: {
          objectId: titleBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideId,
            size: { width: { magnitude: 650, unit: 'PT' }, height: { magnitude: 60, unit: 'PT' } },
            transform: { scaleX: 1, scaleY: 1, translateX: 35, translateY: 25, unit: 'PT' }
          }
        }
      });

      requests.push({
        insertText: {
          objectId: titleBoxId,
          text: `${slide.title}\n${slide.subtitle}`
        }
      });

      // 2. Add Key Points Box
      const bodyBoxId = `body_${i + 1}`;
      requests.push({
        createShape: {
          objectId: bodyBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideId,
            size: { width: { magnitude: 650, unit: 'PT' }, height: { magnitude: 270, unit: 'PT' } },
            transform: { scaleX: 1, scaleY: 1, translateX: 35, translateY: 100, unit: 'PT' }
          }
        }
      });

      const bodyContent = [
        `【 ${slide.categoryLabel} - صفحة ${slide.pageNumberRef} 】`,
        `\nالفكرة الرئيسة: ${slide.mainConcept}`,
        '\n\nأهم النقاط والتطبيقات:',
        ...slide.keyPoints.map(pt => `\n• ${pt}`),
        slide.formula ? `\n\nالقاعدة الرياضية: ${slide.formula}` : '',
        `\n\n[ملاحظات المعلم]: ${slide.speakerNotes}`
      ].join('');

      requests.push({
        insertText: {
          objectId: bodyBoxId,
          text: bodyContent
        }
      });
    }

    // Execute batchUpdate in chunks if needed
    if (requests.length > 0) {
      onProgress?.('جارٍ كتابة الشرائح وتنسيق النصوص...');
      const updateRes = await fetch(
        `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ requests })
        }
      );

      if (!updateRes.ok) {
        console.warn('Batch update returned status:', updateRes.status);
      }
    }

    const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;
    onProgress?.('اكتمل تجهيز العرض التقديمي بنجاح!');

    return {
      success: true,
      presentationId,
      presentationUrl
    };
  } catch (err: any) {
    console.error('Google Slides export error:', err);
    return {
      success: false,
      error: err.message || 'حدث خطأ أثناء تصدير العرض التقديمي'
    };
  }
}
