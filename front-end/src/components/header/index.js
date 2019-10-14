import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddUserModalWindow from "../add-user-modal-window";
import styles from "./styles.module.scss";

class Header extends React.Component {
  state = { isUserBeingAdded: false };

  onModalOpen = () => {
    this.setState({ isUserBeingAdded: true });
  };
  render() {
    const { isUserBeingAdded } = this.state;
    return (
      <div className={styles.header}>
        {isUserBeingAdded && <AddUserModalWindow />}
        <button className={styles.button} onClick={this.onModalOpen}>
          <FontAwesomeIcon
            className={styles.addRemoveIcon}
            icon={faPlusCircle}
          />
          Add
        </button>
      </div>
    );
  }
}

export default Header;
