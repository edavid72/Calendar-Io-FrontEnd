import { useDispatch, useSelector } from 'react-redux';
import calendarIoApi from '../api/calendarIoApi';
import {
  clearErrorMsg,
  onChecking,
  onLogin,
  onLogout,
} from '../store/auth/authSlice';
import { onLogoutCalendarEvents } from '../store/calendar/calendarIoSlice';

export const useAuthStore = () => {
  const { status, user, errorMsg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    // console.log({ email, password });

    dispatch(onChecking());

    try {
      const { data } = await calendarIoApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Incorrect user credentials'));

      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 1000);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarIoApi.post('/auth/register', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      console.log(data);
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg));

      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 2000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarIoApi.get('auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.getItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendarEvents());
    dispatch(onLogout());
  };

  return {
    // Properties
    status,
    user,
    errorMsg,

    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
