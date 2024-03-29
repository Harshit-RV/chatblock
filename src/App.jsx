import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();

firebase.initializeApp({
  apiKey: "AIzaSyAqS6zfLYZWvA79bbcDjm38Ba7pFEOgeCI",
  authDomain: "chatblock-877ef.firebaseapp.com",
  projectId: "chatblock-877ef",
  storageBucket: "chatblock-877ef.appspot.com",
  messagingSenderId: "601803587692",
  appId: "1:601803587692:web:6e8bb6974311697e87d849",
  measurementId: "G-YBZNHV9VR5"
})



function App() {

  return (
    <div>Hi</div>
  )
}

export default App
