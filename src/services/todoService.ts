import { TodoWithUser } from '../entities/TodoWithUser';

export const getNewTodoID = (todos: TodoWithUser[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};
