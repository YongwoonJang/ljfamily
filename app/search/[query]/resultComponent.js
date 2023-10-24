'use client'

import getDatabase from '@/app/lib/database'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

export default function ResultComponent({params, children}){
    let imgResult = [];
    const router = useRouter();

    getDatabase().forEach((e) => {
        if (e.title.match(decodeURI(params.query)) !== null) {
            imgResult.push(
                <img
                    className={styles['search-result__img']}
                    src={e.category === "album" ? e.url : e.thumbnail}
                    onClick={() => {
                        if (e.category === "album") {
                            router.push("/album/" + e.url.split("/")[3].split('.')[0])
                        } else {
                            router.push(e.url);
                        }
                    }}
                />
            )
        }
    })

    return(
        <div>
            <div className={styles['search-result__component-area']}>
                {children[0]}
            </div>
            <div className={styles['search-result__component-area']}>
                <label
                    className={styles['search-result__label']}
                >
                    사진 검색 결과:
                </label>
                <div
                    className={styles['search-result__imgFrame']}
                >
                    {imgResult.length > 0 ? imgResult : <div>검색 결과가 없습니다.</div>}
                </div>
            </div>
            <div className={styles['search-result__component-area']}>
                {children[1]}
            </div>
            <button
                className={styles['search-result__button']}
                onClick={() => {
                    router.push(window.location.origin);
                }}>뒤로 가기</button>
        </div>
    )
}