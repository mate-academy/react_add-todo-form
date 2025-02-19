import users from '../api/users';
import { User } from '../types/user';

export function getUserById(id: number) {
  return (
    users.find((user: User) => user.id === id) || {
      id: 0,
      name: 'User',
      username: 'User',
      email: 'user@user.com',
    }
  );
}
