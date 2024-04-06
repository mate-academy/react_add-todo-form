import { User } from '/types/User'; 
import usersFromServer from '../api/users';

export function getUserById(userId: number): User | null {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}
