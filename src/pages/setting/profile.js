import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";
import ProfileItems from "@/components/page/setting/profile/profile";

export default function Profile() {
  return (
    <Layout>
      <ViewCommonElements activeTab={"profile"} />
      <ProfileItems />
    </Layout>
  );
}
