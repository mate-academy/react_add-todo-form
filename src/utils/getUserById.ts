import usersFromServer from '../api/users';

export const getUsersById = (id: number) =>
  usersFromServer.find(user => user.id === id);
