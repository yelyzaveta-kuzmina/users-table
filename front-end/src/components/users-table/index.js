import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { StatusCode } from "../../utils.js";
import Header from "../header";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class UsersTable extends React.Component {
  state = { users: [], numberOfUsers: 0, latestUpdateTimestamp: undefined };

  componentDidMount() {
    setInterval(this.refetchUsers, 1000);
  }

  refetchUsers = () => {
    const { latestUpdateTimestamp } = this.state;
    fetch(`${API_ORIGIN}/users?latestUpdateTimestamp=${latestUpdateTimestamp}`)
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

  render() {
    const { users } = this.state;
    return (
      <div className={styles.wrapper}>
        <Header />
        <span className={styles.tableHeader}>
          <div className={styles.nameHeader}>Name</div>
          <div className={styles.surnameHeader}>Surname</div>
        </span>
        <div className={styles.table}>
          {users.map((user, index) => (
            <div key={index} className={styles.userRow}>
              <div className={styles.userDetails}>
                <span className={styles.firstname}>{user.name}</span>
                <span className={styles.surname}>{user.surname}</span>
              </div>
              <button className={styles.removeButton}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UsersTable;
