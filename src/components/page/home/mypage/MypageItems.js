import styles from "./MypageItems.module.scss";
import softEdgeButtonStyles from "@/styles/button/SoftEdgeButton.module.scss";

import IngredientsRank from "./IngredientsRank";
import CosmeticCard from "@/components/CosmeticCard/CosmeticCard";
import Accordion from "@/components/ui/Accordion/Accordion";
import OptionButton from "@/components/ui/button/OptionButton";

import Link from "next/link";
import Image from "next/image";

export default function MypageItems() {
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
              {[].map((cosmetic, index) => (
                <CosmeticCard cosmetic={cosmetic} key={index} /> //TODO keyをcosmetic IDに変更する
              ))}
              {/* TODO ↑がうまれば下を削除する */}
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
              <CosmeticCard cosmetic={[]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
