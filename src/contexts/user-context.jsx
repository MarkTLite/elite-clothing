import { createContext, useEffect, useState } from "react"
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase-utils";

// Create a context object
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Create a Provider Component to wrap where context applies
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    console.log('provider');
    useEffect(()=>{
        // onAuthStateChanged(auth, callback) receives this callback, provides user parameter, returns a function. 
        // So the unsubscribe gets called
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            console.log(user);
        });
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}