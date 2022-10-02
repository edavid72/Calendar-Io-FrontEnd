import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarIoApi from '../api/calendarIoApi';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarIoSlice';

const useCalendarIoStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendarIo);
  const { user } = useSelector((state) => state.auth);

  const startLoadingEvents = async () => {
    const { data } = await calendarIoApi.get('/events');
    const events = convertEventsToDateEvents(data.events);
    dispatch(onLoadEvents(events));
  };

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Updating
        const { data } = await calendarIoApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        //Creating
        const { data } = await calendarIoApi.post('/events', calendarEvent);
        console.log({ data });
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error saving note', error.response.data.msg, 'error');
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarIoApi.delete(`/events/${activeEvent.id}`);

      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error deleting note', error.response.data.msg, 'error');
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    startLoadingEvents,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  };
};

export default useCalendarIoStore;
