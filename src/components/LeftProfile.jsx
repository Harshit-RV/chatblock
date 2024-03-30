import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useEffect } from 'react';
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { useRef } from 'react';
import { IoIosWallet } from "react-icons/io";
import { FaPenAlt } from "react-icons/fa";





function LeftProfile() {
    const navigate = useNavigate();
  const [ balance, setBalance ] = useState(null);

  const logOut = async () => {
    await localStorage.removeItem("jwt");
    navigate("/login");
  }
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
//   const [openSettings, setOpenSettings] = useState(false);



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
    <div className='flex flex-col justify-between items-center h-screen gap-8'>
      <div className='mt-6 flex flex-col gap-4 items-center'>
        <div className='flex flex-col items-center gap-1'>
        <img className='h-32 w-32 rounded-full' src={selectedImage} alt="" />
        <button className='hover:underline text-sm font-semibold' onClick={handleButtonClick} > change</button>
        {/* <FaPenAlt onClick={handleButtonClick} className='hover:cursor-pointer '/> */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        </div>
        <div className='text-2xl font-bold'>
          User Logged In
        </div>
        <div className='flex justify-center gap-4 items-baseline'>
          <button onClick={getBalance} className="py-2.5 px-6 w-[146px] text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            {balance === null ? 'Check Balance' : `${balance} Satoshi`} 
          </button>
        </div>
        <button onClick={()=>navigate('/Profile')} className='flex w-[146px] items-center justify-center gap-2 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
            wallets
            <IoIosWallet/>
        </button>
        {/* {!openSettings &&(
            <button onClick={()=>setOpenSettings(true)} className='flex items-center justify-center gap-2 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
            wallets
            <IoIosWallet/>
        </button>
        )}
        {openSettings &&(
            <div>
            <div className=' gap-4 fixed p-3 w-70vw max-h-[calc(100vh - 3.5rem)] bottom-28 transition-transform shadow-2xl bg-gray-200 rounded-md flex flex-col justify-start items-center font-semibold '>
                <div>profile change</div>
                <div>Wallets</div>
            </div>
            <button onClick={()=>setOpenSettings(false)} className='flex items-center justify-center gap-2 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
            wallets
            <IoIosWallet/>
        </button>
            </div>
        )} */}
      </div>
      <div className='flex flex-col gap-2 mb-4'>
        <button onClick={logOut} className="flex items-center w-[146px] gap-2 justify-center py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Logout
        <FiLogOut/>
      </button>
      </div> 
    </div>
  )
}

export default LeftProfile