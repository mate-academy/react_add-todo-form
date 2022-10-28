import { TodoWithUser, User } from './react-app-env';

export const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

export const getUserById = (userId: number, users: User[]) => {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
};
