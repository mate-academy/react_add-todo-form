import { Todo, User } from '../types';

export const getUserFromTodo = (users: User[], todo: Todo) =>
  users.find(user => user.id === todo.userId);
