import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "../Profile.module.scss";

export default function EditProfileItem() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [request, setRequest] = useState({
    account_name: searchParams.get("account_name"),
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
    };
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
  };

  return (
    <main>
      <div className={styles.sectionWrapper}>
        <div className={styles.formWrapper}>
          <form onSubmit={saveChange}>
            <div className="w-full">
              <div className="lg:w-7/12">
                <h4>アカウント名</h4>
                <input
                  name="account_name"
                  placeholder="account_name"
                  value={request.account_name}
                  onChange={handleChange}
                  className={styles.textBox}
                />
              </div>
              <div className="lg:w-7/12">
                <h4>現在のメールアドレス</h4>
                <input
                  name="email"
                  placeholder="@gmail.com"
                  value={request.email}
                  onChange={handleChange}
                  className={styles.textBox}
                />
                  <input
                    name="account_name"
                    placeholder="account_name"
                    value={request.account_name}
                    onChange={handleChange}
                    className={styles.textBox}
                  />
              </div>
              <div className="lg:w-7/12">
                <h4>現在のメールアドレス</h4>
                  <input
                    name="email"
                    placeholder="@gmail.com"
                    value={request.email}
                    onChange={handleChange}
                    className={styles.textBox}
                  />
              </div>
              <div className="lg:w-7/12">
                <h4>生年月日</h4>
                <div className={styles.birthdayForm}>
                  <div className={styles.horizontalWrapper}>
                    <select
                      className={styles.selectBox}
                      name="year"
                      value={request.year}
                      onChange={handleChange}
                    >
                      {Array.from(
                        { length: 100 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span>年</span>
                  </div>
                  <div className={styles.horizontalWrapper}>
                    <select
                      className={styles.selectBox}
                      name="month"
                      value={request.month}
                      onChange={handleChange}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ),
                      )}
                    </select>
                    <span>月</span>
                  </div>
                  <div className={styles.horizontalWrapper}>
                    <select
                      className={styles.selectBox}
                      name="day"
                      value={request.day}
                      onChange={handleChange}
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ),
                      )}
                    </select>
                    <span>日</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-7/12">
                <h4>性別</h4>
                {["男性", "女性", "その他", "回答しない"].map((name, index) => (
                  <div className="form-check form-check-inline" key={index}>
                    <label className="form-check-label">
                      <input
                        className={styles.radioInput}
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
