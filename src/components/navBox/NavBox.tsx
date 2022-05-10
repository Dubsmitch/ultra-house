import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { appRoutes } from "../../Routes";
import NavItems from "./navBoxItems/navBoxItems";
import styles from './NavBox.module.css';
import Gallery from '../Gallery/galleryJSON.json';

function NavBox() {


  const location = useLocation();

  const setHeight = () => {
    const elements = document.getElementById('navItem');

    if(elements) {
      const info = elements.getBoundingClientRect();
      const width = info.width;
      return `${width}px`;
    }
    return `150px`;
  }

  const listSideNavItems = appRoutes.map((route, index) => {
    const imageThumb = require(`../../img/${Gallery.galleryOne[index]}`)
    return (
      <div id='navItem' className={styles.navItem}
        style={
          {
            height: `200px`,
            width: '100%',
            backgroundImage: `url(${imageThumb}`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',  
          }
        }
      >
        <Link
          className={`${styles.navLink} ${location.pathname === route.path ? styles.active : styles.inactive}`}
          to={route.path}
        >
          <div className={styles.linkText}>{route.linkText}</div>
        </Link>
      </div>
    )}
  )

  return (
    <div className={styles.SideNavItems}>{listSideNavItems}</div>
  );
}

export default NavBox;