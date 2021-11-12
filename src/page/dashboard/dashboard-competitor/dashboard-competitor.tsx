import { LoadingComponent } from '@ekidpro/ui';
import DefaultAvatar from 'assets/images/default-avatar.png';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { UserType } from 'types/user.type';
import { snakeToCamelCase } from 'utils/dirty-map';
import { getAge } from 'utils/helper';
import { MOCK_DOMAIN } from '__mocks__/server';
import { ModalOptions } from './dashboard-competitor.options';

const UserStyle = styled.div`
  .user-type-admin {
    color: #f64e60;
    background-color: #ffe2e5;
  }

  .user-type-editor {
    color: #3699ff;
    background-color: #e1f0ff;
  }

  .user-type-host {
    color: #8950fc;
    background-color: #eee5ff;
  }

  .user-type-competitor {
    color: #1bc5bd;
    background-color: #c9f7f5;
  }

  .user-type-user {
    color: #ffa800;
    background-color: #fff4de;
  }
`;

const QUERY_TIME = [
  { value: 'day', label: 'Ngày' },
  { value: 'week', label: 'Tuần' },
  { value: 'month', label: 'Tháng' },
];

export const DashboardCompetitor: React.FC = () => {
  const [users, setUsers] = useState<UserType[] | undefined | null>(undefined);
  const [queryTime, setQueryTime] = useState<string>('day');

  const OPTIONS = useMemo(() => {
    return [
      { id: 1, title: 'Tạo mới', icon: 'fas fa-plus-circle', isActive: true, route: '/create-user' },
      { id: 2, title: 'Danh sách', icon: 'fas fa-users', isActive: true },
    ];
  }, []);

  useEffect(() => {
    axios
      .get(`${MOCK_DOMAIN}/users`, { params: { page: 1, size: 5 } })
      .then((response) => {
        const { data, message, ok } = response.data;
        if (!ok || response.status > 400) {
          throw new Error(message || 'Không thể lấy thông tin người dùng');
        }
        const dataTransform = snakeToCamelCase(data) as UserType[];
        setUsers(dataTransform);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);

  if (typeof users === 'undefined') {
    return <LoadingComponent />;
  }

  if (users === null) {
    return (
      <div>
        <img src={ImageNoData} alt="no data" />
      </div>
    );
  }

  return (
    <UserStyle className="px-7 pt-6 pb-7 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">Top Competitor</span>
        <div className="grid grid-cols-4">
          {QUERY_TIME.map((item) => {
            return (
              <button
                onClick={() => setQueryTime(item.value)}
                className={clsx({
                  'col-span-1 px-3 py-2 rounded-md text-sm font-semibold': true,
                  'bg-gray-900 text-gray-50': item.value === queryTime,
                  'text-gray-400': item.value !== queryTime,
                })}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pl-3">
            <ModalOptions options={OPTIONS} />
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-gray-400 p-5 font-medium">
                <div className="flex justify-start">#</div>
              </th>
              <th className="text-gray-400 p-5 font-medium">
                <div className="flex justify-start">Họ Tên</div>
              </th>
              <th className="text-gray-400 p-5 font-medium">
                <div className="flex justify-start">Ngày Sinh</div>
              </th>
              <th className="text-gray-400 p-5 font-medium">
                <div className="flex justify-start">Loại Tài Khoản</div>
              </th>
              <th className="text-gray-400 p-5 font-medium">
                <div className="flex justify-start">Hành Động</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              const { fullname, birthday, type, id, avatar, username } = item;
              return (
                <tr
                  key={`user_${id}`}
                  className={clsx({
                    'hover:bg-gray-50 duration-300': true,
                    'border-b border-dashed': index + 1 !== users.length,
                  })}
                >
                  <th className="font-normal">
                    <div className="flex justify-start p-5 font-semibold">
                      <Link to={`/user/${id}`} className="duration-300 hover:text-blue-500">
                        {id}
                      </Link>
                    </div>
                  </th>
                  <th className="font-normal">
                    <div className="flex justify-start p-5">
                      <Link to={`/user/1`} className="flex mr-5">
                        <img className="w-12 h-12 rounded-full" src={avatar || DefaultAvatar} alt="avatar" />
                        <div className="ml-3 flex flex-col items-start">
                          <span className="block font-semibold whitespace-nowrap duration-300 hover:text-blue-500">
                            {fullname}
                          </span>
                          <span className="text-sm opacity-50 block">{username}</span>
                        </div>
                      </Link>
                    </div>
                  </th>
                  <th className="font-normal">
                    {birthday && (
                      <div className="flex flex-col items-start whitespace-nowrap p-5">
                        <div>{dayjs(birthday * 1000).format('DD/MM/YYYY')}</div>
                        <div className="text-sm opacity-50 mt-1">
                          {getAge(dayjs(birthday * 1000).valueOf())} <span className="text-sm">tuổi</span>
                        </div>
                      </div>
                    )}
                  </th>
                  <th className="font-normal">
                    <div className="flex justify-start p-5">
                      <div className={`user-type-${type.toLowerCase()} text-sm px-3 py-1.5 rounded-md`}>{type}</div>
                    </div>
                  </th>
                  <th className="font-normal">
                    <div className="flex justify-start space-x-3 p-5">
                      <Link
                        to={`/user/${id}`}
                        className="bg-gray-50 text-gray-400 hover:text-blue-400 duration-300 h-9 w-9 cursor-pointer text-center flex justify-center items-center rounded"
                        title="Chi tiết"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      <Link
                        to={`/user/${id}/update`}
                        className="bg-gray-50 text-gray-400 hover:text-blue-400 duration-300 h-9 w-9 cursor-pointer text-center flex justify-center items-center rounded"
                        title="Cập nhật"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </UserStyle>
  );
};
