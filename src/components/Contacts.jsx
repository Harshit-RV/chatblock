import { useState, useEffect } from "react"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';

const app = initializeApp({
    apiKey: "AIzaSyAqS6zfLYZWvA79bbcDjm38Ba7pFEOgeCI",
    authDomain: "chatblock-877ef.firebaseapp.com",
    projectId: "chatblock-877ef",
    storageBucket: "chatblock-877ef.appspot.com",
    messagingSenderId: "601803587692",
    appId: "1:601803587692:web:6e8bb6974311697e87d849",
    measurementId: "G-YBZNHV9VR5"
  })
  
  const db = getFirestore(app);

const ContactsPage = () => {
    const [ addingContact, setAddingContact ] = useState(false)
    const [ name, setName ] = useState()
    const [ paymail, setPaymail ] = useState()
    const [ somethingWentWrongMsg, setSomethingWentWrongMsg ] = useState(false);
    const [ accountAdded, setAccountAdded ] = useState(false);
    const [ contactsList, setContactsList ] = useState([]);
    const [ changeName, setChangeName ] = useState(false)

    const addContact = async (name, paymail) => {
        const email = localStorage.getItem('email');

        try {
            const data = await getDocs(collection(db, 'contacts'));

            var docRefId;
            let tempList = [];
            let contactFound = false;

            data.docs.map((doc) => {
                docRefId = doc.id;
                doc.data().contacts.map((contact) => {
                    if (contact.name == name){
                        setChangeName(true)
                        contactFound = true;
                        return;
                    }
                    tempList.push(contact)
                    // console.log(contact)
                })
            })

            if (contactFound) {
                return;
            }

            tempList.push({
                name: name,
                paymail: paymail
            })

            await updateDoc(doc(collection(db, 'contacts'), docRefId), {
                contacts: tempList
            });

            console.log(tempList)

            setAccountAdded(true)


            // const existingCodes = data.docs.map(doc => [doc.id, doc.data().gameCode]);
        } catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        getContacts()
      }, []);

    //   useEffect(() => {
    //     // This code will run every time contactsList changes
    //     // console.log("contactsList updated:", contactsList);
    // }, [contactsList]);

    const getContacts = async () => {
        const email = localStorage.getItem('email');

        try {
            const data = await getDocs(collection(db, 'contacts'));

            // console.log(data.docs)
            let tempList = [];

            data.docs.map((doc) => {
                // console.log(doc.data().email)
                if (doc.data().email == email) {
                    doc.data().contacts.map((contact) => {
                        tempList.push(contact)
                    })
                }
            })

            // console.log(tempList)
            setContactsList(tempList)
            // const existingCodes = data.docs.map(doc => [doc.id, doc.data().gameCode]);
        } catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        setTimeout(() => {

          setSomethingWentWrongMsg(false);
        }, 5000);
      }, [somethingWentWrongMsg]);
      
      useEffect(() => {
        setTimeout(() => {
          setChangeName(false);
        }, 5000);
      }, [changeName]);
    
      useEffect(() => {
        setTimeout(() => {
            getContacts()
          setAccountAdded(false);
          }, 10000);
      }, [accountAdded]);

    const invertAddingContact = () => {
        if (addingContact === true) {
            setAddingContact(false);
        } else {
            setAddingContact(true);
        }
      }

    return (
        <>
        <div className="h-screen bg-gray-50 p-20 w-screen">

            <div className='font-semibold pl-4 flex justify-start mb-5'>CONTACTS</div>

            {contactsList.length === 0 ? <div className="flex justify-start pl-4">No Contacts Added</div>: <div></div>}

            {contactsList.map((item, index) => (
                <div key={index} className="flex flex-col mb-2 md:flex-row items-baseline p-4 px-10 justify-between bg-white drop-shadow-sm mx-4 rounded-md max-w-[600px]">
                    <div className="text-lg font-bold">{item.name}</div>
                    <div>{item.paymail}</div>
                </div>
            ))}

            { !addingContact ?
                <button onClick={invertAddingContact} className="ml-4 mt-10 flex justify-start mb-28 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                    Add Contact
                </button>
                :
                <div className="pl-4 mt-10">
                    <input onChange={(e) => setName(e.target.value)} placeholder="Name" required type="text" id="name" className="mb-5 w-80 my-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>  
                    <input onChange={(e) => setPaymail(e.target.value)} placeholder="Paymail" required type="text" id="name" className="mb-5 w-80 my-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>  

                    {somethingWentWrongMsg === true ? <div className="text-red-500 mt-2">Something went wrong. Please try again</div> : <p></p>}
                    {changeName === true ? <div className="text-red-500 mt-2">A contact by this name already exists</div> : <p></p>}
                    {accountAdded === true ? <div className="text-green-500 mt-2">Account added successfully.</div> : <p></p>}
                    
                    <button onClick={() => addContact(name, paymail)} className=" flex justify-start mb-28 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                        Add
                    </button>
                </div>
            }

        </div>
        </>
    )
}

export default ContactsPage