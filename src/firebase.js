import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAMWubFPrSYcnFUX5USCmMmDAIIT811Qw0",
    authDomain: "unichat-b8984.firebaseapp.com",
    projectId: "unichat-b8984",
    storageBucket: "unichat-b8984.appspot.com",
    messagingSenderId: "931452583268",
    appId: "1:931452583268:web:690accdc12090e142ece71",
  })
  .auth();
