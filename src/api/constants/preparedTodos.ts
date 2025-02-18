import todosFromServer from '../todos';
import usersFromServer from '../users';

export const preparedTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    userFromServer => userFromServer.id === todo.userId,
  );

  return { ...todo, user: user || null };
});
