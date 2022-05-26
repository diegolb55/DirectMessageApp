import Head from 'next/head'
import { ChatIcon } from "@chakra-ui/icons";
import styles from "../styles/Login.module.css"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseconfig"
import { FcGoogle } from "react-icons/fc"


export default function Login(){

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);


    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div children className={styles.box}>

                <h2>DM Chat-app</h2>

                <ChatIcon w={100} h={100} color="white"/>

                <button 
                  className={styles.gbutton}
                  onClick={ () => signInWithGoogle("", {prompt: "select_account"})}
                >Sign In With Google</button>
                <FcGoogle style={{fontSize: "3rem"}}/>

            </div>
           
        </>
    )

}