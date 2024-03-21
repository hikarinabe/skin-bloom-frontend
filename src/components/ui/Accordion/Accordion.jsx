import { useState } from "react";

import styles from "./Accordion.module.scss";

import Image from "next/image";

export default function Accordion({ title, children }) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsContentVisible(!isContentVisible); // toggle content
    setIsRotated(!isRotated); // rotate button
  };

  return (
    <div>
      <div className={styles.accordionTitleWrapper}>
        <h4>{title}</h4>
        <div onClick={handleClick} className={styles.accordionButtonWrapper}>
          <Image
            src="/icons/right-triangle.svg"
            height={20}
            width={15}
            alt=""
            className={`${styles.accordionButton} ${isRotated ? styles.rotated : ""}`}
          />
        </div>
      </div>
      {isContentVisible && <div>{children}</div>}
    </div>
  );
}
