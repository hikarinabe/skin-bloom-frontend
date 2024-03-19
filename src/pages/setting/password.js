import Layout from "@/components/Layout/Layout";
import PasswordItems from "@/components/page/setting/password/password";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Password() {
  return (
    <Layout>
      <ViewCommonElements />
      <PasswordItems />
    </Layout>
  );
}
