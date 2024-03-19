import styles from "./Concept.module.scss";
import buttonStyles from "../../../../styles/button/SoftEdgeButton.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Concept() {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.conceptWrapper}>
        <div className={styles.LeftItem}>
          <h1>あなたにベストなスキンケア</h1>
          <p>納得の化粧品で納得の肌に出会いましょう</p>
          <Link href="/auth/signup">
            <button className={buttonStyles.softEdgeButton}>
              新規ユーザ登録
            </button>
          </Link>
        </div>
        <div className={styles.RightItem}>
          <Image alt="" src="/icons/icon.svg" width={200} height={200} />
        </div>
      </div>
    </div>
  );
}
