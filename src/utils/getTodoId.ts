import { Todo } from '../react-app-env';

export const getTodoId = (todos: Todo[]) => {
  const largestId = Math.max(...todos.map(todo => todo.id));

  return largestId + 1;
};
