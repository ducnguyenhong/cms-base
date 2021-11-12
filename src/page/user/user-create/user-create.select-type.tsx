import { useFormikContext } from 'formik';
import { useState } from 'react';
import Select from 'react-select';
import { hasError } from 'utils/has-error-formik';
import { CreateUserValues } from './user-create.types';

interface OptionType {
  value: string;
  label: string;
}

export const DataSelectTypes = [
  { value: 'APP_OWNER', label: 'App owner' },
  { value: 'EDITOR', label: 'Editor' },
  { value: 'HOST', label: 'Host' },
];

export function SelectTypeField(props: {
  defaulType?: { value: string; label: string };
  isExistResult?: boolean;
  isExistQuestion?: boolean;
  isUpdateLesson?: boolean;
}) {
  const { defaulType } = props;
  const formik = useFormikContext<CreateUserValues>();
  const [type, setType] = useState<OptionType | undefined>(defaulType);

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-10">
      <label htmlFor="type" className="mb-2 block font-semibold col-span-3 md:col-span-1">
        Loại tài khoản
        <span className="text-red-500 ml-2 font-semibold">*</span>
      </label>
      <div className="col-span-3 md:col-span-2">
        <Select
          options={DataSelectTypes}
          placeholder="Chọn..."
          value={type}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue('type', e.value);
              setType(e);
            }
          }}
        />
      </div>
      {hasError(formik, 'type') && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 text-sm mt-1 col-span-3 md:col-span-2">{formik.errors.type}</div>
        </>
      )}
    </div>
  );
}
