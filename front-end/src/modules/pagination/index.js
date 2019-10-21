import React from 'react';
import styles from './styles.module.scss';

const Pagination = ({ page, usersPerPage, numberOfUsers, onUsersPerPageChange, onPageChange }) => {
  const startPage = (page - 1) * usersPerPage + 1;
  const endPage = startPage + usersPerPage - 1;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

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
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <button disabled={page === pageNumbers.length} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
