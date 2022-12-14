import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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

const firebaseApp = initializeApp(firebaseConfig);

// Set up signing in with Google popup window
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Database
export const db = getFirestore();

// Create user in db
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // Create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}
