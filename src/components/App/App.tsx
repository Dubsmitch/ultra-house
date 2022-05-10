import { BrowserRouter } from "react-router-dom";
// import GlobalLayout from "./components/layout/GlobalLayout";
import React, { useState, useEffect, useReducer, useRef, Children }  from 'react';
import { useLocation } from 'react-router-dom';
import BarleyRoutes from "../../Routes";
import Header from '../header/Header';
import NavBox from '../navBox/NavBox';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';
import styles from './Dash.module.css';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.visualViewport.width,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function App() {  
  const size = useWindowSize();

    return (
        <div className={'App'} >
            <Header windowWidth={size.width}/>
            <Dash>
                <BarleyRoutes props={{size}}/>
            </Dash>
        </div>
    );
}

export default App;

export const Dash: React.FC = ({children}) => {
   
    return (
      <div className={styles.Dash}>
        {children}
      </div>
    )
  }