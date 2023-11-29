import { Todos } from '../types/TodosUsers';

export const getMaxId = (todos: Todos[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};
