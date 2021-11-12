import { useFormikContext } from 'formik';
import { useState } from 'react';
import Select from 'react-select';
import { hasError } from 'utils/has-error-formik';
import { CreateEventValues } from './event-create.types';

interface OptionType {
  value: string;
  label: string;
}

export const DataSelectTimes = [
  { value: '15', label: '15 phút' },
  { value: '15', label: '30 phút' },
  { value: '15', label: '45 phút' },
  { value: '15', label: '1 tiếng' },
  { value: '15', label: '1 tiếng 30 phút' },
  { value: '15', label: '2 tiếng' },
];

export function SelectWaitingTimeField(props: {
  defaulType?: { value: string; label: string };
  isExistResult?: boolean;
  isExistQuestion?: boolean;
  isUpdateLesson?: boolean;
}) {
  const { defaulType } = props;
  const formik = useFormikContext<CreateEventValues>();
  const [waitingTime, setWaitingTime] = useState<OptionType | undefined>(defaulType);

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-10">
      <label htmlFor="waitingTime" className="mb-2 block font-semibold col-span-3 md:col-span-1">
        Thời gian chờ
        <span className="text-red-500 ml-2 font-semibold">*</span>
      </label>
      <div className="col-span-3 md:col-span-2">
        <Select
          options={DataSelectTimes}
          value={waitingTime}
          placeholder="Chọn..."
          onChange={(e) => {
            if (e) {
              formik.setFieldValue('waitingTime', e.value);
              setWaitingTime(e);
            }
          }}
        />
      </div>
      {hasError(formik, 'waitingTime') && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 text-sm mt-1 col-span-3 md:col-span-2">{formik.errors.waitingTime}</div>
        </>
      )}
    </div>
  );
}
