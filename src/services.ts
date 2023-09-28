import { User } from './types/User';
import { Todo } from './types/Todo';

export const findUser = (id: number, arr: User[]): User | undefined => {
  const result = arr.find(el => el.id === id);

  return result;
};

export const generateId = (todoss: Todo[]): number => {
  const arrWithId: Array<number> = [];

  todoss.forEach(todo => arrWithId.push(+todo.id));

  return Math.max(...arrWithId) + 1;
};
