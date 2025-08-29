import users from '../api/users';
import { User } from '../types/UserType';

export function findUser(userId: number) {
  return users.find((user: User) => user.id === userId);
}
