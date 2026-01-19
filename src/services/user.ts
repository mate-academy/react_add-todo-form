import usersFromServer from '../api/users';

export const getUserId = userId =>
  usersFromServer.find(user => user.id === userId);
