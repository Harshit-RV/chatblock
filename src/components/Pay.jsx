import { useNavigate } from 'react-router-dom';
import { useEffect, useState, Fragment } from "react";
import axios from 'axios';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
})
  
  const db = getFirestore(app);

const PayPage = () => {
  const [ payingByContact, setPayingByContact ] = useState(true)
  const [ paymail, setPaymail ] = useState();
  const [ amount, setAmount ] = useState();
  const [ note, setNote ] = useState();

  const [ contactPaymail, setContactPaymail ] = useState('')

  const [ somethingWentWrongMsg, setSomethingWentWrongMsg ] = useState(false);
  const [ invalidCredentialMsg, setInvalidCredentialMsg ] = useState(false);
  const [ paySuccessMsg, setPaySuccessMsg ] = useState(false);
  const [ people, setPeople] = useState([])

  const navigate = useNavigate();

  const payingInverter = () => {
    if (payingByContact === true) {
      setPayingByContact(false)
    } else {
      setPayingByContact(true)
    }
  }

  // const people = []

  const [selected, setSelected] = useState()
  const [query, setQuery] = useState('')

  const filteredPeople =
  query === ''
    ? people
    : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

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
            address: payingByContact ? selected.paymail : paymail,
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

  useEffect(() => {
    getContacts()
  }, []);

  const getContacts = async () => {
    const email = localStorage.getItem('email');

    try {
        const data = await getDocs(collection(db, 'contacts'));

        // console.log(data.docs)
        let tempList = [];

        data.docs.map((doc) => {
          if (doc.data().email == email) {
            doc.data().contacts.map((contact) => {
                tempList.push(contact)
            })
        }
        })

        // console.log(tempList)
        setPeople(tempList)
        // const existingCodes = data.docs.map(doc => [doc.id, doc.data().gameCode]);
    } catch (error) {
        console.log('error')
    }
}


    return (
    <>
      <div className='w-screen flex h-screen justify-center items-center'>
        
        <div className='flex justify-center flex-col items-center'>

          <div className="text-3xl font-bold mb-5">Pay</div>

          {payingByContact ? <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 mb-5">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
            placeholder='Select Contact'
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>: <span></span>}

          {payingByContact ? <span></span> : <input onChange={(e) => setPaymail(e.target.value)} placeholder="luke@dev.neucron.io" required type="email" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>}
          
          <input onChange={(e) => setAmount(e.target.value)} placeholder="1000" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          <input onChange={(e) => setNote(e.target.value)} placeholder="yoda-is-op" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
          
          {somethingWentWrongMsg === true ? <div className="text-red-500 mt-2">Something went wrong. Please try again</div> : <p></p>}
          {invalidCredentialMsg === true ? <div className="text-red-500 mt-2">Please recheck the input</div> : <p></p>}
          {paySuccessMsg === true ? <div className="text-green-500 mt-2">Payment Successful. It will reflect in your account soon.</div> : <p></p>}
        

          <button type="button" disabled={paySuccessMsg} onClick={() => payByPaymail(paymail, amount, note)} className=" w-60 py-2.5 px-5 mt-4 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-100 bg-gray-800 text-white border-gray-600  hover:bg-gray-700">
            Pay
          </button>
          <button type="button" onClick={payingInverter} className="w-60 py-2.5 px-5 mt-2 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
            {payingByContact ? <span>Pay by paymail</span> : <span>Pay by contact</span>}
          </button>

        </div>
      </div>
    </>
    )
}

export default PayPage