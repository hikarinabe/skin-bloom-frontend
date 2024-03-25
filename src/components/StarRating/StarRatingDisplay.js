import Image from "next/image";
import "tailwindcss/tailwind.css";

export default function StarRatingDisplay({ value }) {
  // 評価値に応じて星の数を生成
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Image
        key={i}
        src={i < value ? "/icons/yellowstar.svg" : "/icons/graystar.svg"} // 星の色を評価値に基づいて設定
        width={15}
        height={15}
        className="inline"
      />,
    );
  }
  return <div>{stars}</div>;
}
