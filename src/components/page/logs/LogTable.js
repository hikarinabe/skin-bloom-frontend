import styles from "./LogTable.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from 'react';

const Rating = ({ value }) => {
    // 評価値に応じて星の数を生成
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          src={i < value ? '/icons/yellowstar.svg' : '/icons/graystar.svg'} // 星の色を評価値に基づいて設定
          width={15}
          height={15}
        />
      );
    }
    return <div className={styles.rating}>{stars}</div>;
};
  

export default function LogTable() {
  //テストデータが入っている
  const initialData = [
    {
        id: "1",
        productImage: "/imgs/chifure_all_in_one.jpg",
        productName: "美白 うるおい ジェル",
        productSubName: "ちふれ 美白 うるおい ジェル N",
        category: "オールインワン",
        rate: 3,
        good_tag: [2, 4],
        bad_tag: [1, 3],
        date: "2021-10-01",
        comment: "めちゃくちゃしっとり系かも"
    },
    {
        id: "2",
        productImage: "/imgs/chifure_all_in_one.jpg",
        productName: "美白 うるおい ジェル",
        productSubName: "ちふれ 美白 うるおい ジェル N",
        category: "オールインワン",
        rate: 4,
        good_tag: [2, 4],
        bad_tag: [1, 3],
        date: "2021-09-01",
        comment: "めちゃくちゃしっとり系かも"
    }
  ];

  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className={styles.logTable}>
        <thead>
            <tr>
            {/* <th className = {styles.logTableHeader}></th> */}
            <th className = {styles.logTableHeader}></th>
            <th className = {styles.logTableHeader}>
                <div className={styles.productNameTableHeader}>
                    商品名
                </div>
            </th>
            <th className = {styles.logTableHeader}>
                <div className={styles.categoryTableHeader}>
                    カテゴリ
                </div>
            </th>
            <th className = {styles.logTableHeader} onClick={() => requestSort('rating')}>
                <div className={styles.ratingTableHeader}>
                    評価
                </div>
            </th>
            <th className = {styles.logTableHeader}>
                <div className={styles.positiveTableHeader}>
                    ポジティブ
                </div>
            </th>
            <th className = {styles.logTableHeader}>
                <div className={styles.negativeTableHeader}>
                    ネガティブ
                </div>
            </th>
            <th className = {styles.logTableHeader}>
                <div className={styles.dateTableHeader} onClick={() => requestSort('date')}>
                    記録日
                </div>
            </th>
            <th className = {styles.logTableHeader}>
                <div className={styles.commentTableHeader} onClick={() => requestSort('date')}>
                    コメント
                </div>
            </th>
            </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>
            {/* <td className={styles.cell}>
                <label className={styles.checkbox}>
                    <input type="checkbox" />
                    <span />
                </label>
            </td> */}
            <td className={styles.cell}>
                <div className={styles.imageContainer}>
                    <Image alt="" src={item.productImage} width={60} height={60} />
                </div>
            </td>
            <td className={styles.cell}>
                <div className={styles.productName}>
                <Link href={`/logs/${encodeURIComponent(item.id)}`} passHref>
                    {item.productName}
                </Link>
                </div>
                <div className={styles.productSubName}>
                    {item.productSubName}
                </div>
            </td>
            <td className={styles.cell}>{item.category}</td>
            <td className={styles.cell}>
                <Rating value={item.rate} />
            </td>
            <td className={styles.cell}>{item.good_tag.join(', ')}</td>
            <td className={styles.cell}>{item.bad_tag.join(', ')}</td>
            <td className={styles.cell}>
                <div className={styles.date}>
                    {item.date}
                </div>
            </td>
            <td className={styles.cell}>
                <div className={styles.comment}>
                    {item.comment}
                </div>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
  );
}
