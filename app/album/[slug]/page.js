import getDatabase from "../../lib/database";
import styles from "@/app/album/[slug]/page.module.css"

export async function generateStaticParams(){
    const cont = getDatabase().filter((el)=>{return el.category==='album'});
    return cont.map((el)=>{return {slug: el.title}});
}

export default function Page({params}){
    const data = getDatabase();
    const pic = data.filter((el)=>{return encodeURI(el.title) === params.slug})[0];

    return (
        <div className={styles['picture-frame']}>
            <div>{pic?.title}</div>
            <img className={styles['picture-frame__picture']} src={pic?.url}/>
        </div>
    )

}