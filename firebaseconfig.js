import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCxJZqLsXC5oR792a5VzoqyjW81PBPDbjU",
  authDomain: "next-fire-dm.firebaseapp.com",
  projectId: "next-fire-dm",
  storageBucket: "next-fire-dm.appspot.com",
  messagingSenderId: "519104324786",
  appId: "1:519104324786:web:249f2ae2a62a66e71315ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }