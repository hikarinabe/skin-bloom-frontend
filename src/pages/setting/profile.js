import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "./profile/ViewCommonElements";
export default function Profile() {
    return (
        <Layout>
            <main>
                <ViewCommonElements />
                <div>
                    <p>Edit</p>
                    <div>
                        <p>アカウント名</p>
                        <p>account_name</p>
                    </div>
                    <div>
                        <p>誕生日</p>
                        <p>2022/02/03</p>
                    </div>
                    <div>
                        <p>性別</p>
                        <p>回答しない</p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}