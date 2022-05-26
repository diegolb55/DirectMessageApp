import styles from "../styles/Sidebar.module.css"

import { FaUserCircle } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"

import { signOut } from "firebase/auth"
import { auth } from "../firebaseconfig"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "@firebase/firestore"
import { db } from "../firebaseconfig"
import getOtherEmail from "../utils/getOtherEmail";
import { useRouter } from "next/router";



export default function Sidebar() {

    const [user] = useAuthState(auth);
    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}))
    // console.log(chats)
    const router = useRouter();

    const redirect = (id) => {
        router.push(`/chat/${id}`);
    }

    const chatExists = email => chats?.find( chat => (chat.users.includes(user.email) && chat.users.includes(email)));
    
    const newChat = async () => {
        const input = prompt("Enter email of chat recipient");
        if (!chatExists(input) && (input != user.email)){
            await addDoc( collection(db, "chats"), {users: [user.email, input] })
        }
    }
    // const getOtherPhotoURL = (users, currentUser) => {
    //     // return users?.filter(user => user !== currentUser.photoURL);
    //     return currentUser;
    // }
    
    const chatList = () => {
        return (
            chats?.filter(chat => chat.users.includes(user.email))
            .map(
                chat =>
                    <div key={Math.random()} className={styles.cinfo} onClick={() => redirect(chat.id)}>
                        {/* {console.log(getOtherPhotoURL(chats, user))} */}
                        {/* <img src={getOtherPhotoURL(chat.users, user)} alt="avatar" className={styles.avatar}/> */}
                        
                        <FaUserCircle className={styles.cavatar}/>
                        <p>{getOtherEmail(chat.users, user)}</p>
                    </div>
            )
            
        )
    }

    return (
        <>
        <div className={styles.sidebar}>

            <div className={styles.uinfo}>
                {/* <FaUserCircle className={styles.avatar}/> */}
                <img src={user.photoURL} alt="avatar" className={styles.avatar}/>
                <p>{user.displayName}</p>
            </div>

            <div className={styles.i} onClick={() => signOut(auth)}>
                <BiLogOut />
            </div>

            <button className={styles.addbtn} onClick={() => newChat()}>New Chat</button>

            <div className={styles.chatBox}>
                {chatList()}
               
                
            </div>


        </div>
        </>
    )
}