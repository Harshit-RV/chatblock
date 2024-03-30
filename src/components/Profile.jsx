import { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';



function Profile() {
  const navigate = useNavigate();
  const [ balance, setBalance ] = useState('...');
  const [ walletsList, setWalletsList] = useState(null)

  // const walletsList = [
  //   { key1: 'value1', key2: 'value2' },
  //   { key1: 'value3', key2: 'value4' },
  //   { key1: 'value5', key2: 'value6' }
  // ];

  const logOut = async () => {
    await localStorage.removeItem("jwt");
    navigate("/login");
  }

  const getListOfWallets = async () => {
    const jwtKey = localStorage.getItem('jwt');

    try {
      const response = await axios.get('https://dev.neucron.io/v1/wallet/list', {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey,
        }
      });

      // console.log(response['data']['data']['DefaultWallet']);
      const tempWalletsList = [];
      const jsonResponse = response['data']['data']['Wallets'];
      for (const key in jsonResponse) {
        console.log(key);
        console.log(jsonResponse[key]['default_paymail_id'])
        console.log(jsonResponse[key]['wallet_name'])

        tempWalletsList.push({
          id: key,
          paymail: jsonResponse[key]['default_paymail_id'],
          name: jsonResponse[key]['wallet_name']
        })
      } 

      setWalletsList(tempWalletsList);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      navigate('/login');
    }
    getListOfWallets();
  }, []);

  const getBalance = async () => {
    setBalance('...')
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
    <div className='flex flex-col justify-center items-center w-screen h-screen gap-8 bg-gray-50'>
      <img className='h-48 w-48' src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt="" />
      <div className='text-2xl font-bold'>
        Logged In User
      </div>
      <div className='flex justify-center gap-4 items-baseline'>
        <button onClick={getBalance} className="py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Check Balance
        </button>
        <div className='font-semibold'>{balance} Satoshi</div>
      </div>

      <div className='flex flex-col gap-0'>
        <div className='font-semibold pl-2'>Wallets</div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 py-5 gap-10'>
          {walletsList === null
            ? <div>loading ....</div>
            : walletsList.map(obj => (
                <WalletCard key={obj.id} id={obj.id} name={obj.name} paymail={obj.paymail} />
              ))}
        </div>
      </div>

      <button onClick={logOut} className="py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Logout
      </button>
    </div>
  )
}

const WalletCard = (props) => {
  return (
    <div className='bg-white rounded-lg drop-shadow p-5 max-w-[350px] text-sm'>
      <div className='font-bold text-xl'>{props.name}</div>
      <div className='h-2'></div>
      <div className='flex flex-col justify-start'>
        <div className='font-semibold text-sm'>Wallet ID:</div>
        <div>{props.id}</div>
      </div>
      <div className='h-2'></div>
      <div className='flex justify-start gap-1'>
        <div className='font-semibold'>Paymail:</div>
        <div>{props.paymail}</div>
      </div>
    </div>
  )
}


export default Profile