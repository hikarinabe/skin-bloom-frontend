import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "@/components/page/setting/ViewCommonElements";
import SubscriptionItems from "@/components/page/setting/subscription/subscription";

export default function Subscription() {
  return (
    <Layout>
      <ViewCommonElements activeTab={"subscription"} />
      <SubscriptionItems />
    </Layout>
  );
}
