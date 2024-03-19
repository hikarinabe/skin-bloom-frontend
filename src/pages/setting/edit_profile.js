import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";
import EditProfileItem from "@/components/page/setting/profile/edit";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditProfile() {
  
  return (
    <Layout>
      <ViewCommonElements />
      <EditProfileItem />
    </Layout>
  );
}