import styles from "./FuncIntroduction.module.scss";

import Image from "next/image";

export default function FuncIntroduction() {
  return (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.subtitle}>機能紹介</h2>
      <div className={styles.funcWrapper}>
        <div className={styles.funcItem}>
          <Image src="/imgs/subscription.jpg" alt="" width={400} height={300} />
          <div className={styles.caption}>
            <p className={styles.captionText}>サブスクで化粧品を試す</p>
          </div>
        </div>
        <div className={styles.funcItem}>
          <Image src="/imgs/log.png" alt="" width={400} height={300} />
          {/**詳細は不明だがnext/Imageのタグのままpngファイルを読み込むとruntime errorが出たのでimgタグを使っている。 */}
          <div className={styles.caption}>
            <p className={styles.captionText}>ログをつける</p>
          </div>
        </div>
        <div className={styles.funcItem}>
          <Image src="/imgs/mypage.png" alt="" width={400} height={300} />
          <div className={styles.caption}>
            <p className={styles.captionText}>自分の肌に合う化粧品を知る</p>
          </div>
        </div>
      </div>
    </div>
  );
}
