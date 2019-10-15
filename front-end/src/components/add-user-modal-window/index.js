import React from "react";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class AddUserModalWindow extends React.Component {
  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSendContent = () => {
    const { name, surname } = this.state;
    if (name && surname) {
      fetch(`${API_ORIGIN}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname
        })
      });
    } else {
      console.log("fill in missing fields");
    }
  };

  render() {
    return (
      <div className={styles.modalWindow}>
        <div className={styles.inputs}>
          <input
            className={styles.nameInput}
            onChange={this.onInputChange}
            name="name"
            placeholder="name"
          ></input>
          <input
            className={styles.surnameInput}
            onChange={this.onInputChange}
            name="surname"
            placeholder="surname"
          ></input>
        </div>
        <button className={styles.submitButton} onClick={this.onSendContent}>
          Submit
        </button>
      </div>
    );
  }
}

export default AddUserModalWindow;
