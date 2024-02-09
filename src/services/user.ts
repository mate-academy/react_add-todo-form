import usersFromServer from '../api/users';

export function getUserById(id: number) {
  return usersFromServer.find((user) => id === user.id) || null;
}
