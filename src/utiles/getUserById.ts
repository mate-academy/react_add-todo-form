import { User } from '../types/User';

export const getUserbyId = (users: User[], userId:number):User | null => {
  return users.find(user => user.id === userId) || null;
};
