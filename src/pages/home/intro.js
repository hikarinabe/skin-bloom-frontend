import HeaderBeforeLogin from "@/components/Header/HeaderBeforeLogin";
import Footer from "@/components/Footer/Footer";
import Concept from "@/components/page/home/intro/Concept";
import FuncIntroduction from "@/components/page/home/intro/FuncIntroduction";

export default function Intro() {
  return (
    <>
      <HeaderBeforeLogin />
      <main>
        <Concept />
        <FuncIntroduction />
      </main>
      <Footer />
    </>
  );
}
