import CosmeticCard, {
  CosmeticLogCard,
} from "@/components/CosmeticCard/CosmeticCard";
import softEdgeButtonStyles from "@/styles/button/SoftEdgeButton.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import IngredientsRank from "./IngredientsRank";
import styles from "./MypageItems.module.scss";

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
        <div className={`${styles.sectionWrapper} flex justify-center`}>
          <div className="">
            <h1 className={styles.title}>あなたにベストなスキンケア</h1>
            <div className="flex justify-center">
              <Link href="/logs">
                <button className={softEdgeButtonStyles.softEdgeButton}>
                  過去の記録を見る
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`${styles.rightWrapper} my-5`}>
          <IngredientsRank
            right={true}
            ingredients={response.good_ingredient}
          />
          <IngredientsRank
            right={false}
            ingredients={response.bad_ingredient}
          />
        </div>

        <div className="md:flex md:justify-center">
          <div>
            <p className="text-xl my-2">あなたにおすすめのアイテム</p>
            <div className="flex overflow-x-auto">
              {response.recommend_cosmetics.map((cosmetic, index) => (
                <div className="p-2">
                  <CosmeticCard
                    cosmetic={cosmetic}
                    key={cosmetic["id"]}
                    className="flex-none"
                  />
                </div>
              ))}
            </div>
            {response.user_logs_cosmetics.length !== 0 && (
              <>
                <p className="text-xl my-2">最近追加したアイテム</p>
                <div className="flex overflow-x-auto">
                  {response.user_logs_cosmetics.map((cosmetic, index) => (
                    <div className="p-2">
                      <CosmeticLogCard
                        cosmetic={cosmetic}
                        key={cosmetic["id"]}
                        className="flex-none"
                      />
                    </div>
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
