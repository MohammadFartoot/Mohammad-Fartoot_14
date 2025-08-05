import Header from "./components/Header.jsx";
import Contacts from "./components/Contacts.jsx";
import {useState, useEffect} from "react";
import Notification from "./components/Notification.jsx";
import ContactsList from "./components/ContactsList.jsx";
import Modal from "./components/Modal.jsx";
import styles1 from "./components/Modal.module.css"

function App() {
    const [Page, setPage] = useState("homePage");

    const [notification, setNotification] = useState("");

    const [contacts, setContacts] = useState([]);

    const [deleteModal, setDeleteModal] = useState(false);

    const [selectContactId, setSelectContactId] = useState(null);

    const [editContact, setEditContact] = useState(null);

    const [selectMode, setSelectMode] = useState(false);

    const [selectedContactIds, setSelectedContactIds] = useState([]);

    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);

    const [searchContacts, setSearchContacts] = useState("");

    const [theme, setTheme] = useState("light");


    const showNotification = (text, type = "success") => {
        setNotification({text, type});
        setTimeout(() => setNotification(""), 4000);
    }


    const addContact = (newContact) => {
        setContacts((contact) => ([...contact, newContact]));
    }

    const deleteContact = () => {
        const updated = contacts.filter((contact) => contact.id !== selectContactId);
        setContacts(updated);
        setSelectContactId(null);
        setDeleteModal(false);
        showNotification("مخاطب با موفقیت حذف شد", "success");
    };

    const openDeleteModal = (id) => {
        setSelectContactId(id);
        setDeleteModal(true);
    };

    const editHandler = (contact) => {
        setEditContact(contact);
        setPage("addPage");
    };

    const selectContacts = (id) => {
        setSelectedContactIds((contact) =>
            contact.includes(id) ? contact.filter((item) => item !== id) : [...contact, id]
        );
    };

    const deleteSelectedContacts = () => {
        const update = contacts.filter(contact => !selectedContactIds.includes(contact.id));
        setContacts(update);
        setSelectedContactIds([]);
        setSelectMode(false);
        setBulkDeleteModal(false);
        showNotification("مخاطبین با موفقیت حذف شدند", "success");
    }

    const openBulkDeleteModal = () => {
        setBulkDeleteModal(true);
    }

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchContacts.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchContacts.toLowerCase())
    );

    const themeHandler = () => {
        setTheme((theme) => theme === "light" ? "dark" : "light");
        if (theme === "light") {
            showNotification("🌙 Dark mode on", "error");
        } else {
            showNotification("☀️ Light mode on", "error");
        }
    }

    useEffect(() => {
        document.body.className = theme === "dark" ? "darkMode" : "";
    }, [theme]);


    return (
        <div className={theme === "light" ? "lightMode" : "darkMode"}>
            {Page === "homePage" && (
                <>
                    < Header
                        addButton={() => setPage("addPage")}
                        selectMode={selectMode}
                        setSelectMode={setSelectMode}
                        selectedContactIds={selectedContactIds}
                        openBulkDeleteModal={openBulkDeleteModal}
                        searchContacts={searchContacts}
                        setSearchContacts={setSearchContacts}
                        themeHandler={themeHandler}
                        theme={theme}
                    />
                    < ContactsList
                        contacts={filteredContacts}
                        deleteButton={openDeleteModal}
                        editHandler={editHandler}
                        selectedContactIds={selectedContactIds}
                        selectContacts={selectContacts}
                        selectMode={selectMode}
                    />
                </>
            )}

            {Page === "addPage" && (
                < Contacts
                    showNotification={showNotification}
                    Page={Page}
                    setPage={setPage}
                    addContact={addContact}
                    editContact={editContact}
                    setEditContact={setEditContact}
                    contacts={contacts}
                    setContacts={setContacts}
                />
            )}
            < Notification message={notification}/>


            {deleteModal && (
                <Modal onClose={() => setDeleteModal(false)}>
                    <h3 className={styles1.text}>آیا مطمئن هستید که این مخاطب حذف شود؟</h3>
                    <button className={styles1.confirmButton} onClick={deleteContact}>حذف</button>
                    <button className={styles1.cancelButton} onClick={() => setDeleteModal(false)}>انصراف</button>
                </Modal>
            )}
            {bulkDeleteModal && (
                <Modal onClose={() => setBulkDeleteModal(false)}>
                    <h3 className={styles1.text}>شما در حال حذف گروهی مخاطبین هستید</h3>
                    <h4 className={styles1.text}>آیا مطمئن هستید؟</h4>
                    <button className={styles1.confirmButton} onClick={deleteSelectedContacts}>بله</button>
                    <button className={styles1.cancelButton} onClick={() => setBulkDeleteModal(false)}>انصراف</button>
                </Modal>
            )}

        </div>
    )
}

export default App;
