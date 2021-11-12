import { DatePicker } from '@ekidpro/ui';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { hasError } from 'utils/has-error-formik';
import { CreateEventValues, InputFieldProps } from './event-create.types';

export function SelectTimeField(props: InputFieldProps) {
  const formik = useFormikContext<CreateEventValues>();
  const { field, title, required } = props;

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-10">
      <label htmlFor={field} className="mb-2 block font-semibold col-span-3 md:col-span-1">
        {title}
        {required && <span className="text-red-500 ml-2 font-semibold">*</span>}
      </label>
      <div className="col-span-3 md:col-span-2">
        <DatePicker
          mode="single"
          zIndex={60}
          InputComponent={
            <input
              name={field}
              id={field}
              type="text"
              value={`${formik.values[field]}`}
              className={clsx('outline-none px-3 py-2 rounded w-full border focus:border-blue-500', {
                'border-red-500 border': hasError(formik, field),
                'border-gray-300': !hasError(formik, field),
              })}
            />
          }
          onChange={(dates) => {
            if (Array.isArray(dates) && dates.length > 0 && dates[0] instanceof Date) {
              const value = dayjs(dates[0]).format('YYYY-MM-DD').valueOf();
              if (Number(value) !== formik.values[field]) {
                formik.setFieldValue(field, value);
              }
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
