// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdM5FIeeuBHfEHbCbkm0Q7rTmiCvG4VYQ",
  authDomain: "ruka-338ez.firebaseapp.com",
  databaseURL: "https://ruka-338ez-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ruka-338ez",
  storageBucket: "ruka-338ez.appspot.com",
  messagingSenderId: "937749214133",
  appId: "1:937749214133:web:f6dd5485026f3503cd9ffc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get authentication instance
export const auth: Auth = getAuth(firebaseApp);

export default firebaseApp;