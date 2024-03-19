import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";
import ProfileItems from "@/components/page/setting/profile/profile";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  return (
    <Layout>
      <ViewCommonElements />
      <ProfileItems />
    </Layout>
  );
}
