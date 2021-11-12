interface Answer {
  type: string;
  correct: boolean;
  value: string;
  label: string;
}

export interface QuestionType {
  id: number;
  question: string;
  answer: Answer[];
  status: string;
  createdAt: number | null;
  updatedAt: number | null;
}
