import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './home.module.css';
import Ogden from '../../img/Ogden.jpg';
import PonyExpress from '../../img/PonyExpress.jpeg';

interface LoginFormProps {
}

interface LoginFormState {
}

export class Home
  extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {} = this.props;

    return (
      <div className={styles.Home}>
        <div className={styles.pageInfoContainer}>
          <div className={styles.infoImage}
            style={
              {
                backgroundImage: `url(${PonyExpress})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: 'Rgb(149, 165, 191)',
              }
            }
          />
          <div className={styles.infoPanel}>
            <div className={styles.textContainer}>
              <h1> Who am I </h1>
              <p>
                I am an UltraRunner/Programmer. I am trying to get the most out of my body
                over ultra distances from 50k - 100 miles while still enjoying the process. 
                I have won several races and hold a course record at 50 miles. I am 
                always experimenting with new methods but I think the most important part 
                of pursuing Ultra distance is passion.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.pageInfoContainer}>
          <div className={styles.infoPanel}>
            <div className={styles.textContainer}>
              <h1> Where and Why </h1>
              <p>
                I call Ogden, Utah my 'home base'. It has everything a trail runner could want: access to the Bonville Shore
                Line Trail all year around. It is 6 hous from everywhere you want to be in the west,
                it is at ~5000ft altitude and it has an incredible outdoor community.  
              </p>
            </div>
          </div>
          <div className={styles.infoImage}
            style={
              {
                backgroundImage: `url(${Ogden})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: 'Rgb(149, 165, 191)',
              }
            }
          />
          </div>
      </div>
    );
  }
}

export default Home;
