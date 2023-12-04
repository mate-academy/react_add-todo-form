import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const defaultTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
