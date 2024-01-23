import { Todo } from '../types/Todo';

export const getId = (visibleTodos: Todo[]): number => {
  return Math.max(...visibleTodos.map(todo => todo.id));
};
