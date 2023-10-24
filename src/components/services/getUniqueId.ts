import { ToDo } from '../../types/ToDo';

export const getUniqueId = (todos: ToDo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
