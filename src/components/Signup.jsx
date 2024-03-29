import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ invalidCredentialMsg, setInvalidCredentialMsg ] = useState(false);
  const [ somethingWentWrongMsg, setSomethingWentWrongMsg ] = useState(false);
  const [ emailAlreadyInUseMsg, setEmailAlreadyInUseMsg ] = useState(false);
  const [ signupSuccessMsg, setSignupSuccessMsg ] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    setTimeout(() => {
        setInvalidCredentialMsg(false);
    }, 5000);
  }, [invalidCredentialMsg]);

  useEffect(() => {
    setTimeout(() => {
      setSomethingWentWrongMsg(false);
    }, 5000);
  }, [somethingWentWrongMsg]);


  useEffect(() => {
    setTimeout(() => {
        setEmailAlreadyInUseMsg(false);
    }, 5000);
  }, [emailAlreadyInUseMsg]);

  useEffect(() => {
    if (signupSuccessMsg == true){
        setTimeout(() => {
            setSignupSuccessMsg(false);
        }, 3000);
        navigate('/login')
    } else {
        setTimeout(() => {
            setSignupSuccessMsg(false);
        }, 7000);
    }
  }, [signupSuccessMsg]);


  const signupWithEmailAndPassword = async (email, password) => {
    setSomethingWentWrongMsg(false)
    setInvalidCredentialMsg(false)
    setEmailAlreadyInUseMsg(false)
    try {
      await axios.post('https://dev.neucron.io/v1/auth/signup', {
        email: email,
        password: password
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      setSignupSuccessMsg(true)

    } catch (error) {
      if (error['response']['status'] == 400) {
        setInvalidCredentialMsg(true)
      } else if (error['response']['status'] == 409) {
        setEmailAlreadyInUseMsg(true)
      } else {
        setSomethingWentWrongMsg(true)
      }
    }
  };

  return (
    <>
      <div className='w-screen flex h-screen justify-center items-center'>
        <div className='flex justify-center flex-col items-center'>

            <div className="text-3xl font-bold mb-8 flex flex-col items-center gap-1">
                <span>Create Your</span>
                <span>Chatblock Account</span>
            </div>

          <input onChange={(e) => setEmail(e.target.value)} placeholder="luke@skywalkers.com" required type="email" id="first_name" className=" my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"/>
          <input onChange={(e) => setPassword(e.target.value)} placeholder="yoda-is-op" required type="text" id="first_name" className=" my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"/>
          
          {invalidCredentialMsg === true ? <div className="text-red-500 mt-2">Please enter valid credentials.</div> : <p></p>}
          {somethingWentWrongMsg === true ? <div className="text-red-500 mt-2">Something went wrong. Please try again</div> : <p></p>}
          {emailAlreadyInUseMsg === true ? <div className="text-red-500 mt-2">This email is already registered</div> : <p></p>}
          {signupSuccessMsg === true ? <div className="text-green-500 mt-2">Signup Successful. Redirecting ...</div> : <p></p>}
        

          {/* <button type="button" disabled={signupSuccessMsg} onClick={() => signupWithEmailAndPassword(email, password)} className="py-2.5 px-5 my-5 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> */}
          <button type="button" disabled={signupSuccessMsg} onClick={() => signupWithEmailAndPassword(email, password)} className="w-60 py-2.5 px-5 mt-4 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-100 bg-gray-800 text-white border-gray-600  hover:bg-gray-700">
            Sign Up
          </button>
          <button type="button" disabled={signupSuccessMsg} onClick={() => navigate('/login')} className="w-60 py-2.5 px-5 mt-2 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
            Login Instead
          </button>
        </div>
      </div>
    </>
  )
}

export default Signup