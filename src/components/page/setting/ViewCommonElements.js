import Link from "next/link";
import styles from "./ViewCommonElements.module.scss";

export default function ViewCommonElements({ activeTab }) {
  return (
    <div>
      <div className={styles.topColor}></div>
      <div className="container">
        <div className={styles.icon}>
          <img src="/icons/profile_icon.jpg" className={styles.img}></img>
        </div>
        <div></div>
        <div className={styles.tabs}>
          <div className="tabs w-75">
            <ul className={styles.tabsWrapper}>
              <li className="nav-item">
                <Link
                  href="./profile"
                  className={
                    activeTab === "profile" ? styles.activeTab : styles.tab
                  }
                >
                  <h3>プロフィール</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="./password"
                  className={
                    activeTab === "password" ? styles.activeTab : styles.tab
                  }
                >
                  <h3>パスワード変更</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="../logs"
                  className={
                    activeTab === "logs" ? styles.activeTab : styles.tab
                  }
                >
                  <h3>使用履歴</h3>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
