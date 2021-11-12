import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { hasError } from 'utils/has-error-formik';
import { CreateUserValues } from './user-create.types';

const DropStyle = styled.div`
  .drop-area {
    min-height: 100px;
  }
`;

interface GetColorProps {
  isDragAccept?: boolean;
  isDragReject?: boolean;
  isDragActive?: boolean;
}

const getColor = (props: GetColorProps) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#E5E5E5';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: GetColorProps) => getColor(props)};
  border-style: dashed;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export function AvatarField() {
  const formik = useFormikContext<CreateUserValues>();
  const { values } = formik;

  let previewAvatar = values.avatar || '';
  if (typeof previewAvatar !== 'string') {
    previewAvatar = values.avatar ? URL.createObjectURL(values.avatar) : '';
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        formik.setFieldValue('avatar', acceptedFiles[0]);
      } else {
        formik.setFieldValue('avatar', undefined);
      }
    },
    [formik],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*',
    onDrop,
    maxFiles: 1,
  });

  const inputProps = getInputProps();

  return (
    <DropStyle className="grid grid-cols-3 gap-x-10 mb-7">
      <label htmlFor="avatar" className="mb-2 flex items-center font-semibold col-span-3 md:col-span-1">
        Ảnh đại diện
      </label>
      <div className="col-span-3 md:col-span-2">
        <div className="w-36 h-36 relative">
          {previewAvatar && (
            <button
              onClick={() => formik.setFieldValue('avatar', null)}
              className="absolute block -top-3 -right-3 bg-red-400 rounded-full text-white p-0.5 duration-300 hover:bg-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <Container
            className={clsx({
              'drop-area col-span-4 md:col-span-2 rounded bg-white cursor-pointer h-full flex items-center justify-center':
                true,
              'p-3': !previewAvatar,
              'p-0.5': previewAvatar,
            })}
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input {...inputProps} />
            {!previewAvatar && (
              <div>
                {isDragActive ? <p>Thả file vào đây ...</p> : <p>Kéo và thả file tại đây hoặc click để chọn file</p>}
              </div>
            )}

            {previewAvatar && (
              <div className="w-full overflow-hidden h-full">
                <img className="rounded bg-blue-100 w-full h-full object-cover" src={previewAvatar} alt="preview" />
              </div>
            )}
          </Container>
        </div>
      </div>

      {hasError(formik, 'avatar') && (
        <>
          <div className="col-span-1 hidden md:block"></div>
          <div className="text-red-500 text-sm mt-1 col-span-3 md:col-span-2">{formik.errors.avatar}</div>
        </>
      )}
    </DropStyle>
  );
}
