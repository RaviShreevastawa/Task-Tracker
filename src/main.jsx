import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import TaskItem from './components/TaskItem.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import TaskDetails from './components/TaskDetails.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/addtask', element: <AddTask /> },
      { path: '/tasklist', element: <TaskList /> },
      { path: '/tasks', element: <TaskItem /> },
      { path: '/task/:id', element: <TaskDetails /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);