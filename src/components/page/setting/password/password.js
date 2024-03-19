import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import styles from "../Profile.module.scss";
import SubmitClick from "./SubmitClick";

export default function PasswordItems() {
  // const [request, setRequest] = useState({
  //   current: "",
  //   new_password: "",
  //   new_password2: "",
  // });

  return (
    <main>
      <div className={styles.Button}>
        <div className="form-check form-check-reverse">
          <Link href="./profile" className="btn btn-outline-primary">
            Cancel
          </Link>
          <button
            type="button"
            onClick={SubmitClick}
            className="btn btn-primary"
          >
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
                id="current_password"
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
                id="new_password"
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
                id="confirm_password"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
