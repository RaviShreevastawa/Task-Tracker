import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateDescription } from '../store/taskSlice';
import { selectFilteredTasks } from '../store/taskFilter';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DeleteConfirmation from "../components/DeleteConfirmation";

const TaskItem = () => {
  const userId = useSelector((state) => state.auth.currentUser?.id);
  const tasks = useSelector((state) => selectFilteredTasks(state, userId));
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editedDesc, setEditedDesc] = useState('');

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditedDesc(task.description);
  };

  const handleUpdate = (id) => {
    if (editedDesc.trim() === '') {
      toast.error('Description cannot be empty');
      return;
    }

    try {
      dispatch(updateDescription({ userId, id, description : editedDesc }));
      toast.success("Description Updated Successfully");
      setEditId(null);
    } catch (error) {
      toast.error("Something went wrong when updating description!!");
    }
  };

  const [taskToDelete, setTaskToDelete] = useState(null);

  const confirmDelete = () => {
    dispatch(deleteTask({ userId, id: taskToDelete.id }));
    console.log("This is UserId in Delete : ", userId)
    toast.success(`"${taskToDelete.title}" deleted successfully!!`);
    setTaskToDelete(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="mb-1 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>

              {editId === task.id ? (
                <textarea
                  id={`desc-${task.id}`}
                  name={`description-${task.id}`}
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  className="w-full border p-2 mb-2"
                />
              ) : (
                <p className="text-sm text-gray-700 mb-2">{task.description}</p>
              )}

              <div className="flex gap-4">
                {editId === task.id ? (
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Update
                  </button>
                )}

                <button
                  onClick={() => setTaskToDelete(task)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmation
        task={taskToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
};

export default TaskItem;
