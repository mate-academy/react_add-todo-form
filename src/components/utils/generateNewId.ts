import { Todos } from '../Types/Todo';

export const generateNewId = (todos: Todos): number => {
  const ids = todos.map(todo => todo.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
