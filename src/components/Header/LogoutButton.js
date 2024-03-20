import { useRouter } from "next/router";

import buttonStyles from "@/styles/button/SoftEdgeButton.module.scss";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user_id");
    router.push("/home/intro");
  };

  return (
    <button className={buttonStyles.softEdgeButton} onClick={logout}>
      ログアウト
    </button>
  );
}
