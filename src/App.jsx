import { BrowserRouter,Routes,Route } from "react-router-dom"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Signup from "./components/Signup"
// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import Platform from "./components/Platform";



initializeApp({
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/platform" element={<Platform/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
