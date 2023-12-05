import usersFromServer from '../api/users';

export const getUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};
