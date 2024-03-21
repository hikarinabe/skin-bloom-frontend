import { to_str_category } from "@/pkg/cosmetic_master";
import { tag_list } from "@/pkg/tag";
import tagStyles from "@/styles/button/SoftEdgeTagButton.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styles from "./LogTable.module.scss";

import StarRatingDisplay from "@/components/StarRating/StarRatingDisplay";

export default function LogTable() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [tag, setTag] = useState({
    good_tag: [],
    bad_tag: [],
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const getClients = async () => {
    const user_id = localStorage.getItem("user_id");
    const endpoint_url = `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/cosmetic_log/list?user_id=${user_id}`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "wJ5C9dFcEMB5" },
    };

    try {
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);

      // initialDataにデータを入れる
      setData(json_data["list_cosmetics"]);
    } catch (err) {
      alert("エラーが発生しました");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getClients();
    }
  }, [router]);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.logTableWrapper}>
      <table className={styles.logTable}>
        <thead>
          <tr>
            <th className={styles.logTableHeader}></th>
            <th className={styles.logTableHeader}>
              <div className={styles.productNameTableHeader}>商品名</div>
            </th>
            <th className={styles.logTableHeader}>
              <div className={styles.categoryTableHeader}>カテゴリ</div>
            </th>
            <th
              className={styles.logTableHeader}
              onClick={() => requestSort("rating")}
            >
              <div className={styles.ratingTableHeader}>評価</div>
            </th>
            <th className={styles.logTableHeader}>
              <div className={styles.positiveTableHeader}>ポジティブ</div>
            </th>
            <th className={styles.logTableHeader}>
              <div className={styles.negativeTableHeader}>ネガティブ</div>
            </th>
            <th className={styles.logTableHeader}>
              <div
                className={styles.dateTableHeader}
                onClick={() => requestSort("date")}
              >
                記録日
              </div>
            </th>
            <th className={styles.logTableHeader}>
              <div
                className={styles.commentTableHeader}
                onClick={() => requestSort("date")}
              >
                コメント
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className={styles.cell}>
                <div className={styles.imageContainer}>
                  <Image
                    alt=""
                    src={`/item_imgs/${item.id}.jpg`}
                    width={60}
                    height={60}
                  />
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.name}>
                  <Link
                    href={`/cosmetics/${item.id}`}
                    passHref
                    className={styles.noLinkStyle}
                  >
                    {item.item_name}
                  </Link>
                </div>
              </td>
              <td className={styles.cell}>{to_str_category(item.category)}</td>
              <td className={styles.cell}>
                <StarRatingDisplay value={item.rate} />
              </td>
              <td className={styles.cell}>
                <div className={styles.tagContainer}>
                  {item.good_tag.map((value) => (
                    <button
                      className={tagStyles.softEdgeTagButtonActive}
                      key={value}
                    >
                      {tag_list[value - 1].name}
                    </button>
                  ))}
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.tagContainer}>
                  {item.bad_tag.map((value) => (
                    <button
                      className={tagStyles.softEdgeTagButtonWhite}
                      key={value}
                    >
                      {tag_list[value - 1].name}
                    </button>
                  ))}
                </div>
              </td>
              <td className={styles.cell}>
                <div className={styles.date}>{item.date.replace("T", " ")}</div>
              </td>
              <td className={styles.cell}>
                <div className={styles.comment}>{item.comment}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
