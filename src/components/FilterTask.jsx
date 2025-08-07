import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/tasks/tasksSlice';

const FilterTask = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.tasks.filter);

  return (
    <select value={filter} onChange={(e) => dispatch(setFilter(e.target.value))}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  );
};

export default FilterTask;