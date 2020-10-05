import firebase from "firebase";

const firebaseConfig = {
  // set your firebaseConfig.
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
