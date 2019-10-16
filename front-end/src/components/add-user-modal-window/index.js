import React from "react";
import Autocomplete from "../autocomplete";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class AddUserModalWindow extends React.Component {
  state = { selectedCountry: null };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChange = selectedCountry => {
    this.setState({ selectedCountry });
  };

  onSendContent = props => {
    const { name, surname, selectedCountry } = this.state;
    if (name && surname && selectedCountry) {
      fetch(`${API_ORIGIN}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname,
          country: selectedCountry.name
        })
      }).then(this.props.onClose);
    } else {
      window.alert("Fill in missing fields");
    }
  };

  render() {
    const { selectedCountry } = this.state;
    return (
      <div className={styles.modalWindow}>
        <Autocomplete
          selectedCountry={selectedCountry}
          onCountrySelect={this.handleChange}
        />
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
