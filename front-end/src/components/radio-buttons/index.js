import React from "react";
import styles from "./styles.module.scss";

const GenderRadioButtons = () => {
  return (
    <div className={styles.buttonsWrapper}>
      <label className={styles.container}>
        m
        <input
          type="radio"
          name="gender"
          value="male"
          className={styles.radio}
        />
        <span className={styles.checkmark}></span>
      </label>

      <label className={styles.container}>
        f
        <input
          type="radio"
          name="gender"
          value="male"
          className={styles.radio}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

export default GenderRadioButtons;
