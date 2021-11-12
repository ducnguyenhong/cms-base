import { useFormikContext } from 'formik';
import { useState } from 'react';
import Select from 'react-select';
import { hasError } from 'utils/has-error-formik';
import { CreateQuestionValues } from './question-create.types';

interface OptionType {
  value: string;
  label: string;
}

export const DataSelectCorrectAnswer = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
];

export function SelectCorrectAnswer(props: {
  defaulType?: { value: string; label: string };
  isExistResult?: boolean;
  isExistQuestion?: boolean;
  isUpdateLesson?: boolean;
}) {
  const { defaulType } = props;
  const formik = useFormikContext<CreateQuestionValues>();
  const [correctAnswer, setCorrectAnswer] = useState<OptionType | undefined>(defaulType);

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-5">
      <label htmlFor="correctAnswer" className="mb-2 block font-semibold col-span-3 md:col-span-1">
        Đáp án đúng
      </label>
      <div className="col-span-3 md:col-span-2">
        <Select
          options={DataSelectCorrectAnswer}
          placeholder="Chọn..."
          value={correctAnswer}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue('correctAnswer', e.value);
              setCorrectAnswer(e);
            }
          }}
        />
      </div>
      {hasError(formik, 'correctAnswer') && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 text-sm mt-1 col-span-3 md:col-span-2">{formik.errors.correctAnswer}</div>
        </>
      )}
    </div>
  );
}
