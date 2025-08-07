export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks;
  if (filter === 'completed') return tasks.filter(t => t.completed);
  if (filter === 'pending') return tasks.filter(t => !t.completed)
  return tasks;
};