export const selectFilteredTasks = (state) => {
  const { userTasks, filter } = state.tasks;

  const userId = state.auth.currentUser?.id;

  if (!userId) return [];

  const tasks = userTasks[userId] || [];

  if (filter === "completed") return tasks.filter((t) => t.completed);
  if (filter === "pending") return tasks.filter((t) => !t.completed);
  return tasks;
};
