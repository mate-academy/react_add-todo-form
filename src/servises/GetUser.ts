import usersFromServer from '../api/users';

export const users = usersFromServer;

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}
