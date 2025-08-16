import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});