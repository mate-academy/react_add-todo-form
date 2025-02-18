import { User } from '../types/User';

export const findUserById = (users: User[], todoUserId: number): User => {
  return users.find(({ id }) => id === todoUserId) as User;
};
