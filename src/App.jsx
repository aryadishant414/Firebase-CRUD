import Navbar from "./components/Navbar.jsx";
import { IoSearch } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { db } from "./config/firebase.js";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactCard from "./components/ContactCard.jsx"

import {collection, getDocs, onSnapshot } from "firebase/firestore"; 
import AddAndUpdateContact from "./components/AddAndUpdateContact.jsx";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen , setIsOpen] = useState(false);


  const openModal = () => {
    setIsOpen(true);
    // console.log("OPEN modal btn clicked");
    
  }

  const closeModal = () => {
    setIsOpen(false);
    // console.log("CLOSE modal btn clicked");
    
  }

  useEffect( () => {

    const getContacts = async () => {
      try {
        const contactsRef = collection(db , "contacts");

        // const contactsSnapshot = await getDocs(contactsRef); // now no need of this coz of snapshot


        // below code will give us real-time updation
        onSnapshot(contactsRef , (snapshot) => {
          const contactLists = snapshot.docs.map( (eachDoc) => {
            return {
              id : eachDoc.id,
              ...eachDoc.data(),
            };
          });
          // console.log("CONATCT KI LIST : " , contactLists);
          setContacts(contactLists);
          return contactLists
        })
        

        // console.log("CONTACKS KE SNAPSHOT : " , contactsSnapshot);
       
        
      } catch (error) {
          console.log("ERRROR AAAGYA HAI");
          
      }
    }
    getContacts();
  } , [])


  const searchContacts = (e) => {

    const value = e.target.value;


     // below code will give us real-time updation
     const contactsRef = collection(db , "contacts");

     onSnapshot(contactsRef , (snapshot) => {
          const contactLists = snapshot.docs.map( (eachDoc) => {
            return {
              id : eachDoc.id,
              ...eachDoc.data(),
            };
          });


          const filteredContacts = contactLists.filter((eachContact) => (
            eachContact.name.toLowerCase().includes(value.toLowerCase())
          ))


          // console.log("CONATCT KI LIST : " , contactLists);
          setContacts(filteredContacts);
          return filteredContacts;
        })
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar/>
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center ">
            <IoSearch className="absolute ml-1 text-3xl text-black" />
            <input
              onChange={searchContacts} 
              type="text"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-black"
            />
          </div>

          <CiCirclePlus onClick={openModal} className="cursor-pointer text-5xl text-white"/>
          
        </div>

       

        <div className="mt-4 flex flex-col gap-3">
          {contacts.map((eachContact) => (
            <ContactCard key={eachContact.id} contact= {eachContact}/>
          ))}
        </div>

        <AddAndUpdateContact open={isOpen} close = {closeModal}/>

       </div> 

       <ToastContainer />
    </>
  );
};

export default App;