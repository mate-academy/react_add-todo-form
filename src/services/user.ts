import usersFromServer from '../api/users';

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};
