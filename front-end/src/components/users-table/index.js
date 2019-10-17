import React from "react";
import { StatusCode } from "../../utils.js";
import Header from "../header";
import UsersList from "../user-list";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class UsersTable extends React.Component {
  state = { users: [], numberOfUsers: 0, latestUpdateTimestamp: undefined };

  componentDidMount() {
    setInterval(this.refetchUsers, 15000);
  }

  refetchUsers = ({ withCache = true } = {}) => {
    const { latestUpdateTimestamp } = this.state;
    fetch(
      `${API_ORIGIN}/users?latestUpdateTimestamp=${
        withCache ? latestUpdateTimestamp : 0
      }`
    )
      .then(async response => {
        if (response.status === StatusCode.NOT_MODIFIED) {
          return;
        }
        const {
          allUsers,
          numberOfUsers,
          latestUpdateTimestamp
        } = await response.json();
        this.setState({
          users: allUsers,
          numberOfUsers,
          latestUpdateTimestamp
        });
      })
      .catch(error => console.error(error));
  };

  onDeleteUser = userId => {
    fetch(`${API_ORIGIN}/user?id=${userId}`, {
      method: "DELETE"
    }).then(() => this.refetchUsers({ withCache: false }));
  };

  render() {
    const { users } = this.state;
    return (
      <div className={styles.wrapper}>
        <Header />
        <span className={styles.tableHeader}>
          <div className={styles.nameHeader}>Name</div>
          <div className={styles.surnameHeader}>Surname</div>
          <div className={styles.countryHeader}>Country</div>
          <div className={styles.genderHeader}>Gender</div>
          <div className={styles.ageHeader}>Age</div>
        </span>
        <UsersList users={users} onDeleteUser={this.onDeleteUser} />
      </div>
    );
  }
}

export default UsersTable;
