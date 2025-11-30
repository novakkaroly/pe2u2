export interface TaskProps {
  isActive: boolean;
}

export interface QuestionResult {
  id: number;
  isCorrect: boolean | null; // null if not attempted
  userAnswer: string;
}

export interface MistakeItem {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  context?: string;
}

export type TabType = 'story1' | 'story2' | 'grammar' | 'vocab' | 'communication';