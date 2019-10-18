import React from 'react';
import styles from './styles.module.scss';

const CloseSubmitButton = ({ name, onClick }) => {
  return (
    <button className={styles.closeSubmitButton} onClick={onClick}>
      {name}
    </button>
  );
};

export default CloseSubmitButton;
