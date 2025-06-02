import usersFromServer from '../api/users';

export const getUserId = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};
