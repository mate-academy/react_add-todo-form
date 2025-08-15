import usersFromServer from '../api/users';

export function findUserById(id: number) {
  return usersFromServer.find(user => user.id === id);
}
