import { useState, useEffect } from "react"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { addDoc } from "firebase/firestore";

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

    const deleteContact = async (name) => {
        const email = localStorage.getItem('email');

        try {
            const data = await getDocs(collection(db, 'contacts'));
    
            let docRefId;
            let tempList = [];
    
            data.docs.map((doc) => {
                if (doc.data().email == email) {
                    docRefId = doc.id;
                    doc.data().contacts.map((contact) => {
                        if (contact.name === name) {
                            // Do not add this contact to the temporary list to delete it
                            return;
                        }
                        tempList.push(contact);
                    });
                }
            });
    
            await updateDoc(doc(collection(db, 'contacts'), docRefId), {
                contacts: tempList
            });
    
            // Update state to reflect the changes
            setContactsList(tempList);
        } catch (error) {
            console.log('error');
        }
    };

    const addContact = async (name, paymail) => {
        const email = localStorage.getItem('email');

        try {
            const data = await getDocs(collection(db, 'contacts'));

            var docRefId;
            let tempList = [];
            let toReturn = false;
            let previousRecord = false;

            data.docs.map((doc) => {
                
                if (doc.data().email == email){
                    docRefId = doc.id;
                    previousRecord = true;
                
                    doc.data().contacts.map((contact) => {
                        if (contact.name == name){
                            setChangeName(true)
                            toReturn = true;
                            return;
                        }
                        tempList.push(contact)
                        // console.log(contact)
                })}
            })

            if (previousRecord === false){
                await addDoc(collection(db, 'contacts'), {
                    email: email,
                    contacts: [{
                        name: name,
                        paymail: paymail
                    }]
                })
                return;
            }

            if (toReturn) {
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


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getContacts()
      }, []);


    const getContacts = async () => {
        const email = localStorage.getItem('email');

        try {
            const data = await getDocs(collection(db, 'contacts'));

            let tempList = [];

            data.docs.map((doc) => {
                // console.log(doc.data().email)
                if (doc.data().email == email) {
                    doc.data().contacts.map((contact) => {
                        tempList.push(contact)
                    })
                }
            })

            setContactsList(tempList)
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
          }, 3000);
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
            <div className="h-screen bg-gray-50 md:p-20 w-full">
    
                <div className='font-semibold flex justify-start mb-5'>CONTACTS</div>

                {contactsList.length === 0 ? <div className="flex justify-start">No Contacts Added</div>: <div></div>}
    
                {contactsList.map((item, index) => (
                    <div key={index} className="flex flex-col mb-2 md:flex-row items-baseline px-10 justify-between bg-white drop-shadow-sm mx-4 rounded-md max-w-[600px]">
                        <div className="text-lg font-bold">{item.name}</div>
                        <div>{item.paymail}</div>
                        <button onClick={() => deleteContact(item.name)} className="text-red-600 hover:text-red-900 font-semibold focus:outline-none">Delete</button>
                    </div>
                ))}
    
                { !addingContact ?
                    <button onClick={invertAddingContact} className="ml-4 mt-10 flex justify-start mb-28 py-2.5 px-6  text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                        Add Contact
                    </button>
                    :
                    <div className="mt-10 mx-4">
                        <input onChange={(e) => setName(e.target.value)} placeholder="Name" required type="text" id="name" className="mb-5 w-60 my-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>  
                        <input onChange={(e) => setPaymail(e.target.value)} placeholder="Paymail" required type="text" id="name" className="mb-5 w-60 my-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>  
    
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
    );
}

export default ContactsPage