"use client"

import Searchbar from './searchbar'
import styles from './page.module.css'
import { useState } from 'react';

export default function Home() {
  const [isFocus, setFocus] = useState(false);

  return (
    <main onClick={()=>{setFocus(false)}} className={styles.main}>
      <Searchbar isFocus={isFocus} setFocus={setFocus}/>
    </main>
  )
}
