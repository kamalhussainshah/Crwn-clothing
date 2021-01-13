import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAqbvc9IRFjHAaYs0mQ4GovkPAZ9GmjpUA",
    authDomain: "crwn-db-d0a6f.firebaseapp.com",
    projectId: "crwn-db-d0a6f",
    storageBucket: "crwn-db-d0a6f.appspot.com",
    messagingSenderId: "305205388168",
    appId: "1:305205388168:web:d93221ed0ab744027a503d",
    measurementId: "G-0LLLY6TSGF"
  };
 
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;