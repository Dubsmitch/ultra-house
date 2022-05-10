import * as React from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './Running.module.css';
import RunningGallery from './runningGallery/RunningGallery';
import Link, { NavLink } from 'react-router-dom';

interface RunningProps {
}

interface RunningState {
}

export class Running
  extends React.Component<RunningProps, RunningState> {
  constructor(props: RunningProps) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {} = this.props;

    return (
      <div className={styles.Running}>
        <NavLink to="/"> Home </NavLink>
        Running
        <RunningGallery galleryKey="galleryOne" />
      </div>
    );
  }
}

export default Running;