import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginItems() {
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
          <button className={buttonStyles.pillShapedButtonWhite} onClick={WarnToast}>
            <Image src="/icons/google.svg" height={25} width={25} alt="" />
            Googleでログイン
          </button>
          <ToastContainer />
        </div>
        <p className={authStyles.caption}>
          アカウントをお持ちでない方は<Link href="/auth/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}
