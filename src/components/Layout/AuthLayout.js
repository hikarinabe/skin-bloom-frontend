import styles from "./AuthLayout.module.scss";
import Footer from "../Footer/Footer";

export default function AuthLayout({ children }) {
  return (
    <>
      <main className={styles.background}>
        <div className={styles.form}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
