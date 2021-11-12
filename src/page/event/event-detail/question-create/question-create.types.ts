import * as yup from 'yup';

export type InputFieldProps = {
  field: keyof CreateQuestionValues;
  title?: string;
  desc?: string;
  inputType?: 'text' | 'textarea' | 'number' | 'password';
  required?: boolean;
  placeHolder?: string;
  rows?: number;
  disabled?: boolean;
};

export interface CreateQuestionValues {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
}

export const initialValues: CreateQuestionValues = {
  question: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  correctAnswer: 1,
};

export const createQuestionSchema = yup.object().shape({
  question: yup.string().required('Bắt buộc'),
  answer1: yup.string().required('Bắt buộc'),
  answer2: yup.string().required('Bắt buộc'),
  answer3: yup.string().required('Bắt buộc'),
  answer4: yup.string().required('Bắt buộc'),
  correctAnswer: yup.number().required('Bắt buộc'),
});
