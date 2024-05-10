import { UsersProps } from '../types/User';
import usersFromServer from '../api/users';

export function getUserById(userId: number): UsersProps | null {
  return (
    (usersFromServer.find(user => userId === user.id) as UsersProps) || null
  );
}
