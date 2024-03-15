import styles from "./FuncIntroduction.module.scss";

export default function FuncIntroduction() {
  return (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.subtitle}>機能紹介</h2>
      <div className={styles.funcWrapper}>
        <div className={styles.funcItem}>
          <img src="/imgs/image.png" alt="" width="256px" />
          <div className={styles.caption}>
            <p className={styles.captionText}>ログをつける</p>
          </div>
        </div>
        <div className={styles.funcItem}>
          <img src="/imgs/image.png" alt="" width="256px" />
          <div className={styles.caption}>
            <p className={styles.captionText}>自分の肌に合う化粧品を知る</p>
          </div>
        </div>
        <div className={styles.funcItem}>
          <img src="/imgs/image.png" alt="" width="256px" />
          <div className={styles.caption}>
            <p className={styles.captionText}>自分の肌に合う成分を知る？</p>
          </div>
        </div>
      </div>
    </div>
  );
}
