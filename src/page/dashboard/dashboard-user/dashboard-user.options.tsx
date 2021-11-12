import clsx from 'clsx';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ModalOptionsProps {
  options: OptionType[];
  onSelectOption?: (id: number) => void;
}

export interface OptionType {
  id: number;
  icon?: string;
  title: string | React.ReactElement | React.FC | JSX.Element;
  route?: string;
  isActive: boolean;
}

const ModalOptionsStyle = styled.div`
  .dialog-modal-options {
    box-shadow: 0 0 50px 0 rgb(82 63 105 / 10%);
  }
`;

export const ModalOptions: React.FC<ModalOptionsProps> = memo((props) => {
  const { options, onSelectOption } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: any) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [optionsRef]);

  return (
    <div
      className={clsx({
        'relative w-9 h-9 rounded duration-300 hover:bg-blue-50': true,
        'bg-blue-50': visible,
      })}
      ref={optionsRef}
    >
      <ModalOptionsStyle className="w-full h-full">
        <div
          title="Options"
          onClick={() => setVisible(!visible)}
          className="cursor-pointer w-full h-full flex justify-center items-center"
        >
          <span className="font-bold text-2xl block -mt-2.5 text-blue-400">...</span>
        </div>
        {visible && (
          <div className="z-10 dialog-modal-options absolute rounded top-10 right-0 w-60 bg-white">
            <div className="p-2 overflow-hidden">
              {options &&
                options.length > 0 &&
                options.map((item) => {
                  const { icon, title, route, id, isActive } = item;
                  if (!isActive) {
                    return null;
                  }
                  const tmp = (
                    <>
                      {item.icon && <i className={`${icon} block mr-3 w-4 h-4`} />}
                      <span className="block text-sm font-semibold">{title}</span>
                    </>
                  );
                  return route ? (
                    <Link
                      to={route}
                      className="flex text-gray-600 group cursor-pointer px-3 py-3 items-center hover:text-blue-500 hover:bg-blue-50 duration-300 rounded"
                      key={`modal_option_${id}`}
                    >
                      {tmp}
                    </Link>
                  ) : (
                    <div
                      onClick={() => {
                        setVisible(false);
                        onSelectOption && onSelectOption(id);
                      }}
                      className="flex group text-gray-600 cursor-pointer px-3 py-3 items-center hover:text-blue-500 hover:bg-blue-50 duration-300 rounded-sm"
                      key={`modal_option_${id}`}
                    >
                      {tmp}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </ModalOptionsStyle>
    </div>
  );
});
