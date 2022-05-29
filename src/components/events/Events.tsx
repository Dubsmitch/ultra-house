import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Events.module.css';
import './reactCalendar.css';
import { eventDates } from './EventsObject';
import moment from 'moment';
import { eventDatesInterface } from '../../types/types';


interface EventsProps {
  props: any
}

interface eventObj {
  selectedDayText?: string,
  events?: eventDatesInterface,
}

const Events: React.FC<EventsProps> = ({props}) => {

  const [selectedDay, setSelectedDay] = useState<eventObj>({})

  const handleDayClickCal = (value: any) => {

    const selectedDayText = moment(value).format("MMM Do YY");
    console.log('selected thing', eventDates[selectedDayText]);
    
    type eventObjType = {
      [key: string]: {
        [key:string]: string
      }
    }

    const eventObj: eventObjType = {};
    eventObj[selectedDayText] = eventDates[selectedDayText];

    const selectedDayObj = {
      selectedDayText,
      events: eventObj
    }

    setSelectedDay(selectedDayObj);
  }

  const onTileClick = (calendarDate: any, view: any) => {

    // may use these constants later depending on needs
    // const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    //   'July', 'August', 'September', 'October', 'November', 'December'];
    // let currentDate = null;
    // let selectedDayDigits = null;

    let selectedDayString = null;
    let calendarDayString = null;
    
    let calendarDay: number | Date | string = moment(calendarDate).format("MMM Do YY");

    let thumbnail: string = '';

    if (eventDates[calendarDay]) {
      console.log(JSON.stringify(eventDates[calendarDay]));
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

  const renderEvents = () => {
     
    if (selectedDay.events) {
      const selection = selectedDay.selectedDayText;
      return Object.keys(selectedDay.events[selectedDay.selectedDayText]).map((key) => {
        console.log(key);
        return (
          <li>
            <p>
              {key}: {selectedDay.events[selection][key]}
            </p>
          </li>
        )
      })
    }
    else {
      return null
    }
  }

  return (
    <div className={styles.Events}>
      <Calendar
        onClickDay={(value) => handleDayClickCal(value)}
        tileContent={({ date, view }) => onTileClick(date, view)}
      />
        <article className={styles.selectedEventsContainer}>
          <span> Selected Day: </span>
          <ul>
            {renderEvents()}
          </ul>
        </article>
    </div>
  );
}

export default Events;