// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA05Zn878IxiA_5H9HeSk8w8kHngaRBGdc",
  authDomain: "netflixgpt-45455.firebaseapp.com",
  projectId: "netflixgpt-45455",
  storageBucket: "netflixgpt-45455.firebasestorage.app",
  messagingSenderId: "778424010188",
  appId: "1:778424010188:web:1dd691095720fcbe054969",
  measurementId: "G-QT8M10V8B1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
