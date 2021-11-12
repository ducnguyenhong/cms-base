import axios from 'axios';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import { useState } from 'react';
import { AsyncPaginate, OptionsList } from 'react-select-async-paginate';
import { toast } from 'react-toastify';
import { hasError } from 'utils/has-error-formik';
import { MOCK_DOMAIN } from '__mocks__/server';
import { AsyncSelectProps, CreateApplicationValues } from './application-create.types';

export interface UserItem {
  id: number;
  fullName: string;
}

export interface ValueType {
  value: number | string;
  label: string;
}

const optionsUser = (
  inputValue: string,
  options: OptionsList<{ value: number; label: string }>,
  additional: unknown
) => {
  const page = get(additional, 'page');

  return axios
    .get(`${MOCK_DOMAIN}/users/`, {
      params: {
        page,
        offset: 10,
        keyword: inputValue,
      },
    })
    .then((response) => {
      const { data, message, ok, pagination } = response.data;
      if (!ok || response.status > 400) {
        throw new Error(message || 'Lấy danh sách người dùng thất bại');
      }
      const dataTransform: UserItem[] =
        data && data.length > 0
          ? data.map((item: Record<string, unknown>) => {
            return {
              id: get(item, 'id'),
              fullName: get(item, 'fullname'),
            };
          })
          : [];

      const pageSize = get(pagination, 'limit') ?? 10;
      const currentPage = get(pagination, 'page') ?? 1;
      const totalItems = get(pagination, 'total_items') ?? 1;

      const items: { value: number; label: string; data: UserItem }[] = dataTransform.map((i) => {
        return {
          value: i.id,
          label: `${i.fullName} - ID: ${i.id}`,
          data: i,
        };
      });

      return {
        options: items,
        hasMore: currentPage * pageSize < totalItems,
        additional: {
          page: currentPage + 1,
        },
      };
    })
    .catch((error) => {
      toast.error(error.message, { autoClose: false });
      return {
        options: [],
        hasMore: false,
        additional: {
          page: page,
        },
      };
    });
};

export function AsyncSelectField(props: AsyncSelectProps) {
  const formik = useFormikContext<CreateApplicationValues>();
  const { field, title, required, defaultValue, isMulti } = props;
  const defaulOption = (defaultValue && defaultValue.id) ? {
    value: `${defaultValue.id}`,
    label: defaultValue.fullName,
  } : undefined

  const [valueUser, setValueUser] = useState<ValueType[] | ValueType | undefined | null>(defaulOption ? [defaulOption] : undefined);
  return (
    <div className="grid grid-cols-3 gap-x-10 mb-10">
      <label htmlFor={field} className="mb-2 block font-semibold col-span-3 md:col-span-1">
        {title}
        {required && <span className="text-red-500 ml-2 font-semibold">*</span>}
      </label>
      <div className="col-span-3 md:col-span-2">
        <AsyncPaginate
          defaultOptions
          isClearable
          isMulti={isMulti}
          additional={{ page: 1 }}
          loadOptions={optionsUser}
          placeholder="Select..."
          value={valueUser}
          // formatOptionLabel={formatOptionLabel}
          onChange={(e) => {
            if (e && !isMulti) {
              formik.setFieldValue(field, e.value);
              setValueUser({
                value: e.value,
                label: `${e.label}`,
              });
            }
            if (e && isMulti) {
              if (e.length) {
                const dataId = e.map((item: any) => {
                  return item.value
                })
                const data = e.map((item: any) => {
                  return { value: item.value, label: item.label }
                })
                formik.setFieldValue(field, dataId);
                setValueUser(data);
              }
            }

            if (!e || (!e.length && isMulti)) {
              formik.setFieldValue(field, null);
              setValueUser(undefined);
            }
          }}
        />
      </div>
      {hasError(formik, field) && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 text-sm mt-1 col-span-3 md:col-span-2">{formik.errors[field]}</div>
        </>
      )}
    </div>
  );
}
