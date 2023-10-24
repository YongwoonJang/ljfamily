import ResultComponent from './resultComponent'
import NationalInstituteOfKoreanLanguageQueryResultComponent from './nationalInstituteOfKoreanLanguageQueryResultComponent';
import WikiQueryResultComponent from './wikiQueryResultComponent';


export default function Page({params}){
    
    return(
        <ResultComponent 
            params={params}>
            <NationalInstituteOfKoreanLanguageQueryResultComponent params={params}/>
            <WikiQueryResultComponent params={params} />
        </ResultComponent>
    );
}