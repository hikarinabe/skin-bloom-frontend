import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from "../ProgressBar";

export default function SignupItems() {
  const WarnToast = () => toast.warn("Googleログインはサポートされていません", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  
  return (
    <div className={authStyles.itemsWrapper}>
      <Link href="/home">
        <Image
          className={authStyles.backIcon}
          src="/icons/back.svg"
          height={30}
          width={30}
          alt=""
        />
      </Link>
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
          <Link href="/auth/profileForm">
            <button className={buttonStyles.pillShapedButton}>次へ</button>
          </Link>
        </div>
        <hr className={authStyles.division}></hr>
        <div>
          <button className={buttonStyles.pillShapedButtonWhite} onClick={WarnToast}>
            <Image
              className={authStyles.snsIcon}
              src="/icons/google.svg"
              height={25}
              width={25}
              alt=""
            />
            Googleで新規登録
          </button>
          <ToastContainer />
        </div>
        <p className={authStyles.caption}>
          アカウントをお持ちの方は<Link href="/auth/login">こちら</Link>
        </p>
      </div>
    </div>
  );
}
