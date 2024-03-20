import softEdgeButtonStyles from "@/styles/button/SoftEdgeButton.module.scss";
import { useState } from "react";
import styles from "./SearchPageItems.module.scss";

import CosmeticCard from "@/components/CosmeticCard/CosmeticCard";
import Accordion from "@/components/ui/Accordion/Accordion";
import OptionButton from "@/components/ui/button/OptionButton";

import { category_list, company_data } from "@/pkg/cosmetic_master";
import Image from "next/image";

export default function SearchPageItems() {
  const [pageState, setPageState] = useState({
    resultStr: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  // const handleToggle = (optionName) => {
  //   if (nayami.includes(optionName)) {
  //     setNayami(nayami.filter((nayamiItem) => nayamiItem !== optionName));
  //   } else {
  //     setNayami([...nayami, optionName]);
  //   }

  const performSearch = async () => {
    const endpoint_url = `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/cosmetic_info`;
    const requestOptions = {
      method: "POST",
      // TODO: とりあえずこのままコミットする。あとでサーバーのAPI keyを変えて秘匿する
      headers: { Authorization: "wJ5C9dFcEMB5" },
      body: JSON.stringify({
        category: [],
        company: [],
      }),
    };
    console.log("hoge");

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);
      console.log(json_data);
      return json_data
    } catch (err) {
      alert("エラーが発生しました");
      return [];
    }
  };

  const handleSearch = async () => {
    const results = await performSearch();
    setPageState({ resultStr: `検索結果（${results.length}件）` });

    setSearchResults(results);
  };

  return (
    <div className={styles.searchPageItemsWrapper}>
      <div className={styles.inputSectionWrapper}>
        <input placeholder="商品名" className={styles.textBox} />
        <button
          className={softEdgeButtonStyles.softEdgeButton}
          onClick={handleSearch}
        >
          検索
        </button>
      </div>
      <div className={styles.horizontalWrapper}>
        <h3> {pageState.resultStr}</h3>
      </div>
      <div className={styles.filterAndResultWrapper}>
        <div className={styles.filtersWrapper}>
          <div className={styles.filtersTitleWrapper}>
            <Image src="/icons/filter.svg" alt="" height={25} width={20} />
            <h3>絞り込み</h3>
          </div>
          <Accordion title={"カテゴリから探す"}>
            <div className={styles.categoryButtonsWrapper}>
              {category_list.map((value) => (
                <OptionButton optionName={value} key={value} />
              ))}
            </div>
          </Accordion>
          <Accordion title={"ブランドから探す"}>
            <div className={styles.categoryButtonsWrapper}>
              {company_data.map((value) => (
                <OptionButton optionName={value.name} key={value.id} />
              ))}
            </div>
          </Accordion>
        </div>
        <div className={styles.resultWrapper}>
          {searchResults.map((cosmetic, index) => (
            <CosmeticCard cosmetic={cosmetic} isMyPage={false} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
