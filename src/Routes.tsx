import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home/home';
import Running from './components/running/Running';
import Dashboard from './components/Dashboard/Dashboard';
import LightBoxTwo from './components/lightBoxTwo/LightBoxTwo';
import Events from './components/events/Events';
import SortVisualizer from './components/sortVisualizer/SortVisualizer';
import Store from './components/store/Store';
export interface RouteConfigItem {
  path: string;
  component: any;
  linkText: string;
}

export const appRoutes: RouteConfigItem[] = [
  {
    component: Dashboard,
    linkText: 'Dashboard',
    path: '/',
  },
  {
    component: Store,
    linkText: 'Store',
    path: '/Store',
  },

  {
    component: Events,
    linkText: 'Events',
    path: '/Events',
  },
]

interface BarleyRoutesProps {
  props: {size: { width: number, height: number; };}
  
}

const BarleyRoutes: React.FC<BarleyRoutesProps> = ({props}) => {
  const {
    size
  } = props;

  const listRoutes = appRoutes.map((route, index) => {
    const Component = route.component;
    console.log('from routes,', );
    return (
      <Route
        key={route.linkText}
        element={
          <Component
            size={props.size}
            routeProps={props}
            {...props}
          />}
        path={route.path}
      />
    );
  });

  return (
    <Routes>
      {listRoutes}
    </Routes>
  )
}
export default BarleyRoutes;