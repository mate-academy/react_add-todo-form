import usersFromServer from '../api/users';

export const findUserById = (userId: number) =>
  usersFromServer.find(client => client.id === userId)!;
