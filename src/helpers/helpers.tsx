import { User } from '../types/User';
import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';

export function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export function findUserId(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export function getNewId(todosArray: Todo[]): number {
  const arrayOfIds = todosArray.map(todo => todo.id);

  return Math.max(...arrayOfIds);
}
