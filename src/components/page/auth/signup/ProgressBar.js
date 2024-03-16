import styles from "./ProgressBar.module.scss";
import Image from "next/image";

export default function ProgressBar({ signedUp }) {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressItem}>
        <div className={styles.circle}>
          <Image src="/icons/signup.svg" alt="" height={15} width={15} />
        </div>
        <p>サインアップ</p>
      </div>
      <hr className={styles.progressLine}></hr>
      <div className={styles.inactiveProgressItem}>
        <div className={styles.inactiveCircle}>
          <Image src="/icons/note.svg" alt="" height={15} width={15} />
        </div>
        <p>基本情報入力</p>
      </div>
    </div>
  );
}
