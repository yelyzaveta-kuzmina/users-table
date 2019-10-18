export const autocompleteTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: 'rgb(76,169,105)'
  }
});

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: state.isFocused ? 'rgb(249,249,249)' : 'white',
    color: state.isFocused ? 'black' : 'grey'
  })
};
