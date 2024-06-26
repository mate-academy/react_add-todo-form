import { Todo } from '../types/Todo';

export const getNewId = (todos: Todo[]) =>
  Math.max(...todos.map(todo => todo.id)) + 1;
