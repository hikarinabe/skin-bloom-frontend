import tagStyles from "@/styles/button/SoftEdgeTagButton.module.scss";
import Grid from '@mui/material/Grid';
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./CosmeticCard.module.scss";

export default function CosmeticItems() {
  const router = useRouter();
  const { id } = router.query;
  const [response, setResponse] = useState({
    name: "",
    price: -1,
    company: -1,
    category: 0,
    ingredients: [],
  });
  const matchRate = 0.8;
  const majorTags = ["保湿"];



  const getClients = async () => {
    console.log(id);
    const endpoint_url = `https://asia-northeast1-hikarinabe-741d2.cloudfunctions.net/cosmetic_info?cosmetic_id=${id}`;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "wJ5C9dFcEMB5" },
    };

    try {
      // const res = await fetch(endpoint_url, requestOptions);
      // const data = await res.text();
      // const json_data = JSON.parse(data);

      const json_data = {
        id: "7MLO8LrBYv5prBblQEMR",
        ingredients: [
          "ミネラルオイル",
          "イソステアリン酸ＰＥＧ－８グリセリル",
          "トリ（カプリル酸／カプリン酸）グリセリル",
          "保湿成分",
          "グリセリン",
          "防腐剤",
          "フェノキシエタノール",
          "メチルパラベン",
          "成分の酸化防止剤",
          "トコフェロール",
          "基剤",
          "水",
        ],
        name: "クレンジング オイル",
        price: 880,
        company: "ちふれ",
        category: "クレンジング",
      };

      console.log(json_data);
      setResponse(() => ({
        name: json_data["name"],
        price: json_data["price"],
        company: json_data["company"],
        category: json_data["category"],
        ingredients: json_data["ingredients"],
      }));
      console.log(response.name);
    } catch (err) {
      alert("エラーが発生しました");
    }
  };

  useEffect(() => {
    getClients();
  }, []);
  return (
 
    <div className={styles.cosmeticItemWrapper}>
      <div className={styles.contents}>
      
        <p className={styles.title}>{response.name}</p>
        
        <Grid container spacing={1}>
            <Grid item xs={4} sm={6}>
            <Image src={`/item_imgs/${id}.jpg`} height={300} width={300} alt="" />
            </Grid>
            <Grid item xs={7} sm={6}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className={styles.categoryIcon}>クレンジング</div>
              </Grid>
              <Grid item xs={4}>
                <div className={styles.matchRateWrapper}>
                  <Image src="/icons/heart.svg" height={25} width={25} alt="" />
                  <div>{matchRate * 100}%</div>
                </div>
                </Grid>
        </Grid>
            <div className={styles.itemInfo}>
                <div>{response.company} {response.price} 円 (税込)</div>
            </div>
              <div className={styles.tagsWrapper}>
                <p>タグ:</p>
              {majorTags.map((value) => (
                <button className={tagStyles.softEdgeTagButtonActive} key={value}>
                  {value}
                </button>
              ))}
              </div>
              <button className={styles.pillShapedButtonBlue}>
                この商品から記録を作成
              </button>
              </Grid>
      </Grid>

  
      <div className={styles.horizontalWrapper}>
        <div>
        <p className={styles.center}>成分</p>
        <ul>
          {response.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      </div>
      </div>
    </div>
  );
}
