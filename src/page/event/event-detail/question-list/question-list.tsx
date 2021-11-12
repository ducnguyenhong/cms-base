import { ColumnsProps, Table } from '@ekidpro/table';
import { Portlet, PortletBody, PortletHeader } from '@ekidpro/ui';
import clsx from 'clsx';
import { Status } from 'component/column-status';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { get } from 'lodash';
import { useState } from 'react';
import { QuestionType } from 'types/question.type';
import { QuestionCreate } from '../question-create';
import QuestionAction from './question.action';
import { questionColumns, questionLoader } from './question.data';
import { PREFIX_QUESTION, QuestionProps } from './question.type';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

function renderColumn(data: QuestionType, columns: ColumnsProps) {
  switch (columns.field) {
    case 'id': {
      return (
        <div className={clsx('transition-all delay-75 font-semibold', 'hover:text-blue-500 hover:font-bold')}>
          {data.id}
        </div>
      );
    }

    case 'question': {
      return <div className="w-40 md:w-auto">{data.question}</div>;
    }

    case 'answer': {
      if (!data.answer || !data.answer.length) {
        return null;
      }

      return (
        <div className="w-40 md:w-auto">
          {data.answer.map((item) => {
            const { value, label, correct } = item;
            return (
              <div key={`answer_${label}`}>
                <span className="font-semibold">{label}: </span>
                <span
                  className={clsx({
                    'text-green-500': correct,
                  })}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    case 'status':
      return <Status active={data.status === 'ACTIVE'} />;

    case 'created_at': {
      if (!data.createdAt) {
        return null;
      }
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div>{dayjs(data.createdAt * 1000).format('lll')}</div>
          <div className="text-sm opacity-50">{dayjs(data.createdAt * 1000).toNow()}</div>
        </div>
      );
    }

    case 'updated_at': {
      if (!data.updatedAt) {
        return null;
      }

      return (
        <div className="flex flex-col whitespace-nowrap">
          <div>{dayjs(data.updatedAt * 1000).format('lll')}</div>
          <div className="text-sm opacity-50">{dayjs(data.updatedAt * 1000).toNow()}</div>
        </div>
      );
    }

    case 'action': {
      return <QuestionAction {...data} />;
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

export const QuestionList: React.FC<QuestionProps> = ({ prefix = PREFIX_QUESTION }) => {
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const Toolbar = () => {
    return (
      <button
        onClick={() => setShowCreate(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer duration-300"
      >
        <i className="fas fa-plus-circle mr-1.5" />
        <span className="font-medium">Tạo mới</span>
      </button>
    );
  };

  return (
    <Portlet className="shadow-none">
      <PortletHeader title="Danh sách câu hỏi" toolbar={<Toolbar />} />
      <PortletBody className="p-5">
        <Table loader={questionLoader} columns={questionColumns} render={renderColumn} prefix={prefix} />
      </PortletBody>
      <QuestionCreate show={showCreate} onClose={() => setShowCreate(false)} />
    </Portlet>
  );
};
