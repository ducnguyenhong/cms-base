import clsx from 'clsx';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ModalOptionsProps {
  options: DataModalOptions[];
  onSelectOption?: (id: number) => void;
}

export interface DataModalOptions {
  id: number;
  icon?: string;
  title: string | React.ReactElement | React.FC | JSX.Element;
  route?: string;
  isActive: boolean;
}

const ModalOptionsStyle = styled.div`
  .dialog-modal-options {
    box-shadow: 0px 2px 10px -4px rgb(0 0 0 / 75%);
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
        'relative w-9 h-9 rounded hover:bg-blue-500 duration-300': true,
        'bg-blue-500': visible,
        'bg-blue-400': !visible,
      })}
      ref={optionsRef}
    >
      <ModalOptionsStyle className="w-full h-full">
        <div
          title="Options"
          onClick={() => setVisible(!visible)}
          className="cursor-pointer w-full h-full flex justify-center items-center"
        >
          <span className="font-bold text-2xl block -mt-2.5 text-white">...</span>
        </div>
        {visible && (
          <div className="z-50 dialog-modal-options absolute rounded top-10 right-0 w-72 bg-white">
            <div className="px-6 py-3">
              <span className="uppercase font-semibold">Options</span>
            </div>
            <hr />
            <div className="py-3 overflow-hidden">
              {options &&
                options.length > 0 &&
                options.map((item) => {
                  const { icon, title, route, id, isActive } = item;
                  if (!isActive) {
                    return null;
                  }
                  const tmp = (
                    <>
                      {item.icon && <i className={`${icon} block mr-4 w-4 h-4`} />}
                      <span className="block font-medium group-hover:font-semibold duration-300">{title}</span>
                    </>
                  );
                  return route ? (
                    <Link
                      to={route}
                      className="flex group cursor-pointer px-6 py-3 items-center hover:bg-blue-200 duration-300 rounded-sm"
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
                      className="flex group cursor-pointer px-6 py-3 items-center hover:bg-blue-200 duration-300 rounded-sm"
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
