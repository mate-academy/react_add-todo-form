import { ITodo } from '../../types/todo';

export const getNextTodoId = (todos: ITodo[]) => {
  const ides = todos.map(({ id }) => id);

  return Math.max(...ides) + 1;
};
