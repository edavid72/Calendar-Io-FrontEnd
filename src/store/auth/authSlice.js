import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', //'authenticated' //'not-authenticated'
    user: {},
    errorMsg: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMsg = undefined;
    },

    onLogin: (state, action) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMsg = undefined;
    },

    onLogout: (state, action) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMsg = action.payload;
    },

    clearErrorMsg: (state) => {
      state.errorMsg = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMsg } =
  authSlice.actions;

export default authSlice;
