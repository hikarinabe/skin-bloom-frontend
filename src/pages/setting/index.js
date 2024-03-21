import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Setting() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = typeof localStorage !== "undefined" && localStorage.getItem("user_id");

    if (isLoggedIn) {
      router.push("/setting/profile");
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  return null;
}
