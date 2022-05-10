import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Events.module.css';
import './reactCalendar.css';
import {eventDates} from './EventsObject';
import moment from 'moment';


interface EventsProps {
  props: any
}

const Events: React.FC<EventsProps> = ({props}) => {

  const handleDayClickCal = (value: any) => {
    console.log('clicked', value);
  }

  const onTileClick = (calendarDate: any, view: any) => {

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    let selectedDayString = null;
    let calendarDayString = null;
    let currentDate = null;
    let selectedDayDigits = null;



    // console.log('using moment', moment().format("MMM Do YY"));  
    // console.log('date to moment', moment("May 11 2022").format());

    let calendarDay: number | Date | string = moment(calendarDate).format("MMM Do YY");
    console.log('calendarDay', calendarDay);
    // newDate = newDate.getTime();

    let thumbnail: string = '';
    let description: string= '';

    if (eventDates[calendarDay]) {
      console.log(JSON.stringify(eventDates[calendarDay]));
      thumbnail = Object.keys(eventDates[calendarDay])[0];
      description = eventDates[calendarDay][thumbnail];
      console.log('thumbnail', thumbnail);
      console.log('description', eventDates[calendarDay][thumbnail]);
    }

    if (view === 'month' && selectedDayString === calendarDayString) {
      return (
        <div>
          {description}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.Events}>
      <Calendar
        onClickDay={(value) => handleDayClickCal(value)}

        tileContent={({ date, view }) => onTileClick(date, view)}
      />
    </div>
  );
}

export default Events;