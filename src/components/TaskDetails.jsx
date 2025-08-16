import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
  
  const { id } = useParams();
  
  const userId = useSelector((state) => state.auth.currentUser?.id);

  const task = useSelector((state) =>
    state.tasks.userTasks[userId]?.find((t) => t.id === id)
  );



  if (!task) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold text-red-500">Task not found</h2>
        <Link to="/tasklist" className="text-blue-600 underline mt-4 block">← Back to TaskList</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <p><span className="font-semibold">Title:</span> {task.title}</p>
        <p className="mt-2"><span className="font-semibold">Description:</span> {task.description}</p>
        <p className="mt-2">
          <span className="font-semibold">Status:</span> {task.completed ? "Completed" : "Pending"}
        </p>
      </div>

      <Link to="/tasklist" className="text-blue-600 underline mt-4 inline-block">← Back to TaskList</Link>
    </div>
  );
};

export default TaskDetails;