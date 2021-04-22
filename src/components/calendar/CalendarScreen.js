import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
//I import this to change the language of the calendar
import 'moment/locale/en-au';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// import { messages } from '../../helpers/calendar-messages-es'; //<-My custom messages in spanish
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearActiveEvent,
  eventStartLoading,
  setActiveEvent,
} from '../../redux/actions/events';

//Actions
import { uiOpenModal } from '../../redux/actions/ui';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

//I use this line for change the languaje of the calendar
moment.updateLocale('en', null);

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  // console.log(JSON.stringify(events));

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month',
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  /************************* Open Modal *************************/
  const onDoubleClick = (e) => {
    console.log(e);
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

  const onSelectSlot = (e) => {
    // console.log(e);
    dispatch(clearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event, start, end, isSelected);
    console.log(event.user);

    const style = {
      backgroundColor: uid === event.user._id ? '#367Cf7' : '#464040',
      borderRadius: '20px',
      borderColor: 'white',
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
        className="calendar"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // messages={messages} //turn messages to spanish
        eventPropGetter={eventStyleGetter}
        view={lastView}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      <DeleteEventFab />
      <CalendarModal />
    </div>
  );
};
