import React from 'react';
import styles from './Layout.module.css'
function Layout({children}) {
    return (
        <>
        <header className={styles.header}>
            <h1>Cypto App</h1>
            <p>React | Full Course</p>
        </header>
        {children}
        <footer className={styles.footer}>
            <p> Developed by Negar with ❤️ </p>
        </footer>
        </>
    );
}

export default Layout;