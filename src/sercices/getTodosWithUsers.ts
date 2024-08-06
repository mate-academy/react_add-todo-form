import { Todo, TodoWithUser, User } from '../types';
import { getUserById } from './getUserById';

export function getTodosWithUsers(
  todos: Todo[],
  users: User[],
): TodoWithUser[] {
  return todos.map(todo => ({
    ...todo,
    user: getUserById(users, todo.userId) as User,
  }));
}
