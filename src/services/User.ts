import { User, UserId } from '../types/User';
import usersFromServer from '../api/users';

export const getUserById = (
  userId: UserId,
  users: User[] = usersFromServer,
): User | undefined => {
  return users.find(user => user.id === userId);
};
