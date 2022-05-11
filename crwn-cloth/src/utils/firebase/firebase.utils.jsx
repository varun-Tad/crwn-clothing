import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjIC0Ju8YzBQW5zRiXrz2ep2t_aff7Re4",
  authDomain: "crwn-clothing-db-6241e.firebaseapp.com",
  projectId: "crwn-clothing-db-6241e",
  storageBucket: "crwn-clothing-db-6241e.appspot.com",
  messagingSenderId: "237037241695",
  appId: "1:237037241695:web:918aca19a64ba03d96a2ea",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); // db points to our database in the console.

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // getting data from Auth and storing it in firestore.Here "users" is bascially our collection.
  //userAuth.uid is a unique id which is an identifier for each document>Here we are basically getting document reference of
  // the user from userAuth inside the db(database) under "users" collection.
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef); //we get and object which represents the doc reference even though we don't have any data yet

  const userSnapshot = await getDoc(userDocRef); //this will get the data related too our document using the doc reference
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user doesn't exists in db

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
      console.log("error creating the user", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
