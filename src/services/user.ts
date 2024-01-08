import usersFromServer from '../api/users';

export function getUserById(userFromTodoId: number) {
  return usersFromServer.find(user => user.id === userFromTodoId) || null;
}
