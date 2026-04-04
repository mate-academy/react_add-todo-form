import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
