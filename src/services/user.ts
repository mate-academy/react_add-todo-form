import userFromServer from '../api/users';

export function getUserById(userId: number) {
  return userFromServer.find(user => user.id === userId)
  || null;
}
