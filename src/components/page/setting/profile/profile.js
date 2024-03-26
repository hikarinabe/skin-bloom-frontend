import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css"
import styles from "../Profile.module.scss";

// あとでエンドポイント経由ではなく直接呼び出せるように修正する。
export default function ProfileItems() {
  const router = useRouter();
  const [request, setRequest] = useState({
    account_name: "",
    sex: "",
    email: "",
    birthday: "",
    year: "",
    month: "",
    day: "",
  });

  const getClients = async () => {
    const user_id = localStorage.getItem("user_id");
    const endpoint_url = `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/user?user_id=${user_id}`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "wJ5C9dFcEMB5" },
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);

      const btd = new Date(json_data["birthday"]);
      setRequest(() => ({
        account_name: json_data["account_name"],
        email: json_data["email"],
        sex: json_data["sex"],
        birthday: json_data["birthday"],
        year: btd.getFullYear(),
        month: btd.getMonth(),
        day: btd.getDate(),
      }));
    } catch (err) {
      alert("エラーが発生しました");
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <main>
      <div className={styles.sectionWrapper}>
        <div className={styles.formWrapper}>
          <div className="w-full" id="contents">
            <div className="lg:w-7/12">
              <h4>アカウント名</h4>
              <div className={styles.textBox}>{request.account_name}</div>
            </div>
            <div className="lg:w-7/12">
              <h4>現在のメールアドレス</h4>
              <div className={styles.textBox}>{request.email}</div>
            </div>
            <div className="lg:w-7/12">
              <h4>生年月日</h4>
              <div
                className={styles.textBox}
              >{`${request.year}年 ${request.month + 1}月 ${request.day}日`}</div>
            </div>
            <div>
              <div className="lg:w-7/12">
                <h4>性別</h4>
                <div className={styles.textBox}>{request.sex}</div>
              </div>
            </div>
          </div>
          <div className="lg:w-7/12">
              <Link
                href={{
                  pathname: "/setting/edit_profile",
                  query: {
                    account_name: request.account_name,
                    sex: request.sex,
                    email: request.email,
                    birthday: request.birthday,
                    year: request.year,
                    month: request.month + 1,
                    day: request.day,
                  },
                }}
                className={styles.noLinkStyle}
              >
                <button className={styles.buttonEdit}>編集</button>
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
