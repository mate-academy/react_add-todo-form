import { Todos } from '../types/Todo';

export const generateNewId = (todos: Todos): number => {
  const idArray = todos.map(todo => todo.id);

  return Math.max(...idArray) + 1;
};
