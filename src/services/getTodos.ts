import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

export const getTodos = () => {
  const fullTodos = todosFromServer.map((todo) => ({
    ...todo,
    user: usersFromServer.find((user) => user.id === todo.userId) || null,
  }));

  return fullTodos;
};
