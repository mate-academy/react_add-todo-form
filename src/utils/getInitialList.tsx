import { getUserById } from './getUserById';
import { TodoFromServer, User } from '../types';

export function getInitialList(todos: TodoFromServer[], users: User[]) {
  return todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId, users),
  }));
}
