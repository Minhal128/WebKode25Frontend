import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feauture/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});