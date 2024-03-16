import styles from "./Header.module.scss";
import buttonStyles from "@/styles/button/SoftEdgeButton.module.scss";

export default function HeaderBeforeLogin() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>SkinBloom</h1>
      <div className={styles.rightAligned}>
        <a href="/auth/login">
          <button className={buttonStyles.softEdgeButton}>ログイン</button>
        </a>
      </div>
    </header>
  );
}
