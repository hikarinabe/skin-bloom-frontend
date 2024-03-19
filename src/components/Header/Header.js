import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/home/mypage" passHref legacyBehavior>
        <h1 className={styles.logo}>SkinBloom</h1>
      </Link>
      <div className={styles.rightAligned}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
          <li key="Home" className={styles.navItem}>
              <Link href="/home/mypage">Home</Link>
          </li>
          <li key="Search" className={styles.navItem}>
            <Link href="/cosmetics/search">Search</Link>
          </li>
          <li key="Records" className={styles.navItem}>
          <Link href="/">Records</Link>
          </li>
          {/* todo: あとでAPI接続する */}
          <li key="Logout" className={styles.navItem}>
          <Link href="/home/intro">Logout</Link>
          </li>
          </ul>
        </nav>
        <Link href="">
        <Image
          className={styles.icon}
          alt=""
          src="/icons/write.svg"
          width={40}
          height={40}
        />
        </Link>
        <Link href="/setting/profile">
        <Image
          className={styles.icon}
          alt=""
          src="/icons/person.svg"
          width={40}
          height={40}
        />
        </Link>
      </div>
    </header>
  );
}
