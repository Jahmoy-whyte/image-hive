// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKiHYjQoiFWBDbCvHrajJkOTRP7mt2qqY",
  authDomain: "image-hive-60663.firebaseapp.com",
  projectId: "image-hive-60663",
  storageBucket: "image-hive-60663.appspot.com",
  messagingSenderId: "858201629750",
  appId: "1:858201629750:web:606fad2fa33042b85ae497",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
