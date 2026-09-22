export interface VectorItem {
  id: string;
  name: string;
  symbol: string;
  magnitude: number; // in Newtons or cm
  angle: number; // in degrees (0 to 360, relative to positive X-axis)
  color: string;
  x?: number;
  y?: number;
  description?: string;
}

export interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  category: 'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate' | 'summary';
  categoryLabel: string;
  pageNumberRef: number;
  keyPoints: string[];
  mainConcept: string;
  formula?: string;
  speakerNotes: string;
  interactiveType?: 'comparison' | 'vectorAddition' | 'vectorSubtraction' | 'polygonMethod' | 'example7' | 'exercise' | 'quiz' | 'summary' | 'intro';
  diagramTitle?: string;
  quoteOrQuestion?: string;
  badgeText?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  relatedConcept: string;
}

export interface TeacherGuideItem {
  title: string;
  duration: string;
  objective: string;
  teacherRole: string;
  studentActivity: string;
  commonMisconceptions: string[];
  pedagogicalTip: string;
}
