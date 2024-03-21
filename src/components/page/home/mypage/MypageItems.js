import softEdgeButtonStyles from "@/styles/button/SoftEdgeButton.module.scss";
import styles from "./MypageItems.module.scss";

import CosmeticCard from "@/components/CosmeticCard/CosmeticCard";
import Accordion from "@/components/ui/Accordion/Accordion";
import OptionButton from "@/components/ui/button/OptionButton";
import IngredientsRank from "./IngredientsRank";

import Link from "next/link";

export default function MypageItems() {
  const default_cosmetics = {
    id: "7MLO8LrBYv5prBblQEMR",
    ingredients: [
      "ミネラルオイル",
      "イソステアリン酸ＰＥＧ－８グリセリル",
      "トリ（カプリル酸／カプリン酸）グリセリル",
      "保湿成分",
      "グリセリン",
      "防腐剤",
      "フェノキシエタノール",
      "メチルパラベン",
      "成分の酸化防止剤",
      "トコフェロール",
      "基剤",
      "水",
    ],
    name: "クレンジング オイル",
    price: 880,
    company: 120,
    category: 5,
  };
  return (
    <>
      <div className={styles.mypageItemsWrapper}>
        <div className={styles.sectionWrapper}>
          <div className={styles.leftWrapper}>
            <h1 className={styles.title}>あなたにベストなスキンケア</h1>
            <div className={styles.buttonWrapper}>
              <Link href="/logs/new">
                {/* ↑searchへの動線があったほうがいいかも */}
                <button className={softEdgeButtonStyles.softEdgeButton}>
                  記録する
                </button>
              </Link>
              <Link href="/logs">
                <button className={softEdgeButtonStyles.softEdgeButton}>
                  過去の記録を見る
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <IngredientsRank right={true} />
            <IngredientsRank right={false} />
          </div>
        </div>
        <div className={styles.bottomSectionWrapper}>
          <h2>あなたにおすすめの商品</h2>
          <div>
            <Accordion title={"カテゴリから探す"}>
              <div className={styles.categoryButtonsWrapper}>
                {[
                  "オールインワン",
                  "日焼け止め",
                  "ファンデーション",
                  "リップクリーム",
                  "化粧水",
                ].map((value) => (
                  <OptionButton optionName={value} key={value} />
                ))}
              </div>
            </Accordion>
            <div className={styles.cosmeticsWrapper}>
              {[1, 2, 3, 4].map((cosmetic, index) => (
                <CosmeticCard
                  cosmetic={default_cosmetics}
                  key={default_cosmetics["id"]}
                /> //TODO keyをcosmetic IDに変更する
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
