import styles from "./CosmeticCard.module.scss";

import tagStyles from "@/styles/button/SoftEdgeTagButton.module.scss";

import Image from "next/image";
import Link from "next/link";

export default function CosmeticCard({ cosmetic, isMyPage = true }) {
  const imgsrc = "/imgs/image.png";
  const name = "美白うるおいジェル";
  const detailName = "ちふれ 美白 うるおい ジェル N";
  const majorIngredients = ["グリセリン"]; // 要素数1,2この文字列配列;
  const majorTags = ["保湿"];
  const matchRate = 0.8;
  const cosmeticID = 1;
  return (
    <div className={styles.cosmeticCard}>
      <div className={styles.cosmeticImageWrapper}>
        <Image src={imgsrc} height={130} width={130} alt="" />
      </div>
      <h3>{name}</h3>
      <p>{detailName}</p>
      <div className={styles.horizontalWrapper}>
        <div className={styles.ingredientsWrapper}>
          {majorIngredients.map((value) => (
            <button className={tagStyles.softEdgeTagButtonWhite}>{value}</button>
          ))}
        </div>
        {isMyPage ? (
          <div className={styles.matchRateWrapper}>
            <Image src="/icons/heart.svg" height={25} width={25} alt="" />
            <div>{matchRate*100}%</div>
          </div>
        ) : null}
      </div>
      <hr className={styles.division}></hr>
      <div className={styles.horizontalWrapper}>
        <div className={styles.tagsWrapper}>
            {majorTags.map((value)=>(
                <button className={tagStyles.softEdgeTagButtonActive}>{value}</button>
            ))}
        </div>

      </div>

      <div className={styles.horizontalWrapper}>
        <Link href={`/cosmetics/${cosmeticID}`} className={styles.detailButtonWrapper}><button className={styles.detailButton}><h3 className={styles.detailButtonText}>詳しく見る➚</h3></button></Link>
        
        {isMyPage ? null : (
          <Image
            src="/icons/circular-write.svg/"
            height={25}
            width={25}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
