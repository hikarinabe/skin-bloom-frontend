// https://console.firebase.google.com/project/hikarinabe-741d2/firestore/data/~2Fcosmetic_master~2Fcategory?hl=ja
const category_data = {
  1: "化粧水",
  2: "乳液",
  3: "美容液",
  4: "洗顔フォーム",
  5: "クレンジング",
  6: "クリーム",
  7: "オールインワン",
  8: "パック・シートマスク",
};

export function to_str_category(n) {
  return category_data[Number(n)];
}

// https://console.firebase.google.com/project/hikarinabe-741d2/firestore/data/~2Fcosmetic_master~2Fcompany?hl=ja
const company_data = {
  110: "資生堂",
  120: "ちふれ",
  130: "ロート製薬",
};

export function to_str_company(n) {
  return company_data[Number(n)];
}
