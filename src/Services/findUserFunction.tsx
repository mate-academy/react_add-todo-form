import { User } from '../types/User';

export const findUser = (id: number, usersFromServer: User[]) => {
  return usersFromServer.find(user => user.id === id) as User;
};


