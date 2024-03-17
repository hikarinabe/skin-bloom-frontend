import React, { useState } from "react";
import styles from "./StarRating.module.scss";

const StarRating = ({ initialValue, onRate }) => {
  const [rating, setRating] = useState(initialValue);

  const handleStarClick = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`${value <= rating ? styles.starSelected : styles.star}`}
          onClick={() => handleStarClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
