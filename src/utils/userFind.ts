import usersFromServer from '../api/users';

export function findUser(todoUserId:number) {
  return usersFromServer.find(user => user.id === todoUserId) || null;
}
