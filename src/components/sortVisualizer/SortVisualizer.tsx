import React, {useEffect, useState} from 'react';
import styles from './SortVisualizer.module.css';

const SortVisualizer: React.FC = () => {
  const [sortArray, setSortArray] = useState([]);
  const [selectedPointers, setSelectedPointers] = useState([]);
  const [numComps, setNumComps] = useState(0);
  const [numSwaps, setNumSwaps] = useState(0);
  const [j, setJ] = useState(1);
  const [i, setI] = useState(0);

  useEffect (() => {
    // initialize array
    createArray()
  }, [])

  useEffect(() => {
    sortMyArray();
  }, [sortArray])

  useEffect(() => {
    console.log('did this run from useEffect?');
    let interval: NodeJS.Timer = null
    
      interval = setInterval(() => {
        bubbleSort();
      }, 100)

    return () => clearInterval(interval)
  }, [sortArray, j, i])

  /**
   * will create an array of 20 random numbers with no duplicates
   */
  const createArray = () => {
    const storageArray: number[] = [];

    for (let i = 1; i < 21; i++) {
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

  const renderSortedArray = () => {
    return sortArray.map((number, idx) => {
      const divHeight = 10 + (number * 15);
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
            backgroundColor: 'rgb(255, 79, 4)',
            marginLeft: '2px'
          }
        }>

        </div>
      )
    })
  }

  const sortMyArray = () => {
    setSelectedPointers([0, 1]);
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

  return (
    <div className={styles.SortVisualizer}>
      <button onClick={() => {createArray()}}> Randomize </button>
      <button onClick={() => {bubbleSort()}}> BubbleSortME </button>


      {renderSortedArray()}
      <p>num comps: {numComps}</p>
      <p>num swaps: {numSwaps}</p>
    </div>
  );
}

export default SortVisualizer;