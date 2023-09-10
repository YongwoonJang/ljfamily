"use client"
import style from './searchbar.module.css'

import { useForm } from 'react-hook-form'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Suggestion from './suggestion'

import reactStringReplace from 'react-string-replace';

function getSuggestionComponent({suggestionList, choiceNum, setChoiceNum}){
    let localSuggestionList = [];
    
    for(let i = 0; i<suggestionList?.length; i++){
        localSuggestionList.push(<Suggestion index={i} choiceNum={choiceNum} setChoiceNum={setChoiceNum} url={suggestionList[i].url} thumbnail={suggestionList[i].thumbnail} title={suggestionList[i].title} />);
    }

    return localSuggestionList;
}

export default function Searchbar({isFocus, setFocus}){
    const data = [
        { title: "장하성은 엄마를 좋아한다.", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230911_son_%E1%84%89%E1%85%A5%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8B%E1%85%AC%E1%84%80%E1%85%A9_%E1%84%92%E1%85%A2%E1%86%BC%E1%84%87%E1%85%A9%E1%86%A8%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%89%E1%85%A6%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%20%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC.jpeg?alt=media&token=4acf502f-1396-4a5b-9040-79f0c2497e26", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230911_son_%E1%84%89%E1%85%A5%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8B%E1%85%AC%E1%84%80%E1%85%A9_%E1%84%92%E1%85%A2%E1%86%BC%E1%84%87%E1%85%A9%E1%86%A8%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%89%E1%85%A6%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%20%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC.jpeg?alt=media&token=4acf502f-1396-4a5b-9040-79f0c2497e26"},
        { title: "약사 장하성", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230908_son_%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%89%E1%85%A1_%E1%84%8B%E1%85%A9%E1%86%BA%E1%84%87%E1%85%A1%E1%86%BC_%E1%84%80%E1%85%B1%E1%84%8B%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%B7.jpeg?alt=media&token=64fc0463-7c07-44e4-b17d-028320908979", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230908_son_%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%89%E1%85%A1_%E1%84%8B%E1%85%A9%E1%86%BA%E1%84%87%E1%85%A1%E1%86%BC_%E1%84%80%E1%85%B1%E1%84%8B%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%B7.jpeg?alt=media&token=64fc0463-7c07-44e4-b17d-028320908979"},
        { title: "장하성과 엄마, DSLR", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230907_son_%E1%84%83%E1%85%A1%E1%86%AB%E1%84%85%E1%85%A1%E1%86%AB_%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A9%E1%86%A8_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC.JPG?alt=media&token=81062b5a-1c2f-4b80-8a6a-80e36ee0ec81", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230907_son_%E1%84%83%E1%85%A1%E1%86%AB%E1%84%85%E1%85%A1%E1%86%AB_%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A9%E1%86%A8_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC.JPG?alt=media&token=81062b5a-1c2f-4b80-8a6a-80e36ee0ec81"},
        { title: "장하성의 리더십", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230905_son_%E1%84%8B%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC_%E1%84%85%E1%85%B5%E1%84%83%E1%85%A5%E1%84%89%E1%85%B5%E1%86%B8.jpeg?alt=media&token=5a4e7e85-de5b-407e-ab1b-5d90b709c091", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230905_son_%E1%84%8B%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC_%E1%84%85%E1%85%B5%E1%84%83%E1%85%A5%E1%84%89%E1%85%B5%E1%86%B8.jpeg?alt=media&token=5a4e7e85-de5b-407e-ab1b-5d90b709c091" },
        { title: "아빠와 아기", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230905_son_%E1%84%8B%E1%85%A1%E1%84%88%E1%85%A1_%E1%84%8B%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC.jpeg?alt=media&token=a44fc865-7edc-48e7-98f6-d818d4c6e4f0", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230905_son_%E1%84%8B%E1%85%A1%E1%84%88%E1%85%A1_%E1%84%8B%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A5%E1%86%BC.jpeg?alt=media&token=a44fc865-7edc-48e7-98f6-d818d4c6e4f0"},
        { title: "늘 당당한 아기", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230903_thubnail_son_%EB%8B%B9%EB%8B%B9%ED%95%9C_%EA%B7%80%EC%97%AC%EC%9A%B4.JPG?alt=media&token=47e7b2c6-3163-4c33-87a1-6e45dda2000c", "thumbnail":"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fthumbnail%2F20230903_thubnail_son_%EB%8B%B9%EB%8B%B9%ED%95%9C_%EA%B7%80%EC%97%AC%EC%9A%B4.JPG?alt=media&token=7097ab96-899f-4322-a7de-f4d3db5c26c5"},
        { title: "아기부터 가지고 노는 모빌", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230903_son_%E1%84%80%E1%85%B1%E1%84%8B%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%B7_%E1%84%86%E1%85%A9%E1%84%87%E1%85%B5%E1%86%AF.JPG?alt=media&token=b7b001b2-7cfe-46ef-8540-7bd865b98aa4", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230903_son_%E1%84%80%E1%85%B1%E1%84%8B%E1%85%A7%E1%84%8B%E1%85%AE%E1%86%B7_%E1%84%86%E1%85%A9%E1%84%87%E1%85%B5%E1%86%AF.JPG?alt=media&token=b7b001b2-7cfe-46ef-8540-7bd865b98aa4"},
        { title: "배드민턴 가족, 장하성은 심판", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230902_son_%E1%84%87%E1%85%A2%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%E1%86%AB%E1%84%90%E1%85%A5%E1%86%AB_%E1%84%8B%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AF_%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A9.jpeg?alt=media&token=9a5c62ad-ab24-4aa4-8c9b-aba34bf1e4b1", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230902_son_%E1%84%87%E1%85%A2%E1%84%83%E1%85%B3%E1%84%86%E1%85%B5%E1%86%AB%E1%84%90%E1%85%A5%E1%86%AB_%E1%84%8B%E1%85%A1%E1%84%83%E1%85%B3%E1%86%AF_%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%A9.jpeg?alt=media&token=9a5c62ad-ab24-4aa4-8c9b-aba34bf1e4b1"},
        { title: "연필을 잘 가지고 논다", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230824_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8E%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%BC_%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%91%E1%85%B5%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC.jpeg?alt=media&token=d556e2a3-1296-44df-9554-aa8db790722f", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230824_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8E%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%BC_%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%91%E1%85%B5%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC.jpeg?alt=media&token=d556e2a3-1296-44df-9554-aa8db790722f"},
        { title: "버스 밖을 보며 잠을 달랜다", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A7%E1%86%AB_%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE%E1%84%83%E1%85%A9.png?alt=media&token=d738ee64-324e-4d04-8838-fc753b0939e8", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A7%E1%86%AB_%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE%E1%84%83%E1%85%A9.png?alt=media&token=d738ee64-324e-4d04-8838-fc753b0939e8"},
        { title: "엄마 품을 가장 좋아한다.", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B5%E1%86%BC_%E1%84%8F%E1%85%A5%E1%84%91%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%B8_%E1%84%8B%E1%85%A5%E1%86%B7%E1%84%86%E1%85%A1.jpeg?alt=media&token=9ece854e-f2a7-4769-b784-ddfffc8b110e", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B5%E1%86%BC_%E1%84%8F%E1%85%A5%E1%84%91%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%B8_%E1%84%8B%E1%85%A5%E1%86%B7%E1%84%86%E1%85%A1.jpeg?alt=media&token=9ece854e-f2a7-4769-b784-ddfffc8b110e"},
        { title: "거울을 신기해 한다", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230811_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC_%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF.jpeg?alt=media&token=1a4af06b-4161-40d4-b463-fc78a04e6a60", thumbnail:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230811_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC_%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF.jpeg?alt=media&token=1a4af06b-4161-40d4-b463-fc78a04e6a60"},
        
        
        
        { title: "장용운의 유튜브", url: "https://www.youtube.com/@gyujanggak", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2FjangNewProfile.png?alt=media&token=f11e6731-7b34-409b-9045-1181f256d705" },
        { title: "장용운의 블로그", url: "https://blog.naver.com/jyy3k", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2Fyongwoonjang.png?alt=media&token=9c76d196-3b25-45a3-87ef-86acbdf8418e" },
        { title: "장용운의 인스타그램", url: "https://www.instagram.com/j_major_scale/", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2FYongwoonJangMediaCenter.png?alt=media&token=d63cc0cf-1567-4663-8afb-1086d856ed2f" }
    ]
        
    

    const {
        register,
        handleSubmit
    } = useForm();

    const [suggestionList, setSuggestionList] = useState();

    const [suggestionComponent, setSuggestionComponent] = useState();

    const [choiceNum, setChoiceNum] = useState(-1);

    const router = useRouter();

    const onFocus = () => {
        setSuggestionList(data);
        setSuggestionComponent(getSuggestionComponent({ suggestionList: data, choiceNum: choiceNum, setChoiceNum:setChoiceNum }));
        setFocus(true);
    }

    const onKeyDown = (e) => {
        if (e.keyCode == '38') {//up
            if (choiceNum != -1) {

                setChoiceNum(choiceNum - 1);
            }

        } else if (e.keyCode == '40') {//Down
            if (choiceNum != suggestionList.length-1) {
                setChoiceNum(choiceNum + 1);

            }
        } else if (e.keyCode != '13'){//And without Enter
            setChoiceNum(-1);

        }
    }

    const onKeyUp = (e) => {
        if (e.keyCode != '38' && e.keyCode != '40'){ //If key is not up or down then set a suggestionList
            let tmptData = []
            data.forEach((el) => {
                if (el.title.match(e.target.value)?.length > 0) {
                    tmptData.push(el);
                    if (e.target.value != "" && e.target.value != " "){
                        tmptData[tmptData.length - 1].title = 
                        reactStringReplace(tmptData[tmptData.length-1].title, e.target.value, (match, i)=>(<span className={style.suggestionbar__span__strong}>{match}</span>))

                    }
                }
            })
            setSuggestionList(tmptData);
            setSuggestionComponent(getSuggestionComponent({ suggestionList: tmptData, choiceNum: choiceNum, setChoiceNum: setChoiceNum }));

        }else{
            setSuggestionComponent(getSuggestionComponent({ suggestionList: suggestionList, choiceNum: choiceNum, setChoiceNum: setChoiceNum }));

        }

    }

    const onSubmit = () => {
        if (choiceNum != -1) {
            router.push(suggestionList[choiceNum].url);

        }

    }

    return(
        <>
            
            <form 
                className={isFocus?style.searchbar_container__focus:style.searchbar_container}
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onMouseMove={() => {setSuggestionComponent(getSuggestionComponent({ suggestionList: suggestionList, choiceNum: choiceNum, setChoiceNum: setChoiceNum })); }}
                onClick={(e)=>{e.stopPropagation()}}
                >
                <input
                    className={style.searchbar__input}
                    {
                        ...register("typing",{required:false})
                    }
                />
                <img className={style.searchbar__img} src="magnifyGlass.png"/>
                <div
                    className={isFocus ?style.suggestionbar_container:style.suggestionbar_container__none}
                >
                    {suggestionComponent}
                </div>
            </form>
        </>
    )
}