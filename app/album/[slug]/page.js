import getDatabase from "../../lib/database";
import styles from "@/app/album/[slug]/page.module.css"
import ButtonComponent from "./buttonComponent";
import CommentComponent from "./commentComponent";

export async function generateStaticParams(){
    const cont = getDatabase().filter((el)=>{return el.category==='album'});
    return cont.map((el)=>{return {slug: el.url.split("/")[3].split(".")[0]}});
}

export default function Page({params}){
    const data = getDatabase();
    const pic = data.filter((el)=>{return encodeURI(el.url.split("/")[3].split(".")[0]) === params.slug})[0];

    return (
        <div className={styles['picture-frame']}>
            <div className={styles['picture-frame__title']}>{pic?.title}</div>
            <img 
                className={styles['picture-frame__picture']} 
                src={pic?.url}
                alt="Loading..."    
                />
            <CommentComponent url={pic?.url}/>
            <ButtonComponent/>
        </div>
    )

}