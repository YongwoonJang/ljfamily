import styles from './page.module.css'

export default function WikiQueryResultComponent({params}){
    return(
        <>
            <label
                className={styles['search-result__label']}>
                위키피디아 검색 결과
            </label>
            <iframe
                className={styles['search-result__iframe']}
                src={"https://ko.wikipedia.org/wiki/" + params.query} />
        </>
    )
}