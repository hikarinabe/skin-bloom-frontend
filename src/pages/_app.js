import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn =
      typeof localStorage !== "undefined" && localStorage.getItem("user_id");
    if (
      !isLoggedIn &&
      // 許可されたリンク
      router.pathname !== "/home/intro" &&
      !router.pathname.startsWith("/auth") &&
      !router.pathname.startsWith("/cosmetics") &&
      !router.pathname.startsWith("/search")
    ) {
      router.push("/auth/login");
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>SkinBloom</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
