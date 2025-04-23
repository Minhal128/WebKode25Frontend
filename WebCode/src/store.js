import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feauture/auth/authSlice';
import transactionReducer from './feauture/transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
  },
});