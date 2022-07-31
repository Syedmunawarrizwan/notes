// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAV0KEm-2f3qOwaafqPZcKY9aFcdXYVng0",
    authDomain: "notes-2964b.firebaseapp.com",
    projectId: "notes-2964b",
    storageBucket: "notes-2964b.appspot.com",
    messagingSenderId: "572478737907",
    appId: "1:572478737907:web:41dd13e9a2d0ad74651686",
    measurementId: "G-6XMQRN3FW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);