import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("taskData");
    return data ? JSON.parse(data) : { userTasks: {}, filter: "all" };
  } catch {
    return { userTasks: {}, filter: "all" };
  }
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("taskData", JSON.stringify(state));
};

const initialState = loadFromLocalStorage();

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { userId, title, description } = action.payload;
      if (!state.userTasks[userId]) state.userTasks[userId] = [];
      state.userTasks[userId].push({
        id: nanoid(),
        title,
        description,
        completed: false,
      });
      saveToLocalStorage(state);
    },
    updateDescription: (state, action) => {
      const { userId, id, description } = action.payload;
      const task = state.userTasks[userId]?.find((t) => t.id === id);
      if (task) task.description = description;
      saveToLocalStorage(state);
    },
    deleteTask: (state, action) => {
      const { userId, id } = action.payload;
      state.userTasks[userId] = state.userTasks[userId]?.filter(
        (t) => t.id !== id
      );
      saveToLocalStorage(state);
    },
    toggleStatus: (state, action) => {
      const { userId, id } = action.payload;
      const task = state.userTasks[userId]?.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
      saveToLocalStorage(state);
    },
    sortTasks: (state, action) => {
      const { userId } = action.payload;
      if (state.userTasks[userId]) {
        state.userTasks[userId].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      saveToLocalStorage(state);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const { addTask, updateDescription, deleteTask, toggleStatus, sortTasks, setFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
