import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const RadioButton = ({ className, title, name, value, variant, onChange }) => {
  return (
    <div
      className={classNames(className, styles.container, {
        [styles.male]: variant === 'male',
        [styles.female]: variant === 'female'
      })}>
      <label className={styles.container}>
        {title}
        <input
          onChange={onChange}
          className={styles.container}
          type="radio"
          name={name}
          value={value}
        />
        <span className={styles.checkmark} />
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  variant: PropTypes.oneOf(['female', 'male'])
};

export default RadioButton;
