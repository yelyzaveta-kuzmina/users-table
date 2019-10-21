import React from 'react';
import styles from './styles.module.scss';

const Pagination = ({ page, usersPerPage, numberOfUsers, onUsersPerPageChange, onPageChange }) => {
  const pageNumbers = Math.ceil(numberOfUsers / usersPerPage);
  const firstUserOnPage = (page - 1) * usersPerPage + 1;
  const lastUserOnPage = firstUserOnPage + usersPerPage - 1;

  return (
    <div className={styles.pagination}>
      <select
        value={usersPerPage}
        onChange={(event) => onUsersPerPageChange(Number(event.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      Showing: {firstUserOnPage}-{Math.min(lastUserOnPage, numberOfUsers)}
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <button disabled={page === pageNumbers} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
