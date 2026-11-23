import usersFromServer from '../api/users';
import { User } from '../types/types';

const users: User[] = usersFromServer;

export function getUserById(userId: number) {
  return users.find(user => user.id == userId);
}
