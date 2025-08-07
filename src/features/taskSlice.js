import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, description } = action.payload;
      state.tasks.push({
        id: nanoid(),
        title,
        description,
        completed: false,
      });
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    toggleStatus: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },

    updateDescription: (state, action) => {
      const { id, newDescription } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) task.description = newDescription;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleStatus,
  updateDescription,
  setFilter,
} = tasksSlice.actions;


export default tasksSlice.reducer;