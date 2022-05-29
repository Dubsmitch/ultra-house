import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './Dashboard.module.css';
import NavBox from '../navBox/NavBox';
import {ArrowIosDownwardOutline, ArrowIosUpwardOutline} from '@emotion-icons/evaicons-outline';
import styled from '@emotion/styled';
import { appRoutes } from "../../Routes";
import { NavDescription } from "../../navigationDescription";
import { RouteDescription } from "../../types/types";
import { Link, useLocation } from 'react-router-dom';
import Timpe from '../../img/MtTimpe_croped.png';


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

interface DashboardProps {
  size: { width: number, height: number; };
}

interface DashboardState {
  selectedIndex: null | number;
}

export class Dashboard
  extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      selectedIndex: null,
    };
  }

  componentDidMount(): void {
  }

  selectDropdown = (index: number) => {
    const {selectedIndex} = this.state;
    if(typeof(selectedIndex) !== 'number' || selectedIndex !== index) {
      this.setState({selectedIndex: index});
    } else {
      this.setState({selectedIndex: null});
    }
  }

  renderNavChoices = () => {
    const {selectedIndex} = this.state;
    return appRoutes.map((route, index) => {  
      return route.linkText !== 'Dashboard' && (
        <NavChoice
          key={route.linkText}
          selected = {selectedIndex === index}
          selectDropdown={this.selectDropdown}
          index={index}
          route={route}
        />
      ); 
    })
  }

  render() {
    const {size} = this.props;
    return (
      <div className={styles.Dashboard}>
        <div className={styles.titleContainer}>
          <h1>
            WHO I AM
          </h1>
          <h4>
            Programmer, Mountain Runner, Human
          </h4>
          {size.width > 1000 && (

            <div className={styles.imageContainer}>
              <div className={styles.imageOverlay}></div>
              <div className={styles.imageSpacer}></div>
              <img 
                className={styles.dashboardImage}
                src={Timpe}
                alt='Timpe'
              />
            </div>
          )}
        </div>
        <div className={styles.navContainer}>
          {this.renderNavChoices()}
        </div>
        
      </div>
    );
  }
}

export default Dashboard;

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