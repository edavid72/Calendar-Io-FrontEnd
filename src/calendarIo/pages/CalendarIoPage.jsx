import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Navbar from '../components/Navbar';
import { localizer } from '../../helpers/calendarIoLocalizer';
import { getMessages } from '../../helpers/getMessages';
import CalendarIoEvent from '../components/CalendarIoEvent';
import CalendarIoModal from '../components/CalendarIoModal';
import useUiStore from '../../hooks/useUiStore';
import useCalendarIoStore from '../../hooks/useCalendarIoStore';
import FabAddNew from '../components/FabAddNew';
import FabDelete from '../components/FabDelete';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

const CalendarIoPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarIoStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.id === event.user._id || user.uid === event.user._id;

    const style = {
      backgroundColor: isMyEvent ? '#827397' : '#748DA6',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#E9D5DA',
    };

    return { style };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 60px' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarIoEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarIoModal />

      <FabAddNew />

      <FabDelete />
    </>
  );
};

export default CalendarIoPage;
