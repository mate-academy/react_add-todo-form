import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { TodoWithUserInfo } from '../types/TodoWithUserInfo';
import { getUserById } from './users';

export const initialTodos: TodoWithUserInfo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const getNextTodoId = (todos: Todo[]): number =>
  Math.max(0, ...todos.map(todo => todo.id)) + 1;
