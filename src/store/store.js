import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import calendarIoSlice from './calendar/calendarIoSlice';
import uiSlice from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendarIo: calendarIoSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
