import usersFromServer from '../api/users';
import { User } from '../types/user';

export const getUserById: (id: number) => User = (id: number) => {
  const user = usersFromServer.find(user1 => user1.id === id);

  if (!user) {
    throw new Error(`User with ID ${id} not found`);
  }

  return user;
};

export const getAllUsers: () => User[] = () => {
  return usersFromServer;
};
