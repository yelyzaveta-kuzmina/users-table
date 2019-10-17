import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { formatGender } from "../../utils.js";
import classNames from "classnames";
import styles from "./styles.module.scss";

const UsersList = ({ users, onDeleteUser }) => {
  return (
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
            <span className={styles.gender}>{formatGender(user.gender)}</span>
            <span className={styles.age}>{user.age}</span>
          </div>
          <button
            className={styles.removeButton}
            onClick={() => onDeleteUser(user._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
