import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";
import EditProfileItem from "@/components/page/setting/profile/edit";

export default function EditProfile() {
  return (
    <Layout>
      <ViewCommonElements activeTab={"profile"} />
      <EditProfileItem />
    </Layout>
  );
}
