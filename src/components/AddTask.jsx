import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { toast } from 'react-toastify';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() && !description.trim()) {
      toast.error('Please enter title and description !!');
      return;
    }

    if (!title.trim()) {
      toast.error('Title is Required !!');
      return;
    }

    if (!description.trim()) {
      toast.error('Description is Required !!');
      return;
    }

    if (!currentUser) {
      toast.error('User not logged in!');
      return;
    }

    try {
      dispatch(addTask({ 
        userId: currentUser.id, 
        title, 
        description 
      }));
      toast.success('Task added successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error("Something went wrong when adding the Task !!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            id="task-title"
            name='taskTittle'
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="task-desc" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="task-desc"
            name='taskDescription'
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
