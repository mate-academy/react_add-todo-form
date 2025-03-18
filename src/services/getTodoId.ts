import { ToDo } from '../types/ToDo';

export const getTodoId = (todos: ToDo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
