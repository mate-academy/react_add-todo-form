import { TodoType } from '../types';

export const findMaxId = (users: TodoType[]) => {
  const todoId = users.map(({ id }) => id);

  return Math.max(...todoId);
};
