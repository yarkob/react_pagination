import { FC } from 'react';

interface Props {
  items: string[];
  currentPage: number;
  onPageChange: (newPage: number) => VoidFunction;
  pages: number[];
}

export const Pagination: FC<Props> = ({
  items,
  currentPage,
  onPageChange,
  pages,
}) => {
  const isLastPage = currentPage === pages.length;
  const isFirstPage = currentPage === 1;

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage <= 1 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={onPageChange(isFirstPage ? currentPage : currentPage - 1)}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page && 'active'}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage >= pages.length && 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={onPageChange(isLastPage ? currentPage : currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map(num => (
          <li key={num} data-cy="item">
            {num}
          </li>
        ))}
      </ul>
    </>
  );
};
