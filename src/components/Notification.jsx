import React from 'react';
import styles from './Notification.module.css';

function Notification({message}) {
    if (!message) return null;

    const { text, type } = message;

    const notificationClass = type === "success" ? styles.successNotification : styles.errorNotification;

    return (
        <div className={notificationClass}>
            <p>{text}</p>
        </div>
    );
}

export default Notification;