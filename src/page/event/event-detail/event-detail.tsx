import { LoadingComponent } from '@ekidpro/ui.loading';
import { Portlet, PortletBody, PortletHeader } from '@ekidpro/ui.portlet';
import AvatarDefault from 'assets/images/default-avatar.png';
import ImageNoData from 'assets/images/img-no-data.png';
import axios from 'axios';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { EventType } from 'types/event.type';
import { formatThousand } from 'utils/helper';
import { MOCK_DOMAIN } from '__mocks__/server';
import { EventTabContent } from './event-detail-tab/event-detail.tab-content';
import { EventTabControl } from './event-detail-tab/event-detail.tab-control';
import { EventDetailStyle } from './event-detail.style';

export const EventDetail: React.FC = () => {
  const [eventDetail, setEventDetail] = useState<EventType | undefined | null>(undefined);
  const eventId = get(useParams(), 'id');

  const getEventDetail = useCallback((eventId: number | string) => {
    axios
      .get(`${MOCK_DOMAIN}/event/1`)
      .then((response) => {
        const { data, message, ok } = response.data;
        if (!ok || response.status > 400) {
          throw new Error(message || 'Không thể lấy thông tin sự kiện');
        }
        setEventDetail(data);
      })
      .catch((e) => toast.error(e.message, { autoClose: false }));
  }, []);

  useEffect(() => {
    if (eventId) {
      getEventDetail(eventId);
    }
  }, [eventId, getEventDetail]);

  if (typeof eventDetail === 'undefined') {
    return (
      <div>
        <Helmet>
          <title>CMS | Chi tiết sự kiện</title>
        </Helmet>
        <div className="shadow-none">
          <div className="bg-white">
            <LoadingComponent />
          </div>
          <div className="mt-10 bg-white">
            <LoadingComponent />
          </div>
        </div>
      </div>
    );
  }

  if (eventDetail === null) {
    return (
      <Portlet className="shadow-none">
        <Helmet>
          <title>CMS | Chi tiết sự kiện</title>
        </Helmet>
        <PortletHeader title="Chi tiết sự kiện" />
        <PortletBody className="p-10 flex items-center justify-center shadow-none">
          <img src={ImageNoData} alt="no data" />
        </PortletBody>
      </Portlet>
    );
  }

  const { name, id, startTime, description, reward, host } = eventDetail;

  return (
    <EventDetailStyle>
      <Helmet>
        <title>CMS | Chi tiết sự kiện</title>
      </Helmet>

      <Portlet className="shadow-none">
        <PortletBody>
          <div className="px-8 pt-8">
            <div key={`event_${id}`} className="lg:flex lg:items-center">
              <div className="bg-blue-400 px-5 py-2 lg:py-14 lg:px-14 event-info-time">
                <span className="block text-center font-semibold text-lg lg:text-3xl text-white whitespace-nowrap">
                  {dayjs(startTime).format('HH : mm')}
                </span>
              </div>

              <div className="lg:ml-10 grid grid-cols-2 gap-x-10 lg:px-10">
                <div className="col-span-2 lg:col-span-1">
                  <div className="uppercase font-bold text-xl mt-5 lg:mt-0">{name}</div>

                  <div className="lg:flex lg:items-center mt-5">
                    <div className="flex items-center">
                      <i className="fas fa-gem mr-2 text-red-500" />
                      <span className="font-semibold text-gray-500">{formatThousand.format(reward)}</span>
                    </div>

                    <div className="flex items-center lg:ml-10 mt-2 lg:mt-0">
                      <i className="far fa-clock mr-2 text-green-500" />
                      <span className="font-semibold text-gray-500">30 phút</span>
                      {/* <span>{dayjs(waitingTime).format('DD/MM/YYYY')}</span> */}
                    </div>

                    <div className="flex items-center lg:ml-10 mt-2 lg:mt-0">
                      <i className="fas fa-calendar-week mr-2 text-purple-500" />
                      <span className="font-semibold text-gray-500">{dayjs(startTime).format('DD/MM/YYYY')}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-5">
                    <img src={AvatarDefault} className="w-10 h-10 rounded-full" alt="host" />
                    <span className="font-semibold block ml-4">{host.fullname}</span>
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-1 mt-5 lg:mt-0">
                  <div className="flex items-center">
                    <i className="far fa-comments mr-2" />
                    <span className="font-semibold">Ghi chú</span>
                  </div>
                  <div className="event-description mt-3 italic opacity-70 overflow-hidden overflow-ellipsis text-justify">
                    {description}
                  </div>
                </div>
              </div>
            </div>
            <EventTabControl />
          </div>
        </PortletBody>
      </Portlet>

      <div className="mt-10">
        <EventTabContent />
      </div>
    </EventDetailStyle>
  );
};
