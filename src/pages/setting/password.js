import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "./profile/ViewCommonElements";

export default function Password() {
    return (
        <Layout>
            <main>
                <ViewCommonElements />
                <div>
                    <p>現在のメールアドレス</p>
                    <p>gmail.com</p>
                </div>
                <div>
                    <p>現在のパスワード</p>
                    <p>*******</p>
                </div>
                <div>
                    <p>新しいパスワード</p>
                    <p>hoge</p>
                </div>
                <div>
                    <p>新しいパスワード（確認）</p>
                    <p>hogehoge</p>
                </div>
            </main>
        </Layout>
    );
}