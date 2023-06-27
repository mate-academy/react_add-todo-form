import { User } from '../react-app-env';

export const getUserById = (userId: number, users: User[]): User | null => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};
