import Image from "next/image";
import styles from "./IngredientsRank.module.scss";

export default function IngredientsRank({
  right,
  ingredients = ["グリセリン", "水", "砂糖"],
}) {
  return (
    <div className="md:w-96">
      <div className={styles.ingredientsRank}>
        <div className={styles.ingredientsRankTitle}>
          <Image
            src={`/icons/${right ? "happy" : "sad"}.svg`}
            height={25}
            width={25}
            alt=""
          />
          <p>あなたに{right ? "合う" : "合わない"}成分</p>
        </div>
        <div className={styles.ingredientsRankItemsWrapper}>
          {ingredients.map((value, index) => (
            <div className={styles.ingredientRankItem} key={index}>
              <Image
                src={`/icons/rank${index + 1}.svg`}
                height={32}
                width={41}
                alt=""
              />
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
