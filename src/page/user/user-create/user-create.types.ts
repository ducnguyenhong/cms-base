import * as yup from 'yup';

export type InputFieldProps = {
  field: keyof CreateUserValues;
  title?: string;
  desc?: string;
  inputType?: 'text' | 'textarea' | 'number' | 'password';
  required?: boolean;
  placeHolder?: string;
  rows?: number;
  disabled?: boolean;
};

export interface CreateUserValues {
  fullname: string;
  username: string;
  password?: string;
  confPassword?: string;
  phone: string;
  avatar?: File | string;
  status: boolean;
  type: string;
  birthday: number;
  email: string;
}

export const initialValues: CreateUserValues = {
  fullname: '',
  username: '',
  phone: '',
  status: true,
  type: '',
  birthday: 0,
  email: '',
  password: '',
  confPassword: '',
};

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const createUserSchema = yup.object().shape({
  fullname: yup.string().required('Bắt buộc'),
  username: yup.string().required('Bắt buộc'),
  email: yup.string().matches(regexEmail, 'Email không hợp lệ'),
  type: yup.string().required('Bắt buộc'),
  password: yup.string().min(6, 'Tối thiểu 6 ký tự').max(100, 'Tối đa 50 ký tự').required('Bắt buộc'),
  confirmPassword: yup
    .string()
    .min(6, 'Tối thiểu 6 ký tự')
    .max(100, 'Tối đa 50 ký tự')
    .required('Bắt buộc')
    .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp'),
});
