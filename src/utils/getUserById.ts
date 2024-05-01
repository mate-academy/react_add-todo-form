import usersFromServer from '../api/users';

export const getUserById = (userId: number) =>
  usersFromServer.find(u => u.id === userId) || null;
