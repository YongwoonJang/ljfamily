"use client"

import getDatabase from '@/app/lib/database'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Page({params}){
    let imgResult = [];
    const router = useRouter();

    getDatabase().forEach((e) => {
        if (e.title.match(decodeURI(params.query)) !== null) {
            imgResult.push(
            <img 
                className={styles['search-result__img']}
                src={e.category==="album"?e.url:e.thumbnail}
                onClick={()=>{
                    if(e.category==="album"){
                        router.push("/album/"+e.url.split("/")[3].split('.')[0])
                    }else{
                        router.push(e.url);
                    }
                }}    
                />
            )
        }
    })

    return(
        <div>
            <label
                className={styles['search-result__label']}
            >
                LJ Family website 검색 결과: 
            </label>
            <div 
                className={styles['search-result__imgFrame']}
            >
                {imgResult.length>0?imgResult:<div>검색 결과가 없습니다.</div>}
            </div>
            <label
                className={styles['search-result__label']}
                >네이버 어학사전 검색 결과: 
            </label>
            <iframe 
                className={styles['search-result__iframe']}
                src={"https://dict.naver.com/dict.search?query=" + params.query}/>
            <button
                className={styles['search-result__button']}
                onClick={() => {
                    router.push(window.location.origin);
                }}
            >뒤로 가기</button>
        </div> 
    );
}