import React from 'react';
import styles from './Header.module.css';


import moon from '../images/moon-2.png';
import add from '../images/add.png';
import recycle from '../images/recycling-bin.png';
import undo from '../images/undo.png';
import sun from '../images/sun.png';


function Header({
                    addButton,
                    selectMode,
                    setSelectMode,
                    openBulkDeleteModal,
                    selectedContactIds,
                    searchContacts,
                    setSearchContacts,
                    themeHandler,
                    theme
                }) {

    return (
        <div className={styles.header}>
            <h5 className={theme === "light" ? styles.lightH5 : styles.darkH5}>جستجو در مخاطبین :</h5>
            <input
                type="text"
                value={searchContacts}
                onChange={(event) => setSearchContacts(event.target.value)}
            />
            {!selectMode && (
                <button onClick={() => setSelectMode(true)}>
                    <img src={recycle}/>
                </button>
            )}
            {selectMode && selectedContactIds.length > 0 && (
                <button onClick={openBulkDeleteModal}>
                    <img src={recycle}/>
                </button>
            )}
            {selectMode && selectedContactIds.length === 0 && (
                <button onClick={() => setSelectMode(false)}>
                    <img src={undo}/>
                </button>
            )}
            <button onClick={addButton}><img src={add} alt="logo"/></button>
            <button onClick={themeHandler}><img src={theme === "light" ? moon : sun} alt="logo"/></button>
        </div>
    );
}

export default Header;