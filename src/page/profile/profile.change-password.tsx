import { Button } from '@ekidpro/ui.button';
import { Portlet, PortletBody, PortletHeader } from '@ekidpro/ui.portlet';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { PasswordComponent } from './password-component';

export const validationSchema = yup.object().shape({
  password: yup.string().min(6, 'Mật khẩu phải nhiều hơn 6 ký tự').required('Không thể để trống'),
  newPassword: yup.string().min(6, 'Mật khẩu phải nhiều hơn 6 ký tự').required('Không thể để trống'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không đúng')
    .required('Không thể để trống'),
});

export const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dataAccount = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };
  const formik = useFormik({
    initialValues: dataAccount,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      console.log(28, values)
    },
  });
  return (
    <Portlet>
      <form onSubmit={formik.handleSubmit}>
        <PortletHeader title="Đổi mật khẩu" />
        <PortletBody className="px-5 md:px-0 md:w-4/5 lg:w-2/3 md:mx-auto shadow-none">
          <div className="mt-6">
            <div className="mb-7">
              <PasswordComponent
                title="Mật khẩu hiện tại"
                id="password"
                placeholder="Mật khẩu hiện tại"
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={loading}
              />
            </div>
            <div className="mb-7">
              <PasswordComponent
                title="Mật khẩu mới"
                id="newPassword"
                placeholder="Mật khẩu mới"
                value={formik.values.newPassword}
                error={
                  formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : undefined
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={loading}
              />
            </div>
            <div className="mb-7">
              <PasswordComponent
                title="Xác nhận mật khẩu"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                disabled={loading}
              />
            </div>
            <div className="w-full grid grid-cols-3 gap-y-2 md:gap-y-2 pb-10">
              <div className="col-span-4 md:col-span-1" />
              <div className="flex flex-col col-span-4 md:col-span-4 relative">
                <hr />
                <div className="flex flex-row space-x-4 ml-auto mt-5">
                  <Button
                    disabled={formik.isSubmitting}
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                  >
                    <div className="flex flex-row space-x-2 items-center">
                      <svg
                        className={clsx('animate-spin -ml-1 mr-3 h-5 w-5 text-white', { hidden: !formik.isSubmitting })}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx={12}
                          cy={12}
                          r={10}
                          stroke="currentColor"
                          strokeWidth={4}
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Cập nhật
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PortletBody>
      </form>
    </Portlet>
  );
};

export default ChangePassword;
