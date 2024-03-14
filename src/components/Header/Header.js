import styles from './Header.module.scss';

export default function Header(){
    return (
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to My Website</h1>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
                {['Home', 'About','Services', 'Contact'].map((item, index) => (
                <li key={index} className={styles.navItem}>
                <a href="#">{item}</a>
                </li>
                ))}
            </ul>
          </nav>
        </header>
      );
}