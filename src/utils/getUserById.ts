import usersFromServer from '../api/users';

export const getUserById = (userId: number) =>
  usersFromServer.find(user => user.id === userId);
