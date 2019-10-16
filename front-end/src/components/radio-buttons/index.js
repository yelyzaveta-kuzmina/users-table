import React from "react";
import RadioButton from "../radio-button";
import styles from "./styles.module.scss";

const GenderRadioButtons = () => {
  return (
    <div className={styles.buttonsWrapper}>
      <RadioButton title={"m"} name={"gender"} value={"male"} variant="male" />
      <RadioButton
        title={"f"}
        name={"gender"}
        value={"female"}
        variant="female"
      />
    </div>
  );
};

export default GenderRadioButtons;
