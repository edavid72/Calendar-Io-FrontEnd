import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Mateo Birthday's",
//   notes: 'Buy Cake in the supermarket',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#827397',
//   user: {
//     _id: '2319',
//     name: 'Mateo',
//   },
// };

const calendarIoSlice = createSlice({
  name: 'calendarIo',
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onLoadEvents: (state, { payload }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);

        if (!exists) {
          state.events.push(event);
        }
      });
    },

    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },

    onLogoutCalendarEvents: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onLoadEvents,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLogoutCalendarEvents,
} = calendarIoSlice.actions;

export default calendarIoSlice;
