import styles from "./AuthLayout.module.scss";
import Footer from "../Footer/Footer";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({ children }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <main className={styles.background}>
        <div className={styles.form}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
