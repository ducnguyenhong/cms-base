import * as Yup from 'yup';

interface LoginType {
  username: string;
  password: string;
  deviceId: string;
}

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Tài khoản là bắt buộc'),
  password: Yup.string().min(3, 'Tối thiểu 3 ký tự').max(50, 'Tối đa 50 ký tự').required('Mật khẩu là bắt buộc'),
});

export const initialValues: LoginType = {
  username: '',
  password: '',
  deviceId: '',
};
