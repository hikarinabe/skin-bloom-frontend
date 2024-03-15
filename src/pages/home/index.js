import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = false; //TODO ログイン判定

    if (isLoggedIn) {
      router.push("/home/mypage");
    } else {
      router.push("/home/intro");
    }
  }, [router]);

  return null;
}