import { ITodo } from '../types/Todos.types';
import { IUser } from '../types/User.types';

export function findMaxUserId(user: IUser[]) {
  return user.reduce((acc, { id }) => Math.max(acc, id), 0);
}

export function findMaxTodoId(todo: ITodo[]) {
  return todo.reduce((acc, { id }) => Math.max(acc, id), 0);
}
