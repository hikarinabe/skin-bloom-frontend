import styles from "./LogTable.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function LogTable() {
  return (
    <table className={styles.logTable}>
        <thead>
            <tr>
            <th></th>
            <th>商品名</th>
            <th>カテゴリ</th>
            <th>評価</th>
            <th>Tags</th>
            <th>Tags</th>
            <th>記録日</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td></td>
            <td className={styles.imageCell}>
                <div className={styles.imageContainer}>
                    <Image alt="" src="../../../../public/imgs/chifure_all_in_one.jpg" width={60} height={60} />
                </div>
                美白 うるおい ジェル
            </td>
            <td>オールインワン</td>
            <td>ほし</td>
            <td>うるおい</td>
            <td>ニキビに効果感じられず</td>
            <td>2024/03/17</td>
            </tr>
        </tbody>
    </table>
  );
}
