import { Todo } from '../types/Todo';

export const getMaxId = (todos: Todo[]) => {
  const todosIds = todos.map(todo => todo.id);

  return Math.max(...todosIds);
};
