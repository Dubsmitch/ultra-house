import React from "react";
import styles from './Dash.module.css';

export const Dash: React.FC = ({children}) => {
   
  return (
    <div className={styles.Dash}>
      {children}
    </div>
  )
}
