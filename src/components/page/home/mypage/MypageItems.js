import softEdgeButtonStyles from "@/styles/button/SoftEdgeButton.module.scss";
import styles from "./MypageItems.module.scss";

import CosmeticCard, {
  CosmeticLogCard,
} from "@/components/CosmeticCard/CosmeticCard";
// import Accordion from "@/components/ui/Accordion/Accordion";
// import OptionButton from "@/components/ui/button/OptionButton";
import IngredientsRank from "./IngredientsRank";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

export default function MypageItems() {
  const router = useRouter();

  const [response, setResponse] = useState({
    user_logs_cosmetics: [],
    recommend_cosmetics: [],
    good_ingredient: [],
    bad_ingredient: [],
  });

  const fetchHome = async () => {
    const user_id = localStorage.getItem("user_id");
    const endpoint_url = `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/home?user_id=${user_id}`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "wJ5C9dFcEMB5" },
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);

      console.log(json_data);
      setResponse(() => ({
        user_logs_cosmetics: json_data.list_cosmetics,
        recommend_cosmetics: json_data.recommend_items.sort(
          (a, b) => b.match_rate - a.match_rate,
        ),
        good_ingredient: json_data.good_ingredient,
        bad_ingredient: json_data.bad_ingredient,
      }));
    } catch (err) {
      alert("エラーが発生しました");
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <>
      <div className={styles.mypageItemsWrapper}>
        <div className={styles.sectionWrapper}>
          <div className={styles.leftWrapper}>
            <h1 className={styles.title}>あなたにベストなスキンケア</h1>
            <div className={styles.buttonWrapper}>
              <Link href="/logs">
                <button className={softEdgeButtonStyles.softEdgeButton}>
                  過去の記録を見る
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <IngredientsRank
              right={true}
              ingredients={response.good_ingredient}
            />
            <IngredientsRank
              right={false}
              ingredients={response.bad_ingredient}
            />
          </div>
        </div>
        <div>
          <div className={styles.bottomSectionWrapper}>
            <h2>あなたにおすすめのアイテム</h2>
            <div>
              {/* <Accordion title={"カテゴリから探す"}>
                <div className={styles.categoryButtonsWrapper}>
                  {category_list.map((value) => (
                    <OptionButton optionName={value} key={value} />
                  ))}
                </div>
              </Accordion> */}
              <div className={styles.cosmeticsWrapper}>
                {response.recommend_cosmetics.map((cosmetic, index) => (
                  <CosmeticCard cosmetic={cosmetic} key={cosmetic["id"]} />
                ))}
              </div>
            </div>
            {response.user_logs_cosmetics.length !== 0 && (
              <>
                <h2>最近追加したアイテム</h2>
                <div className={styles.cosmeticsWrapper}>
                  {response.user_logs_cosmetics.map((cosmetic, index) => (
                    <CosmeticLogCard cosmetic={cosmetic} key={cosmetic["id"]} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
