import { User } from '../types/user';

export function findUserByTodoUserId(users: User[], todoUserId: number) {
  return users.find((user) => user.id === todoUserId);
}
