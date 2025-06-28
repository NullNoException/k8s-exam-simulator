export interface Question {
  text: string;
  setup: string;
  solution: string;
  validation: string;
  expectedValidationOutput: string;
  userAnswer: string;
  status: 'unanswered' | 'correct' | 'incorrect';
  feedback?: string;
}

export interface PracticeSession {
  id: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
  createdAt: string;
  completedAt?: string;
}
