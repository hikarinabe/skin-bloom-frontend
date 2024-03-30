import styles from "./NewLog.module.scss";
import evalButtonStyles from "@/styles/button/SoftEdgeTagButton.module.scss";
import sendButtonStyles from "@/styles/button/PillShapedButton.module.scss";

import StarRating from "@/components/StarRating/StarRating";
import OptionButton from "@/components/ui/button/OptionButton";
import Accordion from "@/components/ui/Accordion/Accordion";

import { tag_list } from "@/pkg/tag";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  API_KEY,
  COSMETIC_INFO_ENDPOINT,
  COSMETIC_LOG_ENDPOINT,
  USER_ENDPOINT,
} from "@/env";

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

  const cosmetic_tags = tag_list;

  const cosmetic_id = router.query.cosmetic_id;

  const [userId, setUserId] = useState(null);

  // ユーザごとの評価軸を取得するためにuserDataを取得する。
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${USER_ENDPOINT}?user_id=${localStorage.getItem("user_id")}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          },
        );
        setUserId(localStorage.getItem("user_id"));
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
  }, []);

  // 化粧品のカテゴリIDを取得する。
  const [categoryId, setCategoryId] = useState(null);
  const [cosmeticName, setCosmeticName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${COSMETIC_INFO_ENDPOINT}?cosmetic_id=${cosmetic_id}`,
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
        setCosmeticName(data.name);
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
    const defaultCriteria = userData ? userData.nayami : [];
    setChosenCriteria(defaultCriteria);
    setUnChosenCriteria(
      criteria.filter((elem) => !defaultCriteria.includes(elem)),
    );
  }, [userData]);

  const [request, setRequest] = useState({
    rate: 0,
    comment: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint_url = COSMETIC_LOG_ENDPOINT;

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
      headers: { Authorization: API_KEY },
      body: JSON.stringify({
        user_id: userId,
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
      <ToastContainer />
      <div className={styles.form}>
        <div className={styles.formItems}>
          <div>
            <Link
              href={`/cosmetics/${cosmetic_id}`}
              className={styles.backIcon}
            >
              <Image src="/icons/back.svg" height={30} width={30} alt="" />
            </Link>
            <h2 className={styles.title}>ログ</h2>
          </div>
          <h4 className={styles.formItemTitle}>商品</h4>
          <div className={styles.horizontalWrapper}>
            <Image
              src={`/item_imgs/${cosmetic_id}.jpg`}
              width={60}
              height={60}
            />
            <p className={styles.textarea}>{cosmeticName}</p>
          </div>
          <h4 className={styles.formItemTitle}>肌に合う度合い</h4>
          <StarRating initialValue={request.rate} onRate={handleRate} />
          {chosenCriteria.map((value) => {
            return (
              <div key={value}>
                <div className={styles.togglableTitleWrapper}>
                  <h4 className={styles.formItemTitle}>
                    {tagIdNameHash[value]}
                  </h4>
                  <Image
                    onClick={() => {
                      handleRemoveCriteria(value);
                    }}
                    className={styles.removeIcon}
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
          <h4 className={styles.formItemTitle}>コメント</h4>
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
