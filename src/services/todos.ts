import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { getUserById } from './user';

export const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const getNewId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};
