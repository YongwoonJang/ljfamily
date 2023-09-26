"use client"
import style from './searchArea.module.css'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

import reactStringReplace from 'react-string-replace';

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
            url={suggestionList[i].url} 
            thumbnail={suggestionList[i].category==="album"?suggestionList[i].url:suggestionList[i].thumbnail} 
            title={suggestionList[i].title} />);
    }

    return localSuggestionList;
}

export default function SearchArea({ isFocus, setFocus }) {
    const data = [

        { condition: "new", category: "album", title: "책을 좋아하는 장하성", url: "/images/family/202309261000_son_책을 사랑하는 장하성.JPG" },
        { condition: "new", category: "album", title: "강아지의 친구 하성츄츄", url: "/images/family/202309261001_son_강아지의 친구 하성츄츄.JPG" },
        
        { category: "album", title: "미미치치는 무섭다", url: "/images/family/202309231900__sister_무서운 누루하치.jpg"},
        { category: "album", title: "잠자는 숲속의 하성", url: "/images/family/202309251200_son_잠자는 숲속의 하성.jpg" },
        { category: "album", title: "르 카페에서의 가족들", url: "/images/family/2023092301_son_르 카페에서의 가족들.jpeg"},
        { category: "album", title: "어둠 속 용산 아파트 하성", url: "/images/family/2023092320_son_어둠속 용산아파트 하성.jpeg" },
        { category: "album", title: "엄마 닮은 하성", url: "/images/family/2023092210_son_엄마닮은 하성.JPG" },
        { category: "album", title: "장아련과 엄마츄츄", url: "/images/family/202309201000_son_장아련과 엄마츄츄.JPG" },
        { category: "album", title: "일어서는 장하성", url: "/images/family/2023091914_son_일어서는 장하성.jpeg" },
        { category: "movie", title: "돌려라 돌려", url: "https://1drv.ms/v/s!At3PfpNgIEnqn9gQ3ASTuTNVnh2AuQ?e=UdFvMB", thumbnail: "/images/family/202309191400_thumbnail_son_돌려라돌려.jpg" },
        { category: "movie", title: "신문 읽는 하성", url: "https://1drv.ms/v/s!At3PfpNgIEnqn9gI2ARD0GpHntumNw?e=w9mNnE", thumbnail: "/images/family/2023091811__thumbnail_son_신문읽는 하성.jpg"},
        { category: "movie", title: "친구의 세례를 대하는 마음", url: "https://1drv.ms/v/s!At3PfpNgIEnqn9gJpuvLo8d6_OtiBA?e=GT8gY3", thumbnail: "/images/family/2023091814_friend_하성 친구의 세례식을 대하는 마음.jpeg" },
        { category: "album", title: "잠자는 거실의 하성", url: "/images/family/20230918_son_잠자는 거실의 하성.jpg" },
        { category: "album", title: "귀여운 강아지 루피", url: "/images/dog/2023091814_루피_강아지는 사랑입니다.jpeg"},
        { category: "album", title: "하성 친구의 세례식", url: "/images/family/2023091814_friend_하성 친구의 세례식.jpeg" },
        { category: "album", title: "역도선수하성", url: "/images/family/20230916_son_역도선수하성.JPG" },
        { category: "album", title: "애달픈 하성", url: "/images/family/2023091610_son_애달픈 하성.JPG" },
        { category: "album", title: "저는 인벤션을 칠 예정입니다.", url: "/images/family/2023091621_son_저는 인벤션을 칠 예정입니다.jpeg" },
        { category: "album", title: "엄마와 공부하는 하성", url: "/images/family/2023091510_son_의미심장한 엄마와 아들 놀이공부.jpg"},
        { category: "album", title: "요가 하성", url: "/images/family/2023090110_son_요가하성.jpg"},
        { category: "album", title: "아빠와 장하성 그리고 음악", url: "/images/family/2023091315_son_아빠와 장하성 그리고 음악.jpg"},
        { category: "album", title: "리모콘과 장또순", url: "/images/dog/2023091416_ddosun_리모콘과 장또순.jpg"},
        { category: "album", title: "할아버지발과 장또순", url: "/images/dog/2023091416_ddosun_아빠발과 장또순.jpg"},
        { category: "album", title: "키가 크는 농구선수", url: "/images/family/202309141045_son_속도감을 가진 장하성.JPG"},
        { category: "album", title: "얼음깨기를 좋아하다", url: "/images/family/20230913_son_아들_얼음깨기를 좋아하다.JPG"},
        { category: "album", title: "안방을 정리하는 아기", url: "/images/family/20230912_son_안방을 정리하는 아기.jpg"},
        { category: "album", title: "배드민턴 감독 장하성", url: "/images/family/20230911_son_배드민턴 감독.jpeg"},
        { category: "album", title: "장하성은 엄마를 좋아한다.", url: "/images/family/20230911_son_성남외고_행복한 세상의 장하성.jpeg" },
        { category: "album", title: "약사 장하성", url: "/images/family/20230908_son_약사_옷방_귀여움.jpeg" },
        { category: "album", title: "장하성과 엄마, DSLR", url: "/images/family/20230907_son_단란_가족_장하성.JPG" },
        { category: "album", title: "장하성과 엄마(23년8월28일)", url: "/images/family/20230828_son_장하성_엄마.jpg"},
        { category: "album", title: "장하성과 엄마(23년9월1일)", url: "/images/family/20230901_son_장하성_엄마.jpg" },
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
        handleSubmit,
        getValues
    } = useForm();

    const [suggestionList, setSuggestionList] = useState();

    const [suggestionComponent, setSuggestionComponent] = useState();

    const [choiceNum, setChoiceNum] = useState(-1);

    const router = useRouter();

    useEffect(()=>{
       if (getValues("typing") != ""){
           let tmptData = []
           data.forEach((el) => {
               if (el.title.match(getValues("typing"))?.length > 0) {
                    tmptData.push(el);
                    tmptData[tmptData.length - 1].title =
                        reactStringReplace(tmptData[tmptData.length - 1].title, getValues("typing"), (match, i) => (<span className={style['suggestion-area__title--strong']}>{match}</span>))
               }
           })
           setSuggestionList(tmptData);
           setSuggestionComponent(getSuggestionComponent({ suggestionList: tmptData, choiceNum: choiceNum, setChoiceNum: setChoiceNum }));
       }
    },[])

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
        <search>
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
                <img className={style['search-area__img']} src="magnifyGlass.png" />
                <ul
                    className={isFocus ? style['suggestion-area'] : style['suggestion-area--none']}
                >
                    {suggestionComponent}
                </ul>
            </form>
        </search>
    )


}