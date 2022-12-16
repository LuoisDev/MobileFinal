import {configureStore} from '@reduxjs/toolkit';
import userEmail from './userEmail';
import userName from './userName';
export const store = configureStore({
  reducer: {
    userEmail: userEmail,
    userName: userName,
  },
});
