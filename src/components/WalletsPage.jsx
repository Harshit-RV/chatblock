import { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';



function WalletsPage() {
  const navigate = useNavigate();
  // const [ balance, setBalance ] = useState(null);
  const [ walletsList, setWalletsList] = useState(null);
  const [ creatingNewWallet, setCreatingNewWallet ] = useState(false);

  // const walletsList = [
  //   { key1: 'value1', key2: 'value2' },
  //   { key1: 'value3', key2: 'value4' },
  //   { key1: 'value5', key2: 'value6' }
  // ];

  const logOut = async () => {
    await localStorage.removeItem("jwt");
    navigate("/login");
  }

  function updateBalanceForKey(key, newBalance) {
    const index = walletsList.findIndex(wallet => wallet.id === key);
  
    if (index !== -1) {
      walletsList[index].balance = newBalance;
    }

    const updatedWalletsList = [...walletsList];

    console.log(walletsList);

    setWalletsList(updatedWalletsList);

    console.log('i did it');
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
        tempWalletsList.push({
          id: key,
          paymail: jsonResponse[key]['default_paymail_id'],
          name: jsonResponse[key]['wallet_name'],
          balance: null,
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

  const getBalance = async (walletId) => {
    console.log('starting with wallet id: ' + walletId)
    const jwtKey = localStorage.getItem('jwt');

    try {
      const response = await axios.get(`https://dev.neucron.io/v1/wallet/balance?walletID=${walletId}`, {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey
        }
      });

      console.log(response['data']['data']['balance']['summary'])

      // setWalletsList(response['data']['data']['balance']['summary'])
      updateBalanceForKey(walletId, response['data']['data']['balance']['summary']);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-center w-screen gap-8 bg-gray-50 pt-14'>

      <div className='flex flex-col gap-0'>
        <div className='flex justify-start'>
          <div className='font-semibold pl-2'>Wallets</div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 py-5 gap-10'>
          {walletsList === null
            ? <div>loading ....</div>
            : walletsList.map(obj => (
                <WalletCard key={obj.id} id={obj.id} name={obj.name} paymail={obj.paymail} balance={obj.balance} getBalance={getBalance}/>
              ))}
          <WalletCard key={1} id='abc' name='abc' paymail='{obj.paymail}' balance={10} getBalance={getBalance}/>
          <WalletCard key={1} id='abc' name='abc' paymail='{obj.paymail}' balance={10} getBalance={getBalance}/>
          <WalletCard key={1} id='abc' name='abc' paymail='{obj.paymail}' balance={10} getBalance={getBalance}/>
          <WalletCard key={1} id='abc' name='abc' paymail='{obj.paymail}' balance={10} getBalance={getBalance}/>
          <WalletCard key={1} id='abc' name='abc' paymail='{obj.paymail}' balance={10} getBalance={getBalance}/>
        </div>
      </div>

      <button onClick={logOut} className="mb-28 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Create Wallet
      </button>

      <div>
        
      </div>

    </div>
  )
}

const WalletCard = (props) => {
  const [ showBalance, setShowBalance ] = useState(false);

  const invertShowBalance = () => {
    if (showBalance === false) {
      setShowBalance(true)
    } else {
      setShowBalance(false)
    }
  }

  return (
    <div className='bg-white rounded-lg drop-shadow p-5 max-w-[350px] text-sm'>
      <div className='font-bold text-xl flex justify-start gap-2 items-baseline'>{props.name}</div>
      <div className='h-3'></div>

      <button onClick={() => props.getBalance(props.id)} className="drop-shadow-sm flex justify-start gap-2 items-baseline py-1 px-6 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        {props.balance === null ? 'Check Balance' : <div className='text-green-700 font-semibold'>{props.balance} Satoshi</div> } 
      </button>

      <div className='h-2'></div>

      <div className='flex justify-start gap-2 items-baseline'>
        <button onClick={invertShowBalance} className="drop-shadow-sm px-6 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        {showBalance === false ? 'Show Wallet ID' : <div>{props.id}</div> } 
      </button>
      </div>
      <div className='h-3'></div>
      <div className='flex justify-start gap-1'>
        <div className='font-semibold'>Paymail:</div>
        <div>{props.paymail}</div>
      </div>
    </div>
  )
}


export default WalletsPage