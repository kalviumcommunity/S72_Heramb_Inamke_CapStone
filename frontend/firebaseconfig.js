// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth ,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSUj73r0sEBTKNZxHyE-zalfpo6-N2o4",
  authDomain: "capstone-auth-6b361.firebaseapp.com",
  projectId: "capstone-auth-6b361",
  storageBucket: "capstone-auth-6b361.firebasestorage.app",
  messagingSenderId: "863750416231",
  appId: "1:863750416231:web:fd605f0bffbf5db91971c2",
  measurementId: "G-NK639Y0V7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };