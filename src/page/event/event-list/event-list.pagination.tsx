import clsx from 'clsx';
import React, { useCallback } from 'react';

export interface PaginationType {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

interface PaginationProps {
  pagination: PaginationType;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { pagination } = props;
  const { page, totalPages } = pagination;

  const onNextLastPage = useCallback(() => {
    if (page === totalPages) {
      return;
    }
  }, [page, totalPages]);

  const onPrevFirstPage = useCallback(() => {
    if (page === 1) {
      return;
    }
  }, [page]);

  const onNextPage = useCallback(() => {
    if (page >= totalPages) {
      return;
    }
  }, [page, totalPages]);

  const onPrevPage = useCallback(() => {
    if (page <= 1) {
      return;
    }
  }, [page]);

  const listPage: number[] = [];

  for (let i = page - 2; i < page + 3; i++) {
    if (i > 0 && i <= totalPages && page <= totalPages) {
      if (page < 3) {
        listPage.push(i);
      } else if (page >= 3 && page <= totalPages - 3) {
        listPage.push(i);
      } else if (page > totalPages - 3) {
        listPage.push(i);
      }
    }
  }

  if (listPage.length < 2) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center">
        <span
          onClick={onPrevFirstPage}
          className={clsx({
            'text-gray-600 duration-300 rounded-lg mx-1 font-bold w-9 h-9 flex justify-center items-center': true,
            'cursor-not-allowed': page === 1,
            'cursor-pointer hover:bg-blue-500 hover:text-white': page !== 1,
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <span
          onClick={onPrevPage}
          className={clsx({
            'text-gray-600 duration-300 rounded-lg mx-1 font-bold w-9 h-9 flex justify-center items-center': true,
            'cursor-not-allowed': page <= 1,
            'cursor-pointer hover:bg-blue-500 hover:text-white': page > 1,
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        {listPage &&
          listPage.length > 0 &&
          listPage.map((item) => {
            return (
              <span
                key={`number_${item}`}
                onClick={() => {
                  console.log('ducnh');
                }}
                className={clsx({
                  'duration-300 w-9 h-9 mx-1 font-bold rounded-lg cursor-pointer flex justify-center items-center':
                    true,
                  'bg-blue-500 text-white': item === page,
                  'text-gray-600 hover:bg-blue-500 hover:text-white': item !== page,
                })}
              >
                {item}
              </span>
            );
          })}

        <span
          onClick={onNextPage}
          className={clsx({
            'text-gray-600 duration-300 rounded-lg mx-1 font-bold w-9 h-9 flex justify-center items-center': true,
            'cursor-not-allowed': page >= totalPages,
            'cursor-pointer hover:bg-blue-500 hover:text-white': page < totalPages,
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <span
          onClick={onNextLastPage}
          className={clsx({
            'text-gray-600 duration-300 rounded-lg mx-1 font-bold w-9 h-9 flex justify-center items-center': true,
            'cursor-not-allowed': page === totalPages,
            'cursor-pointer hover:bg-blue-500 hover:text-white': page !== totalPages,
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
