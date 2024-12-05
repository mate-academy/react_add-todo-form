import { Todo } from '../types';

export const getNewId = (todos: Todo[]) => {
  const sortedTodos = todos.sort((todo1, todo2) => todo2.id - todo1.id);

  return sortedTodos[0].id + 1;
};
