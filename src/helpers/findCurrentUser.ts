import usersFromServer from '../api/users';

export const findCurrentUser = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};
