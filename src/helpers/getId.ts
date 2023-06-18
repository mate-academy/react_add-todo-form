import { Todo } from '../Types';

export const getId = (todos: Todo[]) => {
  const idsList = todos.map(todo => todo.id);

  return Math.max(...idsList) + 1;
};
