import { LoadingComponent } from '@ekidpro/ui.loading';
import { Portlet, PortletBody, PortletHeader } from '@ekidpro/ui.portlet';
import ImageNoData from 'assets/images/img-no-data.png';
import dayjs from 'dayjs';
import { UserType } from 'types/user.type';

interface UserTabInfoProps {
  userInfo?: UserType | undefined;
}

const UserTabInfo: React.FC<UserTabInfoProps> = (props) => {
  const { userInfo } = props;

  if (typeof userInfo === 'undefined') {
    return <LoadingComponent />;
  }

  if (userInfo === null) {
    return (
      <div className="p-10 flex items-center justify-center">
        <img src={ImageNoData} alt="no data" />
      </div>
    );
  }

  const { fullname, birthday, username, phone, email, address, type } = userInfo;
  return (
    <Portlet className="shadow-none">
      <PortletHeader title="Thông tin người dùng" />
      <PortletBody className="shadow-none p-8">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="text-gray-500">Họ và tên</div>
          <div className="font-semibold text-gray-500">{fullname}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
          <div className="text-gray-500">Ngày sinh</div>
          <div className="font-semibold text-gray-500">
            {birthday ? dayjs(birthday * 1000).format('DD/MM/YYYY') : 'N/A'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
          <div className="text-gray-500">Email</div>
          {email ? (
            <a href={`mailto:${email}`} className="font-semibold block text-gray-500">
              {email}
            </a>
          ) : (
            <span className="block text-gray-500">N/A</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
          <div className="text-gray-500">Điện thoại</div>
          {phone ? (
            <a href={`tel:${phone}`} className="font-semibold block text-gray-500">
              {phone}
            </a>
          ) : (
            <span className="block text-gray-500">N/A</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
          <div className="text-gray-500">Địa chỉ</div>
          <div className="font-semibold text-gray-500">{address}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
          <div className="text-gray-500">Username</div>
          <div className="font-semibold text-gray-500">{username}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
          <div className="text-gray-500">Loại tài khoản</div>
          <div className="font-semibold text-gray-500">{type}</div>
        </div>
      </PortletBody>
    </Portlet>
  );
};

export default UserTabInfo;
