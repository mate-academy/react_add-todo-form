import { Todo } from './types/Todo';

export const maxTodoId = (prevTodos: Todo[]) => {
  return Math.max(...prevTodos.map((todo: Todo) => todo.id)) + 1;
};
