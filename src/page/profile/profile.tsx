import { LoadingComponent, PortletBody, PortletHeader } from '@ekidpro/ui';
import DefaultAvatar from 'assets/images/default-avatar.png';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { UserType } from 'types/user.type';
import { getAge } from 'utils/helper';
import { MOCK_DOMAIN } from '__mocks__/server';
import { ProfileTabContent } from './profile.tab-content';
import { ProfileTabControl } from './profile.tab-control';

export const Profile: React.FC = () => {
  const [userDetail, setUserDetail] = useState<UserType | undefined | null>(undefined);
  const userId = 1;
  const getUserDetail = useCallback((userId: number | string) => {
    axios
      .get(`${MOCK_DOMAIN}/user/1`)
      .then((response) => {
        const { data, message, ok } = response.data;
        if (!ok || response.status > 400) {
          throw new Error(message || 'Không thể lấy thông tin người dùng');
        }
        setUserDetail(data);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);

  useEffect(() => {
    if (userId) {
      getUserDetail(userId);
    }
  }, [userId, getUserDetail]);

  if (typeof userDetail === 'undefined') {
    return (
      <div>
        <Helmet>
          <title>CMS | Chi tiết người dùng</title>
        </Helmet>
        <PortletHeader title="Chi tiết người dùng" />
        <PortletBody>
          <LoadingComponent />
        </PortletBody>
      </div>
    );
  }

  if (userDetail === null) {
    return (
      <div>
        <Helmet>
          <title>CMS | Thông tin cá nhân</title>
        </Helmet>
        <PortletHeader title="Chi tiết người dùng" />
        <PortletBody className="p-10 flex items-center justify-center">
          <img src={ImageNoData} alt="no data" />
        </PortletBody>
      </div>
    );
  }

  const { id, fullname, address, phone, email, username, birthday, status } = userDetail;

  return (
    <div>
      <Helmet>
        <title>CMS | Thông tin cá nhân</title>
      </Helmet>

      <div className="bg-white px-8 pt-8 rounded">
        <div className="md:flex md:items-center ">
          <div className="flex justify-center">
            <img className="w-28 h-28 rounded-full" src={DefaultAvatar} alt="avatar" />
          </div>

          <div className="md:ml-10 mt-5 md:mt-0 grid grid-cols-3">
            <div className="col-span-3">
              <div className="flex items-center col-span-1">
                <div className="text-gray-900 text-hover-primary text-2xl font-semibold">{fullname}</div>
                <i
                  className={clsx({
                    'fas ml-3': true,
                    'fa-check-circle text-green-500': status === 'ACTIVE',
                    'fa-times-circle text-red-500': status === 'INACTIVE',
                  })}
                />
              </div>
            </div>
            <div className="col-span-3 mt-3">
              <span className="px-4 py-2 bg-blue-100 text-blue-500 rounded font-medium">ID: {id}</span>
            </div>
            <div className="col-span-3 lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-x-10 mt-5 gap-y-3">
              <div className="flex items-center col-span-1 text-gray-400">
                <i className="fas fa-user-circle mr-2" />
                <span>{username}</span>
              </div>

              <div className="flex items-center col-span-1 text-gray-400">
                <i className="fas fa-birthday-cake mr-2" />
                <span>{birthday ? dayjs(birthday * 1000).format('DD/MM/YYYY') : 'N/A'}</span>
                {birthday && (
                  <span className="opacity-50 ml-2 hidden lg:block">{`(${getAge(
                    dayjs(birthday * 1000).valueOf(),
                  )} tuổi)`}</span>
                )}
              </div>

              <div className="hidden lg:block col-span-1"></div>

              <div className="flex items-center col-span-1 text-gray-400">
                <i className="fas fa-phone mr-2" />
                {phone ? <a href={`tel:${phone}`}>{phone}</a> : <span className="opacity-50">N/A</span>}
              </div>

              <div className="flex items-center col-span-1 text-gray-400">
                <i className="fas fa-envelope mr-2" />
                {email ? <a href={`mailto:${email}`}>{email}</a> : <span className="opacity-50">N/A</span>}
              </div>

              <div className="flex items-center col-span-1 text-gray-400">
                <i className="fas fa-map-marker-alt mr-2" />
                <span>{address}</span>
              </div>
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>

        <ProfileTabControl />
      </div>

      <div className="bg-white rounded mt-10">
        <ProfileTabContent userInfo={userDetail} />
      </div>
    </div>
  );
};
