import { Todo } from '../types';

export const getLargestId = (currTodos: Todo[]): number => {
  const newTodos: Todo[] = [...currTodos];

  newTodos.sort((todo1, todo2) => todo1.id - todo2.id);

  return newTodos[newTodos.length - 1].id + 1;
};
