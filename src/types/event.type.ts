import { QuestionType } from './question.type';
import { UserType } from './user.type';

export interface EventType {
  name: string;
  description: string;
  waitingTime: number;
  startTime: number;
  reward: number;
  host: UserType;
  question: QuestionType[];
  id: number;
  status: string;
  createdAt: number | null;
  updatedAt: number | null;
}
