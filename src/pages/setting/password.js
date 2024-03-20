import Layout from "@/components/Layout/Layout";
import PasswordItems from "@/components/page/setting/password/password";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";

export default function Password() {
  return (
    <Layout>
      <ViewCommonElements activeTab={"password"} />
      <PasswordItems />
    </Layout>
  );
}
