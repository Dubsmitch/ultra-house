import React, { useState, useEffect, useReducer }  from 'react';
import { TextField } from '@mui/material';
import styles from './LightBoxTwo.module.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePrevious } from '../../hooks';

interface PixelProps {
  propsRValue: number,
  propsGValue: number,
  propsBValue: number
  propsBorders: boolean,
} 

interface LightBoxTwoProps {
  size: { width: number, height: number; };
}

export const Pixel: React.FC<PixelProps> = ({propsRValue, propsGValue, propsBValue, propsBorders}) => {
  const [rValue, setRValue] = useState(10);
  const [gValue, setGValue] = useState(100);
  const [bValue, setBValue] = useState(200);
  const [borders, setBorders] = useState(true);

  useEffect(() => {
    setRValue(propsRValue);
    setGValue(propsGValue);
    setBValue(propsBValue);
    setBorders(propsBorders);

  }, [propsRValue, propsGValue, propsBValue, propsBorders]);



  return (
    <div className={styles.Pixel}
      style={borders ? 
        {
          backgroundColor: `rgb(${rValue}, ${gValue}, ${bValue}`,
          height: '8px',
          width: '8px',
          border: '1px solid black'
        } : {
          backgroundColor: `rgb(${rValue}, ${gValue}, ${bValue}`,
          height: '10px',
          width: '10px',
        }
      }
    >
    </div>
  )
}

const initialState = {selectedTiles: [] as any[]};

function reducer(selectedTilesState: {selectedTiles: any[]}, action: { type: any, newTile: any, singleTile: boolean }) {
  switch (action.type) {
    case 'empty':
      return {selectedTiles: []};
    case 'include':
      let cloneArray = [];
      if (action.singleTile) {
        cloneArray.push(action.newTile);
      } else {
        cloneArray = [...selectedTilesState.selectedTiles];
        cloneArray.push(action.newTile);
      }
      return {selectedTiles: [...cloneArray]};
    default:
      throw new Error();
  }
}

const LightBoxTwo: React.FC<LightBoxTwoProps> = (props) => {
  const [rValue, setRValue] = useState(100);
  const [gValue, setGValue] = useState(100);
  const [bValue, setBValue] = useState(100);
  const [tileArray, setTileArray] = useState([]);
  const [selectedTilesState, dispatch] = useReducer(reducer, initialState);
  const [onMouseDown, setOnMouseDown] = useState(false);
  const prevMouseState = usePrevious(onMouseDown);

  const [pixelArray, setPixelArray] = useState([]);

  useEffect(() => {
    createAllTiles();
  }, []);

  const placePixel = () => {
    const clonePixelArray = [...pixelArray];
    const pixelObj = {
        propsRValue: rValue,
        propsGValue: gValue,
        propsBValue: bValue,
        propsBorders: false,
    }
    clonePixelArray.push(pixelObj);
    setPixelArray(clonePixelArray);
  }

  const renderPixels = () => {
    return pixelArray.map((pixel) => {
      return <Pixel
        propsRValue={pixel.propsRValue}
        propsGValue={pixel.propsGValue}
        propsBValue={pixel.propsBValue}
        propsBorders={pixel.propsBorders}
      /> 
    })
  }

  const brighten = () => {
    const tileArrayClone = tileArray.map((tile) => {
      if (tile.rValue < 245) { 
       tile.rValue = tile.rValue + 10;
      } else {
        tile.rValue = 255;
      }
      if (tile.gValue < 245) { 
        tile.gValue = tile.gValue + 10;
       } else {
         tile.gValue = 255;
       }
       if (tile.bValue < 245) { 
        tile.bValue = tile.bValue + 10;
       } else {
         tile.bValue = 255;
       }
       return tile;
    });
    setTileArray(tileArrayClone);
  }

  const invert = () => {
    const tileArrayClone = tileArray.map((tile) => { 
      tile.rValue = tile.rValue - 255;
      tile.rValue = tile.rValue * -1;
     
      tile.gValue = (tile.gValue - 255) * -1;
      tile.bValue = (tile.bValue - 255) * -1;
       
      return tile;
    });
    setTileArray(tileArrayClone);
  }

  const randomize = () => {
    function randomInteger(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const tileArrayClone = tileArray.map((tile) => { 
      tile.rValue = randomInteger(1, 256);     
      tile.gValue = randomInteger(1, 256);
      tile.bValue = randomInteger(1, 256);
       
      return tile;
    });
    setTileArray(tileArrayClone);
  }

  const createAllTiles = () => {
    const initTileArray = []; 
    for (let i = 0; i < 400; i++) {
      const tile = {
        rValue: rValue,
        gValue: gValue,
        bValue: bValue,
        index: i
      }

      initTileArray.push(tile);
    }

    setTileArray(initTileArray);
  }

  const changeRGB = (r: number, g: number, b: number) => {
    if (r !== rValue) {
      setRValue(r);
    }
    if (g !== gValue) {
      setGValue(g);
    }
    if (b !== bValue) {
      setBValue(b);
    }
  }

  const upDateTiles = async() => {
    upDateTile(true);
    dispatch({type: 'empty', newTile: null, singleTile: false});
  }

  const upDateTile = (incomingtile: any) => {
    if(selectedTilesState.selectedTiles.length > 0) {

      const arrayClone = tileArray.map((tile, index) => {
          if(selectedTilesState.selectedTiles.includes(tile.index)) {
            const updatedTile = {
              rValue: rValue,
              gValue: gValue,
              bValue: bValue,
              index: tile.index,
            }
            return updatedTile
          }
          return tile
        } 
      )
      setTileArray(arrayClone);
    }
  }

  const renderTiles = () => {
    return tileArray.map((tile: any, index: number) => {
      return (
        <div 
          id={`${index}`}
          key={`${index}`}
          style={selectedTilesState.selectedTiles.includes(index) ? 
            {
              backgroundColor: `Rgb(${tile.rValue}, ${tile.gValue}, ${tile.bValue})`,
              height: '8px',
              width: '8px',
              border: '1px solid black'
            } : {
              backgroundColor: `Rgb(${tile.rValue}, ${tile.gValue}, ${tile.bValue})`,
              height: '8px',
              width: '8px',
              border: '1px solid gray'
            }
          }
          onClick={() => {
            changeRGB(tile.rValue, tile.gValue, tile.bValue);
            dispatch({type: 'include', newTile: tile.index, singleTile: true});
          }}
          onMouseOver={()=> {
            if(onMouseDown) {
              const cloneMouseDownArray = [...selectedTilesState.selectedTiles];
              cloneMouseDownArray.push(index);
              dispatch({type: 'include', newTile: tile.index, singleTile: false});
            }
          }}
        />
      )}
    )
  }

  const {width} = props.size;

  return (
    <div className={styles.LightBox}>
      <h1>
        PIXEL BOX
      </h1>
      <div 
        className={styles.lightBoxArea}
        onPointerDown={()=> setOnMouseDown(true)}
        onPointerUp={()=> setOnMouseDown(false)}
        style={ width <= 800 ? {
          marginTop: '10px',
          height: '400px',
          width: '200px'
        } : {
          marginTop: '10px',
          height: '200px',
          width: '400px'
        }}
      >
        <div className={styles.instructions}>
          <span> Instructions: </span>
          <p>
            click inside the grey box to select a 'pixel', or press down and drag
            to change the color with the text boxes or the slider
            select update
          </p>
        </div>
        <div className={styles.pixelContainer}>
          {renderTiles()}
        </div>
      </div>

      <div className={styles.tile}
        style={
          {
            backgroundColor: `Rgb(${rValue}, ${gValue}, ${bValue})`,
          }
        }
      />
      <div className={styles.slider}>
        <button
          onClick={() => {
            if(selectedTilesState.selectedTiles) {
              upDateTiles()
            } else {
              upDateTile(false)
            }
          }
          }
        >
          update
        </button>
        <button
          onClick={() => brighten()}
        >
          Brighten
        </button>
        <button
          onClick={() => invert()}
        >
          Invert
        </button>
        <button
          onClick={() => randomize()}
        >
          randomize
        </button>
        <Slider
          min={1}
          max={255}
          dots={false}
          step={1}
          value={rValue}
          defaultValue={[rValue]}
          onChange={(e)=> setRValue(Number(e))}
          handleStyle={
            {
              height: '25px',
              width: '25px',
              border: 'none',
              top: '0px',
              boxShadow: 'none',
              backgroundColor: '#A5B11F',
            }
          }
          trackStyle={[{
            backgroundColor: 'rgb(109, 2, 61)',
            height: '5px',
            // top: '11.5px',
          }]}
          railStyle={{
            height: '3.5px',
            // width: '101%',
            backgroundColor: 'rgb(211, 216, 225)',
            // top: '11px',
          }}
        />
        <TextField
          id="rValue"
          label="rValue"
          margin="normal"
          onChange={(e) => setRValue(Number(e.target.value))}
          required
          type="text"
          value={rValue}
          variant="standard"
        />
        <Slider
          min={1}
          max={255}
          dots={false}
          step={1}
          defaultValue={[gValue]}
          value={gValue}
          onChange={(e)=> setGValue(Number(e))}
          handleStyle={
            {
              height: '25px',
              width: '25px',
              border: 'none',
              top: '0px',
              boxShadow: 'none',
              backgroundColor: '#A5B11F',
            }
          }
          trackStyle={[{
            backgroundColor: 'rgb(109, 2, 61)',
            height: '5px',
            // top: '11.5px',
          }]}
          railStyle={{
            height: '3.5px',
            // width: '101%',
            backgroundColor: 'rgb(211, 216, 225)',
            // top: '11px',
          }}
        />
        <TextField
          id="gValue"
          label="gValue"
          margin="normal"
          onChange={(e) => setGValue(Number(e.target.value))}
          required
          type="text"
          value={gValue}
          variant="standard"
        />
        <Slider
          min={1}
          max={255}
          dots={false}
          step={1}
          defaultValue={[bValue]}
          value={bValue}
          onChange={(e)=> setBValue(Number(e))}
          handleStyle={
            {
              height: '25px',
              width: '25px',
              border: 'none',
              top: '0px',
              boxShadow: 'none',
              backgroundColor: '#A5B11F',
            }
          }
          trackStyle={[{
            backgroundColor: 'rgb(109, 2, 61)',
            height: '5px',
            // top: '11.5px',
          }]}
          railStyle={{
            height: '3.5px',
            // width: '101%',
            backgroundColor: 'rgb(211, 216, 225)',
            // top: '11px',
          }}
        />
        <TextField
          id="bValue"
          label="bValue"
          margin="normal"
          onChange={(e) => setBValue(Number(e.target.value))}
          required
          type="text"
          value={bValue}
          variant="standard"
        />
      </div>
    </div>
  );
}

export default LightBoxTwo;

