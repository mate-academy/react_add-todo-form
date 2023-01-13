import { Todo } from '../types/Todo';
import { User } from '../types/User';
import todosFromServer from '../api/todos';
import usersFromServer from '../api/users';

export function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const getUserById: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});
