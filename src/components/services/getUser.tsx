import usersFromServer from '../../api/users';

export function getUser(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}
