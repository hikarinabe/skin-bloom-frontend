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
    keyword: "",
  });

  const [optionState, setOptionState] = useState({
    category: [],
    company: [],
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggle = (optionName, value) => {
    if (optionState[optionName].includes(value)) {
      setOptionState({
        ...optionState,
        [optionName]: optionState[optionName].filter((item) => item !== value),
      });
    } else {
      setOptionState({
        ...optionState,
        [optionName]: [...optionState[optionName], value],
      });
    }
  };

  const performSearch = async () => {
    setSearchResults([]);
    const endpoint_url = `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/cosmetic_info`;
    const requestOptions = {
      method: "POST",
      // TODO: とりあえずこのままコミットする。あとでサーバーのAPI keyを変えて秘匿する
      headers: { Authorization: "wJ5C9dFcEMB5" },
      body: JSON.stringify({
        keyword: pageState.keyword,
        category: optionState.category, 
        company: optionState.company,
      }),
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);
      console.log(json_data);
      return json_data;
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
        <input 
        placeholder="商品名" 
        className={styles.textBox} 
        name="keyword"
        value={pageState.keyword}
        onChange={handleChange}
        />
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
              {category_list.map((value, index) => (
                <OptionButton
                  optionName={value}
                  key={value}
                  onClick={() => handleToggle("category", index + 1)}
                  isSelected={optionState.category.includes(index + 1)}
                />
              ))}
            </div>
          </Accordion>
          <Accordion title={"ブランドから探す"}>
            <div className={styles.categoryButtonsWrapper}>
              {company_data.map((value) => (
                <OptionButton
                  optionName={value.name}
                  key={value.id}
                  onClick={() => handleToggle("company", value.id)}
                  isSelected={optionState.company.includes(value.id)}
                />
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
