import { LoadingComponent } from '@ekidpro/ui.loading';
import { PortletBody } from '@ekidpro/ui.portlet';
import AvatarDefault from 'assets/images/default-avatar.png';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { EventType } from 'types/event.type';
import { snakeToCamelCase } from 'utils/dirty-map';
import { formatThousand } from 'utils/helper';
import { MOCK_DOMAIN } from '__mocks__/server';
import { Pagination, PaginationType } from './event-list.pagination';

const Header: React.FC = memo(() => {
  return (
    <div className="flex justify-between items-center bg-white py-5 px-5 rounded">
      <span className="border-l-4 border-green-600 px-5 uppercase font-semibold text-lg">Danh sách sự kiện</span>
    </div>
  );
});

const EventStyles = styled.div`
  .event-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 60px;
  }
`;

export const EventList: React.FC = () => {
  const [eventList, setEventList] = useState<EventType[] | null | undefined>(undefined);
  const [pagination, setPagination] = useState<PaginationType | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${MOCK_DOMAIN}/events`, {
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
        const dataTransform = snakeToCamelCase(data) as EventType[];
        setEventList(dataTransform);

        setPagination({
          totalItems: get(pagination, 'total_items'),
          totalPages: Math.ceil(get(pagination, 'total_items') / get(pagination, 'limit')),
          page: get(pagination, 'page'),
          size: get(pagination, 'limit'),
        });
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);

  if (typeof eventList === 'undefined') {
    return (
      <EventStyles>
        <Header />
        <PortletBody className="mt-10">
          <LoadingComponent />
        </PortletBody>
      </EventStyles>
    );
  }

  if (eventList === null) {
    return (
      <EventStyles>
        <Header />
        <PortletBody className="p-10 flex items-center justify-center mt-10">
          <img src={ImageNoData} alt="no data" />
        </PortletBody>
      </EventStyles>
    );
  }

  return (
    <EventStyles>
      <Header />
      <div className="grid grid-cols-3 gap-10 mt-10">
        {eventList.map((item) => {
          const { name, startTime, reward, host, id, description } = item;
          return (
            <Link
              to={`/event/${id}`}
              key={`event_${item.id}`}
              className="col-span-3 lg:col-span-1 bg-white p-8 rounded duration-300 hover:shadow-md"
            >
              <div className="flex justify-between">
                <span className="block text-center rounded-lg px-3 py-1.5 font-semibold text-lg bg-blue-500 text-white">
                  {dayjs(startTime).format('HH : mm')}
                </span>
                <span className="block text-center font-bold text-lg mt-2 text-gray-400">
                  {dayjs(startTime).format('DD/MM/YYYY')}
                </span>
              </div>

              <div className="mt-5">
                <div className="uppercase font-bold text-xl">{name}</div>
                <div className="pl-5 mt-2">
                  <div className="event-description italic opacity-70 overflow-hidden overflow-ellipsis text-justify">
                    {description}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <i className="fas fa-gem mr-3 text-red-500" />
                <span className="font-semibold text-gray-500">{formatThousand.format(reward)}</span>
              </div>

              <div className="mt-2">
                <div className="flex items-center mt-1">
                  <i className="fas fa-clock mr-3 text-green-500" />
                  <span className="font-semibold text-gray-500">30 phút</span>
                  {/* <span>{dayjs(waitingTime).format('DD/MM/YYYY')}</span> */}
                </div>
              </div>

              <div className="flex items-center mt-5 ">
                <img src={AvatarDefault} className="w-10 h-10 rounded-full" alt="host" />
                <span className="font-semibold block ml-4">{host.fullname}</span>
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
    </EventStyles>
  );
};
