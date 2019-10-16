import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { StatusCode } from "../../utils.js";
import Header from "../header";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

const formatGender = gender => {
  switch (gender) {
    case "male":
      return "♂";
    case "female":
      return "♀";
    default:
      return "-";
  }
};

class UsersTable extends React.Component {
  state = { users: [], numberOfUsers: 0, latestUpdateTimestamp: undefined };

  componentDidMount() {
    setInterval(this.refetchUsers, 1000);
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
        </span>
        <div className={styles.table}>
          {users.map((user, index) => (
            <div
              key={index}
              className={classNames(styles.userRow, {
                [styles.male]: user.gender === "male",
                [styles.female]: user.gender === "female"
              })}
            >
              <div className={styles.userDetails}>
                <span className={styles.firstname}>{user.name}</span>
                <span className={styles.surname}>{user.surname}</span>
                <span className={styles.country}>{user.country}</span>
                <span className={styles.gender}>
                  {formatGender(user.gender)}
                </span>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => this.onDeleteUser(user._id)}
              >
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
