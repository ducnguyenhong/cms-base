import { ColumnsProps, Table } from '@ekidpro/table';
import { Portlet, PortletBody, PortletHeader } from '@ekidpro/ui';
import DefaultAvatar from 'assets/images/default-avatar.png';
import clsx from 'clsx';
import { Status } from 'component/column-status';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { UserType } from 'types/user.type';
import { getAge } from 'utils/helper';
import UserAction from './user.action';
import { getUserLoader, userColumns } from './user.data';
import { PREFIX_USER, UserProps } from './user.type';

dayjs.locale('vi');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

function renderColumn(data: UserType, columns: ColumnsProps) {
  switch (columns.field) {
    case 'id': {
      return (
        <Link
          to={`/user/${data.id}`}
          className={clsx('transition-all delay-75 font-semibold', 'hover:text-blue-500 hover:font-bold')}
        >
          {data.id}
        </Link>
      );
    }
    case 'fullname': {
      return (
        <Link to={`/user/${data.id}`} className="flex mr-5">
          <img className="w-12 h-12 rounded-full" src={data.avatar || DefaultAvatar} alt="avatar" />
          <div className="ml-2">
            <span
              className={clsx({
                'block whitespace-nowrap': true,
                'font-semibold': !!data.fullname,
                'opacity-50': !data.fullname,
              })}
            >
              {data.fullname || 'N/A'}
            </span>
            <span className="text-sm opacity-50 block">{data.username}</span>
          </div>
        </Link>
      );
    }

    case 'phone': {
      return (
        <div>
          {data.phone && (
            <div className="flex items-center">
              <i className="fas fa-phone mr-2 text-gray-400" />
              <a href={`tel:${data.phone}`} className="hover:text-blue-700 duration-300">
                {data.phone}
              </a>
            </div>
          )}
          {data.email && (
            <div className="flex items-center mt-1">
              <i className="fas fa-envelope mr-2 text-gray-400" />
              <a href={`mailto:${data.email}`} className="hover:text-blue-700 duration-300">
                {data.email}
              </a>
            </div>
          )}
        </div>
      );
    }

    case 'birthday':
      if (!data.birthday) {
        return null;
      }
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div>{dayjs(data.birthday * 1000).format('DD/MM/YYYY')}</div>
          <div className="text-sm opacity-50 mt-1">
            {getAge(dayjs(data.birthday * 1000).valueOf())} <span>tuổi</span>
          </div>
        </div>
      );

    case 'status':
      return <Status active={data.status === 'ACTIVE'} />;

    case 'created_at': {
      if (!data.createdAt) {
        return null;
      }
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div>{dayjs(data.createdAt * 1000).format('DD/MM/YYYY HH:mm')}</div>
          <div className="text-sm opacity-50 mt-1">{dayjs(data.createdAt * 1000).toNow()}</div>
        </div>
      );
    }

    case 'updated_at': {
      if (!data.updatedAt) {
        return null;
      }

      return (
        <div className="flex flex-col whitespace-nowrap">
          <div>{dayjs(data.updatedAt * 1000).format('DD/MM/YYYY HH:mm')}</div>
          <div className="text-sm opacity-50 mt-1">{dayjs(data.updatedAt * 1000).toNow()}</div>
        </div>
      );
    }

    case 'action': {
      return <UserAction {...data} />;
    }
    default: {
      const value = get(data, columns.field);

      if (typeof data === 'undefined' || data === null) {
        return null;
      }
      return <div>{value}</div>;
    }
  }
}

export const UserList: React.FC<UserProps> = ({ prefix = PREFIX_USER, type, title, disableHelmet }) => {
  const Toolbar = () => {
    return (
      <Link
        to="/create-user"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded cursor-pointer duration-300"
      >
        <i className="fas fa-plus-circle mr-1.5" />
        <span className="font-medium">Tạo mới</span>
      </Link>
    );
  };

  return (
    <Portlet className="shadow-none">
      {!disableHelmet && (
        <Helmet>
          <title>{`CMS | ${title || 'Danh sách người dùng'}`}</title>
        </Helmet>
      )}
      <PortletHeader title={title || 'Danh sách người dùng'} toolbar={<Toolbar />} />
      <PortletBody className="p-5 shadow-none">
        <Table loader={getUserLoader(type)} columns={userColumns} render={renderColumn} prefix={prefix} />
      </PortletBody>
    </Portlet>
  );
};
