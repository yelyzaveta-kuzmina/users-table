import React from "react";
import GenderRadioButtons from "../gender-radio-buttons";
import Autocomplete from "../autocomplete";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class AddUserModalWindow extends React.Component {
  state = { selectedCountry: "", gender: "" };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCountryChange = selectedCountry => {
    this.setState({ selectedCountry });
  };

  handleGenderChange = event => {
    const { value } = event.target;
    this.setState({
      gender: value
    });
  };

  onSendContent = props => {
    const { name, surname, selectedCountry, gender, age } = this.state;
    if (name && surname && selectedCountry && gender && age) {
      fetch(`${API_ORIGIN}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname,
          country: selectedCountry.name,
          gender,
          age
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
        <GenderRadioButtons onGenderSelect={this.handleGenderChange} />
        <Autocomplete
          selectedCountry={selectedCountry}
          onCountrySelect={this.handleCountryChange}
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
          <input
            autoComplete="off"
            className={styles.ageInput}
            onChange={this.onInputChange}
            name="age"
            placeholder="age"
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
