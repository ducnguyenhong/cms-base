import { Button, Portlet, PortletBody, PortletHeader } from '@ekidpro/ui';
import axios from 'axios';
import clsx from 'clsx';
import { Formik } from 'formik';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { UserType } from 'types/user.type';
import { MOCK_DOMAIN } from '__mocks__/server';
import { onCreateUser, onUpdateUser } from './user-create.action';
import { AvatarField } from './user-create.avatar';
import { BirthdayField } from './user-create.birthday';
import { InputField } from './user-create.input-field';
import { SelectTypeField } from './user-create.select-type';
import { StatusField } from './user-create.status';
import { createUserSchema, initialValues } from './user-create.types';

export const UserCreate: React.FC = () => {
  const userId = get(useParams(), 'id');
  const history = useHistory();
  const [userDetail, setUserDetail] = useState<UserType | undefined>(undefined);

  const defaultValues = !userId
    ? initialValues
    : {
        fullname: userDetail?.fullname || '',
        username: userDetail?.username || '',
        birthday: userDetail?.birthday || 0,
        type: userDetail?.type || '',
        email: userDetail?.email || '',
        phone: userDetail?.phone || '',
        avatar: userDetail?.avatar || '',
        status: userDetail?.status === 'ACTIVE',
      };

  const getUserDetail = (userId: string | number) => {
    axios
      .get(`${MOCK_DOMAIN}/user/1`)
      .then((response) => {
        const { ok, message, data } = response.data;
        if (!ok || response.status > 400) {
          throw new Error(message || 'Không thể lấy thông tin người dùng');
        }
        setUserDetail(data);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  };

  useEffect(() => {
    if (userId) {
      getUserDetail(userId);
    }
  }, [userId]);

  return (
    <Portlet className="shadow-none">
      <PortletHeader title={userId ? 'Cập nhật người dùng' : 'Tạo người dùng'} />
      <PortletBody className="px-5 md:px-0 md:w-4/5 lg:w-2/3 md:mx-auto shadow-none">
        <div>
          <Formik
            enableReinitialize
            initialValues={defaultValues}
            validationSchema={createUserSchema}
            onSubmit={(values, actions) => {
              if (!userId) {
                onCreateUser(values, actions)
                  .then((response) => {
                    if (get(response, 'success')) {
                      console.log('create success');
                    }
                  })
                  .catch((err) => console.log(err));
              } else {
                onUpdateUser(values, actions, userId)
                  .then((response) => {
                    if (get(response, 'success')) {
                      console.log('update success');
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <div className="mt-10">
                  <div className="md:px-5">
                    {!userId && <label className="block uppercase font-bold mb-8 text-lg">1. Thông tin cơ bản</label>}
                    <AvatarField />

                    <InputField field="fullname" title="Họ và tên" required />

                    <BirthdayField />

                    <InputField field="phone" title="Số điện thoại" />

                    <InputField field="email" title="Email" />

                    <SelectTypeField />

                    <StatusField />

                    {!userId && (
                      <>
                        <hr />
                        <label className="block uppercase font-bold mt-10 mb-8 text-lg">2. Thông tin đăng nhập</label>

                        <InputField field="username" title="Tài khoản" required />

                        <InputField field="password" title="Mật khẩu" required inputType="password" />

                        <InputField field="confPassword" title="Xác nhận mật khẩu" required inputType="password" />
                      </>
                    )}
                  </div>

                  <div className="w-full grid grid-cols-3 gap-y-2 md:gap-y-2 pb-10">
                    <div className="col-span-4 md:col-span-1" />
                    <div className="flex flex-col pt-4 col-span-4 md:col-span-4 relative">
                      <hr />
                      <div className="flex flex-row space-x-4 ml-auto mt-5">
                        <Button variant="secondary" className="ml-auto" onClick={() => history.goBack()}>
                          Quay lại
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          variant="primary"
                          type="submit"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleSubmit();
                          }}
                        >
                          <div className="flex flex-row space-x-2 items-center">
                            <svg
                              className={clsx('animate-spin -ml-1 mr-3 h-5 w-5 text-white', { hidden: !isSubmitting })}
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
                            {userId ? 'Cập nhật' : 'Tạo mới'}
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </PortletBody>
    </Portlet>
  );
};
