import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';


const PayPage = () => {

  const [ paymail, setPaymail ] = useState();
  const [ amount, setAmount ] = useState();
  const [ note, setNote ] = useState();
//   const [ incorrectCredentialMsg, setIncorrectCredentialMsg ] = useState(false);
  const [ somethingWentWrongMsg, setSomethingWentWrongMsg ] = useState(false);
  const [ invalidCredentialMsg, setInvalidCredentialMsg ] = useState(false);
  const [ paySuccessMsg, setPaySuccessMsg ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSomethingWentWrongMsg(false);
    }, 5000);
  }, [somethingWentWrongMsg]);

  useEffect(() => {
    setTimeout(() => {
        setPaySuccessMsg(false);
      }, 15000);
  }, [paySuccessMsg]);

  const payByPaymail = async (paymail, amount, note) => {
    setSomethingWentWrongMsg(false)
    setInvalidCredentialMsg(false)
    const jwtKey = localStorage.getItem('jwt');
    try {
      const response = await axios.post('https://dev.neucron.io/v1/tx/spend', {
        outputs: [
          {
            address: paymail,
            amount: parseInt(amount),
            note: note
          }
        ]
      }, {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey,
          'Content-Type': 'application/json'
        }
      })

      setPaySuccessMsg(true)

      console.log(response)
    } catch (error) {
        if (error.response.status == 400) {
            setInvalidCredentialMsg(true)
        } else {
            setSomethingWentWrongMsg(true)
        }
    }
  }


    return (
    <>
      <div className='w-screen flex h-screen justify-center items-center'>
        <div className='flex justify-center flex-col items-center'>

          <div className="text-3xl font-bold mb-5">Pay by Paymail</div>

          <input onChange={(e) => setPaymail(e.target.value)} placeholder="luke@dev.neucron.io" required type="email" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          <input onChange={(e) => setAmount(e.target.value)} placeholder="1000" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          <input onChange={(e) => setNote(e.target.value)} placeholder="yoda-is-op" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          
          {somethingWentWrongMsg === true ? <div className="text-red-500 mt-2">Something went wrong. Please try again</div> : <p></p>}
          {invalidCredentialMsg === true ? <div className="text-red-500 mt-2">Please recheck the input</div> : <p></p>}
          {paySuccessMsg === true ? <div className="text-green-500 mt-2">Payment Successful. It will reflect in your account soon.</div> : <p></p>}
        

          <button type="button" disabled={paySuccessMsg} onClick={() => payByPaymail(paymail, amount, note)} className=" w-60 py-2.5 px-5 mt-4 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-100 bg-gray-800 text-white border-gray-600  hover:bg-gray-700">
            Pay
          </button>

        </div>
      </div>
    </>
    )
}

export default PayPage