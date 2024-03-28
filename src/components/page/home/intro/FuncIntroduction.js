import styles from "./FuncIntroduction.module.scss";

import Image from "next/image";

export default function FuncIntroduction() {
  const items = [
    { src: "/imgs/subscription.jpg", caption: "サブスクで化粧品を試す" },
    { src: "/imgs/log.png", caption: "ログをつける" },
    { src: "/imgs/mypage.png", caption: "自分の肌に合う化粧品を知る" },
  ];
  return (
    <div className={styles.sectionWrapper}>
      <p className={styles.subtitle}>機能紹介</p>
      {/* <div class="flex flex-col md:flex-row gap-8"> */}
      {/* <div className={styles.funcItem}>
          <Image src="/imgs/subscription.jpg" alt="" width={400} height={300} />
          <div className={styles.caption}>
            <p className={styles.captionText}>サブスクで化粧品を試す</p>
          </div>
        </div>
        <div className={styles.funcItem}>
          <Image src="/imgs/log.png" alt="" width={400} height={300} />
          // 詳細は不明だがnext/Imageのタグのままpngファイルを読み込むとruntime errorが出たのでimgタグを使っている。
          <div className={styles.caption}>
            <p className={styles.captionText}>ログをつける</p>
          </div>
        </div>
        <div className={styles.funcItem}>
          <Image src="/imgs/mypage.png" alt="" width={400} height={300} />
          <div className={styles.caption}>
            <p className={styles.captionText}>自分の肌に合う化粧品を知る</p>
          </div>
        </div> */}
      <div
        className="flex flex-col md:flex-row gap-8 justify-center items-center mx-auto"
        style={{ width: "90%" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col basis-1/3 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto"
          >
            <div
              className="bg-gray-200 h-48 bg-no-repeat bg-center bg-cover rounded-t-lg"
              style={{ backgroundImage: `url(${item.src})` }}
            >
              {/* Image as background */}
            </div>
            <div className="p-4 bg-white rounded-b-lg">
              <p className="text-center text-gray-600">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
