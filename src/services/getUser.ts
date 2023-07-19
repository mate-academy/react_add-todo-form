import { User } from '../types/User';

export const getUserByid = (users: User[], id: number) => {
  return users.find(user => user.id === id);
};
