import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Events.module.css';
import './reactCalendar.css';
import { eventDates } from './EventsObject';
import moment from 'moment';
import { eventDatesInterface } from '../../types/types';
import EventModule from './eventModule/EventModule';
import EventModuleContainer from './eventModuleContainer/EventModuleContainer';

// Event Dates over multiple Days MUST HAVE a dash
const complexEvents = [
  {
    Dates: "July 5th - July 15th",
    Title: "UltraHouse Shit",
    Description: "We're going to do ultrahouse Shit"
  },
  {
    Dates: "July 3rd",
    Title: "UltraHouse Run",
    Description: "We're going to do ultrahouse Shit"
  },
  {
    Dates: "July 17th - July 20th",
    Title: "UltraHouse Weekend",
    Description: "We're going to do ultrahouse Shit"
  },
  {
    Dates: "July 5th - July 15th",
    Title: "UltraHouse Shit",
    Description: "We're going to do ultrahouse Shit"
  },
  {
    Dates: "July 7th",
    Title: "UltraHouse Run",
    Description: "We're going to do ultrahouse Shit"
  },
  {
    Dates: "July 17th - July 20th",
    Title: "UltraHouse Weekend",
    Description: "We're going to do ultrahouse Shit"
  }
]
interface EventsProps {
  routeProps: any;
  props: any;
  size: any
}

// interface eventObj {
//   selectedDayText?: string,
//   events?: eventDatesInterface,
// }

const Events: React.FC<EventsProps> = ({routeProps, props, size}) => {

  const [selectedDay, setSelectedDay] = useState<any>('')
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    higlightActivityDays();
    console.log('props from routes', routeProps);
  }, []);



  const handleDayClickCal = (value: any) => {

    const selectedDayText = moment(value).format("MMM Do YY");
    const momentStuff = moment(value)
    
    
    console.log('selecteDayText', selectedDayText);
      setSelectedDay(selectedDayText);
  }

  const onTileClick = (calendarDate: any, view: any) => {

    let selectedDayString = null;
    let calendarDayString = null;
    
    let calendarDay: number | Date | string = moment(calendarDate).format("MMM Do YY");

    let thumbnail: string = '';

    if (eventDates[calendarDay]) {
      thumbnail = Object.keys(eventDates[calendarDay])[0];
    }

    if (view === 'month' && selectedDayString === calendarDayString) {
      return (
        <div>
          {thumbnail}
        </div>
      );
    }
    return null;
  };

const renderSingleEventModules = () => {
  return complexEvents.map(event => {
    return (
      <>
        <EventModule props={event}/>
      </>
    )
  })
}

const returnDate = (value: any) => {
  const date = JSON.stringify(value.date);
  const momentDate = date.split('T')[0]
  setMounted(true);

  let isActiveDate = '';

  complexEvents.forEach((date) => {
    if(date.Dates.includes('-')) {
      const beginning = date.Dates.split('-')[0] + moment().year();
      const end = date.Dates.split('-')[1] + moment().year();
      if (moment(value.date).isBetween(moment(beginning, 'MMMM Do YYYY'), moment(end, 'MMMM Do YYYY'))) {
        isActiveDate = 'isActiveDate';
      }
      if ( moment(value.date).isSame(moment(beginning, 'MMMM Do YYYY')) || moment(value.date).isSame(moment(end, 'MMMM Do YYYY')) ){
        isActiveDate = 'isActiveDate';
      }
    }
    else {
      const beginning = date.Dates + moment().year();
      if ( moment(value.date).isSame(moment(beginning, 'MMMM Do YYYY'))) {
        isActiveDate = 'isActiveDate';
      }
    }
  })

  return isActiveDate;
  // return 'hi'
}

const higlightActivityDays = () => {
  const elements = document.getElementsByClassName("isActiveDate");
  for (const element of elements as HTMLCollectionOf<HTMLElement>) {
    element.style.backgroundColor = '#d3d3d3';
  }
}

const resetSelectedDay = (): void => {
  setSelectedDay({});
}

  return (
    <div className={styles.Events}>
      {size.width > 1000 &&
        <div className={styles.calendarContainer}>
          <Calendar
            onClickDay={(value) => handleDayClickCal(value)}
            tileContent={({ date, view }) => onTileClick(date, view)}
            tileClassName={(value) => returnDate(value)}
          />
      </div>
      }
      <div className={styles.eventContainer}>
        <EventModuleContainer props={complexEvents} selectedDay={selectedDay} resetSelectedDay={resetSelectedDay} size={size}/>
      </div>
    </div>
  );
}

export default Events;