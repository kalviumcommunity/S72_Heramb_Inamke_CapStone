import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        // console.log(user)
        setLoading(false);
      });

      return () => unsubscribe();
    }
    return () => {};
  }, []);

  return { user, loading };
};

export const getUserIdToken = async (user) => {
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

export default useAuth;