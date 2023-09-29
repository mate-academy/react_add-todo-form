import { User } from './types/User';
import { Todo } from './types/Todo';

export const findUser = (id: number, arr: User[]): User | undefined => {
  const result = arr.find(el => el.id === id);

  return result;
};

export const generateId = (todoss: Todo[]): number => {
  return Math.max(...todoss.map(todo => +todo.id)) + 1;
};
