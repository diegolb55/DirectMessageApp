import Sidebar from "../../components/Sidebar"
import Head from "next/head"
import { useRouter } from "next/router";
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db, auth } from "../../firebaseconfig"
import { collection, doc, orderBy, query } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../utils/getOtherEmail";
import { Topbar } from "../../components/Topbar";
import { Textbar } from "../../components/Textbar";
import { useEffect, useRef } from "react";






export default function Chat() {
    const router = useRouter();
    const { id } = router.query;
    const [user] = useAuthState(auth);
    const [chat] = useDocumentData(doc(db, "chats", id));
    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
    const [messages] = useCollectionData(q);
    const bottomOfChat = useRef();



    const getMessages = () =>
    messages?.map(msg => {
        const sender = msg.sender === user.email;

        return (
            // do not use random key for production!!**
            <div key={Math.random()}className={sender ? "recvCont" : "sentCont"}>
                <p>{msg.text}</p>
            </div>
        )
    });

    useEffect(() => {
        setTimeout(
            bottomOfChat.current.scrollIntoView({
            behavior: "smooth",
            block: 'start',
          }), 100
        )
    }, [messages])
      
    

    

 
    return (
        <>
            <Head><title>Chat App</title></Head>
            <div className="mainCont">

                <Sidebar />

                <div className="secondCont">

                    <Topbar email={getOtherEmail(chat?.users, user)}/>

                    <div className="chatbox">
                        {/* {console.log(user.email)} */}
                        { getMessages() }

                        <div ref={bottomOfChat}></div>
                        
                    </div>

                    <Textbar id={ id } user={user} />
                </div>
            
            </div>
        </>
        
    )
}