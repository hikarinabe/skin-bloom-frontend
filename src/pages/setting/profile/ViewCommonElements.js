import Image from "next/image";
import Link from "next/link";
import styles from "./ViewCommonElements.module.scss";

export default function ViewCommonElements(){
    return (
        <div>
            <div className={styles.topColor}></div>
            <div>
                <img src="/icons/person.svg"></img>
                <h1>マイページ</h1>
             </div>
            <div class="tabs">
                <ul>
                    <li><Link href="./profile">プロフィール</Link></li>
                    <li><Link href="./password">パスワード</Link></li>
                    <li><Link href="./record">使用履歴</Link></li>   
                </ul>
            </div>
        </div>
        
    );
}