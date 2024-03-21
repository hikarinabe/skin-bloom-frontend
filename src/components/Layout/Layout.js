import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeaderBeforeLogin from "../Header/HeaderBeforeLogin";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, beforeLogin = false }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {beforeLogin ? <HeaderBeforeLogin /> : <Header />}
      {children}
      <Footer />
    </>
  );
}
