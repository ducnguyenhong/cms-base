import { FormikErrors, FormikTouched, FormikValues } from 'formik';

export function hasError<T extends FormikValues>(
  formik: { errors: FormikErrors<T>; touched: FormikTouched<T> },
  field: keyof T,
) {
  return formik.errors[field] && formik.touched[field];
}
