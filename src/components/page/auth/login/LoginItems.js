import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import Image from "next/image";

export default function LoginItems() {
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
      <h2 className={authStyles.title}>ログイン</h2>
      <div className={authStyles.forms}>
        <div>
          <p>メールアドレス</p>
          <input className={authStyles.textBox}></input>
          <p>パスワード</p>
          <input className={authStyles.textBox}></input>
          <p></p>
          <button className={buttonStyles.pillShapedButton}>ログイン</button>
        </div>
        <hr className={authStyles.division}></hr>
        <div>
          <button className={buttonStyles.pillShapedButtonWhite}>
            <Image src="/icons/google.svg" height={25} width={25} alt="" />
            Googleでログイン
          </button>
        </div>
        <p className={authStyles.caption}>
          アカウントをお持ちでない方は<a href="/auth/signup">こちら</a>
        </p>
      </div>
    </div>
  );
}
