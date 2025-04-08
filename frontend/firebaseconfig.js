// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserPopupRedirectResolver } from "firebase/auth";

// Your web app's Firebase configuration
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
let app;
let auth;
let googleProvider;

// Only initialize Firebase on the client side
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Configure popup settings
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

export { app, auth, googleProvider };