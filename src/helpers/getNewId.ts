import { TodoType } from '../types';

export const getNewId = (users: TodoType[]) => {
  const todoId = users.map(({ id }) => id);

  return Math.max(...todoId) + 1;
};
