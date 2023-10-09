"use client"
import style from './searchArea.module.css'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

import reactStringReplace from 'react-string-replace';

import getDatabase from './lib/database'

function Suggestion({ index, choiceNum, setChoiceNum, condition="old" ,url, thumbnail, title }) {

    const router = useRouter();

    return (
        <li
            onClick={() => { 
                router.push(url); 
            }}
            onTouchStart={()=>{
                setChoiceNum(index);
            }}
            className={index === choiceNum ? `${style['suggestion-area__bar']} ${style['suggestion-area__bar--choice']}` : style['suggestion-area__bar']}
            onMouseOver={() => { setChoiceNum(index);}}
            >
            {condition=="new"?<span className={style['suggestion-area__span--new']}> New </span>:""}
            <Image src={thumbnail} width={27} height={27} quality={30} className={style['suggestion-area__thumbnail']} />
            <div className={style['suggestion-area__title']} >
                {title}
            </div>
        </li>
    )
}

function getSuggestionComponent({ suggestionList, choiceNum, setChoiceNum }) {
    let localSuggestionList = [];

    for (let i = 0; i < suggestionList?.length; i++) {
        localSuggestionList.push(
        <Suggestion 
            index={i} 
            choiceNum={choiceNum} 
            setChoiceNum={setChoiceNum} 
            condition={suggestionList[i]?.condition}
            url={suggestionList[i].category=="album"?"/album/"+suggestionList[i].url.split("/")[3].split('.')[0]:suggestionList[i].url} 
            thumbnail={suggestionList[i].category==="album"?suggestionList[i].url:suggestionList[i].thumbnail} 
            title={suggestionList[i].title} />);
    }

    return localSuggestionList;
}

export default function SearchArea({ isFocus, setFocus }) {
    const data = getDatabase();

    const {
        register,
        handleSubmit,
        getValues
    } = useForm();

    const [suggestionList, setSuggestionList] = useState();

    const [suggestionComponent, setSuggestionComponent] = useState();

    const [choiceNum, setChoiceNum] = useState(-1);

    const router = useRouter();

    const onFocus = () => {
        setSuggestionList(data);
        setSuggestionComponent(getSuggestionComponent({ suggestionList: data, choiceNum: choiceNum, setChoiceNum: setChoiceNum }));
        setFocus(true);
    }

    const onKeyDown = (e) => {
        if (e.keyCode == '38') {//up
            if (choiceNum != -1) {

                setChoiceNum(choiceNum - 1);
            }

        } else if (e.keyCode == '40') {//Down
            if (choiceNum != suggestionList.length - 1) {
                setChoiceNum(choiceNum + 1);

            }
        } else if (e.keyCode != '13') {//And without Enter
            setChoiceNum(-1);

        }
    }

    const onKeyUp = (e) => {
        if (e.keyCode != '38' && e.keyCode != '40') { //If key is not up or down then set a suggestionList
            let tmptData = []
            data.forEach((el) => {
                if (el.title.match(e.target.value)?.length > 0) {
                    tmptData.push(JSON.parse(JSON.stringify(el)));
                    if (e.target.value != "" && e.target.value != " ") {
                        tmptData[tmptData.length - 1].title =
                            reactStringReplace(tmptData[tmptData.length - 1].title, e.target.value, (match, i) => (<span className={style['suggestion-area__title--strong']}>{match}</span>))

                    }
                }
            })
            setSuggestionList(tmptData);
            setSuggestionComponent(getSuggestionComponent({ suggestionList: tmptData, choiceNum: choiceNum, setChoiceNum: setChoiceNum }));

        } else {
            setSuggestionComponent(getSuggestionComponent({ suggestionList: suggestionList, choiceNum: choiceNum, setChoiceNum: setChoiceNum }));

        }

    }

    const onSubmit = () => {
        if (choiceNum != -1) {
            router.push(suggestionList[choiceNum].url);

        }else{
            router.push("/search/"+getValues("typing"));

        }

    }

    return (
        <search role="search">
            <form
                className={`${style['search-area']} ${style['search-area--focus']}`}
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => { e.stopPropagation(); }}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onMouseMove={() => { setSuggestionComponent(getSuggestionComponent({ suggestionList: suggestionList, choiceNum: choiceNum, setChoiceNum: setChoiceNum })); }}
            >
                <input
                    className={style['search-area__input']}
                    {
                    ...register("typing", { required: false })
                    }
                />
                <img className={style['search-area__img']} src="/magnifyGlass.png" />
                <ul
                    className={isFocus ? style['suggestion-area'] : style['suggestion-area--none']}
                >
                    {suggestionComponent}
                </ul>
            </form>
        </search>
    )


}