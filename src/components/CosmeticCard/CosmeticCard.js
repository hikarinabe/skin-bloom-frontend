import { to_str_category } from "@/pkg/cosmetic_master";
import styles from "./CosmeticCard.module.scss";

import tagStyles from "@/styles/button/SoftEdgeTagButton.module.scss";

import Image from "next/image";
import Link from "next/link";

export default function CosmeticCard({ cosmetic, isMyPage = true }) {
  const cosmetic_id = cosmetic.id;
  const imgsrc = `/item_imgs/${cosmetic_id}.jpg`;
  const name = cosmetic.name;
  const categoryName = to_str_category(cosmetic.category);
  const majorIngredients = cosmetic.ingredients.slice(1, 3); // 要素数1,2この文字列配列;
  const majorTags = ["保湿"];
  const matchRate = Math.ceil(Math.random()*100)/100;
  return (
    <div className={styles.cosmeticCard}>
      <div className={styles.cosmeticImageWrapper}>
        <Image src={imgsrc} height={250} width={250} alt="" />
      </div>
      <p>{categoryName}</p>
      <h3>{name}</h3>
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
