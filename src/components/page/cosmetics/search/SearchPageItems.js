import styles from "./SearchPageItems.module.scss";
import softEdgeButtonStyles from "@/styles/button/SoftEdgeButton.module.scss";

import Accordion from "@/components/ui/Accordion/Accordion";
import OptionButton from "@/components/ui/button/OptionButton";
import CosmeticCard from "@/components/CosmeticCard/CosmeticCard";

import Image from "next/image";

export default function SearchPageItems() {
  const categoryOptions = [
    "オールインワン",
    "日焼け止め",
    "ファンデーション",
    "リップクリーム",
    "化粧水",
  ];
  const brandOptions = ["ちふれ", "資生堂", "ロート製薬"];
  const priceOptions = [
    "〜1000円",
    "1000〜2000円",
    "2000〜3000円",
    "3000〜4000円",
    "4000〜5000円",
    "5000〜円",
  ];

  const resultNum = 50;
  const results = Array.from({ length: resultNum }, (_, index) => []);
  return (
    <div className={styles.searchPageItemsWrapper}>
      <div className={styles.inputSectionWrapper}>
        <input placeholder="商品名" className={styles.textBox} />
        <button className={softEdgeButtonStyles.softEdgeButton}>検索</button>
      </div>
      <div className={styles.horizontalWrapper}>
        <h3>検索結果（{resultNum}件）</h3>
      </div>
      <div className={styles.filterAndResultWrapper}>
        <div className={styles.filtersWrapper}>
          <div className={styles.filtersTitleWrapper}>
            <Image src="/icons/filter.svg" alt="" height={25} width={20} />
            <h3>絞り込み</h3>
          </div>
          <Accordion title={"カテゴリから探す"}>
            <div className={styles.categoryButtonsWrapper}>
              {categoryOptions.map((value) => (
                <OptionButton optionName={value} key={value} />
              ))}
            </div>
          </Accordion>
          <Accordion title={"ブランドから探す"}>
            <div className={styles.categoryButtonsWrapper}>
              {brandOptions.map((value) => (
                <OptionButton optionName={value} key={value} />
              ))}
            </div>
          </Accordion>
          <Accordion title={"値段から探す"}>
            <div className={styles.categoryButtonsWrapper}>
              {priceOptions.map((value) => (
                <OptionButton optionName={value} key={value} />
              ))}
            </div>
          </Accordion>
        </div>
        <div className={styles.resultWrapper}>
          {results.map((cosmetic, index) => (
            <CosmeticCard cosmetic={cosmetic} isMyPage={false} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
