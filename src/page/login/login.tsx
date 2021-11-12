import BackgroundLogin from 'assets/images/bg-login.jpg';
import clsx from 'clsx';
import { Formik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import { login } from 'store/action/auth-action';
import { getDeviceId } from 'store/selector/auth-selector';
import styled from 'styled-components';
import { initialValues, loginSchema } from './login.type';
//
const LoginStyle = styled.div`
  .login-left {
    background-color: #ffc955;
  }
`;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const deviceId = useSelector(getDeviceId);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <LoginStyle className="w-full h-screen overflow-hidden">
      <Helmet>
        <title>CMS | Đăng nhập</title>
      </Helmet>
      <div className="grid grid-cols-5 lg:h-screen">
        <div className="flex col-span-5 h-20 lg:h-full lg:col-span-2 login-left items-center justify-center">
          <div className="mx-20 hidden lg:block">
            <img src={BackgroundLogin} alt="background" />
            <span className="block text-center text-3xl font-semibold mt-5">CMS</span>
          </div>
          <div className="lg:hidden font-semibold text-2xl">CMS</div>
        </div>
        <div className="col-span-5 lg:col-span-3 h-full items-center flex mt-20 lg:mt-0">
          <div className="w-full">
            <div className="md:w-1/2 lg:w-2/5 mx-auto px-10 md:px-0">
              <div>
                <span className="text-center uppercase text-2xl font-semibold block">Đăng nhập vào hệ thống</span>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={(values, actions) => {
                  dispatch(
                    login({
                      username: values.username,
                      password: values.password,
                      deviceId: deviceId,
                    }),
                  )
                    .unwrap()
                    .then((response) => {
                      const { ok, message } = response;
                      if (!ok) {
                        throw new Error(message);
                      }
                    })
                    .catch((error) => toast.error(error.message, { autoClose: false }))
                    .finally(() => actions.setSubmitting(false));
                }}
              >
                {({ handleSubmit, isSubmitting, values, handleBlur, handleChange, errors, touched }) => {
                  return (
                    <div className="mt-14">
                      <div>
                        <label className="block mb-1" htmlFor="username">
                          Tài khoản
                        </label>
                        <input
                          name="username"
                          id="username"
                          value={values.username}
                          onBlur={handleBlur('username')}
                          onChange={handleChange('username')}
                          className="outline-none px-5 py-3 rounded-md border border-gray-200 w-full placeholder-gray-400 text-gray-600"
                        />
                        {touched.username && errors.username && (
                          <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                        )}
                      </div>

                      <div className="mt-10">
                        <label className="block mb-1" htmlFor="password">
                          Mật khẩu
                        </label>
                        <div className="relative">
                          <input
                            name="password"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onBlur={handleBlur('password')}
                            onChange={handleChange('password')}
                            className="outline-none px-5 py-3 rounded-md border border-gray-200 w-full placeholder-gray-400 text-gray-600"
                          />
                          <i
                            onClick={() => setShowPassword(!showPassword)}
                            className={clsx({
                              'fas absolute top-4 right-4 text-gray-400 cursor-pointer': true,
                              'fa-eye-slash': !showPassword,
                              'fa-eye': showPassword,
                            })}
                          />
                        </div>
                        {touched.password && errors.password && (
                          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                        )}
                      </div>

                      <div className="mt-12">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onClick={() => handleSubmit()}
                          className={clsx({
                            'px-4 py-3 rounded-md text-gray-50 w-full': true,
                            'bg-gray-400': isSubmitting,
                            'bg-blue-500': !isSubmitting,
                          })}
                        >
                          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                      </div>
                    </div>
                  );
                }}
              </Formik>
            </div>
            <div className="mt-20 w-1/2 mx-auto">
              <hr />
            </div>
            <div className="mt-10">
              <span className="block text-center">2021 © CMS</span>
            </div>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};
