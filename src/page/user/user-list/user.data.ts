import { ColumnsProps, Loader } from '@ekidpro/table';
import axios from 'axios';
import { UserType } from 'types/user.type';
import { snakeToCamelCase } from 'utils/dirty-map';
import { MOCK_DOMAIN } from '__mocks__/server';
import { FILTER_KEY } from './user.type';

export const userColumns: ColumnsProps[] = [
  { field: 'id', title: '#' },
  { field: 'fullname', title: 'Họ và tên' },
  { field: 'birthday', title: 'Ngày sinh' },
  { field: 'phone', title: 'Liên hệ' },
  { field: 'type', title: 'Loại' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'created_at', title: 'Ngày tạo' },
  { field: 'updated_at', title: 'Ngày chỉnh sửa' },
  { field: 'action', title: 'Hành động' },
];

type Keys = keyof typeof FILTER_KEY;
type Values = typeof FILTER_KEY[Keys];

export const getUserLoader = (type?: string) => {
  const userLoader: Loader<UserType, Partial<Record<Values, string | string[]>>> = {
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
        .get(`${MOCK_DOMAIN}/users/`, {
          params: {
            ...filter,
            page,
            limit: size,
            sort: valueSort,
            type,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          const { ok, data, message, pagination } = res;
          if (!ok) {
            throw new Error(message || `Không thể lấy danh sách người dùng`);
          }

          return {
            data: snakeToCamelCase(data) as UserType[],
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
  return userLoader;
};
