import { LoadingComponent } from '@ekidpro/ui.loading';
import { PortletBody } from '@ekidpro/ui.portlet';
import DefaultApplication from 'assets/images/default-application.jpg';
import DefaultAvatar from 'assets/images/default-avatar.png';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import { get } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApplicationType } from 'types/application.type';
import { snakeToCamelCase } from 'utils/dirty-map';
import { formatThousand } from 'utils/helper';
import { MOCK_DOMAIN } from '__mocks__/server';
import { Pagination, PaginationType } from './application-list.pagination';

const Header: React.FC = memo(() => {
  return (
    <div className="flex justify-between items-center bg-white py-5 px-5 rounded">
      <Helmet>
        <title>CMS | Danh sách ứng dụng</title>
      </Helmet>
      <span className="border-l-4 border-green-600 px-5 uppercase font-semibold text-lg">Danh sách ứng dụng</span>
      <Link
        to="/create-application"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer duration-300"
      >
        <i className="fas fa-plus-circle mr-1.5" />
        <span className="font-medium">Tạo mới</span>
      </Link>
    </div>
  );
});

export const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationType[] | null | undefined>(undefined);
  const [pagination, setPagination] = useState<PaginationType | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${MOCK_DOMAIN}/applications/`, {
        params: {
          limit: 10,
          page: 1,
        },
      })
      .then((response) => {
        const { ok, data, message, pagination } = response.data;
        if (!ok || response.status > 400) {
          throw new Error(message);
        }
        const dataTransform = snakeToCamelCase(data) as ApplicationType[];
        setApplications(dataTransform);
        setPagination({
          totalItems: get(pagination, 'total_items'),
          totalPages: Math.ceil(get(pagination, 'total_items') / get(pagination, 'limit')),
          page: get(pagination, 'page'),
          size: get(pagination, 'limit'),
        });
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);

  if (typeof applications === 'undefined') {
    return (
      <div>
        <Header />
        <PortletBody className="mt-10">
          <LoadingComponent />
        </PortletBody>
      </div>
    );
  }

  if (applications === null) {
    return (
      <div>
        <Header />
        <PortletBody className="p-10 flex items-center justify-center mt-10">
          <img src={ImageNoData} alt="no data" />
        </PortletBody>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 gap-10 mt-10">
        {applications.map((item) => {
          const { id, points, owner, editor } = item;
          return (
            <Link
              to={`/application/${id}`}
              key={`app_${id}`}
              className="col-span-3 lg:col-span-1 bg-white p-8 rounded duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <img src={DefaultApplication} alt="logo app" className="w-16 h-16 rounded" />
                <span className="bg-purple-100 text-purple-500 px-4 py-2 font-medium rounded">ID: {item.id}</span>
              </div>

              <div className="flex items-center mt-5">
                <span className="font-semibold text-xl">{item.name}</span>
              </div>

              <div className="mt-5">
                <i className="fas fa-gem mr-3 text-red-500" />
                <span className="font-semibold text-gray-500">{formatThousand.format(points)}</span>
              </div>

              <div className="flex mt-5 items-center">
                <img src={owner.avatar || DefaultAvatar} alt="owner" className="w-10 h-10 rounded-full" />
                <span className="ml-3 font-semibold block">{owner.fullname}</span>
                <span className="font-medium opacity-50 block ml-2 text-sm">(Owner)</span>
              </div>

              <div className="flex mt-3 justify-end">
                <div className="flex items-center">
                  {editor.slice(0, 3).map((x) => {
                    return (
                      <div key={x.id} className="w-8 h-8 -ml-2">
                        <img
                          src={DefaultAvatar}
                          alt="editor"
                          className="inline-block border-white border-2 rounded-full h-8 w-8"
                        />
                      </div>
                    );
                  })}
                  {editor.length > 3 && (
                    <span className="flex w-8 h-8 -ml-2 border-white justify-center items-center font-medium text-gray-600 border-2 text-xs bg-gray-300 rounded-full hover:z-10">
                      {editor.length - 3}+
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {pagination && (
        <div className="my-10">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
};
