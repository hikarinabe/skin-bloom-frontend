import Image from "next/image";
import Link from "next/link";
import styles from "./ViewCommonElements.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditClick from "./EditClick";
import CancelClick from "./CancelClick";
import SaveClick from "./SaveClick";

export default function ViewCommonElements() {
    return (
        <div>
            <div className={styles.topColor}></div>
            <div className="container">
                <div className={styles.icon}>
                    <img src="/icons/profile_icon.jpg" className={styles.img}></img>
                    <p className={styles.title}>マイページ</p>
                </div>
                <div>
                </div>
                <div className={styles.tabs}>
                    <div className="tabs w-75">
                        <ul className="nav nav-underline">
                            <li className="nav-item"><Link href="./profile" className="nav-link text-primary-emphasis">プロフィール</Link></li>
                            <li className="nav-item"><Link href="./password" className="nav-link text-primary-emphasis">パスワード</Link></li>
                            <li className="nav-item"><Link href="../logs" className="nav-link text-primary-emphasis">使用履歴</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}