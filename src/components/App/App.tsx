// import GlobalLayout from "./components/layout/GlobalLayout";
import React, { useState, useEffect }  from 'react';
import BarleyRoutes from "../../Routes";
import Header from '../header/Header';
import './App.css';
import { Dash } from '../dash/Dash';
import { useWindowSize } from '../../hooks';

function App() {  
  const size = useWindowSize();

    return (
        <div className={'App'} >
          {/* does <Header> get nested inside of a semantic tag..? */}
            <Header windowWidth={size.width}/>
            <Dash>
                <BarleyRoutes props={{size}}/>
            </Dash>
        </div>
    );
}

export default App;
