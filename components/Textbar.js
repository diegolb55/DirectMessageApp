import { db } from "../firebaseconfig";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useState, useRef} from "react";





export const Textbar = ({ id, user}) => {
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp()
        })
        setInput("");

    }
    return (
        <form className="textBar" onSubmit={ sendMessage }>
            <input 
              placeholder="type message..." 
              autoComplete="off"
              onChange={e => setInput(e.target.value)}
              value={input}
            />
            <button type="submit" hidden>Submit</button>
        </form>
    )
}