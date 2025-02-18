import users from './api/users';
import { ToDo } from './types/todo';
import { User } from './types/user';

export function findUserById(id: number): User {
  return users.filter(user => user.id === id)[0];
}

export function getTodosMaxId(todosList: ToDo[]): number {
  return Math.max(...todosList.map(todo => todo.id));
}
