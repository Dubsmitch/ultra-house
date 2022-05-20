import React, {useEffect, useState} from 'react';
import styles from './SortVisualizer.module.css';

const SortVisualizer: React.FC = () => {
  const [sortArray, setSortArray] = useState([]);
  const [selectedPointers, setSelectedPointers] = useState([]);
  const [j, setJ] = useState(1);
  const [i, setI] = useState(0);

  useEffect (() => {
    // initialize array
    createArray()
  }, [])

  useEffect(() => {
    sortMyArray();
  }, [sortArray])

  /**
   * will create an array of 20 random numbers with no duplicates
   */
  const createArray = () => {
    const storageArray: number[] = [];

    for (let i = 1; i < 21; i++) {
      storageArray.push(i);
    }
    // console.log(storageArray);

    let leftOverArray: number[] = [...storageArray];

    let randomArray: number[] = [];
    
    storageArray.forEach((num, index) => {
      // take a random number from zero -> (array length - index)
      // push that in to the randomArray, and remove it from the
      // storage array

      //find remaining size
      const remainingSize = storageArray.length - (index); 
      const selectedIndex = Math.floor(Math.random() * remainingSize);
      console.log('selectedIndex', selectedIndex);
      console.log('leftOverArray[selectedIndex]', leftOverArray[selectedIndex], leftOverArray);
      randomArray.push(leftOverArray[selectedIndex]);

      // console.log(`leftOverArray.splice(selectedIndex, 1)`, leftOverArray.splice(selectedIndex, 1));
      
      leftOverArray.splice(selectedIndex, 1);
    })

    let unique = Array.from(new Set(randomArray));
    if(randomArray.length === unique.length) {
      console.log('the array is random', unique);
    } else {
      console.log('array is not random', randomArray);
    }
    setSortArray([...unique]);
  }

  const renderSortedArray = () => {
    return sortArray.map((number, idx) => {
      const divHeight = 10 + (number * 15);
      let doesMatch = selectedPointers.includes(idx);
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
        if(swap > dataArray[j+1]) {
            dataArray[j]=dataArray[j+1];
            dataArray[j+1] = swap;
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

    </div>
  );
}

export default SortVisualizer;