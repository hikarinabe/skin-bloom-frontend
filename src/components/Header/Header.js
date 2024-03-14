import styles from "./Header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>SkinBloom</h1>
      <div className={styles.rightAligned}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {["Home", "Cosmetics", "Logs"].map((item, index) => (
              <li key={index} className={styles.navItem}>
                <a href={item.toLowerCase}>{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <Image
          className={styles.icon}
          alt=""
          src="/icons/write.svg"
          width={40}
          height={40}
        />
        <Image
          className={styles.icon}
          alt=""
          src="/icons/person.svg"
          width={40}
          height={40}
        />
      </div>
    </header>
  );
}
