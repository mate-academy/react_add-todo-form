import { TodoWithUser } from '../react-app-env';

export const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};
