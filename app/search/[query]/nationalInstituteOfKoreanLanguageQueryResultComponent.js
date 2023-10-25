import styles from './page.module.css'
import axios from 'axios';

export default async function NationalInstituteOfKoreanLanguageQueryResultComponent({params}){

    let result = "";

    await axios({
        method: "POST",
        url: "https://stdict.korean.go.kr/api/search.do",
        params:{
            key: process.env.KEY,
            q: params.query,
            req_type: "json"
        },
        responseType: "json"
    }).then((res)=>{
        res.data.channel?.item.forEach((e)=>{
            console.log(e);
        });
        result = res.data;

    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
    return(
        <>  
            <label className={styles['search-result__label']}>
                <em>"{decodeURI(params.query)}"</em> 검색 결과
            </label>
            <label
                className={styles['search-result__label']}>
                <a 
                    className={styles['search-result__a']}
                    href="https://stdict.korean.go.kr/main/main.do">국립국어원 표준국어대사전</a> 검색결과:
            </label>
            <ul
                className={styles['search-result__ul']}>
                {result != "" ? result.channel.item.map((el) => { return <li>({el.pos}): {el.sense.definition}</li>}):"검색된 단어가 없습니다."}
            </ul>
        </>
    )
}