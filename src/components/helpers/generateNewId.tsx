import { PreparedTodo } from '../../types';

export const generateNewId = (tasks: PreparedTodo[]) => {
  const tasksIds = tasks.map(({ id }) => id);

  return Math.max(...tasksIds) + 1;
};
