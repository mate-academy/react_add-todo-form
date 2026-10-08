import usersFromServer from '../api/users';

export function getUserById(userId: number | undefined) {
  return usersFromServer.find(user => user.id === userId) || null;
}
