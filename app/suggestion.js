"use client"

import style from './searchbar.module.css'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Suggestion({index, choiceNum, setChoiceNum, url, thumbnail, title}){
    const router = useRouter();
    
    return(
        <div
            onClick={() => { router.push(url); }}
            className={index===choiceNum?style.suggestionbar__choice:style.suggestionbar}
            onMouseEnter={() => { setChoiceNum(index);}}>
            <Image src={thumbnail} width={27} height={27} quality={30} className={style.suggestionbar__img} />
            <div className={style.suggestionbar__title} >
                {title}
            </div>
        </div>
    )
}