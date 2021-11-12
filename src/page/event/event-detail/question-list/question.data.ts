import { ColumnsProps, Loader } from '@ekidpro/table';
import axios from 'axios';
import { QuestionType } from 'types/question.type';
import { snakeToCamelCase } from 'utils/dirty-map';
import { MOCK_DOMAIN } from '__mocks__/server';
import { FILTER_KEY } from './question.type';

export const questionColumns: ColumnsProps[] = [
  { field: 'id', title: '#' },
  { field: 'question', title: 'Câu hỏi' },
  { field: 'answer', title: 'Câu trả lời' },
  { field: 'created_at', title: 'Ngày tạo' },
  { field: 'updated_at', title: 'Ngày cập nhật' },
  { field: 'action', title: 'Hành động', fixed: 'right' },
];

type Keys = keyof typeof FILTER_KEY;
type Values = typeof FILTER_KEY[Keys];

export const questionLoader: Loader<QuestionType, Partial<Record<Values, string | string[]>>> = {
  fetch: (input) => {
    const { filter, page, size, sort } = input;

    const defaultSort = sort || {};
    if (!('created_at' in defaultSort)) {
      defaultSort.created_at = 'desc';
    }

    const valueSort = Object.entries(defaultSort || {})
      .map((item) => {
        let curValue = '';
        const [field, value] = item;
        if (value === 'asc') {
          curValue = `${field} asc`;
        }
        if (value === 'desc') {
          curValue = `${field} desc`;
        }
        return curValue;
      })
      .filter((item) => item !== '')
      .join(',');

    return axios
      .get(`${MOCK_DOMAIN}/event/1/questions`, {
        params: {
          ...filter,
          page,
          limit: size,
          sort: valueSort,
        },
      })
      .then((res) => res.data)
      .then((res) => {
        const { ok, data, message, pagination } = res;
        if (!ok) {
          throw new Error(message || `Không thể lấy danh sách câu hỏi`);
        }

        return {
          data: snakeToCamelCase(data) as QuestionType[],
          pagination: {
            currentPage: pagination.page,
            perPage: pagination.limit,
            totalItems: pagination.total_items,
            totalPages: Math.ceil(pagination.total_items / pagination.limit),
          },
        };
      });
  },
  cancel: () => {
    // do something with this cancellation
  },
};
