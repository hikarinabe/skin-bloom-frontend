import styles from "./CosmeticCard.module.scss";

import tagStyles from "@/styles/button/SoftEdgeTagButton.module.scss";

import Image from "next/image";
import Link from "next/link";

export default function CosmeticCard({ cosmetic, isMyPage = true }) {
  const cosmetic_id = "b2uUWvgXIekI9oAor9HJ";
  const imgsrc = `/item_imgs/${cosmetic_id}.jpg`;
  const name = "美白うるおいジェル";
  const detailName = "ちふれ 美白 うるおい ジェル N";
  const majorIngredients = ["グリセリン"]; // 要素数1,2この文字列配列;
  const majorTags = ["保湿"];
  const matchRate = 0.8;
  return (
    <div className={styles.cosmeticCard}>
      <div className={styles.cosmeticImageWrapper}>
        <Image src={imgsrc} height={250} width={250} alt="" />
      </div>
      <h3>{name}</h3>
      <p>{detailName}</p>
      <div className={styles.horizontalWrapper}>
        <div className={styles.ingredientsWrapper}>
          {majorIngredients.map((value) => (
            <button className={tagStyles.softEdgeTagButtonWhite} key={value}>
              {value}
            </button>
          ))}
        </div>
        {isMyPage ? (
          <div className={styles.matchRateWrapper}>
            <Image src="/icons/heart.svg" height={25} width={25} alt="" />
            <div>{matchRate * 100}%</div>
          </div>
        ) : null}
      </div>
      <hr className={styles.division}></hr>
      <div className={styles.horizontalWrapper}>
        <div className={styles.tagsWrapper}>
          {majorTags.map((value) => (
            <button className={tagStyles.softEdgeTagButtonActive} key={value}>
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.horizontalWrapper} ${styles.marginTop}`}>
        <Link
          href={`/cosmetics/${cosmetic_id}`}
          className={styles.detailButtonWrapper}
        >
          <button className={styles.detailButton}>
            <h3 className={styles.detailButtonText}>詳しく見る➚</h3>
          </button>
        </Link>

        {isMyPage ? null : (
          <Link
            href={{
              pathname: "/logs/new",
              query: { cosmetic_id: cosmetic_id },
            }}
          >
            <Image
              src="/icons/circular-write.svg/"
              height={25}
              width={25}
              alt=""
            />
          </Link>
        )}
      </div>
    </div>
  );
}
