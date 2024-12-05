import { User } from '../types/User';

export const getUsersById = (users: User[], id: number): User | undefined => {
  return users.find(user => user.id === id);
};
