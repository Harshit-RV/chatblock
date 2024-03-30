import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ incorrectCredentialMsg, setIncorrectCredentialMsg ] = useState(false);
  const [ somethingWentWrongMsg, setSomethingWentWrongMsg ] = useState(false);
  const [ loginSuccessMsg, setLoginSuccessMsg ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/profile');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIncorrectCredentialMsg(false);
    }, 5000);
  }, [incorrectCredentialMsg]);

  useEffect(() => {
    setTimeout(() => {
      setSomethingWentWrongMsg(false);
    }, 5000);
  }, [somethingWentWrongMsg]);

  useEffect(() => {
    if (loginSuccessMsg === true) {
      setTimeout(() => {
        setLoginSuccessMsg(false);
      }, 7000);
      navigate('/chatbot')
    }
  }, [loginSuccessMsg]);


  const loginWithEmailAndPassword = async (email, password) => {
    setSomethingWentWrongMsg(false)
    setIncorrectCredentialMsg(false)
    try {
      const response = await axios.post('https://dev.neucron.io/v1/auth/login', {
        email: email,
        password: password
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      localStorage.setItem('jwt', response['data']['data']['access_token']);
      localStorage.setItem('email', email);

      setLoginSuccessMsg(true)

    } catch (error) {
      if (error['response']['status'] == 401) {
        setIncorrectCredentialMsg(true)
      } else {
        setSomethingWentWrongMsg(true)
      }
    }
  };

  return (
    <>
      <div className='w-screen flex h-screen justify-center items-center'>
        <div className='flex justify-center flex-col items-center'>

          <div className="text-3xl font-bold mb-5">Log in to Chatblock</div>

          <input onChange={(e) => setEmail(e.target.value)} placeholder="luke@skywalkers.com" required type="email" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          <input onChange={(e) => setPassword(e.target.value)} placeholder="yoda-is-op" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          
          {incorrectCredentialMsg === true ? <div className="text-red-500 mt-2">Either email or password is incorrect</div> : <p></p>}
          {somethingWentWrongMsg === true ? <div className="text-red-500 mt-2">Something went wrong. Please try again</div> : <p></p>}
          {loginSuccessMsg === true ? <div className="text-green-500 mt-2">Login Successful. Redirecting ...</div> : <p></p>}
        

          <button type="button" disabled={loginSuccessMsg} onClick={() => loginWithEmailAndPassword(email, password)} className=" w-60 py-2.5 px-5 mt-4 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-100 bg-gray-800 text-white border-gray-600  hover:bg-gray-700">
            Sign In
          </button>
          <button type="button" onClick={() => navigate('/signup')} className="w-60 py-2.5 px-5 mt-2 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
            Signup Instead
          </button>

        </div>
      </div>
    </>
  )
}

export default Login