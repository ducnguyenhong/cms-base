import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FormatOptionLabelMeta } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';

function LoadingIndicator() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white m-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-50 text-gray-300" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
      <path
        className="opacity-75 text-blue-400"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export const components = { LoadingIndicator };

interface AsyncItems {
  label: string;
  value: string;
}

interface GeneralSelectProps<T extends AsyncItems> {
  isMulti?: boolean;
  isClearable?: boolean;
  defaultSelected?: string[];
  defaultValue?: T[];
  cacheUniqs?: any[];

  load: (key: string, page: number, pageSize: number) => Promise<T[]>;
  findById?: (ids: string) => Promise<T>;

  formatOptionLabel?: (data: T, meta?: FormatOptionLabelMeta<T, boolean>) => JSX.Element;
  onChange?: (data?: T[]) => void;
}

function defaultFormatLabel(data: AsyncItems) {
  return <div className="text-gray-700">{data.label}</div>;
}

export function GeneralAsyncSelect<T extends AsyncItems>({
  isMulti,
  isClearable,
  defaultSelected,
  load,
  findById,
  formatOptionLabel,
  onChange,
  defaultValue,
  cacheUniqs,
}: GeneralSelectProps<T>) {
  const [selectedValues, setSelectedValues] = useState<T[] | undefined | null>(defaultValue || undefined);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const cleanup = () => {
      cancelTokenSource.cancel();
    };

    if (typeof defaultSelected === 'undefined' || defaultSelected.length === 0) {
      setSelectedValues(null);
      return cleanup;
    }

    if (typeof defaultSelected !== 'undefined' && typeof selectedValues !== 'undefined') {
      return cleanup;
    }

    if (findById) {
      Promise.all(defaultSelected.map((o) => findById(o)))
        .catch((err) => {
          if (axios.isCancel(err)) {
            return null;
          }

          console.error(`Error on get current value`, err);
          return [];
        })
        .then((data) => {
          if (data) {
            setSelectedValues(data);
          }
        });
    }
  }, [defaultSelected, findById, selectedValues]);

  const localOnChange = useCallback(
    (data?: T | T[]) => {
      if (typeof data === 'undefined' || data === null) {
        setSelectedValues(undefined);
        if (onChange) {
          onChange(undefined);
        }
        return;
      }

      const arr = Array.isArray(data) ? data : [data];
      setSelectedValues(arr);
      if (onChange) {
        onChange(arr);
      }
    },
    [onChange],
  );

  const loadOptions: LoadOptions<T, unknown> = async (search: string, _, unknownAdditional) => {
    const additional = unknownAdditional as { page: number; pageSize: number };
    const page = additional?.page ?? 1;
    const pageSize = additional?.pageSize ?? 20;

    const options = await load(search, page, pageSize).catch((err) => {
      console.error(`Error on fetching select's option`, err);
      return [];
    });
    const hasMore = options.length >= pageSize;

    return {
      options,
      hasMore,
      additional: {
        page: options.length < pageSize ? page : page + 1,
        pageSize: pageSize,
      },
    };
  };

  return (
    <AsyncPaginate
      value={selectedValues}
      // defaultOptions
      className="z-10"
      isMulti={isMulti}
      debounceTimeout={300}
      isClearable={isClearable}
      cacheUniqs={cacheUniqs}
      loadOptions={loadOptions}
      components={components}
      placeholder="Select..."
      formatOptionLabel={formatOptionLabel ?? defaultFormatLabel}
      additional={{ page: 1, pageSize: 20 }}
      onChange={localOnChange}
    />
  );
}
