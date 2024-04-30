import usersFromServer from '../../api/users';
import { User } from '../../types/User';

export function getUserByTodo(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
