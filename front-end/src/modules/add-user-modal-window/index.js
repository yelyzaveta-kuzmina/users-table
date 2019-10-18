import React from "react";
import GenderRadioButtons from "../gender-radio-buttons";
import CountryAutocomplete from "../country-autocomplete";
import Input from "../../components/input";
import CloseSubmitButton from "../../components/close-submit-button";
import styles from "./styles.module.scss";

const API_ORIGIN = process.env.API_ORIGIN || "http://localhost:8080";

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
    const { onClose } = this.props;
    return (
      <div className={styles.modalWindow}>
        <GenderRadioButtons onGenderSelect={this.handleGenderChange} />
        <CountryAutocomplete
          selectedCountry={selectedCountry}
          onCountrySelect={this.handleCountryChange}
        />
        <div className={styles.inputs}>
          <Input
            name={"name"}
            placeholder={"name"}
            onChange={this.onInputChange}
          />
          <Input
            name={"surname"}
            placeholder={"surname"}
            onChange={this.onInputChange}
          />
          <Input
            name={"age"}
            placeholder={"age"}
            onChange={this.onInputChange}
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <CloseSubmitButton name={"Submit"} onClick={this.onSendContent} />
          <CloseSubmitButton name={"Close"} onClick={onClose} />
        </div>
      </div>
    );
  }
}

export default AddUserModalWindow;
