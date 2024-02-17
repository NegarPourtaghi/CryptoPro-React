import React, { useState } from 'react';
import styles from './Pagination.module.css'
const Pagination = ({Page,setPage }) => {

    const PrevHandler=()=>{
        if(Page<=1) return;
             setPage(Page => Page-1)
         
     }

    const NextHandler=()=>{
        if(Page>=10) return;
            setPage(Page => Page+1)
       
    }
    return (
        <div className={styles.Container}>
            <button onClick={PrevHandler} className={Page ===1 ? styles.disabled : null}>Previos</button>
            <p className={Page === 1 ? styles.Selected : null}>1</p>
            <p className={Page === 2 ? styles.Selected : null}>2</p>
            {
                (Page>2 && Page<9) && 
                <>
                <span>...</span>
                <p className={styles.Selected}>{Page}</p>
                </>
            }
            <span>...</span>
            <p className={Page === 9 ? styles.Selected : null}>9</p>
            <p className={Page === 10 ? styles.Selected : null}>10</p>

            <button onClick={NextHandler} className={Page ===10 ? styles.disabled : null}>Next</button>
        </div>
    );
};

export default Pagination;