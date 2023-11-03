import { Todo } from '../types/todo';

export const getNextTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
