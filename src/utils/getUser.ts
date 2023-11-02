import { User } from '../types/User';

export const getUserFrom = (userId: number, users: User[]) => {
  return users.find((user) => user.id === userId);
};
