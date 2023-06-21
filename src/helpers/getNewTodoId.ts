import { Todo } from '../types/Todo';

export const getNewTodoId = (todos: Todo[]) => {
  const lastTodoId = Math.max(...todos.map(todo => todo.id));

  return lastTodoId + 1;
};
