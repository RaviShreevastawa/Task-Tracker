import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("authData");
    return data ? JSON.parse(data) : { users: [], currentUser: null };
  } catch {
    return { users: [], currentUser: null };
  }
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("authData", JSON.stringify(state));
};

const initialState = loadFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const { fullname, username, password } = action.payload;
      const exists = state.users.find((u) => u.username === username);
      if (exists) {
        throw new Error("User already exists!");
      }
      const newUser = {
        id: nanoid(), 
        fullname,
        username,
        password,
      };

      state.users.push(newUser);
      state.currentUser = { id: newUser.id, fullname : newUser.fullname, username: newUser.username };
      saveToLocalStorage(state);
    },

    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        throw new Error("Invalid credentials!");
      }

      state.currentUser = { id: user.id, username: user.username };
      saveToLocalStorage(state);
    },

    logout: (state) => {
      state.currentUser = null;
      saveToLocalStorage(state);
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
