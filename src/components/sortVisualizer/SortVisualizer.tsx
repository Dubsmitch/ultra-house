import React, {useEffect, useState} from 'react';
import styles from './SortVisualizer.module.css';
// size of array to be sorted
const sortArraySize = 255
//speed of sort
const sortSpeed = 20

const SortVisualizer: React.FC = () => {
  const [sortArray, setSortArray] = useState([]);
  const [numComps, setNumComps] = useState(0);
  const [numSwaps, setNumSwaps] = useState(0);
  const [sortActive, setSortActive] = useState(false);
  const [j, setJ] = useState(0);
  const [i, setI] = useState(0);
  const [speed, setSpeed] = useState(sortSpeed);

  useEffect (() => {
    createArray()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timer = null
    
    if(sortActive) {
      interval = setInterval(() => {
        bubbleSort();
      }, speed)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [sortActive, sortArray, j, i])

  /**
   * will create an array of 20 random numbers with no duplicates
   */
  const createArray = () => {
    const storageArray: number[] = [];
    setSortActive(false);
    setJ(0);
    setI(0);

    for (let i = 1; i < (sortArraySize + 1); i++) {
      storageArray.push(i);
    }

    let leftOverArray: number[] = [...storageArray];

    let randomArray: number[] = [];
    
    storageArray.forEach((num, index) => {
      const remainingSize = storageArray.length - (index); 
      const selectedIndex = Math.floor(Math.random() * remainingSize);
      randomArray.push(leftOverArray[selectedIndex]);
      
      leftOverArray.splice(selectedIndex, 1);
    })

    let unique = Array.from(new Set(randomArray));
    setSortArray([...unique]);
  }

  const changeSpeed = (direction: number) => {
    if (direction > 0) {
      setSpeed(currentSpeed => currentSpeed / 2);
    } else {
      setSpeed(currentSpeed => currentSpeed * 2);
    }
  }

  const renderSortedArray = () => {
    return sortArray.map((number, idx) => {
      const divHeight = 10 + (number * 3);
      let doesMatch = idx === j || idx === j+1;
      return (
        <div style={
          doesMatch ? 
          {
            height: `${divHeight}px`,
            width: '5px',
            backgroundColor: 'rgb(50, 255, 5)',
            marginLeft: '2px'
          } :
          {
            height: `${divHeight}px`,
            width: '5px',
            backgroundColor: `rgb(${255-number}, 70,  ${0+number})`,
            marginLeft: '2px'
          }
        }>

        </div>
      )
    })
  }

  const restartSort = () => {
    setJ(0);
    setI(0);
    setSortActive(true);
  }

  const bubbleSort = () => {
    let dataArray = [...sortArray];
    const size = sortArray.length;
    let swap = dataArray[j];
    
    if(j === size-i-1) {
      setJ(0); 
      setI(i+1);
    }
    
    if(i<size-1 && j<size-i-1) {
      setNumComps(currentNum => currentNum + 1);
      
      if(swap > dataArray[j+1]) {
        dataArray[j]=dataArray[j+1];
        dataArray[j+1] = swap;
        setNumSwaps(currentNum => currentNum + 1);
        setSortArray(dataArray);
        setJ(j+1); 
      } else {
        setJ(j+1);
      }
    }
  }

  const pause = () => {
    setSortActive(currentSortActive => !currentSortActive)
  }

  return (
    <div className={styles.SortVisualizer}>
      <button onClick={() => {createArray()}}> Randomize </button>
      <button disabled={!!i || !!j} onClick={() => {restartSort()}}> Start Sorting </button>
      <button onClick={() => {bubbleSort()}}> increment by one </button>
      <button disabled={!j && !i} onClick={() => {pause()}}> {sortActive ? 'Pause' : 'Unpause'} </button>
      <button onClick={() => {changeSpeed(1)}}> increase sort Speed </button>
      <button onClick={() => {changeSpeed(0)}}> decrease sort Speed </button>

      {renderSortedArray()}
      <p>num comps: {numComps}</p>
      <p>num swaps: {numSwaps}</p>
    </div>
  );
}

export default SortVisualizer;