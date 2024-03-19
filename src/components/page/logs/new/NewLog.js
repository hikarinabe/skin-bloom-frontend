import styles from "./NewLog.module.scss";
import evalButtonStyles from "@/styles/button/SoftEdgeTagButton.module.scss";
import sendButtonStyles from "@/styles/button/PillShapedButton.module.scss";

import StarRating from "@/components/StarRating/StarRating";
import OptionButton from "@/components/ui/button/OptionButton";

import Link from "next/link";
import Image from "next/image";

const troubleDisplayName = {
  moisture: "保湿",
  pimple: "ニキビ跡",
};

export default function NewLog() {
  const handleRate = (value) => {
    // 評価の送信などを行う。
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.form}>
        <div className={styles.formItems}>
          <Link href="/logs">
            {/* TODO 一つ前のページに戻す */}
            <Image
              className={styles.backIcon}
              src="/icons/back.svg"
              height={30}
              width={30}
              alt=""
            />
          </Link>
          <h2 className={styles.title}>ログ</h2>
          <h4>商品名</h4>
          <p className={styles.textarea}>ちふれ　美白　うるおい　ジェル</p>
          <h4>評価（どれくらい肌に合うか）</h4>
          <StarRating initialValue={3} onRate={handleRate} />
          {["moisture", "pimple"].map((value) => {
            const displayName = troubleDisplayName[value];
            return (
              <div key={value}>
                <div className={styles.togglableTitleWrapper}>
                  <h4>{displayName}</h4>
                  <Image
                    className={styles.accordionIcon}
                    src="/icons/minus.svg"
                    height={15}
                    width={15}
                    alt=""
                  />
                </div>
                <div className={styles.buttonsWrapper}>
                  <button className={evalButtonStyles.softEdgeTagButton}>
                    効果あり
                  </button>
                  <button className={evalButtonStyles.softEdgeTagButton}>
                    効果なし
                  </button>
                </div>
              </div>
            );
          })}
          <div className={styles.accordionTitleWrapper}>
            <h4>評価項目を追加する</h4>
            <Image
              className={styles.accordionIcon}
              src="/icons/accordion-open.svg"
              height={15}
              width={15}
              alt=""
            />
          </div>

          <div className={styles.tagWrapper}>
            {[
              "シミ・くすみ",
              "シワ・たるみ",
              "小じわ",
              "アトピー",
              "赤み",
              "あああああ",
            ].map((optionName, index) => (
              <OptionButton
                key={index}
                optionName={optionName}
                onClick={() => {}}
                isSelected={false}
              />
            ))}
          </div>
          <h4>コメント</h4>
          <textarea className={styles.textarea} />
          <button className={sendButtonStyles.pillShapedButton}>
            送信する
          </button>
        </div>
      </div>
    </div>
  );
}
