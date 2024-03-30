import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useEffect } from 'react';

function LeftProfile() {
    const navigate = useNavigate();
  const [ balance, setBalance ] = useState(null);

  const logOut = async () => {
    await localStorage.removeItem("jwt");
    navigate("/login");
  }


  const getBalance = async () => {
    const jwtKey = localStorage.getItem('jwt');

    try {
      const response = await axios.get('https://dev.neucron.io/v1/wallet/balance', {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey
        }
      });

      // console.log(response['data']['data']['balance']['summary']);
      setBalance(response['data']['data']['balance']['summary'])

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-between mt-6 items-center w-screen h-screen gap-8'>
      <div>
        <img className='h-48 w-48' src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt="" />
        <div className='text-2xl font-bold'>
          User Logged In
        </div>
        <div className='flex justify-center gap-4 items-baseline'>
          <button onClick={getBalance} className="py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            {balance === null ? 'Check Balance' : `${balance} Satoshi`} 
          </button>
        </div>
      </div>
      <button onClick={logOut} className="py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Logout
      </button>
    </div>
  )
}

export default LeftProfile