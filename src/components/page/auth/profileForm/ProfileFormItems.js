import authStyles from "@/components/page/auth/auth.module.scss";
import styles from "@/components/page/auth/profileForm/ProfileFormItem.module.scss";
import OptionButton from "@/components/ui/button/OptionButton";
import { tag_list } from "@/pkg/tag";
import buttonStyles from "@/styles/button/PillShapedButton.module.scss";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../ProgressBar";

const endpoint_url =
  "https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/user";

export default function ProfileFormItems() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [date, setDate] = useState({
    year: 1990,
    month: 1,
    day: 1,
  });

  const [nayami, setNayami] = useState([]);

  const [request, setRequest] = useState({
    user_id: searchParams.get("user_id"),
    account_name: "",
    sex: "",
  });

  const handleNayamiToggle = (optionName) => {
    if (nayami.includes(optionName)) {
      setNayami(nayami.filter((nayamiItem) => nayamiItem !== optionName));
    } else {
      setNayami([...nayami, optionName]);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showToast = (
    message = "Googleログインはサポートされていません。",
    type = "error",
  ) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      // TODO: とりあえずこのままコミットする。あとでサーバーのAPI keyを変えて秘匿する
      headers: { Authorization: "wJ5C9dFcEMB5" },
      body: JSON.stringify({
        user_id: request.user_id,
        account_name: request.account_name,
        sex: request.sex,
        birthday: `${date.year}-${date.month}-${date.day} 00:00:00`,
        nayami: nayami,
      }),
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      console.log(data);
      if (res.status == 201) {
        // ローカルストレージに保存
        localStorage.setItem("user_id", request.user_id);
        // mypageに移動
        router.push("/home/mypage", "/home/mypage");
      } else {
        showToast("リクエストが失敗しました");
      }
    } catch (err) {
      showToast("エラーが発生しました");
    }
  };

  return (
    <div className={authStyles.itemsWrapper}>
      <h2 className={authStyles.title}>新規登録</h2>
      <ProgressBar isSignedUp={true} />
      <div className={authStyles.forms}>
        <form onSubmit={handleSubmit}>
          <h4>アカウント名</h4>
          <input
            name="account_name"
            className={authStyles.textBox}
            value={request.account_name}
            onChange={handleChange}
          ></input>
          <h4>生年月日</h4>
          <select
            name="year"
            className={styles.selectBox}
            value={date.year}
            onChange={handleDateChange}
          >
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
          <span>年</span>
          <select
            name="month"
            className={styles.selectBox}
            value={date.month}
            onChange={handleDateChange}
          >
            <option value=""></option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <span>月</span>
          <select
            name="day"
            className={styles.selectBox}
            value={date.day}
            onChange={handleDateChange}
          >
            <option value=""></option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <span>日</span>
          <h4>性別</h4>
          <div className={styles.genderWrapper}>
            {["男性", "女性", "その他", "回答しない"].map((name, index) => (
              <label key={index}>
                <input
                  className={styles.radioInput}
                  key={index}
                  type="radio"
                  name="sex"
                  value={name}
                  onChange={handleChange}
                />
                {name}
              </label>
            ))}
          </div>
          <h4>気になる項目</h4>
          <div className={styles.tagWrapper}>
            {tag_list.map((optionName, index) => (
              <OptionButton
                key={index}
                optionName={optionName["nayami"]}
                onClick={() => handleNayamiToggle(optionName["id"])}
                isSelected={nayami.includes(index + 1)}
              />
            ))}
          </div>
          <button className={buttonStyles.pillShapedButton} type="submit">
            入力を完了する
          </button>
        </form>
      </div>
    </div>
  );
}
