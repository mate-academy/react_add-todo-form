import usersFromServer from '../api/users';

export const getUserByUserId = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};
