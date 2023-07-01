import usersFromServer from '../api/users';

export const findUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};
