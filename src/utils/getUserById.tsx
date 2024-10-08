import usersFromServer from '../api/users';

export function getUserById(userId: number) {
  return usersFromServer.find(user => userId === user.id) || null;
}
