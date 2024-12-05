import usersFromServer from '../api/users';

export const getUsersById = (id: number | undefined) =>
  usersFromServer.find(user => user.id === id);
