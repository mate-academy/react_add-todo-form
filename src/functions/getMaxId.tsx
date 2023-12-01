import { Todo } from '../types/TodosUsers';

export const getMaxId = (todos: Todo[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};
