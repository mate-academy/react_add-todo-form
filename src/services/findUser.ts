import usersFromServer from '../api/users';

export const findUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};
