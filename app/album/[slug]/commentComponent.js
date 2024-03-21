"use client"

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"
import { onValue } from "firebase/database";
import styles from "@/app/album/[slug]/page.module.css"
import { useState, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCygzsz9p2fNDrOEszg2k9sgAnO-DjNY-k",
    authDomain: "ljfamily-e137a.firebaseapp.com",
    databaseURL: "https://ljfamily-e137a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ljfamily-e137a",
    storageBucket: "ljfamily-e137a.appspot.com",
    messagingSenderId: "179681254279",
    appId: "1:179681254279:web:a15513064ea827f5f81122"
};




export default function CommentComponent({ url }) {
    const [comments, setComments] = useState([]);

    
    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const dbRef = ref(db, url.replaceAll(".", ""));

        get(child(ref(db), url.replaceAll(".", "")))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    
                    if (Array.isArray(data)) {
                        setComments(data);

                    } else {
                        const currentTime = Date.now();
                        set(dbRef, [{[currentTime]: "hello world" }]);
                        setComments([{[currentTime]: "hello world" }]);
                    }

                } else {
                    const currentTime = Date.now();
                    set(dbRef, [{[currentTime]: "hello world" }]);
                    setComments([{[currentTime]: "hello world" }]);

                }
            })
            .catch((error) => {
                const currentTime = Date.now();
                set(dbRef, [{[currentTime]: "hello world" }]);
                setComments([{[currentTime]: "hello world" }]);
                console.error(error);

            });

        const commentRef = ref(db, url.replaceAll(".", ""));

        onValue(commentRef, (snapshot) => {
            const data = snapshot.val();
            setComments(data);

        });
    }, [url]);

    // add comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentInput = e.target.comment.value;

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const dbRef = ref(db, url.replaceAll(".", ""));

        
        const currentTime = Date.now();

        
        const newComment = {
            [currentTime]: commentInput
        };

        await set(dbRef, [ ...comments, newComment ]);

        e.target.comment.value = "";
    };

    // handle comment click
    const handleCommentClick = (comment) => {
        console.log("Selected comment:", comment);

    };

    return (
        <>
            <form className={styles["picture-frame__form"]} onSubmit={handleSubmit}>
                <input className={styles["picture-frame__form-input"]} type="text" name="comment" placeholder="Add a comment" />
                <button type="submit">전송</button>
            </form>
            <div className={styles["picture-frame__comment-area"]}>
                {comments?.map((comment, index) => (
                    <div key={index} onClick={()=> handleCommentClick(comment)}>{Object.values(comment)}</div>
                ))}
            </div>
            
        </>
    );
}