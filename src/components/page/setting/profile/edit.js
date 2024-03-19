import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import styles from "../Profile.module.scss";

export default function EditProfileItem() {
  function SaveClick() {
    const editDom = document.getElementById("editor");
    // const DOM = document.getElementById("contents");
    const accountDom = document.getElementById("account");
    const mailDom = document.getElementById("mail");
    const birthdayDom = document.getElementById("birthday");
    const maleDom = document.getElementById("male");
    const femaleDom = document.getElementById("female");
    const otherDom = document.getElementById("other");
    const naDom = document.getElementById("no_answer");

    console.log(accountDom);
    console.log(mailDom);
    console.log(birthdayDom);
    console.log(maleDom);
    console.log(femaleDom);
    console.log(otherDom);
    console.log(naDom);
    alert("登録できました");
  }

  return (
    <main>
      <div className={styles.Button}>
        <div className="form-check form-check-reverse">
          <Link href="/setting/profile" className="btn btn-outline-primary">
            Cancel
          </Link>
          <button onClick={SaveClick} className="btn btn-primary">
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
                id="account"
                className="form-control bg-white"
                placeholder="account_name"
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
                id="mail"
                placeholder="@gmail.com"
                className="form-control bg-white"
              />
            </div>
          </div>
          <div>
            <label>生年月日</label>
            <div className="input-group">
              {/* <span className="input-group-text"><img src="/icons/calendar-event.svg"></img></span>
                                <input id="birthday" className="form-control bg-white" placeholder="2022年02月03日" /> */}
              {/* <h4>生年月日</h4> */}
              <select className="form-control">
                <option value=""></option>
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
              <select className="form-control">
                <option value=""></option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <span className="input-group-text">月</span>
              <select className="form-control">
                <option value=""></option>
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
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="male"
              />
              <label className="form-check-label" htmlFor="male">
                男性
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="female"
              />
              <label className="form-check-label" htmlFor="female">
                女性
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="other"
              />
              <label className="form-check-label" htmlFor="other">
                その他
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="no_answer"
              />
              <label className="form-check-label" htmlFor="no_answer">
                回答しない
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
