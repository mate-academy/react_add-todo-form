import usersFromServer from '../api/users';

export const findUserById = (userId: number) => {
  return usersFromServer.find(usr => usr.id === userId);
};
