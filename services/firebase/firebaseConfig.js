// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);
export const db = getFirestore(app);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
