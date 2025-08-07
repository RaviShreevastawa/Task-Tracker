import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});