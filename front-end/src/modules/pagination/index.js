import React from 'react';

const Pagination = ({ page, usersPerPage, onUsersPerPageChange, onPageChange }) => {
  return (
    <div>
      <select value={usersPerPage} onChange={(event) => onUsersPerPageChange(event.target.value)}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      Showing: {(page - 1) * usersPerPage}-{(page - 1) * usersPerPage + usersPerPage}
      <button onClick={() => onPageChange(page - 1)}>Prev</button>
      <button onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
