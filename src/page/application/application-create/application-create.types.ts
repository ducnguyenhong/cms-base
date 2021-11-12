import * as yup from 'yup';

export type InputFieldProps = {
  field: keyof CreateApplicationValues;
  title?: string;
  desc?: string;
  inputType?: 'text' | 'textarea' | 'number' | 'password';
  required?: boolean;
  placeHolder?: string;
  rows?: number;
  disabled?: boolean;
};


export type AsyncSelectProps = {
  field: keyof CreateApplicationValues;
  isMulti?: boolean;
  isClearable?: boolean;
  title?: string;
  required?: boolean;
  defaultValue?: any;
};

export interface CreateApplicationValues {
  name: string;
  logo: string | null;
  points: number;
  owner: number | string;
  editor: any;
  status: string;
}

export const initialValues: CreateApplicationValues = {
  name: '',
  logo: null,
  points: 0,
  owner: 0,
  editor: 0,
  status: "",
};

export const createEventSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc'),
  points: yup.number(),
});
