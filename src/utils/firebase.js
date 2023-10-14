// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN1Rm7vGynC6-iyG4XX7QWDPP2V_aajEc",
  authDomain: "netflix-clone-7025b.firebaseapp.com",
  projectId: "netflix-clone-7025b",
  storageBucket: "netflix-clone-7025b.appspot.com",
  messagingSenderId: "716228548978",
  appId: "1:716228548978:web:8c819f2aa0d6cad84225eb",
  measurementId: "G-Z87D3PW79V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()