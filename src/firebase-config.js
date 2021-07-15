import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC4sSOVWV-AA02n6qxoFWWjCBi7ZYGUKIk',
  authDomain: 'to-do-list-b5c1b.firebaseapp.com',
  projectId: 'to-do-list-b5c1b',
  storageBucket: 'to-do-list-b5c1b.appspot.com',
  messagingSenderId: '151386858273',
  appId: '1:151386858273:web:410b5d6b0ef06f81219460',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;
