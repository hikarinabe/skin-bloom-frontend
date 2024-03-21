import authStyles from "@/components/page/auth/auth.module.scss";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginItems() {
  const router = useRouter();
  const [request, setRequest] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showToast = (message = "", type = "error") => {
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
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(request.email)) {
      showToast("有効なメールアドレスを入力してください");
      return;
    }
    if (request.password.length < 4) {
      showToast("パスワードは4文字以上が想定されています");
      return;
    }

    const endpoint_url =
      "https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/login";
    const requestOptions = {
      method: "POST",
      // TODO: とりあえずこのままコミットする。あとでサーバーのAPI keyを変えて秘匿する
      headers: { Authorization: "wJ5C9dFcEMB5" },
      body: JSON.stringify({
        email: request.email,
        password: request.password,
      }),
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);
      if (res.ok) {
        // リクエストが成功した場合の処理
        localStorage.setItem("user_id", json_data["user_id"]);
        router.push("/home/mypage", "/home/mypage");
      } else {
        showToast("リクエストが失敗しました");
      }
    } catch (err) {
      showToast("エラーが発生しました");
    }
  };

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
        <form onSubmit={handleSubmit}>
          <p>メールアドレス</p>
          <input
            name="email"
            className={authStyles.textBox}
            value={request.email}
            onChange={handleChange}
          ></input>
          <p>パスワード</p>
          <input
            name="password"
            className={authStyles.textBox}
            value={request.password}
            type="password"
            onChange={handleChange}
          ></input>
          <p></p>
          <button className={buttonStyles.pillShapedButton} type="submit">
            ログイン
          </button>
        </form>
        <p className={authStyles.caption}>
          アカウントをお持ちでない方は<Link href="/auth/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}
