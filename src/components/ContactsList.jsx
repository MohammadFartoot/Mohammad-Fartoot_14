import styles from './ContactsList.module.css';
import more from '../images/more.png';
import {useState} from "react";


function ContactsList({contacts, deleteButton, editHandler, selectedContactIds, selectContacts, selectMode}) {
    const [activeActionId, setActiveActionId] = useState(null);

    if (!contacts || contacts.length === 0) {
        return (
            <div className={styles.noContacts}><p>هیچ مخاطبی وجود ندارد</p></div>
        );
    }

    return (
        <div className={styles.contactsList}>
            {contacts.map((contact) => (
                <div className={styles.contactCard} key={contact.id}>
                    {selectMode && (
                        <input
                            type="checkbox"
                            checked={selectedContactIds.includes(contact.id)}
                            onChange={() => selectContacts(contact.id)}
                        />
                    )}
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>

                    {activeActionId === contact.id ? (
                        <div className={styles.actionButton}>
                            <button onClick={() => editHandler(contact)}>ویرایش</button>
                            <button onClick={() => deleteButton(contact.id)}>حذف</button>
                        </div>
                    ) : (
                        <img
                            onClick={() => setActiveActionId(contact.id)}
                            src={more}
                            alt="more"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ContactsList;