import { LoadingComponent } from '@ekidpro/ui.loading';
import { DoubleArrowDBIcon } from 'assets/icons/double-arrow-dashboard';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EventType } from 'types/event.type';
import { snakeToCamelCase } from 'utils/dirty-map';
import { MOCK_DOMAIN } from '__mocks__/server';

export const DashboardEvent: React.FC = () => {
  const [events, setEvents] = useState<EventType[] | undefined | null>(undefined);

  useEffect(() => {
    axios
      .get(`${MOCK_DOMAIN}/events`, { params: { page: 1, size: 5 } })
      .then((response) => {
        const { data, message, ok } = response.data;
        if (!ok || response.status > 400) {
          throw new Error(message || 'Không thể lấy thông tin sự kiện');
        }
        const dataTransform = snakeToCamelCase(data) as EventType[];
        setEvents(dataTransform);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);

  if (typeof events === 'undefined') {
    return <LoadingComponent />;
  }

  if (events === null) {
    return (
      <div>
        <img src={ImageNoData} alt="no data" />
      </div>
    );
  }

  return (
    <div className="px-7 pt-6 pb-7">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">Sự Kiện Sắp Tới</span>
        <Link to="/events" title="Xem tất cả">
          <DoubleArrowDBIcon />
        </Link>
      </div>
      <div className="mt-7">
        {events.map((item, index) => {
          const { startTime, id, name } = item;
          return (
            <div key={`event_${id}`} className="grid grid-cols-3 lg:grid-cols-4">
              <div
                className={clsx({
                  'border-r-4 border-gray-200 col-span-1 relative': true,
                  'h-24': events.length !== index + 1,
                })}
              >
                <span className="block font-semibold">{dayjs(startTime).format('HH:mm')}</span>
                <span className="block opacity-50">{dayjs(startTime).format('DD/MM/YYYY')}</span>
                <div className="absolute top-0 -right-3 bg-white py-1">
                  <div
                    className={clsx({
                      'w-5 h-5 rounded-full flex justify-center items-center': true,
                      'bg-red-500': index === 0,
                      'bg-blue-500': index === 1,
                      'bg-green-500': index === 2,
                      'bg-yellow-500': index === 3,
                      'bg-purple-500': index === 4,
                    })}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-3 ml-5">
                <span className="font-medium">{name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
