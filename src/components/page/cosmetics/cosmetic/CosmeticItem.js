import tagStyles from "@/styles/button/SoftEdgeTagButton.module.scss";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./CosmeticItem.module.scss";

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
      const res = await fetch(endpoint_url, requestOptions);
      const data = await res.text();
      const json_data = JSON.parse(data);

      console.log(json_data);
      setResponse(() => ({
        name: json_data["name"],
        price: json_data["price"],
        company: to_str_category(json_data["company"]),
        category: to_str_company(json_data["category"]),
        ingredients: json_data["ingredients"],
      }));
      console.log(response.name);
    } catch (err) {
      alert("エラーが発生しました");
    }
  };

  useEffect(() => {
    console.log(router.isReady);
    if (router.isReady) {
      getClients();
    }
  }, [router]);
  return (
    <div className={styles.cosmeticItemWrapper}>
      <div className={styles.contents}>
        <p className={styles.title}>{response.name}</p>

        <Grid container spacing={1}>
          <Grid item xs={4} sm={6}>
            <Image
              src={`/item_imgs/${id}.jpg`}
              height={300}
              width={300}
              alt=""
              className={styles.cosmeticImage}
            />
          </Grid>
          <Grid item xs={7} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className={styles.categoryIcon}>{response.category}</div>
              </Grid>
              <Grid item xs={4}>
                <div className={styles.matchRateWrapper}>
                  <Image src="/icons/heart.svg" height={25} width={25} alt="" />
                  <div>{matchRate * 100}%</div>
                </div>
              </Grid>
            </Grid>
            <div className={styles.itemInfo}>
              <div>
                {response.company} {response.price} 円 (税込)
              </div>
            </div>
            <div className={styles.tagsWrapper}>
              <p>タグ:</p>
              {majorTags.map((value) => (
                <button
                  className={tagStyles.softEdgeTagButtonActive}
                  key={value}
                >
                  {value}
                </button>
              ))}
            </div>
            <button className={styles.pillShapedButtonBlue}>
              この商品から記録を作成
            </button>
          </Grid>
        </Grid>

        <div>
          <p className={styles.center}>成分</p>
          <ListItem component="div">
            <ul>
              {response.ingredients.map((ingredient, index) => (
                <ListItemButton key={index}>
                  <ListItemText
                    primary={ingredient}
                    className={styles.ingredientList}
                  />
                </ListItemButton>
              ))}
            </ul>
          </ListItem>
        </div>
      </div>
    </div>
  );
}
