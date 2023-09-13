"use client"
import style from './searchArea.module.css'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

import reactStringReplace from 'react-string-replace';

function Suggestion({ index, choiceNum, setChoiceNum, url, thumbnail, title }) {
    const router = useRouter();

    return (
        <li
            onClick={() => { setChoiceNum(index); router.push(url); }}
            className={index === choiceNum ? `${style['suggestion-area__bar']} ${style['suggestion-area__bar--choice']}` : style['suggestion-area__bar']}
            onMouseEnter={() => { setChoiceNum(index); }}>
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
        localSuggestionList.push(<Suggestion index={i} choiceNum={choiceNum} setChoiceNum={setChoiceNum} url={suggestionList[i].url} thumbnail={suggestionList[i].category==="album"?suggestionList[i].url:suggestionList[i].thumbnail} title={suggestionList[i].title} />);
    }

    return localSuggestionList;
}

export default function SearchArea({ isFocus, setFocus }) {
    const data = [
        { category: "album", title: "얼음깨기를 좋아하다", url: "20230913_son_아들_얼음깨기를 좋아하다.JPG"},
        { category: "album", title: "안방을 정리하는 아기", url: "/images/family/20230912_son_안방을 정리하는 아기.jpg"},
        { category: "album", title: "배드민턴 감독 장하성", url: "/images/family/20230911_son_배드민턴 감독.jpeg"},
        { category: "album", title: "장하성은 엄마를 좋아한다.", url: "/images/family/20230911_son_성남외고_행복한 세상의 장하성.jpeg" },
        { category: "album", title: "약사 장하성", url: "/images/family/20230908_son_약사_옷방_귀여움.jpeg" },
        { category: "album", title: "장하성과 엄마, DSLR", url: "/images/family/20230907_son_단란_가족_장하성.JPG" },
        { category: "album", title: "장하성과 엄마(23년8월28일)", url: "/images/family/20230828_son_장하성_엄마.jpg"},
        { category: "album", title: "장하성과 엄마(23년9월1일)", url: "/images/family/20230901_son_장하성_엄마.jpg" },
        { category: "album", title: "장하성과 엄마2", url: "/images/family/20230828_son_장하성_엄마.jpg" },
        { category: "album", title: "장하성의 리더십", url: "/images/family/20230905_son_아들_장하성_리더십.jpeg" },
        { category: "album", title: "아빠와 아기", url: "/images/family/20230905_son_아빠_아들_장하성.jpeg" },
        { category: "album", title: "늘 당당한 아기", url: "/images/family/20230903_thubnail_son_당당한_귀여운.JPG" },
        { category: "album", title: "아기부터 가지고 노는 모빌", url: "/images/family/20230903_son_귀여움_모빌.JPG" },
        { category: "album", title: "아빠와 장하성", url: "/images/family/20230902_son_배드민턴_아들_서울로.jpeg" },
        { category: "album", title: "연필을 잘 가지고 논다", url: "/images/family/20230824_son_호기심_책상_연필_작은방.jpeg" },
        { category: "album", title: "어리둥절한 하성 츄츄", url: "/images/family/20230813_son_어리둥절_엄마_화장실.jpeg"},
        { category: "album", title: "교회를 좋아하는 아이", url: "/images/family/20230813_son_교회.jpeg"},
        { category: "album", title: "버스 밖을 보며 잠을 달랜다", url: "/images/family/20230810_son_아련_제주도.png"},
        { category: "album", title: "엄마 품을 가장 좋아한다.", url: "/images/family/20230810_son_화이팅_커피업_엄마.jpeg"},
        { category: "album", title: "거울을 신기해 한다", url: "/images/family/20230811_son_호기심_작은방_거울.jpeg"},
        { category: "album", title: "웃음 엄마, 저녁", url: "/images/family/20230813_son_웃음_엄마_어딘가.jpeg"},
        { category: "album", title: "가평에서의 애기", url: "/images/family/20230822_son_무관심_가평_부엌.jpeg"},
        { category: "album", title: "텐트에서의 하성", url: "/images/family/20230822_son_의미심장_가평_텐트.jpeg"},
        { category: "album", title: "침대에서의 하성", url: "/images/family/20230824_son_웃음_침대_안방.jpeg"},
        { category: "album", title: "카트라이더 하성", url: "/images/family/2023083109_son_보행기_드래프트_호기심.jpeg"},
        { category: "album", title: "책 하성", url: "/images/family/202308291100_son_책_thefootbook_읽다.jpeg"},

        { category: "album", title: "귀염둥이 장또순 첫번째", url: "/images/dog/귀염둥이 장또순 첫번째.jpeg"},
        { category: "album", title: "귀염둥이 장또순 두번째", url: "/images/dog/귀염둥이 장또순 두번째.jpeg" },
        { category: "album", title: "귀염둥이 장또순 세번째", url: "/images/dog/귀염둥이 장또순 세번째.jpeg" },

        { category: "youtube", title: "장용운의 유튜브", url: "https://www.youtube.com/@gyujanggak", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2FjangNewProfile.png?alt=media&token=f11e6731-7b34-409b-9045-1181f256d705" },
        { category: "blog", title: "장용운의 블로그", url: "https://blog.naver.com/jyy3k", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2Fyongwoonjang.png?alt=media&token=9c76d196-3b25-45a3-87ef-86acbdf8418e" },
        { category: "instagram", title: "장용운의 인스타그램", url: "https://www.instagram.com/j_major_scale/", thumbnail: "https://firebasestorage.googleapis.com/v0/b/gyujanggak-99e8a.appspot.com/o/gyujanggak%2Fprofile%2FYongwoonJangMediaCenter.png?alt=media&token=d63cc0cf-1567-4663-8afb-1086d856ed2f" }
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
                    tmptData.push(el);
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

        }

    }

    return (
        <>

            <form
                className={isFocus ? `${style['search-area']} ${style['search-area--focus']}` : style['search-area']}
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                onMouseMove={() => { setSuggestionComponent(getSuggestionComponent({ suggestionList: suggestionList, choiceNum: choiceNum, setChoiceNum: setChoiceNum })); }}
                onClick={(e) => { e.stopPropagation() }}
            >
                <input
                    className={style['search-area__input']}
                    {
                    ...register("typing", { required: false })
                    }
                />
                <img className={style['search-area__img']} src="magnifyGlass.png" />
                <ul
                    className={isFocus ? style['suggestion-area'] : style['suggestion-area--none']}
                >
                    {suggestionComponent}
                </ul>
            </form>
        </>
    )


}