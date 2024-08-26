// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoktKd-jZaxKYZOXraRaxis-m3qI7vOmU",
  authDomain: "vite-contact-21409.firebaseapp.com",
  projectId: "vite-contact-21409",
  storageBucket: "vite-contact-21409.appspot.com",
  messagingSenderId: "663677720434",
  appId: "1:663677720434:web:933962015e8a3b0c11efeb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);