import { Registry, Request } from 'miragejs';
import { AnyFactories, AnyModels } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export const getQuestionList = (schema: Schema<Registry<AnyModels, AnyFactories>>, request: Request) => {
  return {
    ok: true,
    code: 200,
    data: [
      {
        id: 1,
        question:
          'Câu hỏi 1 ABCDEF Câu hỏi 1 ABCDEF Câu hỏi 1 ABCDEF Câu hỏi 1 ABCDEF. Câu hỏi 1 ABCDEF Câu hỏi 1 ABCDEF Câu hỏi 1 ABCDEF Câu hỏi 1 ABCDEF.',
        answer: [
          {
            type: 'text',
            correct: false,
            value: 'Đáp án A Đáp án A Đáp án A Đáp án A Đáp án A Đáp án A.',
            label: 'A',
          },
          {
            type: 'text',
            correct: true,
            value: 'Đáp án B',
            label: 'B',
          },
          {
            type: 'text',
            correct: false,
            value: 'Đáp án C',
            label: 'C',
          },
          {
            type: 'text',
            correct: false,
            value: 'Đáp án D',
            label: 'D',
          },
        ],
        status: 'ACTIVE',
      },
      {
        id: 2,
        question: 'Câu hỏi 2 GHIJKL',
        answer: [
          {
            type: 'text',
            correct: false,
            value: 'Đáp án A',
            label: 'A',
          },
          {
            type: 'text',
            correct: true,
            value: 'Đáp án B',
            label: 'B',
          },
          {
            type: 'text',
            correct: false,
            value: 'Đáp án C',
            label: 'C',
          },
          {
            type: 'text',
            correct: false,
            value: 'Đáp án D',
            label: 'D',
          },
        ],
        status: 'ACTIVE',
      },
      {
        id: 1,
        question: 'Câu hỏi 3 LMNOP',
        answer: [
          {
            type: 'text',
            correct: false,
            value: 'Đáp án A',
            label: 'A',
          },
          {
            type: 'text',
            correct: true,
            value: 'Đáp án B',
            label: 'B',
          },
          {
            type: 'text',
            correct: false,
            value: 'Đáp án C',
            label: 'C',
          },
          {
            type: 'text',
            correct: false,
            value: 'Đáp án D',
            label: 'D',
          },
        ],
        status: 'ACTIVE',
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
      sort: '',
      total: 10,
      total_items: 50,
      current: 10,
    },
  };
};
