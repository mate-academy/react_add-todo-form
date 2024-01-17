import { Todos } from '../types/Todo';

export const generateNewId = (todosArr: Todos): number => {
  const idArr = todosArr.map(todo => todo.id);

  return Math.max(...idArr) + 1;
};
