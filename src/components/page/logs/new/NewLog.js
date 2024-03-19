import styles from "./NewLog.module.scss";
import evalButtonStyles from "@/styles/button/SoftEdgeTagButton.module.scss";
import sendButtonStyles from "@/styles/button/PillShapedButton.module.scss";

import StarRating from "@/components/StarRating/StarRating";
import OptionButton from "@/components/ui/button/OptionButton";
import Accordion from "@/components/ui/Accordion/Accordion";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const API_KEY = "wJ5C9dFcEMB5";

const showToast = (message, type = "error") => {
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

export default function NewLog() {
  const router = useRouter();

  const cosmetic_tags = [
    //TODO APIから取得する。
    {
      id: 1,
      bad_eval: "カサカサ",
      good_eval: "うるおい",
      name: "保湿",
      nayami: "乾燥",
    },
    {
      id: 2,
      bad_eval: "効果なし",
      good_eval: "効果あり",
      name: "ニキビ・ニキビ跡",
      nayami: "ニキビ・ニキビ跡",
    },
  ];

  const cosmetic_id = router.query.cosmetic_id;

  const user_id = localStorage.getItem("user_id");

  // ユーザごとの評価軸を取得するためにuserDataを取得する。
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/user?user_id=${user_id}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  // 化粧品のカテゴリIDを取得する。
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/cosmetic_info?cosmetic_id=${cosmetic_id}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategoryId(data.category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [cosmetic_id]);

  // 評価軸を管理する。
  const [isSetFlag, setIsSetFlag] = useState(false); // 無限にcomponentがrenderされてしまうバグをやっつけで対処
  const [criteria, setCriteria] = useState([]);
  const [tagIdNameHash, setTagIdNameHash] = useState({});
  const [chosenCriteria, setChosenCriteria] = useState([]);
  const [unChosenCriteria, setUnChosenCriteria] = useState([]);

  useEffect(() => {
    if (isSetFlag) return;
    if (userData) {
      setIsSetFlag(true);
    }

    cosmetic_tags.forEach((tag) => {
      tagIdNameHash[tag.id] = tag.name;
      if (!criteria.includes(tag.id)) criteria.push(tag.id);
    });
    const defaultCriteria = userData
      ? cosmetic_tags
          .filter((obj) => ["ニキビ・ニキビ跡"].includes(obj.nayami)) // TODO: replace array with userData.nayami
          .map((obj) => obj.id)
      : []; // ニキビ跡ならid 2の配列
    setChosenCriteria(defaultCriteria);
    setUnChosenCriteria(
      criteria.filter((elem) => !defaultCriteria.includes(elem)),
    );
  }, [cosmetic_tags, userData]);

  const [request, setRequest] = useState({
    rate: 0,
    comment: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint_url =
      "https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/cosmetic_log";

    const [goodCriteria, badCriteria] = Object.keys(criteriaEvaluations).reduce(
      (acc, criteria) => {
        if (criteriaEvaluations[criteria] === "good") {
          acc[0].push(criteria);
        } else if (criteriaEvaluations[criteria] === "bad") {
          acc[1].push(criteria);
        }
        return acc;
      },
      [[], []],
    );

    const requestOptions = {
      method: "POST",
      headers: { Authorization: "wJ5C9dFcEMB5" }, // TODO 秘匿
      body: JSON.stringify({
        user_id: user_id,
        cosmetic_id: cosmetic_id,
        rate: request.rate,
        category: categoryId,
        good_tag: goodCriteria.map((item) => Number(item)),
        bad_tag: badCriteria.map((item) => Number(item)),
        comment: request.comment,
      }),
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      if (res.ok) {
        router.push("/logs");
      } else {
        showToast("リクエストが失敗しました");
      }
    } catch (err) {
      console.error(err);
      showToast("エラーが発生しました");
    }
  };

  // フォームの値を格納する処理。

  const handleRate = (value) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      rate: value,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [criteriaEvaluations, setCriteriaEvaluations] = useState({});

  const handleEvaluationChange = (criteria, evaluation) => {
    setCriteriaEvaluations((prevCriteriaEvaluations) => {
      if (prevCriteriaEvaluations.hasOwnProperty(criteria)) {
        delete prevCriteriaEvaluations[criteria];
      }
      return {
        ...prevCriteriaEvaluations,
        [criteria]: evaluation,
      };
    });
  };

  const handleAddCriteria = (criteria) => {
    setChosenCriteria((prevChosenCriteria) => {
      return [...prevChosenCriteria, criteria];
    });
    setUnChosenCriteria((prevUnChosenCriteria) => {
      return prevUnChosenCriteria.filter((elem) => elem !== criteria);
    });
  };

  const handleRemoveCriteria = (criteria) => {
    setChosenCriteria((prevChosenCriteria) => {
      return prevChosenCriteria.filter((elem) => elem !== criteria);
    });
    setUnChosenCriteria((prevUnChosenCriteria) => {
      return [...prevUnChosenCriteria, criteria];
    });
    setCriteriaEvaluations((prevCriteriaEvaluations) => {
      const updatedCriteriaEvaluations = { ...prevCriteriaEvaluations };
      delete updatedCriteriaEvaluations[criteria];
      return updatedCriteriaEvaluations;
    });
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.form}>
        <div className={styles.formItems}>
          <Link href="/cosmetics/search">
            {/* TODO 一つ前のページに戻す */}
            <Image
              className={styles.backIcon}
              src="/icons/back.svg"
              height={30}
              width={30}
              alt=""
            />
          </Link>
          <h2 className={styles.title}>ログ</h2>
          <h4>商品名</h4>
          <p className={styles.textarea}>ちふれ　美白　うるおい　ジェル</p>
          <h4>評価（どれくらい肌に合うか）</h4>
          <StarRating initialValue={request.rate} onRate={handleRate} />
          {chosenCriteria.map((value) => {
            return (
              <div key={value}>
                <div className={styles.togglableTitleWrapper}>
                  <h4>{tagIdNameHash[value]}</h4>
                  <Image
                    onClick={() => {
                      handleRemoveCriteria(value);
                    }}
                    className={styles.accordionIcon}
                    src="/icons/minus.svg"
                    height={15}
                    width={15}
                    alt=""
                  />
                </div>
                <div className={styles.buttonsWrapper}>
                  <button
                    className={
                      criteriaEvaluations[value] === "good"
                        ? evalButtonStyles.softEdgeTagButtonActive
                        : evalButtonStyles.softEdgeTagButton
                    }
                    onClick={() => {
                      handleEvaluationChange(value, "good");
                    }}
                  >
                    効果あり
                  </button>
                  <button
                    className={
                      criteriaEvaluations[value] === "bad"
                        ? evalButtonStyles.softEdgeTagButtonActive
                        : evalButtonStyles.softEdgeTagButton
                    }
                    onClick={() => handleEvaluationChange(value, "bad")}
                  >
                    効果なし
                  </button>
                </div>
              </div>
            );
          })}
          <Accordion title={"評価項目を追加する"}>
            <div className={styles.tagWrapper}>
              {unChosenCriteria.map((value) => (
                <OptionButton
                  optionName={tagIdNameHash[value]}
                  key={value}
                  onClick={() => handleAddCriteria(value)}
                />
              ))}
            </div>
          </Accordion>
          <h4>コメント</h4>
          <textarea
            className={styles.textarea}
            onChange={handleChange}
            name="comment"
          />
          <button
            className={sendButtonStyles.pillShapedButton}
            onClick={handleSubmit}
          >
            送信する
          </button>
        </div>
      </div>
    </div>
  );
}
