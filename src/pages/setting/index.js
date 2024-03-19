import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Setting() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = true;

    if (isLoggedIn) {
      router.push("/setting/profile");
    } else {
      router.push("/home/intro");
    }
  }, [router]);

  return null;
}
