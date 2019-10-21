import React from 'react';
import { StatusCode, toggleSortingDirection } from '../../utils.js';
import Header from '../header';
import UsersList from '../../components/user-list';
import PaginationModule from '../pagination';
import classNames from 'classnames';
import styles from './styles.module.scss';

const API_ORIGIN = process.env.API_ORIGIN || 'http://localhost:8080';

class UsersTable extends React.Component {
  state = {
    users: [],
    numberOfUsers: 0,
    sortBy: 'name',
    sortingDirection: 'asc',
    currentPage: 1,
    usersPerPage: 5
  };

  componentDidMount() {
    this.refetchUsers();
    setInterval(this.refetchUsers, 1000);
  }

  refetchUsers = () => {
    const { sortingDirection, sortBy, currentPage, usersPerPage } = this.state;
    fetch(
      `${API_ORIGIN}/users?sortingDirection=${sortingDirection}&sortBy=${sortBy}&page=${currentPage}&usersPerPage=${usersPerPage}`
    )
      .then(async (response) => {
        if (response.status === StatusCode.NOT_MODIFIED) {
          return;
        }
        const { users, numberOfUsers } = await response.json();
        this.setState({
          users,
          numberOfUsers
        });
      })
      .catch((error) => console.error(error));
  };

  onSortByChange = (sortBy) => {
    const direction =
      sortBy === this.state.sortBy ? toggleSortingDirection(this.state.sortingDirection) : 'asc';

    this.setState({ sortBy, sortingDirection: direction }, this.refetchUsers);
  };

  onDeleteUser = (userId) => {
    fetch(`${API_ORIGIN}/user?id=${userId}`, {
      method: 'DELETE'
    }).then(() => this.refetchUsers({ withCache: false }));
  };

  onPageChange = (page) => {
    if (this.state.page === 1) {
      return this.state.page;
    }

    this.setState({ currentPage: page });
  };
  onUsersPerPageChange = (usersPerPage) => this.setState({ usersPerPage });

  render() {
    const {
      users,
      sortingDirection,
      sortBy,
      currentPage,
      usersPerPage,
      numberOfUsers
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <Header />
        <span className={styles.tableHeader}>
          <div className={styles.nameHeader}>
            <button
              className={classNames(styles.ascArrowDirection, {
                [styles.descArrowDirection]: sortingDirection === 'desc' && sortBy === 'name'
              })}
              onClick={() => this.onSortByChange('name')}>
              &darr;
            </button>
            Name
          </div>
          <div className={styles.surnameHeader}>Surname</div>
          <div className={styles.countryHeader}>Country</div>
          <div className={styles.genderHeader}>Gender</div>
          <div className={styles.ageHeader}>
            <button
              className={classNames(styles.ascArrowDirection, {
                [styles.descArrowDirection]: sortingDirection === 'desc' && sortBy === 'age'
              })}
              onClick={() => this.onSortByChange('age')}>
              &darr;
            </button>
            Age
          </div>
        </span>
        <UsersList users={users} onDeleteUser={this.onDeleteUser} />
        <PaginationModule
          page={currentPage}
          usersPerPage={usersPerPage}
          numberOfUsers={numberOfUsers}
          onPageChange={this.onPageChange}
          onUsersPerPageChange={this.onUsersPerPageChange}
        />
      </div>
    );
  }
}

export default UsersTable;
