
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import {db} from "../config/firebase.js"
import { deleteDoc, doc } from "firebase/firestore";
import AddAndUpdateContact from "./AddAndUpdateContact.jsx";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactCard = ({contact}) => {


  const [isOpen , setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    // console.log("OPEN modal btn clicked");
    
  }

  const closeModal = () => {
    setIsOpen(false);
    // console.log("CLOSE modal btn clicked");
    
  }



  const deleteContact = async (contactId) => {
    try {
      await deleteDoc(doc(db , "contacts", contactId));
      console.log("Delete contact btn clicked");
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
      
    }
  }



  return (
    <>
      <div 
      key={contact.id}
      className="flex items-center justify-between rounded-lg bg-yellow p-2">
      <div className="flex gap-1">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>


        <div className=" flex text-3xl">
          
          <RiEditCircleLine onClick={openModal} className="cursor-pointer" />


          <IoMdTrash onClick={()=> (deleteContact(contact.id))}
            className="cursor-pointer text-orange"
          />


          <AddAndUpdateContact contact={contact} isUpdate={true} open={isOpen} close={closeModal} />
        </div>


      </div>
    </>
  );
};

export default ContactCard;