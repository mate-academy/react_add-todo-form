import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || usersFromServer[0];
}

export const defaultTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
