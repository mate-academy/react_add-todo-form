import usersFromServer from '../api/users';
import { Todos, Users } from '../components/types';

export const findIdUser = (post: Todos) => {
  return usersFromServer.find((user: Users) => post.userId === user.id);
};

export const findMax = (todos: Todos[]) => {
  const maxTodo = todos.reduce(
    (max, todo) => (todo.id > max.id ? todo : max),
    todos[0],
  );

  return maxTodo;
};
