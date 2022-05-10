import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { appRoutes } from "../../../Routes";
import styles from './navBoxItems.module.css';

function NavBoxItems() {
  const location = useLocation();

  const listSideNavItems = appRoutes.map((route) => {
    return (
      <Link
        className={`${styles.navLink} ${location.pathname === route.path ? styles.active : styles.inactive}`}
        to={route.path}
      >
        <div>{route.linkText}</div>
      </Link>
    )}
  )

  return (
    <div className={styles.SideNavItems}>{listSideNavItems}</div>
  );
}

export default NavBoxItems;