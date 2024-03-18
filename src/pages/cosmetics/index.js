import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Cosmetic() {
    const router = useRouter();

    useEffect(()=>{
        const isLoggedIn = true;

        if (isLoggedIn){
            router.push("/cosmetics/search.js");
        } else {
            router.push("/home/intro");
        }
    },[router]    );
    return null;
}