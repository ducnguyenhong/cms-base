import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface InputProps {
  id: string;
  title: string;
  error?: string;
  disabled?: boolean;
}

export const Input = styled.input`
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #f3f4f6 inset;
  }
  &:-webkit-autofill:hover {
    -webkit-box-shadow: 0 0 0 30px #e0e7ff inset;
  }
`;

export const PasswordComponent: React.FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { id, error, title, disabled, ...args } = props;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="grid grid-cols-3">
      <div className="md:col-span-1 col-span-3 mb-2">
        <label className="flex items-center h-full font-semibold">
          {title}
          <span className="text-red-500 ml-1">*</span>
        </label>
      </div>
      <div className="md:col-span-2 col-span-3 ">
        <div
          className={`group group-hover:bg-blue-100 group-focus:bg-indigo-100 rounded w-full text-gray-700 leading-tight 
            ${error ? 'border border-red-500' : 'border-none'} flex`}
        >
          <div className="pb-1 w-10 px-6 bg-gray-100 flex justify-center items-center border-r-0 rounded-l group-hover:bg-blue-100 group-focus:bg-indigo-100">
            <i className="fa fa-lock mt-1 opacity-50" />
          </div>
          <Input
            {...args}
            id={id}
            className={`bg-gray-100 rounded w-full py-3 text-gray-700 leading-tight 
                          ${error ? 'border-red-600' : 'border-gray-300'} 
                          focus:outline-none group-hover:bg-blue-100 group-focus:bg-indigo-100`}
            type={passwordShown ? 'text' : 'password'}
            disabled={disabled}
          />
          <div className="pb-1 w-10 px-6 bg-gray-100 flex justify-center items-center border-r-0 rounded-l group-hover:bg-blue-100 group-focus:bg-indigo-100">
            <i
              className={`${passwordShown ? 'fas fa-eye-slash' : 'fa fa-eye'} mt-1 opacity-50`}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        {error ? <div className="text-red-500 text-sm">{error}</div> : null}
      </div>
    </div>
  );
};
