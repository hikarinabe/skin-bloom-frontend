import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = (typeof localStorage !== 'undefined') && (localStorage.getItem('user_id')); 
    if (isLoggedIn) {
      router.push("/home/mypage");
    } else {
      router.push("/home/intro");
    }
  }, [router]);

  return null;
}
