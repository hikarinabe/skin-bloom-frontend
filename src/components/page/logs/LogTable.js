import styles from "./LogTable.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';

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
  const data = [
    {
        id: 1,
        productImage: "/imgs/chifure_all_in_one.jpg",
        productName: "美白 うるおい ジェル",
        productSubName: "ちふれ 美白 うるおい ジェル N",
        category: "オールインワン",
        evaluation: 3,
        positive: ["うるおい"],
        negative: ["ニキビに効果感じられず"],
        date: "2021-10-01"
    }
  ];
  return (
    <table className={styles.logTable}>
        <thead>
            <tr>
            <th className = {styles.logTableHeader}></th>
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
            <th className = {styles.logTableHeader}>
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
                <div className={styles.dateTableHeader}>
                    記録日
                </div>
            </th>
            </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>
            <td className={styles.cell}>
                <label className={styles.checkbox}>
                    <input type="checkbox" />
                    <span />
                </label>
            </td>
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
                <Rating value={item.evaluation} />
            </td>
            <td className={styles.cell}>{item.positive.join(', ')}</td>
            <td className={styles.cell}>{item.negative.join(', ')}</td>
            <td className={styles.cell}>
                <div className={styles.date}>
                    {item.date}
                </div>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
  );
}
