import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
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
    const newValue = name === "month" ? String(Number(value) - 1) : value;
    setRequest((prevState) => ({
      ...prevState,
      [name]: newValue,
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
        <form className={styles.formWrapper} onSubmit={saveChange}>
          <div className={styles.buttonsWrapper}>
            <Link href="/setting/profile" className={`${styles.noLinkStyle}`}>
              <button className={styles.buttonCancel}>キャンセル</button>
            </Link>
            <button type="submit" className={styles.buttonEnter}>
              保存
            </button>
          </div>
          <div className={styles.contents}>
            <div className="w-75">
              <div>
                <h4>アカウント名</h4>
                <div className="input-group">
                  <input
                    name="account_name"
                    className={styles.textBox}
                    placeholder="account_name"
                    value={request.account_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <h4>現在のメールアドレス</h4>
                <div className="input-group">
                  <input
                    name="email"
                    placeholder="@gmail.com"
                    className={styles.textBox}
                    value={request.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
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
                    <span className="input-group-text">年</span>
                  </div>
                  <div className={styles.horizontalWrapper}>
                    <select
                      className={styles.selectBox}
                      name="month"
                      value={(Number(request.month) + 1).toString()}
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
                    <span className="input-group-text">月</span>
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

                    <span className="input-group-text">日</span>
                  </div>
                </div>
              </div>
              <div>
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
          </div>
        </form>
      </div>
    </main>
  );
}
