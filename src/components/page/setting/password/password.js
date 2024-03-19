import { password_checker } from "@/share/password_checker";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <form className={styles.form} onSubmit={SubmitClick}>
        <div className={styles.Button}>
          <div className="form-check form-check-reverse">
            <Link href="./profile" className="btn btn-outline-primary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <div className={styles.contents}>
          <div className="w-75">
            <div>
              <label>現在のパスワード</label>
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/icons/lock-fill.svg"></img>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="current_password"
                  value={request.current_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>新しいパスワード</label>
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/icons/lock-fill.svg"></img>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="new_password"
                  value={request.new_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>新しいパスワード（確認）</label>
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/icons/lock-fill.svg"></img>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="new_password2"
                  value={request.new_password2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
