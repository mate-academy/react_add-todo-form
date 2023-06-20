import { User } from '../types/User';
import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export function findTodoUser(name: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === name);

  return foundUser || null;
}

export function maxId(todosArray: Todo[]): number {
  const arrayOfIds = todosArray.map(todo => todo.id);

  return Math.max(...arrayOfIds);
}
