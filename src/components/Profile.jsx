import React from 'react'
import Login from './Login'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();

  const logOut = async () => {
    await localStorage.removeItem("jwt");
    navigate("/login");
  }


  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen gap-8'>
      <img className='h-48 w-48' src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt="" />
      <div className='text-2xl font-bold'>
        Harry Potter
      </div>
      <button onClick={getBalance()} className="py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Check Balance
      </button>
      <button onClick={logOut} className="py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Logout
      </button>
    </div>
  )
}

const getBalance = async () => {

  console.log('I started');
  const jwtKey = localStorage.getItem('jwt');


  try {
    const response = await axios.get('https://dev.neucron.io/v1/wallet/balance', {
      headers: {
        'accept': 'application/json',
        'Authorization': jwtKey
      }
    });

    console.log(response['data']['data']['balance']['summary']);

  } catch (error) {
    console.log(error);
  }
};

export default Profile