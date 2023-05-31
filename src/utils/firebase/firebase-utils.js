import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    writeBatch,
    query
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqR2m_yR_b_urYWC8fbp9MnVCHC6pLBow",
    authDomain: "elite-clothing-90f62.firebaseapp.com",
    projectId: "elite-clothing-90f62",
    storageBucket: "elite-clothing-90f62.appspot.com",
    messagingSenderId: "302978849181",
    appId: "1:302978849181:web:f2218999cf628f5b943774"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

// #################  FIRESTORE UTILS EXPORTS #################################

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

// send categories data as a batch
export const sendCollectionAndDocs = async (collectionId, categoriesData) => {
    const collectionRef = collection(db, collectionId);
    const batch = writeBatch(db);

    categoriesData.forEach((category)=>{
        const docRef = doc(collectionRef, category.title.toLowerCase());
        batch.set(docRef, category);
    });

    await batch.commit();
    console.log('batch upload done')
}

// Get a map of gategories as a batch
export const getCollectionAndDocs = async (collectionId ='products') =>{
    const collectionRef = collection(db, collectionId);
    const collQuery = query(collectionRef);

    const querySnapshot = await getDocs(collQuery);
    const categoriesMap = querySnapshot.docs.reduce((final,docSnap)=>{
        const {title, items} = docSnap.data();
        final[title.toLowerCase()] = items;
        return final;
    }, {});
    console.log('products batch acquired');
    return categoriesMap;
}






// #################  AUTH UTILS EXPORTS #################################
export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

// For the signout handler
export const signOutUser = async () => {
    await signOut(auth);
}

// Observer, To stop putting setCurrentUser everywhere
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
