import { Todos } from '../Types/Todos';
import { User } from '../Types/User';

export const getUserById = (users: User[], userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
};

export const maxId = (todos: Todos[]): number => {
  if (todos.length === 0) {
    return 1;
  }

  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};
