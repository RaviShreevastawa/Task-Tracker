import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTasks } from "../store/taskFilter";
import { setFilter, toggleStatus, deleteTask, sortTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { useState } from "react";

const TaskList = () => {
  const userId = useSelector((state) => state.auth.currentUser?.id); 
  const tasks = useSelector((state) => selectFilteredTasks(state, userId));
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();

  const [taskToDelete, setTaskToDelete] = useState(null);

  const confirmDelete = () => {
    if (!taskToDelete) return;
    dispatch(deleteTask({ userId, id: taskToDelete.id }));
    toast.success(`"${taskToDelete.title}" deleted successfully!!`);
    setTaskToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Your Tasks</h2>

      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <label
            htmlFor="task-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter Tasks
          </label>
          <select
            id="task-filter"
            name="taskFilter"
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="w-full md:w-60 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <button
          onClick={() => dispatch(sortTasks({ userId }))}
          className="h-10 px-6 mt-6 bg-lime-600 hover:bg-lime-800 text-white rounded-md shadow"
        >
          Sort
        </button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-md p-5 border flex flex-col md:flex-row md:items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p
                  className={`text-sm ${
                    task.completed ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  Status: {task.completed ? "Completed" : "Pending"}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    id={`toggle-${task.id}`}
                    name="toggle"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleStatus({ userId, id: task.id }))}
                    className="accent-blue-500"
                  />
                  <label
                    htmlFor={`toggle-${task.id}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Toggle Status
                  </label>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-3">
                <button
                  onClick={() => setTaskToDelete(task)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </button>

                <Link
                  to={`/task/${task.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteConfirmation
        task={taskToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
};

export default TaskList;
