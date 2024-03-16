import Layout from "@/components/Layout/Layout";
import Concept from "@/components/page/home/intro/Concept";
import FuncIntroduction from "@/components/page/home/intro/FuncIntroduction";

export default function Intro() {
  return (
    <Layout>
      <main>
        <Concept />
        <FuncIntroduction />
      </main>
    </Layout>
  );
}
