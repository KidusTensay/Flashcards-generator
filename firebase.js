// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANvR8zIfGWlyCvp6pk2yd1fEtXJMx_QOQ",
  authDomain: "flashcardsaas-f40f9.firebaseapp.com",
  projectId: "flashcardsaas-f40f9",
  storageBucket: "flashcardsaas-f40f9.appspot.com",
  messagingSenderId: "499064194773",
  appId: "1:499064194773:web:8750fb24f589f82a94c45c",
  measurementId: "G-NQ5T85W8ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}