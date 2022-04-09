// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEgCd4UYdivDfziZyfgSVosTzkdoM53DQ",
  authDomain: "teslaproject-60785.firebaseapp.com",
  projectId: "teslaproject-60785",
  storageBucket: "teslaproject-60785.appspot.com",
  messagingSenderId: "1022875829381",
  appId: "1:1022875829381:web:30bf0b7cc4a16581f215ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
