import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDVfITObof2Q90l4CMEUPh_3yTzxv0sIls",
    authDomain: "crwn-clothes-db-da11d.firebaseapp.com",
    projectId: "crwn-clothes-db-da11d",
    storageBucket: "crwn-clothes-db-da11d.appspot.com",
    messagingSenderId: "826433774292",
    appId: "1:826433774292:web:c315072637302374ead141"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
