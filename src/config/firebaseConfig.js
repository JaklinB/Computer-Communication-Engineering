// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ9IEEWvtOJy6I6jdQsemeb4udmtjqMxQ",
  authDomain: "tu-magazine.firebaseapp.com",
  projectId: "tu-magazine",
  storageBucket: "tu-magazine.appspot.com",
  messagingSenderId: "347740509674",
  appId: "1:347740509674:web:9095497b2b0850822a4e93",
  measurementId: "G-KLNG2VTB8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;