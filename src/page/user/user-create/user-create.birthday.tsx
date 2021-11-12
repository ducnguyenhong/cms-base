import { DatePicker } from '@ekidpro/ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { hasError } from 'utils/has-error-formik';
import { CreateUserValues } from './user-create.types';

export function BirthdayField() {
  const formik = useFormikContext<CreateUserValues>();

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-10">
      <label htmlFor="birthday" className="mb-2 block font-semibold col-span-3 md:col-span-1">
        Ngày sinh
      </label>
      <div className="col-span-3 md:col-span-2">
        <DatePicker
          mode="single"
          zIndex={60}
          InputComponent={
            <input
              name="birthday"
              id="birthday"
              type="text"
              value={`${formik.values.birthday}`}
              className={clsx('outline-none px-3 py-2 rounded w-full border focus:border-blue-500', {
                'border-red-500 border': hasError(formik, 'birthday'),
                'border-gray-300': !hasError(formik, 'birthday'),
              })}
            />
          }
          onChange={(dates) => {
            if (Array.isArray(dates) && dates.length > 0 && dates[0] instanceof Date) {
              const value = dayjs(dates[0]).format('YYYY-MM-DD').valueOf();
              if (Number(value) !== formik.values.birthday) {
                formik.setFieldValue('birthday', value);
              }
            }
          }}
        />
      </div>
      {hasError(formik, 'birthday') && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 text-sm mt-1 col-span-3 md:col-span-2">{formik.errors.birthday}</div>
        </>
      )}
    </div>
  );
}
