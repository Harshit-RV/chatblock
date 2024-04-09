
import  { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Transactions() {
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(true);

  const toggleButton = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      navigate('/login');
    }
  }, []);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    // Fetch wallet history data when the component mounts
    getWalletHistory();
  }, []);
  const getWalletHistory = async () => {
    const jwtKey = localStorage.getItem('jwt');
  
    try {
      const response = await axios.get('https://dev.neucron.io/v1/wallet/history', {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey,
        }
      });
  
      setTransactions(response.data.data.history);
      console.log(history);
    
  
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center mt-3 ">
    <div className=" bg-gray-300 rounded-lg shadow-lg p-8 mb-8 overflow-y-auto">
    <h1 className="text-2xl font-bold mb-4 uppercase text-center">Past Transactions</h1>
    {transactions.map((transaction, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 mb-4">
        <button onClick={toggleButton} className="bg-gray-400 hover:bg-gray-700 text-white text-xs md:text-sm lg:text-base font-bold py-2 px-4 rounded mb-2 ">
          {isToggled ? 'txid' : transaction.txid}
        </button>
        <div className="flex flex-col gap-2 md:flex-row md:items-start">
          <p className="text-base mb-4 md:w-1/2">Input Satoshis: {transaction.input_satoshis}</p>
          <p className="text-base mb-4 md:w-1/2">Output Satoshis: {transaction.output_satoshis}</p>
          <p className="text-base md:w-full">Time: {transaction.time}</p>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default Transactions