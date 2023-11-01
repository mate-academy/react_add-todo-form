import { User, UserId, UserName } from '../types/User';
import usersFromServer from '../api/users';

export const getUserById = (
  userId: UserId,
  users: User[] = usersFromServer,
): User | undefined => {
  return users.find(user => user.id === userId);
};

export const getUserByName = (
  userName: UserName,
  users: User[] = usersFromServer,
): User | undefined => {
  return users.find(user => user.name === userName);
};
