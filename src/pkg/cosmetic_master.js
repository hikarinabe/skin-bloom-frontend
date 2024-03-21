// https://console.firebase.google.com/project/hikarinabe-741d2/firestore/data/~2Fcosmetic_master~2Fcategory?hl=ja
export const category_list = [
  "化粧水",
  "乳液",
  "美容液",
  "洗顔フォーム",
  "クレンジング",
  "クリーム",
  "オールインワン",
  "パック・シートマスク",
];

export function to_str_category(n) {
  return category_list[Number(n - 1)];
}

// https://console.firebase.google.com/project/hikarinabe-741d2/firestore/data/~2Fcosmetic_master~2Fcompany?hl=ja
export const company_data = [
  {
    id: 110,
    name: "資生堂",
  },
  {
    id: 120,
    name: "ちふれ",
  },
  {
    id: 130,
    name: "ロート製薬",
  },
];

export function to_str_company(n) {
  for (const c of company_data) {
    if (c.id == Number(n)) return c.name;
  }
  return "";
}
