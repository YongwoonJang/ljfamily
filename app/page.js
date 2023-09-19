"use client"

import styles from './page.module.css'
import SearchArea from './searchArea'
import { useState } from 'react';

export default function Home() {
  const [isFocus, setFocus] = useState(false);

  return (
    <div onClick={()=>{setFocus(false);}} className={styles.background}>
      <main className={isFocus ? `${styles.main} ${styles['main--focus']}` : `${styles.main}`}>
        <SearchArea isFocus={isFocus} setFocus={setFocus}/>
      </main>
    </div>
  )
}
