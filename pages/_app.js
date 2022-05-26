import Login from '../components/Login'
import Sidebar from '../components/Sidebar'
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../firebaseconfig"



function MyApp({ Component, pageProps }) {

  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    // Loading component
    return (
      <>Spinner</>
    )
  }
  if (!user) {
    return (
      <Login />
    )
  }


  return (
    <Component {...pageProps} />
  )

}

export default MyApp
