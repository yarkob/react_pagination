import React, { useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const pageChange = (newPage: number) => () => setPage(newPage);

  const onChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  const { begin, end } = useMemo((): { begin: number; end: number } => {
    return {
      begin: perPage * (page - 1),
      end: Math.min(perPage * page, items.length),
    };
  }, [page, perPage]);

  const pages = getNumbers(1, Math.ceil(items.length / perPage));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${page} (items ${begin + 1} - ${end} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={onChangePerPage}
            defaultValue={'5'}
          >
            {[3, 5, 10, 20].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        items={items.slice(begin, end)}
        currentPage={page}
        onPageChange={pageChange}
        pages={pages}
      />
    </div>
  );
};

export default App;
