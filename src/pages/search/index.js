import Layout from "@/components/Layout/Layout";
import SearchPageItems from "@/components/page/cosmetics/search/SearchPageItems";
import { useEffect, useState } from "react";

export default function Search() {
  const [isUserId, setIsUserId] = useState(false);

  useEffect(() => {
    setIsUserId(localStorage.getItem("user_id") == null ? true : false);
  }, []);

  return (
    <Layout beforeLogin={isUserId}>
      <main>
        <SearchPageItems />
      </main>
    </Layout>
  );
}
