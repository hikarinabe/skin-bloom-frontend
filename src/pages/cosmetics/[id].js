import Layout from "@/components/Layout/Layout";
import CosmeticItems from "@/components/page/cosmetics/cosmetic/CosmeticItem";
import { useEffect, useState } from "react";

export default function Detail() {
  const [isUserId, setIsUserId] = useState(false);

  useEffect(() => {
    setIsUserId(localStorage.getItem("user_id") == null ? true : false);
  }, []);

  return (
    <Layout beforeLogin={isUserId}>
      <main>
        <CosmeticItems />
      </main>
    </Layout>
  );
}
