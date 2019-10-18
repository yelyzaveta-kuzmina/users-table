import React from 'react';
import styles from './styles.module.scss';

const Input = ({ name, placeholder, onChange }) => {
  return (
    <input
      autoComplete="off"
      className={styles.input}
      onChange={onChange}
      name={name}
      placeholder={placeholder}></input>
  );
};

export default Input;
