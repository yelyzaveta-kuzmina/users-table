import React from 'react';
import styles from './styles.module.scss';

const Pagination = ({ page, usersPerPage, onUsersPerPageChange, onPageChange }) => {
  const startPage = (page - 1) * usersPerPage + 1;
  const endPage = startPage + usersPerPage - 1;

  return (
    <div className={styles.pagination}>
      <select
        value={usersPerPage}
        onChange={(event) => onUsersPerPageChange(Number(event.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      Showing: {startPage}-{endPage}
      <button onClick={() => onPageChange(page - 1)}>Prev</button>
      <button onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
