import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"
import styles from "@/app/album/[slug]/page.module.css"

const firebaseConfig = {
    apiKey: "AIzaSyCygzsz9p2fNDrOEszg2k9sgAnO-DjNY-k",
    authDomain: "ljfamily-e137a.firebaseapp.com",
    databaseURL: "https://ljfamily-e137a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ljfamily-e137a",
    storageBucket: "ljfamily-e137a.appspot.com",
    messagingSenderId: "179681254279",
    appId: "1:179681254279:web:a15513064ea827f5f81122"
};

export default async function CommentComponent({url}){

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const now = new Date(Date.now());
    const nowDetail = now.getFullYear() + "" + (now.getMonth() + 1) + "" + now.getDate() + "" + now.getSeconds() + "" + now.getMilliseconds();
    
    const data = {};
    data[nowDetail] = "";

    let result = ""

    //Temporarily, Get data and if there are no comment then set default value "". 
    //The purpose of this section is make comment area. 
    const dbRef = ref(db, url.replaceAll(".", ""));
    
    await get(child(ref(db), url.replaceAll(".", ""))).then(async (snapshot)=>{
        if (snapshot.exists()) {
            console.log(snapshot.val());
            result = snapshot.val();
        } else {
            console.log("No data available");
            console.log("So we make new data: ")
            await set(dbRef, data);
        }
    }).catch(async (error) => {
        console.error(error);
        
    });

    
    return(
        <>  
            <div className={styles['picture-frame__comment-area']}>
                {JSON.stringify(Object.values(result)[0])}
            </div>
        </>
    )
}