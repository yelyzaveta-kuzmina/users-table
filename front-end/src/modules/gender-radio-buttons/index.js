import React from 'react';
import RadioButton from '../../components/radio-button';
import styles from './styles.module.scss';

const GenderRadioButtons = ({ onGenderSelect }) => {
  return (
    <div className={styles.buttonsWrapper}>
      <RadioButton
        onChange={onGenderSelect}
        title={'m'}
        name={'gender'}
        value={'male'}
        variant="male"
      />
      <RadioButton
        onChange={onGenderSelect}
        title={'f'}
        name={'gender'}
        value={'female'}
        variant="female"
      />
    </div>
  );
};

export default GenderRadioButtons;
