"use client"
import getDatabase from "../../lib/database";
import styles from "@/app/album/[slug]/page.module.css"
import { useRouter } from "next/navigation";

export async function generateStaticParams(){
    const cont = getDatabase().filter((el)=>{return el.category==='album'});
    return cont.map((el)=>{return {slug: el.url.split("/")[3].split(".")[0]}});
}

export default function Page({params}){
    const data = getDatabase();
    const pic = data.filter((el)=>{return encodeURI(el.url.split("/")[3].split(".")[0]) === params.slug})[0];
    const router = useRouter();

    return (
        <div className={styles['picture-frame']}>
            <div>제목: {pic?.title}</div>
            <img className={styles['picture-frame__picture']} src={pic?.url}/>
            <button
                className={styles['picture-frame__button']}
                onClick={()=>{
                    if(window.history.length > 2){
                        router.back();

                    }else{
                        window.location;

                    }
                }}
            >"뒤로 가기"</button>
        </div>
    )

}