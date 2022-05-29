import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { NavChoice } from '../navBox/navChoice/NavChoice';
import {ArrowIosDownwardOutline, ArrowIosUpwardOutline} from '@emotion-icons/evaicons-outline';
import styled from '@emotion/styled';
import { appRoutes } from "../../Routes";
import Timpe from '../../img/MtTimpe_croped.png';

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
        <li>
          <NavChoice
            key={route.linkText}
            selected = {selectedIndex === index}
            selectDropdown={this.selectDropdown}
            index={index}
            route={route}
          />
        </li>
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
          <ul>
            {this.renderNavChoices()}
          </ul>
        </div>
        
      </div>
    );
  }
}

export default Dashboard;
