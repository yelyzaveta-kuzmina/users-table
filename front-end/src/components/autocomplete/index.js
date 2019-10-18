import React from 'react';
import Select from 'react-select';
import { autocompleteTheme, customStyles } from './styles.module.js';

const Autocomplete = ({ placeholder, value, getOptionLabel, onChange, options }) => {
  return (
    <Select
      theme={autocompleteTheme}
      styles={customStyles}
      placeholder={placeholder}
      value={value}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      options={options}
    />
  );
};

export default Autocomplete;
