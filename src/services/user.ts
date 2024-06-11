import usersFromServer from '../api/users';
import { Todo, User } from '../types/types';

export function getUserById(userId: number): User {
  return (
    usersFromServer.find(user => user.id === userId) || {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    }
  );
}

export function generateId(todos: Todo[]) {
  if (todos.length === 0) {
    return 1;
  }

  const numbersId = todos.map(({ id }) => id);

  return Math.max(...numbersId) + 1;
}
