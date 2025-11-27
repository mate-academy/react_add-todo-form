import { User } from '../../Types/User';

export const findUserById = (users: User[], id: number): User | null => {
  return users.find(user => user.id === id) || null;
};
