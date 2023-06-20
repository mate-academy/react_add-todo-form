import { Todo } from './types/Todo';
import { User } from './types/User';

export function getNewId(todos: Todo[]) {
  const todoIds = todos.map(todo => todo.id);
  const maxId = Math.max(...todoIds);

  return maxId + 1;
}

export function getUserById(userId: number, users: User[]): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}
