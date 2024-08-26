import Modal from "./Modal"
import { Field, Form, Formik } from "formik";
import {doc ,addDoc , collection , updateDoc} from "firebase/firestore";
import {db} from "../config/firebase.js";
import { toast } from "react-toastify";


const AddAndUpdateContact = ({open , close , isUpdate , contact}) => {

    const addContact = async (contactValues) => {
        try {
            const contactRef = collection(db , "contacts");
            await addDoc(contactRef , contactValues);
            close();
            toast.success("Contact Added Successfully");
        } catch (error) {
            console.log(error);
            
        }
    }
    const updateContact = async (contactValues , id) => {
        console.log("UPADTE KE CONTACT KE ANDAR HAI" , contactValues);
        
        try {
            const contactRef = doc(db , "contacts" , id);
            await updateDoc(contactRef , contactValues);
            close();
            toast.success("Contact Updated Successfully");
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div>
        <Modal open = {open} close = {close}>
            <Formik
            initialValues={ 
                isUpdate ? 
                {
                    name: contact.name,
                    email: contact.email,
                } 
                    :
                {
                    name:"",
                    email:"",
                }
            
            }
            onSubmit={(contactValues) => {
                console.log(contactValues);
                isUpdate ? updateContact(contactValues, contact.id) : 
                addContact(contactValues);
            }}
            >
                <Form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field name="name" className="border h-10" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">E-mail</label>
                        <Field name="email" className="border h-10" />
                    </div>

                    <button className="bg-orange px-3 py-1.5 self-end border">
                        {isUpdate ? "Update" : "Add"} Contact
                    </button>

                </Form>
            </Formik>
        </Modal>
    </div>
    
  )
}

export default AddAndUpdateContact