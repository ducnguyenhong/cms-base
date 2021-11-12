import * as yup from 'yup';

export type InputFieldProps = {
  field: keyof CreateEventValues;
  title?: string;
  desc?: string;
  inputType?: 'text' | 'textarea' | 'number' | 'password';
  required?: boolean;
  placeHolder?: string;
  rows?: number;
  disabled?: boolean;
};

export interface CreateEventValues {
  name: string;
  description: string;
  waitingTime: number;
  startTime: number;
  reward: number;
  hostId: number;
  status: boolean;
}

export const initialValues: CreateEventValues = {
  name: '',
  description: '',
  waitingTime: 0,
  startTime: 0,
  reward: 0,
  hostId: 0,
  status: true,
};

export const createEventSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc'),
  waitingTime: yup.number().required('Bắt buộc'),
  startTime: yup.number().required('Bắt buộc'),
  reward: yup.number().required('Bắt buộc'),
  hostId: yup.number().required('Bắt buộc'),
});
