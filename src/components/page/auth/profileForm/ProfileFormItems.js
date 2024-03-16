import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import styles from "@/components/page/auth/profileForm/ProfileFormItem.module.scss";
import ProgressBar from "../ProgressBar";
import OptionButton from "@/components/ui/button/OptionButton";
import Image from "next/image";

export default function ProfileFormItems() {
  return (
    <div className={authStyles.itemsWrapper}>
      <a href="/auth/signup">
        <Image
          className={authStyles.backIcon}
          src="/icons/back.svg"
          height={30}
          width={30}
          alt=""
        />
      </a>
      <h2 className={authStyles.title}>新規登録</h2>
      <ProgressBar isSignedUp={true} />
      <div className={authStyles.forms}>
        <div>
          <h4>アカウント名</h4>
          <input className={authStyles.textBox}></input>
          <h4>生年月日</h4>
          <select className={styles.selectBox}>
            <option value=""></option>
            {Array.from(
              { length: 100 },
              (_, i) => new Date().getFullYear() - i,
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span>年</span>
          <select className={styles.selectBox}>
            <option value=""></option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span>月</span>
          <select className={styles.selectBox}>
            <option value=""></option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <span>日</span>
          <h4>性別</h4>
          <div className={styles.genderWrapper}>
            {["男性", "女性", "その他", "回答しない"].map((name, index) => (
              <label>
                <input
                  className={styles.radioInput}
                  key={index}
                  type="radio"
                  name="gender"
                  value={name}
                />
                {name}
              </label>
            ))}
          </div>
          <h4>気になる項目</h4>
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
          <button className={buttonStyles.pillShapedButton}>
            入力を完了する
          </button>
        </div>
      </div>
    </div>
  );
}
