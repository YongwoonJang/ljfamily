"use client"
import { useRouter } from "next/navigation";
import styles from "@/app/album/[slug]/page.module.css"

export default function ButtonComponent(){
    const router = useRouter();
    return(
        <button
            className={styles['picture-frame__button']}
            onClick={() => {
                if (window.history.length > 1) {
                    router.back();

                } else {
                    router.push("https://ljfamily.vercel.app");

                }
            }}
        >"뒤로 가기"</button>
    )
}