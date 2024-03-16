import styles from "./Header.module.scss";
import buttonStyles from "@/styles/button/SoftEdgeButton.module.scss";
import Link from "next/link";

export default function HeaderBeforeLogin() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>SkinBloom</h1>
      <div className={styles.rightAligned}>
        <Link href="/auth/login">
          <button className={buttonStyles.softEdgeButton}>ログイン</button>
        </Link>
      </div>
    </header>
  );
}
