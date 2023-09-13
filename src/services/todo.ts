import { Todo } from '../types/Todo';

export const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};
