import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
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

// Create user auth token with email/password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

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
