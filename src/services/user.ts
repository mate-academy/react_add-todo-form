import usersFromServer from '../api/users';

export function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}
