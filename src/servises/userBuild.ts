import usersFromServer from '../api/users';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}
