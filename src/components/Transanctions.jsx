
import  { useState, useEffect} from 'react';
import axios from 'axios';

function Transactions() {
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
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <div className="max-w-4xl w-full bg-gray-300 rounded-lg shadow-lg p-8 mb-8 overflow-y-auto mt-5 ">
        <h1 className="text-2xl font-bold mb-4 uppercase text-center">Past Transactions</h1>
        {transactions.map((transaction, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col gap-2">
          <h2 className="text-xl font-bold mb-2">Txid: {transaction.txid}</h2>
          <p className="text-base mb-4">Input Satoshis: {transaction.input_satoshis}</p>
          <p className="text-base mb-4">Output Satoshis: {transaction.output_satoshis}</p>
          <p className="text-base">Time: {transaction.time}</p>
          </div>
          ))}
      </div>
    </div>
  )
}

export default Transactions