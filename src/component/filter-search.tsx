import { useTableFilter } from '@ekidpro/table';
import { useState } from 'react';

function getDefault(val: string[] | undefined) {
  if (typeof val === 'undefined' || val.length === 0) {
    return '';
  }

  return val[0];
}

interface SearchProps {
  prefix: string;
  maxLength?: number;
}

export function SearchByKeyword(props: SearchProps) {
  const { prefix, maxLength } = props;
  const [keyword, setKeyword] = useTableFilter(prefix, 'keyword');
  const [value, setValue] = useState<string>(getDefault(keyword));
  const field = 'keyword';

  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1">
      <label className="block mb-1 font-medium">Search</label>
      <div className="relative">
        <input
          className="transition rounded border border-gray-300 py-1.5 pl-3 pr-7 w-full outline-none"
          type="text"
          value={value}
          placeholder="Enter..."
          name={field}
          maxLength={maxLength}
          id={field}
          onChange={(e) => setValue(e.target.value.trim())}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (!value) {
                if (getDefault(keyword)) {
                  setKeyword(undefined);
                }
                return;
              }
              setKeyword([value]);
            }
          }}
        />
        {value && (
          <i
            onClick={() => {
              setValue('');
              if (getDefault(keyword)) {
                setKeyword(undefined);
              }
            }}
            className="fas fa-times absolute cursor-pointer top-2.5 right-3 duration-300 text-gray-400 hover:text-gray-500"
          />
        )}
      </div>
    </div>
  );
}
