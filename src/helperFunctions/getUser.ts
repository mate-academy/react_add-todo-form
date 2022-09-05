import { User } from '../Types/User';

export const getUser = (userId: number, users: User[]) => {
  return users.find((user) => user.id === userId);
};
