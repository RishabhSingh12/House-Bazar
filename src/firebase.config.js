// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYVI7XTjc-wj0029tdGQeRa5wRDflMgoY",
  authDomain: "house-bazar-87157.firebaseapp.com",
  projectId: "house-bazar-87157",
  storageBucket: "house-bazar-87157.appspot.com",
  messagingSenderId: "805004908135",
  appId: "1:805004908135:web:780d0110ab471c071ee6c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
