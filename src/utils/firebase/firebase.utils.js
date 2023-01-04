import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDVfITObof2Q90l4CMEUPh_3yTzxv0sIls",
    authDomain: "crwn-clothes-db-da11d.firebaseapp.com",
    projectId: "crwn-clothes-db-da11d",
    storageBucket: "crwn-clothes-db-da11d.appspot.com",
    messagingSenderId: "826433774292",
    appId: "1:826433774292:web:c315072637302374ead141"
};

// Firebase instance
const firebaseApp = initializeApp(firebaseConfig);
// Auth instance
export const auth = getAuth();
// Firestore database instance
export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd,
    field = 'title'
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    
    return categoryMap;
}

// Instantiate and set up Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Show popup window with Google auth to sign in
export const signInWithGooglePopup = () => signInWithPopup(
    auth,
    googleProvider
);
// Redirect to another Google auth page to sign in
export const signInWithGoogleRedirect = () => signInWithRedirect(
    auth,
    googleProvider
);

// Add user document to db
export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // Create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        // Try to set firestore user document data
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
}

// Create user auth token with email/password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
