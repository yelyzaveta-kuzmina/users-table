import React from "react";
import Autocomplete from "../autocomplete";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class AddUserModalWindow extends React.Component {
  state = {};

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSendContent = props => {
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
      }).then(this.props.onClose);
    } else {
      window.alert("Fill in missing fields");
    }

    this.setState({
      hasContentBeenSent: true
    });
  };

  render() {
    return (
      <div className={styles.modalWindow}>
        <Autocomplete />
        <div className={styles.inputs}>
          <input
            autoComplete="off"
            className={styles.nameInput}
            onChange={this.onInputChange}
            name="name"
            placeholder="name"
          ></input>
          <input
            autoComplete="off"
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
