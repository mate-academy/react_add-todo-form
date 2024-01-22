import { Todos } from '../Types/Todo';

export const generalNewId = (todos: Todos): number => {
  const id = todos.map(todo => todo.id);
  const maxId = Math.max(...id);

  return maxId + 1;
};
