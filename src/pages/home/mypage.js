import Layout from "@/components/Layout/Layout";
import MypageItems from "@/components/page/home/mypage/MypageItems";

export default function MyPage() {
  return (
    <Layout beforeLogin={false}>
      <main>
        <MypageItems />
      </main>
    </Layout>
  );
}
