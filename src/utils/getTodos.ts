import { TodoFromServer } from '../types/TodoFromServer';
import { getUser } from './getUser';
import usersFromServer from '../api/users';

export function getTodos(currTodos: TodoFromServer[]) {
  return currTodos.map(todo => ({
    ...todo,
    user: getUser(usersFromServer, todo.userId),
  }));
}
