import React from "react";
import Select from "react-select";

class Autocomplete extends React.Component {
  state = { countries: [], selectedOption: null, err: undefined };

  componentDidMount() {
    try {
      fetch("https://restcountries.eu/rest/v2/regionalbloc/eu")
        .then(response => response.json())
        .then(response => this.setState({ countries: response }));
    } catch (err) {
      this.setState({ err });
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { countries, selectedOption } = this.state;

    return (
      <div>
        <Select
          value={selectedOption}
          getOptionLabel={option => option.name}
          onChange={this.handleChange}
          options={countries}
        />
      </div>
    );
  }
}

export default Autocomplete;
