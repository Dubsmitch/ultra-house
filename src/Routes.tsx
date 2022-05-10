import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home/home';
import Running from './components/running/Running';
import Dashboard from './components/Dashboard/Dashboard';
import LightBoxTwo from './components/lightBoxTwo/LightBoxTwo';
import Events from './components/events/Events';

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
    component: Home,
    linkText: 'Home',
    path: '/home',
  },
  {
    component: Running,
    linkText: 'Running',
    path: '/running',
  },
  {
    component: LightBoxTwo,
    linkText: 'Pixel Box',
    path: '/PixelBox',
  },
  {
    component: Events,
    linkText: 'Events',
    path: '/Events',
  },
];

interface BarleyRoutesProps {
  props: {size: { width: number, height: number; };}
  
}

const BarleyRoutes: React.FC<BarleyRoutesProps> = ({props}) => {
  const {
    size
  } = props;

  const listRoutes = appRoutes.map((route, index) => {
    const Component = route.component;
    return (
      // <Route path={route.path} element={<Component/>}/>
      <Route
        key={route.linkText}
        element={
          <Component
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