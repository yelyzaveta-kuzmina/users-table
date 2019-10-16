import React from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isFocused ? "rgb(249,249,249)" : "white",
    color: state.isFocused ? "black" : "grey"
  })
};

const autocompleteTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "rgb(76,169,105)"
  }
});

class Autocomplete extends React.Component {
  state = { countries: [], err: undefined };

  componentDidMount() {
    try {
      fetch("https://restcountries.eu/rest/v2/regionalbloc/eu")
        .then(response => response.json())
        .then(response => this.setState({ countries: response }));
    } catch (err) {
      this.setState({ err });
    }
  }

  render() {
    const { countries } = this.state;
    const { selectedCountry, onCountrySelect } = this.props;

    return (
      <div>
        <Select
          theme={autocompleteTheme}
          placeholder="Your country"
          styles={customStyles}
          value={selectedCountry}
          getOptionLabel={option => option.name}
          onChange={onCountrySelect}
          options={countries}
        />
      </div>
    );
  }
}

export default Autocomplete;
