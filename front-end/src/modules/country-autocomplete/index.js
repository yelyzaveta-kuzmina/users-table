import React from "react";
import Autocomplete from "../../components/autocomplete";

class CountryAutocomplete extends React.Component {
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
      <Autocomplete
        placeholder={"Your country"}
        value={selectedCountry}
        getOptionLabel={option => option.name}
        onChange={onCountrySelect}
        options={countries}
      />
    );
  }
}

export default CountryAutocomplete;
