import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import styles from "../Profile.module.scss";

export default function ProfileItems() {
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
            <label>アカウント名</label>
            <div className="input-group">
              <span className="input-group-text">
                <img src="/icons/file-earmark-person.svg"></img>
              </span>
              <input
                id="account"
                className="form-control bg-white"
                placeholder="account_name"
                disabled
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
                disabled
              />
            </div>
          </div>
          <div>
            <label>誕生日</label>
            <div className="input-group">
              <span className="input-group-text">
                <img src="/icons/calendar-event.svg"></img>
              </span>
              <input
                id="birthday"
                className="form-control bg-white"
                placeholder="2022年02月03日"
                disabled
              />
            </div>
          </div>
          <div id="radio">
            <p>性別</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="male"
                disabled
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
                disabled
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
                disabled
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
                checked
                disabled
              />
              <label className="form-check-label text-dark" htmlFor="no_answer">
                回答しない
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
