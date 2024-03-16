import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import ProgressBar from "../ProgressBar";
import Image from "next/image";

export default function SignupItems() {
  return (
    <div className={authStyles.itemsWrapper}>
      <a href="/home">
        <Image
          className={authStyles.backIcon}
          src="/icons/back.svg"
          height={30}
          width={30}
          alt=""
        />
      </a>
      <h2 className={authStyles.title}>新規登録</h2>
      <ProgressBar isSignedUp={false} />
      <div className={authStyles.forms}>
        <div>
          <p>メールアドレス</p>
          <input className={authStyles.textBox}></input>
          <p>パスワード</p>
          <input className={authStyles.textBox}></input>
          <p>パスワード再入力</p>
          <input className={authStyles.textBox}></input>
          <p></p>
          <a href="/auth/profileForm">
            <button className={buttonStyles.pillShapedButton}>次へ</button>
          </a>
        </div>
        <hr className={authStyles.division}></hr>
        <div>
          <button className={buttonStyles.pillShapedButtonWhite}>
            <Image
              className={authStyles.snsIcon}
              src="/icons/google.svg"
              height={25}
              width={25}
              alt=""
            />
            Googleで新規登録
          </button>
        </div>
        <p className={authStyles.caption}>
          アカウントをお持ちでない方は<a href="/auth/login">こちら</a>
        </p>
      </div>
    </div>
  );
}
