import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../Profile.module.scss";

export default function EditProfileItem() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [request, setRequest] = useState({
    account_name:  searchParams.get("account_name"),
    sex: searchParams.get("sex"),
    email: searchParams.get("email"),
    birthday: searchParams.get("birthday"),
    year: searchParams.get("year"),
    month: searchParams.get("month"),
    day: searchParams.get("day"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const endpoint_url =
      "https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/user";
  const saveChange = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      // TODO: とりあえずこのままコミットする。あとでサーバーのAPI keyを変えて秘匿する
      headers: { Authorization: "wJ5C9dFcEMB5" },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        account_name: request.account_name,
        sex: request.sex,
        birthday: `${request.year}-${request.month}-${request.day} 00:00:00`,
        email: request.email,
      }),
    }

    try {
      const res = await fetch(endpoint_url, requestOptions);
      if (res.ok) {
        // リクエストが成功した場合の処理
        router.push("/setting/profile");
      } 
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  }

  return (
    <main>
      <form className={styles.form} onSubmit={saveChange}>
        <div className={styles.Button}>
          <div className="form-check form-check-reverse">
            <Link href="/setting/profile" className="btn btn-outline-primary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
        <div className={styles.contents}>
          <div className="w-75">
            <div>
              <label>アカウント名</label>
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/icons/file-earmark-person.svg"></img>
                </span>
                <input
                  name="account_name"
                  className="form-control bg-white"
                  placeholder="account_name"
                  value={request.account_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>現在のメールアドレス</label>
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/icons/envelope.svg"></img>
                </span>
                <input
                  name="email"
                  placeholder="@gmail.com"
                  className="form-control bg-white"
                  value={request.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label>生年月日</label>
              <div className="input-group">
              <select className="form-control" name="year" value={request.year} onChange={handleChange}>
                  {Array.from(
                    { length: 100 },
                    (_, i) => new Date().getFullYear() - i,
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <span className="input-group-text">年</span>
                <select className="form-control" name="month" value={request.month} onChange={handleChange}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <span className="input-group-text">月</span>
                <select className="form-control" name="day" value={request.day} onChange={handleChange}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                <span className="input-group-text">日</span>
              </div>
            </div>
            <div>
              <p>性別</p>
              {["男性", "女性", "その他", "回答しない"].map((name, index) => (
                <div className="form-check form-check-inline" key={index}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sex"
                      value={name}
                      checked={name === request.sex}
                      onChange={handleChange}
                    />
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
