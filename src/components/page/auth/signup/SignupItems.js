import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from "../ProgressBar";

export default function SignupItems() {
  const router = useRouter();
  const [request, setRequest] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const showToast = (message = "Googleログインはサポートされていません。", type = "error") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(request.email)) {
      showToast("有効なメールアドレスを入力してください");
      return;
    }
    if (request.password.length < 4) {
      showToast("パスワードは4文字以上である必要があります");
      return;
    }
    if (request.password != request.password2) {
      showToast("パスワードが一致していません");
      return;
    }

    const endpoint_url = "https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/auth";
    const formData = new FormData();
    formData.append('email', request.email);
    formData.append('password', request.password);
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': 'wJ5C9dFcEMB5'}, // TODO: とりあえずこのままコミットする。あとでAPI keyを変えて秘匿する
      body: formData,
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      console.log(data)
      if (res.ok) {
        // リクエストが成功した場合の処理
        await router.push("/auth/profileForm", { user_id: data, ...router.query });
      } else {
        showToast("リクエストが失敗しました");
      }
    } catch (err) {
      console.error(err);
      showToast("エラーが発生しました");
    }
  }

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
        <form onSubmit={handleSubmit}>
          <p>メールアドレス</p>
          <input name='email' className={authStyles.textBox} value={request.email} onChange={handleChange}></input>
          <p>パスワード</p>
          <input name='password' className={authStyles.textBox} value={request.password} onChange={handleChange}></input>
          <p>パスワード再入力</p>
          <input name='password2' className={authStyles.textBox} value={request.password2} onChange={handleChange}></input>
          <p></p>          
          <button className={buttonStyles.pillShapedButton} type="submit">次へ</button>
        </form>
        <hr className={authStyles.division}></hr>
        <div>
          <button className={buttonStyles.pillShapedButtonWhite} onClick={showToast}>
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
