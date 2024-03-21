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
      router.pathname !== "/home/intro" &&
      !router.pathname.startsWith("/auth") &&
      !router.pathname.startsWith("/cosmetics")
    ) {
      router.push("/home/intro");
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
