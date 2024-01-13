import usersFromServer from '../api/users';

export function getUserById(todoUserId: number) {
  return usersFromServer.find(user => user.id === todoUserId) || null;
}
