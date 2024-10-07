import usersFromServer from '../api/users';

export function getUserById(todoId: number) {
  return usersFromServer.find(user => todoId === user.id) || null;
}
