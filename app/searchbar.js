"use client"
import style from './searchbar.module.css'

import { useForm } from 'react-hook-form'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'



function getSuggetionList({data, typing, router}){
    let suggestionList = [];
    data.forEach((e)=>{
        if(e.title.match(typing)?.length > 0){
            suggestionList.push(
                <div
                    onClick={() => { router.refresh(); router.push(e.url); }} 
                    className={style.suggestionbar}>
                    <img src={e.image} className={style.suggestionbar__img}/>
                    <div className={style.suggestionbar__title} >
                        {e.title}
                    </div>
                    <div className={style.suggestionbar__url}>
                        {e.url}
                    </div>
                </div>
            )
        }
    })
    return suggestionList;
}

export default function Searchbar({isFocus, setFocus}){
    const data = [
        { title: "장용운의 유튜브", url: "https://www.youtube.com/@gyujanggak", image:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2FjangNewProfile.png?alt=media&token=f11e6731-7b34-409b-9045-1181f256d705"},
        { title: "장용운의 블로그", url: "https://blog.naver.com/jyy3k", image: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2Fyongwoonjang.png?alt=media&token=9c76d196-3b25-45a3-87ef-86acbdf8418e"},
        { title: "장용운의 인스타그램", url: "https://www.instagram.com/j_major_scale/", image: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2FYongwoonJangMediaCenter.png?alt=media&token=d63cc0cf-1567-4663-8afb-1086d856ed2f"},
        { title: "연필을 잘 가지고 논다", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230824_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8E%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%BC_%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%91%E1%85%B5%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC.jpeg?alt=media&token=d556e2a3-1296-44df-9554-aa8db790722f", image:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230824_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8E%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%BC_%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%91%E1%85%B5%E1%86%AF_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC.jpeg?alt=media&token=d556e2a3-1296-44df-9554-aa8db790722f"},
        { title: "버스 밖을 보며 잠을 달랜다", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A7%E1%86%AB_%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE%E1%84%83%E1%85%A9.png?alt=media&token=d738ee64-324e-4d04-8838-fc753b0939e8", image:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A7%E1%86%AB_%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE%E1%84%83%E1%85%A9.png?alt=media&token=d738ee64-324e-4d04-8838-fc753b0939e8"},
        { title: "엄마 품을 가장 좋아한다.", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B5%E1%86%BC_%E1%84%8F%E1%85%A5%E1%84%91%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%B8_%E1%84%8B%E1%85%A5%E1%86%B7%E1%84%86%E1%85%A1.jpeg?alt=media&token=9ece854e-f2a7-4769-b784-ddfffc8b110e", image:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230810_son_%E1%84%92%E1%85%AA%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B5%E1%86%BC_%E1%84%8F%E1%85%A5%E1%84%91%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%B8_%E1%84%8B%E1%85%A5%E1%86%B7%E1%84%86%E1%85%A1.jpeg?alt=media&token=9ece854e-f2a7-4769-b784-ddfffc8b110e"},
        { title: "거울을 신기해 한다", url: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230811_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC_%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF.jpeg?alt=media&token=1a4af06b-4161-40d4-b463-fc78a04e6a60", image:"https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Falbum%2F20230811_son_%E1%84%92%E1%85%A9%E1%84%80%E1%85%B5%E1%84%89%E1%85%B5%E1%86%B7_%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AB%E1%84%87%E1%85%A1%E1%86%BC_%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF.jpeg?alt=media&token=1a4af06b-4161-40d4-b463-fc78a04e6a60"}
    
    ]

    const {
        register,
        handleSubmit
    } = useForm();

    const [suggestionList, setSuggestionList] = useState();

    const [choiceNum, setChoiceNum] = useState(-1);

    const suggestionbarContainerRef = useRef();

    const searchbarContainerRef = useRef();

    const router = useRouter();

    const onSubmit = () => {
        if(choiceNum != -1){
            router.refresh();
            router.push(suggestionList[choiceNum].props.children[2].props.children);
            
        }

    }

    const onKeyDown = (e) => {
        let suggestionbarContainer = suggestionbarContainerRef.current;
        
        if(e.keyCode == '38'){//up
            if(choiceNum != -1){
                suggestionbarContainer.children[choiceNum].className = style.suggestionbar;
                setChoiceNum(choiceNum-1);
            }

        }else if(e.keyCode == '40'){//Down
            if(choiceNum != (suggestionbarContainer.children.length-1)){
                if(choiceNum != -1){
                    suggestionbarContainer.children[choiceNum].className = style.suggestionbar;
                }
                setChoiceNum(choiceNum+1);
            }
        
        }else if(e.keyCode == '13'){
            //do nothing...
        }else if (choiceNum != -1) {
            for(let i = 0; i <suggestionbarContainer.children.length; i++){
                suggestionbarContainer.children[i].className = style.suggestionbar;
            }
            setChoiceNum(-1);

        }
        

    }

    const onKeyUp = (e) => {
        let localSuggestionList = null;
        if (e.keyCode != '38' && e.keyCode != '40' && e.keyCode != '13') {
            localSuggestionList = getSuggetionList({ data: data, typing: e.target.value, router: router});
        }else{
            localSuggestionList = suggestionList;
        }
        
        setSuggestionList(localSuggestionList);

        let suggestionbarContainer = suggestionbarContainerRef.current;
        if(choiceNum != -1){
            suggestionbarContainer.children[choiceNum].className = style.suggestionbar__choice;
            searchbarContainerRef.current.children[0].value 
                = localSuggestionList[choiceNum].props.children[1].props.children
            
        }
        
    }

    const onFocus = () => {
        setFocus(true);
    }

    return(
        <>
            
            <form 
                className={isFocus?style.searchbar_container__focus:style.searchbar_container}
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onClick={(e)=>{e.stopPropagation()}}
                ref={searchbarContainerRef}
                >
                <input
                    className={style.searchbar__input}
                    {
                        ...register("typing",{required:false})
                    }
                />
                <img className={style.searchbar__img} src="magnifyGlass.png"/>
                <div
                    ref={suggestionbarContainerRef}
                    className={isFocus ?style.suggestionbar_container:style.suggestionbar_container__none}
                >
                    {suggestionList}
                </div>
                <div className={style.searchbar__black_line} />
            </form>
        </>
    )
}