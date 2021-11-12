import { LoadingComponent } from '@ekidpro/ui.loading';
import DefaultApplication from 'assets/images/default-application.jpg';
import DefaultAvatar from 'assets/images/default-avatar.png';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { snakeToCamelCase } from 'utils/dirty-map';
import { formatThousand } from 'utils/helper';
import { MOCK_DOMAIN } from '__mocks__/server';
import { ApplicationTabContent } from './application-detail.tab-content';
import { ApplcationTab } from './application-detail.tab-control';

export const ApplicationDetail: React.FC = () => {
  const id = get(useParams(), 'id');
  const [appData, setAppData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${MOCK_DOMAIN}/application/1`)
        .then((response) => {
          const { data, message, code } = response.data;
          if (code !== 200) {
            throw new Error(message || 'Không thể lấy dữ liệu ứng dụng');
          }
          setAppData(snakeToCamelCase(data));
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [id])

  return (
    <div>
      <Helmet>
        <title>CMS | Chi tiết ứng dụng</title>
      </Helmet>
      {loading && <LoadingComponent />}
      {
        appData === null &&
        <div className="p-10 flex items-center justify-center">
          <img src={ImageNoData} alt="no data" />
        </div>
      }
      {
        appData && <div>
          <div key={`app_${id}`} className="grid grid-cols-4 gap-x-5">
            <div className="lg:col-span-1 col-span-4">
              <div className="bg-white shadow rounded p-5">
                <div className="lg:flex">
                  <div className="">
                    <img src={appData.logo || DefaultApplication} className="rounded w-24 h-24" alt="logo" />
                  </div>
                  <div className="lg:px-3">
                    <div className="uppercase font-bold text-xl mt-5 mb-3 lg:mt-0">{appData.name}</div>
                    <span className="bg-purple-100 text-purple-500 px-4 py-2 font-medium rounded">ID: {appData.id}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-5">
                  <div className="bg-red-100 rounded px-4 py-2">
                    <span className="font-semibold text-gray-500">Điểm: {formatThousand.format(appData.points)}</span>
                    <i className="fas fa-gem ml-2 text-red-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <span className="font-medium block mr-2">Owner:</span>
                  <div className="flex items-center">
                    <img src={appData.owner.avatar || DefaultAvatar} alt="owner" className="w-10 h-10 rounded-full" />
                    <span className="ml-1 font-semibold opacity-50 block">{appData.owner.fullname}</span>
                  </div>
                </div>
                <div className="flex items-center mt-5 justify-between">
                  <span className="font-medium block mr-4">Người chỉnh sửa:</span>
                  <div className="flex items-center">
                    {appData.editor.slice(0, 3).map((x: any) => {
                      return (
                        <div key={x.id} className="w-8 h-8 -ml-2">
                          < img
                            src={x.avatar || DefaultAvatar}
                            alt="avt"
                            className="inline-block border-white border-2 rounded-full h-full w-full"
                          />
                        </div>
                      )
                    })}
                    {
                      appData.editor.length > 3 &&
                      <span className="flex w-8 h-8 -ml-2 border-white justify-center items-center font-medium text-gray-600 border-2 text-xs bg-gray-300 rounded-full hover:z-10">
                        {appData.editor.length - 3}+
                      </span>
                    }
                  </div>
                </div>
                <div className="flex mt-5 justify-between">
                  <div className="font-medium">Ngày tạo:</div>
                  {appData.createdAt ?
                    <p className="flex justify-end">{dayjs(appData.createdAt * 1000).format('DD/MM/YYYY HH:mm')}</p>
                    : <div>N/A</div>
                  }
                </div>
                <div className="flex mt-5 justify-between">
                  <div className="font-medium">Ngày cập nhật:</div>
                  {appData.updatedAt ?
                    <p className="flex justify-end">{dayjs(appData.updatedAt * 1000).format('DD/MM/YYYY HH:mm')}</p>
                    : <div>N/A</div>}
                </div>
              </div>
              <div className="bg-white mt-5 rounded shadow">
                <ApplcationTab />
              </div>
            </div>
            <div className="lg:col-span-3 col-span-4">
              <ApplicationTabContent />
            </div>
          </div>
        </div>
      }
    </div>
  )
}