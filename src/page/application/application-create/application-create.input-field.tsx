import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { hasError } from 'utils/has-error-formik';
import { CreateApplicationValues, InputFieldProps } from './application-create.types';

export function InputField(props: InputFieldProps) {
  const { field, title, required, placeHolder, inputType = 'text', disabled } = props;
  const formik = useFormikContext<CreateApplicationValues>();
  const value = get(formik.values, field) ? `${get(formik.values, field)}` : undefined;

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-7">
      <label htmlFor={field} className="mb-2 font-semibold flex items-center col-span-3 md:col-span-1">
        {title ?? field}
        {required && <span className="text-red-500 ml-2 font-semibold">*</span>}
      </label>
      <div className="col-span-3 md:col-span-2">
        {inputType === 'textarea' ? (
          <textarea
            name={field}
            rows={2}
            id={field}
            disabled={disabled}
            value={value}
            placeholder={placeHolder}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={clsx('outline-none px-3 py-2 rounded w-full border focus:border-blue-500', {
              'border-red-500 border': hasError(formik, field),
              'border-gray-300': !hasError(formik, field),
            })}
          />
        ) : (
          <input
            name={field}
            id={field}
            type={inputType}
            value={value}
            disabled={disabled}
            placeholder={placeHolder}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={clsx('outline-none px-3 py-2 rounded w-full border focus:border-blue-500', {
              'border-red-500 border': hasError(formik, field),
              'border-gray-300': !hasError(formik, field),
            })}
          />
        )}
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
