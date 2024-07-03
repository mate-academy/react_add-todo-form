import usersFromServer from '../api/users';

export const getUserInfo = (userId: number) =>
  usersFromServer.find(user => user.id === userId);
