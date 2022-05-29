import React from 'react'
import { ArrowIosDownwardOutline, ArrowIosUpwardOutline } from '@emotion-icons/evaicons-outline';
import { Link, useLocation } from 'react-router-dom';
import { NavDescription } from "../../../navigationDescription";
import { RouteDescription } from "../../../types/types";
import styled from '@emotion/styled';
import styles from './NavChoice.module.css'

const Expand = styled(ArrowIosDownwardOutline)`
  color: Black;
  height: 20px;
  margin-left: 10px;
`
const Collapse = styled(ArrowIosUpwardOutline)`
  color: Black;
  height: 20px;
  margin-left: 10px;
`

interface NavChoiceProps {
  selected?: boolean,
  index: number,
  selectDropdown: (index: number) => void,
  route: any,
}

export const NavChoice: React.FC<NavChoiceProps> = ({selected, selectDropdown, index, route}) => {

  const navObj: RouteDescription = NavDescription;

  const location = useLocation();

  return (
    <div className={styles.NavChoice}>
      <div
        className={styles.navSelection}
        onClick={() => {
          selectDropdown(index)
        }}
        style={selected ? {
          marginBottom: '10px'
        } : {
        }}
      >
        <span>{route.linkText}</span>
        {selected ? <Collapse/> : <Expand/> }
        
      </div>
      {selected && (
        <>
          <span> {navObj[route.linkText]} </span>
          <Link
            className={`${styles.navLink} ${location.pathname === route.path ? styles.active : styles.inactive}`}
            to={route.path}
          >
            <br />
            {`< ${route.linkText} >`}
          </Link>
        </>
      )}
    </div>
  )
}