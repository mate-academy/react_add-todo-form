import { TodoWithUser } from '../entities/TodoWithUser';

export const getTodoID = (todos: TodoWithUser[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};
