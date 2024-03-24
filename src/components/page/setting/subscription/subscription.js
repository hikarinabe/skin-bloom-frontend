import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../Profile.module.scss";

// あとでエンドポイント経由ではなく直接呼び出せるように修正する。
export default function SubscriptionItems() {
  return (
    <main>
      <div className={styles.sectionWrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.buttonsWrapper}></div>
        </div>
      </div>
    </main>
  );
}
