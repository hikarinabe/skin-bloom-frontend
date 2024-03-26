import { password_checker } from "@/pkg/password_checker";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../Profile.module.scss";

export default function PasswordItems() {
  const router = useRouter();
  const [request, setRequest] = useState({
    current_password: "",
    new_password: "",
    new_password2: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SubmitClick = async (event) => {
    event.preventDefault();
    const checker = password_checker(
      request.new_password,
      request.new_password2,
    );
    if (checker !== "") {
      alert(checker);
      return;
    }

    const endpoint_url =
      "https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/auth";
    const formData = new FormData();
    formData.append("email", request.email);
    formData.append("password", request.password);
    const requestOptions = {
      method: "PUT",
      // TODO: とりあえずこのままコミットする。あとでサーバーのAPI keyを変えて秘匿する
      headers: { Authorization: "wJ5C9dFcEMB5" },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        current_password: request.current_password,
        new_password: request.new_password,
      }),
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      if (res.ok) {
        alert("登録しました");
        // リクエストが成功した場合の処理
        router.push("/setting/profile");
      } else {
        alert("リクエストが失敗しました");
      }
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  };

  return (
    <main>
      <div className={styles.sectionWrapper}>
        <div className={styles.formWrapper}>
          <form onSubmit={SubmitClick}>
            <div className="w-full">
              <div className="lg:w-7/12">
                <h4>現在のパスワード</h4>
                <div className={styles.textBox}>
                  <input
                    type="password"
                    name="current_password"
                    value={request.current_password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="lg:w-7/12">
                <h4>新しいパスワード</h4>
                <div className={styles.textBox}>
                  <input
                    type="password"
                    name="new_password"
                    value={request.new_password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="lg:w-7/12">
                <h4>新しいパスワード（確認）</h4>
                <div className={styles.textBox}>
                  <input
                    type="password"
                    name="new_password2"
                    value={request.new_password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-7/12">
              <Link href="/setting/profile" className={`${styles.noLinkStyle}`}>
                <button className={styles.buttonCancel}>キャンセル</button>
              </Link>
              <button type="submit" className={styles.buttonEnter}>
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
