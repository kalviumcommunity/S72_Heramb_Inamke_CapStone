import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseconfig";

const useAuth =()=>{
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user=>{
            setUser(user);
        });
        return ()=>unsubscribe();
    },[]);
    return user;
}
export default useAuth;