import React, { useState, useEffect }  from 'react';
import { TextField } from '@mui/material';
import styles from './LightBox.module.css';
import Slider from 'rc-slider';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePrevious } from '../../hooks';


function LightBox() {
  const [rValue, setRValue] = useState(100);
  const [gValue, setGValue] = useState(100);
  const [bValue, setBValue] = useState(100);
  const [tileArray, setTileArray] = useState([]);
  const [selectedTile, setSelectedTile] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [onMouseDown, setOnMouseDown] = useState(false);
  const prevMouseState = usePrevious(onMouseDown);
  const prevSelectedTile = usePrevious(selectedTile);

  useEffect(() => {
    createAllTiles();
  }, []);

  useEffect(() => {
    changeTileStyle(true);
    if(prevSelectedTile !== selectedTile) {
      const prevElement = document.getElementById(`${prevSelectedTile}`)
      if (prevElement && prevElement.style.height !== "10px") {
        changeTileStyle(false);
      }
    }
  }, [selectedTile]);

  useEffect(() => {
    if(!onMouseDown) {
      console.log('ran this');

      if(selectedTiles.length > 0) {
        // setSelectedTiles([]);
      }
    }
    if(onMouseDown) {
      changeTileStyle(false);
    }
  }, [selectedTiles]);

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
    console.log('tileArrayCline', tileArrayClone);
    setTileArray(tileArrayClone);
  }

  const changeTileStyle = (select: boolean) => {
    if (select) {
      const element = document.getElementById(`${selectedTile}`)
      if (element) {
        element.style.border = '1px solid black';
        element.style.height = '8px';
        element.style.width = '8px';
      }
    } else {
      const element = document.getElementById(`${selectedTile}`)
      if (element) {
        element.style.border = 'none';
        element.style.height = '10px';
        element.style.width = '10px';
      }
      if (prevSelectedTile !== selectedTile) {
        const prevElement = document.getElementById(`${prevSelectedTile}`)
        if (prevElement) {
          prevElement.style.border = 'none';
          prevElement.style.height = '10px';
          prevElement.style.width = '10px';
        }
      }
    }
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
    console.log('ran updateTiles', selectedTiles);
    upDateTile(true);
    setSelectedTiles([]);
  }

  const upDateTile = (incomingtile: any) => {
    if(selectedTiles.length > 0) {

      const arrayClone = tileArray.map((tile, index) => {
          if(selectedTiles.includes(tile.index)) {
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
      console.log('arrayclone', arrayClone);
      setTileArray(arrayClone);
    } else {
      const updatedTile = {
        rValue: rValue,
        gValue: gValue,
        bValue: bValue,
        index: selectedTile,
      }
      const arrayClone = tileArray.map((tile, index) => {
        if(index === selectedTile) {
          return updatedTile
        }
        return tile
      }
      
      )
      setTileArray(arrayClone);

      changeTileStyle(false);
    }
  }

  const renderTiles = () => {
    return tileArray.map((tile: any, index: number) => {
      return (
        <div 
          id={`${index}`}
          key={`${index}`}
          style={selectedTiles.includes(index) ? 
            {
              backgroundColor: `Rgb(${tile.rValue}, ${tile.gValue}, ${tile.bValue})`,
              height: '8px',
              width: '8px',
              border: '1px solid black'
            } : {
              backgroundColor: `Rgb(${tile.rValue}, ${tile.gValue}, ${tile.bValue})`,
              height: '10px',
              width: '10px',
            }
          }
          onClick={() => {
            changeRGB(tile.rValue, tile.gValue, tile.bValue);
            setSelectedTile(tile.index);
          }}
          onMouseOver={()=> {
            console.log('moused over');
            if(onMouseDown) {
              const cloneMouseDownArray = [...selectedTiles];
              cloneMouseDownArray.push(index);
              setSelectedTiles(cloneMouseDownArray);
            }
          }}
        />
      )}
    )
  }

  return (
    <div className={styles.LightBox}>
      <div 
        className={styles.lightBoxArea}
        onPointerDown={()=> setOnMouseDown(true)}
        onPointerUp={()=> setOnMouseDown(false)}
      >
        {renderTiles()}
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
            if(selectedTiles) {
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

export default LightBox;