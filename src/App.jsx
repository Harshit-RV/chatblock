import { Routes,Route, useLocation } from "react-router-dom"
import WalletsPage from "./components/WalletsPage"
import Login from "./components/Login"
import Signup from "./components/Signup"
// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import Platform from "./components/Platform";
// import Chatbot from "./components/Chatbot";
import PayPage from "./components/Pay";
import LeftProfile from "./components/LeftProfile"
import Transanctions from "./components/Transanctions";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ContactsPage from "./components/Contacts";



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
  const location = useLocation();
  console.log(location.pathname);
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const logOut = async () => {
    await localStorage.removeItem("jwt");
    await localStorage.removeItem("email");
    navigate("/login");
  }


  return (
      <div className="flex bg-gray-50">
        {!toggleMenu && (
          <HiMenuAlt3 fontSize={28} color="black" className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} color="black" className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <div className="z-10 fixed -top-0  p-2 w-[35vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md bg-blue-50 text-white animate-slide-in">
            <AiOutlineClose color="black" className="hover:cursor-pointer" onClick={() => setToggleMenu(false)}/>
            <button onClick={()=>{navigate('/chatbot'),setToggleMenu(false)}} className="justify-center mb-5 mt-2 py-1.5 px-4 w-full text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">Chatbot</button>
            <button onClick={()=>{navigate('/wallets'),setToggleMenu(false)}} className="justify-center mb-5 py-1.5 px-4 w-full text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">Wallets</button>
            <button onClick={()=>{navigate('/pay'),setToggleMenu(false)}} className="justify-center mb-5 py-1.5 px-4 w-full text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">Payments</button>
            <button onClick={()=>{navigate('/transactions'),setToggleMenu(false)}} className="justify-center mb-5 py-1.5 px-4 w-full text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">Transactions</button>
            <button onClick={()=>{logOut(),setToggleMenu(false)}} className="justify-center py-1.5 px-4 w-full text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700">Logout</button>
          </div>
        )}
      {location.pathname == '/login' 
        ? <div className="hidden"><LeftProfile/></div> 
        : location.pathname == '/signup' 
          ? <div className="hidden"><LeftProfile/></div> 
          : <LeftProfile/>
      } 

      {/* button */}
      <Routes>
        <Route path="/" element={<Platform/>} />
        <Route path="/pay" element={<PayPage/>} />
        <Route path="/chatbot" element={<Platform/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/wallets" element={<WalletsPage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/transactions" element={<Transanctions/>} />
        <Route path="/contacts" element={<ContactsPage/>} />
      </Routes>
    </div>
  )
}


export default App
