// src/main.jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddTask from "./components/AddTask.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskItem from "./components/TaskItem.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import TaskDetails from "./components/TaskDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addtask",
        element: (
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tasklist",
        element: (
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tasks",
        element: (
          <ProtectedRoute>
            <TaskItem />
          </ProtectedRoute>
        ),
      },
      {
        path: "/task/:id",
        element: (
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
