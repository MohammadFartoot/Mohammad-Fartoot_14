import React, {useState, useEffect} from 'react';
import styles from './Contacts.module.css';
import Modal from "./Modal.jsx";
import inputs from "../constants/inputs.js";
import {v4} from "uuid";
import styles1 from "./Modal.module.css";


function Contacts({Page, setPage, showNotification, addContact, editContact, setEditContact, contacts, setContacts}) {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [addModal, setAddModal] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setContact((contact) => ({...contact, [name]: value}));
    }


    const addClickHandler = () => {
        if (!contact.name || !contact.email || !contact.phone) {
            showNotification("لطفا اطلاعات خود را به درستی وارد کنید", "error");
            return;
        }
        if (editContact) {
            setEditModal(true)
        } else {
            setAddModal(true);
        }
    }

    const confirmHandler = () => {
        if (editContact) {
            const update = contacts.map((c) => (c.id === editContact.id ? contact : c));

            setContacts(update);
            showNotification("مخاطب با موفقیت ویرایش شد", "success");
            setEditContact(null);
            setEditModal(false);
        } else {
            const newContact = {...contact, id: v4()};
            addContact(newContact);
            showNotification("مخاطب با موفقیت اضافه شد", "success");
            setAddModal(false);
        }
            setPage("homePage");
            setContact({
                name: "", email: "", phone: ""
            });
        }

    useEffect(() => {
        if (editContact) {
            setContact(editContact);
        }
    }, [editContact]);


    if (Page === "addPage") {
        return (<>

            <form className={styles.form}>
                {inputs.map((input, index) => (<div key={index} className={styles[input.name]}>
                    <p>{input.label}</p>

                    <input
                        type={input.type}
                        name={input.name}
                        value={contact[input.name]}
                        onChange={changeHandler}
                        required
                    />
                </div>))}
                <button type="button" onClick={addClickHandler}>{editContact ? "اعمال تغییرات" : "افزودن"}</button>
            </form>


            {editModal && (
                <Modal onClose={() => setEditModal(false)}>
                    <h3 className={styles1.text}>شما در حال ویرایش یکی از مخاطبین هستید</h3>
                    <h4 className={styles1.text}>آیا مطمئن هستید؟</h4>
                    <button className={styles1.confirmButton} onClick={confirmHandler}>بله</button>
                    <button className={styles1.cancelButton} onClick={() => setEditModal(false)}>انصراف</button>
                </Modal>
            )}

            {addModal && (<Modal onClose={() => setAddModal(false)}>
                <h3 className={styles1.text}>شما در حال افزودن مخاطب جدید هستید</h3>
                <h3 className={styles1.text}>آیا مطمئن هستید؟</h3>
                <button className={styles1.confirmButton} onClick={confirmHandler}>تایید</button>
                <button className={styles1.cancelButton} onClick={() => setAddModal(false)}>انصراف</button>
            </Modal>)}
        </>);
    }
}


export default Contacts;