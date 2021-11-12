import { Toggle } from '@ekidpro/ui';
import { useFormikContext } from 'formik';
import { v4 as uuid } from 'uuid';
import { CreateEventValues } from './event-create.types';

export function StatusField() {
  const formik = useFormikContext<CreateEventValues>();

  return (
    <div className="grid grid-cols-3 gap-x-10 mb-4">
      <div className="col-span-1">
        <label className="font-semibold">Trạng thái</label>
      </div>
      <div className="col-span-2 flex items-center">
        <Toggle
          key={`${uuid()}`}
          defaultChecked={!!formik.values.status}
          onChange={(checked) => formik.setFieldValue('status', checked)}
        />
        <div className="ml-3">{formik.values.status ? 'Active' : 'Inactive'}</div>
      </div>

      {formik.touched.status && formik.errors.status && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 mt-1 col-span-2">{formik.errors.status}</div>
        </>
      )}
    </div>
  );
}
