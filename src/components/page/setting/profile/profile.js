import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../Profile.module.scss";

let dev = true;

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
      let json_data;
      if (dev) {
        json_data = {
          account_name: "test_for PR",
          sex: "男性",
          birthday: "1982-07-09T09:00:00",
          email: "test_for_PR@email.com",
        };
      } else {
        const res = await fetch(endpoint_url, requestOptions);
        const data = await res.text();
        json_data = JSON.parse(data);
      }
      console.log(json_data);

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
      <div className={styles.Button}>
        <div className="form-check form-check-reverse" id="editor">
          <Link href="/setting/edit_profile" class="btn btn-outline-primary">
            Edit
          </Link>
        </div>
      </div>
      <div className={styles.contents}>
        <div className="w-75" id="contents">
          <div>
            <label>アカウント名: </label>
            <div className="input-group">
              <span className="input-group-text">
                <img src="/icons/file-earmark-person.svg"></img>
              </span>
              {request.account_name}
            </div>
          </div>
          <div>
            <label>現在のメールアドレス: </label>
            <div className="input-group">
              <span className="input-group-text">
                <img src="/icons/envelope.svg"></img>
              </span>
              {request.email}
            </div>
          </div>
          <div>
            <label>誕生日: </label>
            <div className="input-group">
              <span className="input-group-text">
                <img src="/icons/calendar-event.svg"></img>
              </span>
              {request.birthday}
            </div>
          </div>
          <div>
            <div className="input-group">
              <label>性別: </label>
              {request.sex}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
