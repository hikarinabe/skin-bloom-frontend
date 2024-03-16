import React from "react";
import styles from "./OptionButton.module.scss";

const OptionButton = ({ optionName, onClick, isSelected }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(optionName)}
      className={isSelected ? styles.optionButtonSelected : styles.optionButton}
    >
      {optionName}
    </button>
  );
};

export default OptionButton;
