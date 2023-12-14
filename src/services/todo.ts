import { Todo } from '../types/Todo';

export const getNewId = (allTodos: Todo[]) => {
  const newId = Math.max(...allTodos.map(todo => todo.id));

  return newId + 1;
};
