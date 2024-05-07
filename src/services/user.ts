import { User } from '../interfaces/User';

export const getUserById = (users: User[], id: number): User => {
  return users.find(user => user.id === id) as User;
};
