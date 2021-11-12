import axios from 'axios';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { CreateApplicationValues } from './application-create.types';

export const onCreateApplication = (values: CreateApplicationValues, actions: FormikHelpers<CreateApplicationValues>) => {
  const formData = new FormData();

  return axios
    .post('/application/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      const { ok, message, data } = res.data;

      if (!ok || res.status > 400) {
        throw new Error(message ?? `Không thể tạo ứng dụng`);
      }

      toast.success('Tạo ứng dụng thành công');
      actions.setSubmitting(false);
      return Promise.resolve({ success: true, id: data.id });
    })
    .catch((err) => {
      actions.setSubmitting(false);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
      return Promise.resolve({ success: false });
    });
};

export const onUpdateApplication = (
  values: CreateApplicationValues,
  actions: FormikHelpers<CreateApplicationValues>,
  appId: string | number,
) => {
  const formData = new FormData();

  return axios
    .put(`/application/${appId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      const { ok, message } = res.data;
      if (!ok || res.status > 400) {
        throw new Error(message ?? `Không thể cập nhật sự kiện`);
      }
      actions.setSubmitting(false);
      toast.success('Cập nhật sự kiện thành công');
      return Promise.resolve({ success: true });
    })
    .catch((err) => {
      actions.setSubmitting(false);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
      return Promise.resolve({ success: false });
    });
};
