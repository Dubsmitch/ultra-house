import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './Header.module.css';
import SilvertonImage from '../../img/HeaderSilverton.jpeg';
import Bighorn from '../../img/bighorn.png';
import InvertedBighorn from '../../img/inverted_bighorn.png';
import InvertedMountains from '../../img/mountains_inverted.png';
import Mountains from '../../img/mountains.png';
import {Menu} from '@emotion-icons/zondicons/Menu';
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";

const WhiteMenu = styled(Menu)`
  color: white;
  height: 32%;
  margin-left: 10px;
`
const SmallWhite = styled(Menu)`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  color: white;
  height: 32%;
  margin-left: 31px;
  margin-right: 34px;
`
interface HeaderProps {
  windowWidth: number;
}

interface HeaderState {

}

export const Header: React.FC <HeaderProps> = ({windowWidth}) => {

  let navigate = useNavigate();
    return (
      <div className={styles.header}>
        {windowWidth < 800 ? (
          <>
            <div className={styles.logoContainer}>
              <span> RUN WILD </span>
              <img onClick={() => {navigate('/')}} className={styles.smallImg} src={InvertedBighorn} alt={"weblogo"}/>
              <SmallWhite />
            </div>
          </>
        ) : (
          <>
            <div className={styles.logoContainer}>
              <div style={{width:'60px'}}> </div>
              <img 
                onClick={() => {navigate('/')}} 
                src={InvertedBighorn}
                alt={"weblogo"}/>
              <span
                onClick={() => {navigate('/')}}
              >
                RUN WILD
              </span>
            </div>
            <div className={styles.centerLogo}>
              <img
                src={InvertedMountains}
                alt={"centerLogo"}
              />
            </div>
            <div className={styles.navigateContainer}>
              <div> NAVIGATE </div>
              <WhiteMenu />
            </div>
          </>
        )}
      </div>
    );
  }

export default Header;
