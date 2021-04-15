import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
//I import this to change the language of the calendar
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveEvent } from '../../redux/actions/calendar';

//Actions
import { uiOpenModal } from '../../redux/actions/ui';
import { AddNewFab } from './AddNewFab';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

//I use this line for change the languaje of the calendar
moment.updateLocale('en', null);

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = (props) => {
  const dispatch = useDispatch();

  //TODO: leer del store los events
  const { events } = useSelector((state) => state.calendar);
  // console.log(JSON.stringify(events));

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month',
  );

  /************************* Open Modal *************************/
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  /************************* /Open Modal *************************/

  const onSelectEvent = (e) => {
    // console.log(e);
    dispatch(setActiveEvent(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: '#367Cf7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        view={lastView}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
