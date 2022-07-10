import React, { useState, useEffect } from 'react';
import EventModule from "../eventModule/EventModule";
import styles from './EventModuleContainer.module.css';
import Button from '@mui/material/Button';
import moment from 'moment';


interface EventModuleContainerProps {
  props: any;
  selectedDay: any;
  resetSelectedDay: () => void;
  size: any;
}

const EventModuleContainer: React.FC<EventModuleContainerProps> = ({props, selectedDay, resetSelectedDay, size}) => {

  const [filter, setFilter] = useState<any>('');

  useEffect(() => {
    console.log('yo', selectedDay);
  }, [selectedDay])

  const renderModules = () => {

    console.log('selectedDay', selectedDay);
    console.log('event', props);
    return props.map((event: any) => {
      let isActive = false;

      if(event.Dates.includes('-')) {
        const beginning = event.Dates.split('-')[0] + moment().year();
        const end = event.Dates.split('-')[1] + moment().year();
        if (moment(selectedDay, "MMM Do YY").isBetween(moment(beginning, 'MMMM Do YYYY'), moment(end, 'MMMM Do YYYY'))) {
          isActive = true;
        }
        if ( moment(selectedDay, "MMM Do YY").isSame(moment(beginning, 'MMMM Do YYYY')) || moment(selectedDay, "MMM Do YY").isSame(moment(end, 'MMMM Do YYYY')) ){
          isActive = true;
        }
      } else {
        const beginning = event.Dates + moment().year();
        if ( moment(selectedDay, "MMM Do YY").isSame(moment(beginning, 'MMMM Do YYYY'))) {
          isActive = true;
        }
      }
      if(selectedDay.length > 1 && isActive) {
        return <EventModule props={event}/>
      } else if (selectedDay.length > 1 && !isActive) {
        return null
      }
      return <EventModule props={event}/>
    })
  }

  const resetFilter = () => {
    setFilter('');
  }

  const dayText = () => {
    if(selectedDay?.length > 0) {
      const oldText = moment(selectedDay, "MMM Do YY");
      console.log(oldText);
      const newText = moment(oldText).format("MMMM Do YYYY");
      return newText
    }
    return "no day selected";
  }

  return (
    <div className={styles.EventModuleContainer}>
      <div className={styles.filterContainer}>
        {size.width > 1000 &&
          <>
            <Button variant="text"> Showing: {dayText()} </Button>
            <Button variant="contained" onClick={() => resetSelectedDay()}>
              clear selection
            </Button>
          </>
        }
      </div>
      {renderModules()}
    </div>
  );
}

export default EventModuleContainer;