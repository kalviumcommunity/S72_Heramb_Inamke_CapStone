import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseconfig";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import useAuth from "../useAuth";

const AuthPage = () => {
  const user = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email/Password Sign-Up
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign-up successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Email/Password Sign-In
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Sign-in successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-in successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  // Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  console.log(user);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Firebase Authentication</h1>

      {user ? (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          <img src={user.photoURL || "https://via.placeholder.com/100"} 
               alt="User Profile" className="rounded-full w-24 h-24 mb-3" />
          <h2 className="text-lg font-semibold">{user.displayName || "No Name"}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button 
            onClick={handleSignOut} 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border rounded mb-2" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border rounded mb-2" 
          />
          <button 
            onClick={handleSignIn} 
            className="w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600">
            Sign In
          </button>
          <button 
            onClick={handleSignUp} 
            className="w-full bg-green-500 text-white p-2 rounded mb-2 hover:bg-green-600">
            Sign Up
          </button>
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;